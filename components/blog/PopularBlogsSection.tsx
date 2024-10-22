'use client'

import { getAllBlogs } from "@/services/blog-service"
import Typography from "../typography";
import HeadingSubtitle from "../shared/SectionLable";
import BlogCard from "./BlogCard";
import { nanoid } from "nanoid";
import { useBlogList } from "./useBlogList";
import PopularBlogsSkeleton from "./PopularBlogSkeleton";


const PopularBlogsSection = () => {
    const {blogs, isLoading} = useBlogList();

    if(isLoading) return <PopularBlogsSkeleton/>
  return (
    <div>
        <HeadingSubtitle title="Blogs" className="mb-3" />
        <Typography as="title">Popular Blogs up</Typography>

        <div className="py-10 grid grid-cols-1 items-center justify-items-center md:grid-cols-2 lg:grid-cols-3 gap-5">
            {
                blogs?.docs.map(blog => {
                    return <BlogCard key={nanoid()} blog={blog} />
                })
            }
        </div>
    </div>
  )
}

export default PopularBlogsSection