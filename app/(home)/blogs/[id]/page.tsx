import SingleBlog from '@/components/blog/SingleBlog'
import { getBlog } from '@/services/blog-service'
import { notFound } from 'next/navigation'

interface Post {
    id: string
    title: string
    content: string
}

async function getPost(id: string) {
    try {
        let post = await getBlog(id);
        if (!post) notFound()
        return post
    } catch (error) {
        console.error("getPost: ", error);
        return notFound()
    }
}

// export async function generateStaticParams() {
//   let posts = await fetch('https://api.vercel.app/blog').then((res) =>
//     res.json()
//   )

//   return posts.map((post: Post) => ({
//     id: post.id,
//   }))
// }

export async function generateMetadata({ params }: { params: { id: string } }) {
    let post = await getPost(params.id)

    return {
        title: post.title,
    }
}

export default async function Page({ params }: { params: { id: string } }) {
    let post = await getPost(params.id)
    return (
        <div className='container max-w-7xl mx-auto px-4'>
            <SingleBlog blog={post} />
        </div>
    ) 
}