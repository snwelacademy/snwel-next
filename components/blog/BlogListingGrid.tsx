'use client'

// const {
//     blogs,
//     isLoading,
//     search,
//     setSearch,
//     sortField,
//     setSortField,
//     sortOrder,
//     setSortOrder,
//     currentPage,
//     setCurrentPage,
//     itemsPerPage,
//     statusFilter,
//     setStatusFilter,
//   } = useBlogList();
'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Moon, Sun, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useBlogList } from './useBlogList'
import BlogLoading from './BlogPageLoading'
import NoBlogsScreen from './NoBlogs'
import { formatDateInReadable } from '@/lib/utils'
import Link from 'next/link'

export default function BlogPage() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const {
        blogs,
        isLoading,
        search,
        setSearch,
        sortField,
        setSortField,
        sortOrder,
        setSortOrder,
        currentPage,
        setCurrentPage,
        itemsPerPage,
        statusFilter,
        setStatusFilter,
    } = useBlogList();

    const toggleDarkMode = () => setIsDarkMode(!isDarkMode)

    if (isLoading) {
        return <BlogLoading />
    }

    if (!isLoading && blogs?.docs.length === 0) {
        return <NoBlogsScreen />
    }


    return (
        <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
            <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
                {/* <header className="container mx-auto px-4 py-8">
          <nav className="flex justify-between items-center mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold"
            >
              DevBlog
            </motion.h1>
            <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </nav>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Welcome to DevBlog</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">Exploring the cutting edge of web development</p>
          </motion.div>
        </header> */}

                <main className="container mx-auto px-4 pb-16">
                    <section className="mb-16">
                        <h3 className="text-2xl font-semibold mb-8"></h3>
                        <Card className="overflow-hidden">
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.2 }}
                            >
                                <CardContent className="p-0">
                                    <div className="aspect-video relative">
                                        <Image
                                            src={blogs?.docs[0].coverImage || ""}
                                            alt={blogs?.docs[0].title || ""}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{blogs?.docs[0].category?.name || "Uncategorized"} • {formatDateInReadable(blogs?.docs[0].createdAt || "")}</p>
                                        <h4 className="text-2xl font-semibold mb-2">{blogs?.docs[0].title}</h4>
                                        <p className="text-gray-600 dark:text-gray-300 mb-4">Explore the latest features and improvements in Next.js 13, revolutionizing the way we build web applications.</p>
                                        <Link href={`/blogs/${blogs?.docs[0].slug || blogs?.docs[0]._id}`}>
                                            <Button variant="ghost" className="group">
                                                Read More <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                            </Button>
                                        </Link>
                                    </div>
                                </CardContent>
                            </motion.div>
                        </Card>
                    </section>

                    <section>
                        <h3 className="text-2xl font-semibold mb-8">Latest Posts</h3>
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {blogs?.docs.slice(1).map((post, index) => (
                                <motion.div
                                    key={post._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <Card className="overflow-hidden">
                                        <CardContent className="p-0">
                                            <div className="aspect-video relative">
                                                <Image
                                                    src={post.coverImage || ''}
                                                    alt={post.title}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div className="p-6">
                                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{post.category?.name || "Uncategorized"} • {formatDateInReadable(post.createdAt || "")}</p>
                                                <h4 title={post.title} className="text-xl font-semibold mb-2 line-clamp-1">{post.title}</h4>
                                                <Link href={`/blogs/${post.slug || post._id}`}>
                                                    <Button variant="ghost" className="group">
                                                        Read More <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                                    </Button>
                                                </Link>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                </main>
            </div>
        </div>
    )
}