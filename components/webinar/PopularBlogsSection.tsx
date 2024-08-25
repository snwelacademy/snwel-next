import { getAllBlogs } from "@/services/blog-service"
import Typography from "../typography";
import HeadingSubtitle from "../shared/SectionLable";
import BlogCard from "../blog/BlogCard";
import { nanoid } from "nanoid";


const PopularBlogsSection = () => {
    const blogs = getAllBlogs().slice(0, 3);
  return (
    <div>
        <HeadingSubtitle title="Blogs" className="mb-3" />
        <Typography as="title">Popular Blogs</Typography>

        <div className="py-10 grid grid-cols-1 items-center justify-items-center md:grid-cols-2 lg:grid-cols-3 gap-5">
            {
                blogs.map(blog => {
                    return <BlogCard key={nanoid()} blog={blog} />
                })
            }
        </div>
    </div>
  )
}

export default PopularBlogsSection