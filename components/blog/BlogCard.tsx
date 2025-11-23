import { Blog } from '@/types/Blog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { formatDateInReadable } from '@/lib/utils'
import { Calendar, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

const BlogCard = ({
    blog
}: {
    blog: Blog
}) => {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="h-full w-full"
        >
            <Card className="h-full flex flex-col overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-800">
                <div className="relative aspect-video overflow-hidden">
                    <Image
                        src={blog.coverImage || '/placeholder-blog.jpg'}
                        alt={blog.title}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute top-4 left-4">
                        <Badge variant="secondary" className="bg-white/90 text-primary hover:bg-white dark:bg-gray-900/90 dark:text-primary-foreground backdrop-blur-sm">
                            {blog.category?.name || 'General'}
                        </Badge>
                    </div>
                </div>

                <CardContent className="flex-1 p-6">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDateInReadable(blog.createdAt)}</span>
                        </div>
                    </div>

                    <Link href={`/blogs/${blog.slug || blog._id}`} className="group">
                        <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                            {blog.title}
                        </h3>
                    </Link>

                    <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">
                        {blog.excerpt}
                    </p>
                </CardContent>

                <CardFooter className="p-6 pt-0 mt-auto">
                    <Link href={`/blogs/${blog.slug || blog._id}`} className="w-full">
                        <Button variant="ghost" className="w-full justify-between group hover:bg-primary/5 hover:text-primary">
                            Read Article
                            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
        </motion.div>
    )
}

export default BlogCard