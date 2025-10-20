import { BlogCategory } from '@/types/BlogCategory';
import { DEFAULT_LIST_OPTIONS } from '@/types/ListOptions';
import { api, protectedApi } from '@/lib/api';
import { ApiResponse, ListResponse } from '@/types/ApiResponses';
import { ListOptions } from '@/types/ListOptions';
import { AxiosResponse } from 'axios';
import { objectToQueryString } from '@/lib/utils';

// Function to get all blog categories with optional filters
export async function getAllBlogCategories(options?: ListOptions) {
    try {
        options = { ...DEFAULT_LIST_OPTIONS, ...options };
        const res = await api.get<any, AxiosResponse<ApiResponse<ListResponse<BlogCategory>>>>(`/categories?${objectToQueryString(options)}`);
        const data = res.data.data;
        return data;
    } catch (error) {
        console.error("Error: getAllBlogCategories: ", error);
        throw new Error("Error fetching blog categories. Please try again.");
    }
}

// Function to create a new blog category
export async function createBlogCategory(mutateBlogCategory: BlogCategory) {
    try {
        const res = await protectedApi.post<any, AxiosResponse<ApiResponse<BlogCategory>>>('/categories', mutateBlogCategory);
        const data = res.data.data;
        return data;
    } catch (error) {
        console.error("Error: createBlogCategory: ", error);
        throw new Error("Error creating blog category. Please try again.");
    }
}

// Function to update a blog category by ID
export async function updateBlogCategory(categoryId: string, mutateBlogCategory: Partial<BlogCategory>) {
    try {
        const res = await protectedApi.put<any, AxiosResponse<ApiResponse<BlogCategory>>>(`/categories/${categoryId}`, mutateBlogCategory);
        const data = res.data.data;
        return data;
    } catch (error) {
        console.error("Error: updateBlogCategory: ", error);
        throw new Error("Error updating blog category. Please try again.");
    }
}

// Function to delete a blog category by ID
export async function deleteBlogCategory(categoryId: string) {
    try {
        const res = await protectedApi.delete<any, AxiosResponse<ApiResponse<BlogCategory>>>(`/categories/${categoryId}`);
        const data = res.data.data;
        return data;
    } catch (error) {
        console.error("Error: deleteBlogCategory: ", error);
        throw new Error("Error deleting blog category. Please try again.");
    }
}

// Function to get a single blog category by ID
export async function getBlogCategory(categoryId: string) {
    try {
        const res = await api.get<any, AxiosResponse<ApiResponse<BlogCategory>>>(`/categories/${categoryId}`);
        const data = res.data.data;
        return data;
    } catch (error) {
        console.error("Error: getBlogCategory: ", error);
        throw new Error("Error fetching blog category. Please try again.");
    }
}

// Function to hard delete all soft-deleted blog categories
export async function hardDeleteAllSoftDeletedBlogCategories() {
    try {
        const res = await protectedApi.delete<any, AxiosResponse<ApiResponse<{ message: string }>>>('/categories/hard-delete');
        const data = res.data.data;
        return data;
    } catch (error) {
        console.error("Error: hardDeleteAllSoftDeletedBlogCategories: ", error);
        throw new Error("Error in hard deleting all soft-deleted blog categories. Please try again.");
    }
}
