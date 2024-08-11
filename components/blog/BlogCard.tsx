/* eslint-disable @next/next/no-img-element */
import { Blog } from '@/types/Blog'
import Typography from '../typography'
import { Button } from '../ui/button'
import { Folder } from 'lucide-react'
import Link from 'next/link'

const BlogCard = ({
    blog
}: {
    blog: Blog
}) => {
    return (
        <div className='rounded-xl'>
            <div className='aspect-video rounded-2xl overflow-hidden'>
                <img className='w-full' src={blog.thumbnail} alt={blog.slug} />
            </div>

            <div className='p-3 space-y-3'>
                <div className='flex gap-2 items-center'>
                    <span><Folder className='w-4 h-4 text-primary fill-primary' /></span>
                    <span><Typography as="lable" className='text-primary'>{blog.category}</Typography></span>
                </div>
                <Typography as="h3" className='line-clamp-2'>{blog.title}</Typography>
                <Typography as="p" className='line-clamp-2' >{blog.shortDescription}</Typography>
                <div className=''>
                    <Link href={`/blogs/${blog.slug}`} ><Button>Read More</Button></Link>
                </div>
            </div>
        </div>
    )
}

export default BlogCard