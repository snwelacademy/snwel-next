'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Search, ChevronRight, Calendar, Clock } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useBlogList } from './useBlogList'
import BlogLoading from './BlogPageLoading'
import NoBlogsScreen from './NoBlogs'
import { formatDateInReadable } from '@/lib/utils'
import Link from 'next/link'
import BlogCard from './BlogCard'

export default function BlogPage() {
    const {
        blogs,
        isLoading,
        search,
        setSearch,
    } = useBlogList();

    if (isLoading) {
        return <BlogLoading />
    }

    if (!isLoading && blogs?.docs.length === 0 && !search) {
        return <NoBlogsScreen />
    }

    const featuredBlog = blogs?.docs[0];
    const remainingBlogs = blogs?.docs.slice(1) || [];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <main className="container mx-auto px-4 py-12">

                {/* Header & Search */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Our Blog</h1>
                        <p className="text-gray-600 dark:text-gray-400">Insights, tutorials, and updates from our team.</p>
                    </div>
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                            placeholder="Search articles..."
                            className="pl-10 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                {/* Featured Post (Hero) */}
                {!search && featuredBlog && (
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-16"
                    >
                        <div className="relative rounded-3xl overflow-hidden bg-white dark:bg-gray-800 shadow-xl group">
                            <div className="grid md:grid-cols-2 gap-0">
                                <div className="relative h-64 md:h-auto overflow-hidden">
                                    <Image
                                        src={featuredBlog.coverImage || '/placeholder-blog.jpg'}
                                        alt={featuredBlog.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        priority
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden" />
                                </div>
                                <div className="p-8 md:p-12 flex flex-col justify-center">
                                    <div className="flex items-center gap-3 mb-4">
                                        <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-none">
                                            {featuredBlog.category?.name || 'Featured'}
                                        </Badge>
                                        <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            {formatDateInReadable(featuredBlog.createdAt)}
                                        </span>
                                    </div>

                                    <Link href={`/blogs/${featuredBlog.slug || featuredBlog._id}`}>
                                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white group-hover:text-primary transition-colors leading-tight">
                                            {featuredBlog.title}
                                        </h2>
                                    </Link>

                                    <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg line-clamp-3">
                                        {featuredBlog.excerpt}
                                    </p>

                                    <Link href={`/blogs/${featuredBlog.slug || featuredBlog._id}`}>
                                        <Button size="lg" className="group/btn">
                                            Read Article
                                            <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.section>
                )}

                {/* Blog Grid */}
                <section>
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {search ? 'Search Results' : 'Latest Posts'}
                        </h3>
                    </div>

                    {remainingBlogs.length === 0 && search ? (
                        <div className="text-center py-20">
                            <p className="text-xl text-gray-500">No articles found matching "{search}"</p>
                        </div>
                    ) : (
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {(search ? blogs?.docs : remainingBlogs).map((post: any, index: number) => (
                                <motion.div
                                    key={post._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <BlogCard blog={post} />
                                </motion.div>
                            ))}
                        </div>
                    )}
                </section>
            </main>
        </div>
    )
}