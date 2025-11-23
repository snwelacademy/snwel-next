import { Blog } from '@/types/Blog';
import { DEFAULT_LIST_OPTIONS } from './../../types/ListOptions';
import { api, protectedApi } from "@/lib/api";
import { ApiResponse, ListResponse } from '@/types/ApiResponses';
import { ListOptions } from "@/types/ListOptions";
import { AxiosResponse } from 'axios';
import { objectToQueryString } from '@/lib/utils';

export async function getAllBlogs(options?: ListOptions) {
    try {
        options = { ...DEFAULT_LIST_OPTIONS, ...options };
        const res = await api.get<any, AxiosResponse<ApiResponse<ListResponse<Blog>>>>(`/blogs?${objectToQueryString(options)}`);
        const data = res.data.data;
        return data;
    } catch (error) {
        console.log("Error: getAllBlogs: ", error);
        throw new Error("Error in fetching blog list. Please try again");
    }
}

export async function createBlog(mutateBlog: any) {
    try {
        const res = await protectedApi.post<any, AxiosResponse<ApiResponse<Blog>>>(`/blogs`, mutateBlog);
        const data = res.data.data;
        return data;
    } catch (error) {
        console.log("Error: createBlog: ", error);
        throw new Error("Error in creating blog. Please try again");
    }
}

export async function updateBlog(blogId: string, mutateBlog: any) {
    try {
        const res = await protectedApi.put<any, AxiosResponse<ApiResponse<Blog>>>(`/blogs/${blogId}`, mutateBlog);
        const data = res.data.data;
        return data;
    } catch (error) {
        console.log("Error: updateBlog: ", error);
        throw new Error("Error in updating blog. Please try again");
    }
}

export async function deleteBlog(blogId: string) {
    try {
        const res = await protectedApi.delete<any, AxiosResponse<ApiResponse<Blog>>>(`/blogs/${blogId}`);
        const data = res.data.data;
        return data;
    } catch (error) {
        console.log("Error: deleteBlog: ", error);
        throw new Error("Error in deleting blog. Please try again");
    }
}

export async function getBlog(blogId: string) {
    try {
        const res = await api.get<any, AxiosResponse<ApiResponse<Blog>>>(`/blogs/${blogId}`);
        const data = res.data.data;
        return data;
    } catch (error) {
        console.log("Error: getBlog: ", error);
        throw new Error("Error in getting blog. Please try again");
    }
}

export async function getBlogBySlug(slug: string) {
    try {
        const res = await api.get<any, AxiosResponse<ApiResponse<Blog>>>(`/blogs/slug/${slug}`);
        const data = res.data.data;
        return data;
    } catch (error) {
        console.log("Error: getBlogBySlug: ", error);
        throw new Error("Error in getting blog by slug. Please try again");
    }
}

export async function hardDeleteAllSoftDeletedBlogs() {
    try {
        const res = await protectedApi.delete<any, AxiosResponse<ApiResponse<{ message: string }>>>(`/blogs/hard-delete`);
        const data = res.data.data;
        return data;
    } catch (error) {
        console.log("Error: hardDeleteAllSoftDeletedBlogs: ", error);
        throw new Error("Error in hard deleting all soft-deleted blogs. Please try again");
    }
}
