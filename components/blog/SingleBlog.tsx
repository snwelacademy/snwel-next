/* eslint-disable @next/next/no-img-element */
import { Blog } from '@/types/Blog'
import Typography from '../typography'

const SingleBlog = ({
    blog
}: {
    blog: Blog
}) => {
  return (
    <>
        <div className='aspect-video'>
            <img className='w-full rounded-2xl overflow-hidden shadow-2xl' src={blog.thumbnail} alt={blog.slug} />
        </div>

        <div className='my-5 rounded-2xl bg-primary/5 p-3'>
            <Typography as="h1">{blog.title}</Typography>
        </div>

        <article className=''>
            {blog.description}
        </article>

    </>
  )
}

export default SingleBlog