import { blogData } from "@/data/blogs"

export const getAllBlogs = () => {
    return blogData;
}

export const getBlogBySlug = (slug: string) => {
    return blogData.find(bl => bl.slug === slug)
}