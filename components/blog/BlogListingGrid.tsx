import { Blog } from '@/types/Blog'
import { nanoid } from 'nanoid'
import BlogCard from './BlogCard'

const BlogListingGrid = ({
    blogList
}: {
    blogList: Blog[]
}) => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-items-center gap-5'>
            {
                blogList.map(bl => {
                    return <div className='w-full' key={nanoid()}><BlogCard blog={bl} /></div>
                })
            }
        </div>
    )
}

export default BlogListingGrid