/* eslint-disable @typescript-eslint/no-explicit-any */
import { CourseCategory } from '@/types';
import { DEFAULT_LIST_OPTIONS } from './../../types/ListOptions';
import { protectedApi } from "@/lib/api";
import { ApiResponse, ListResponse } from '@/types/ApiResponses';
import { ListOptions } from "@/types/ListOptions";
import { AxiosResponse } from 'axios';

export async function getAllCourseCategories(options?: ListOptions) {
    try {
        options = {...DEFAULT_LIST_OPTIONS, ...options}
        const res = await protectedApi.get<any, AxiosResponse<ApiResponse<ListResponse<CourseCategory>>>>(`/course-category?page=${options.page}&limit=${options.limit}${options.search ? '&search='+options.search : ''}`);
        const data = res.data.data;
        return data;
    } catch (error) {
        console.log("Error: getAllCourseCategories: ", error);
        throw new Error("Error in fetching course category list. Please try again")
    }
}

export async function createCourseCategory(mutateCategory: any) {
    try {   
        const res = await protectedApi.post<any, AxiosResponse<ApiResponse<CourseCategory>>>('/course-category', mutateCategory);
        const data = res.data.data;
        return data;
    } catch (error) {
        console.log("Error: createCourseCategory: ", error);
        throw new Error("Error in creating course category. Please try again")
    }
}

export async function updateCourseCategory(categoryId: string, mutateCategory: any) {
    try {        
        const res = await protectedApi.put<any, AxiosResponse<ApiResponse<CourseCategory>>>(`/course-category/${categoryId}`, mutateCategory);
        const data = res.data.data;
        return data;
    } catch (error) {
        console.log("Error: updateCourseCategory: ", error);
        throw new Error("Error in updating course category. Please try again")
    }
}

export async function deleteCourseCategory(categoryId: string) {
    try {
        const res = await protectedApi.delete<any, AxiosResponse<ApiResponse<CourseCategory>>>(`/course-category/${categoryId}`);
        const data = res.data.data;
        return data;
    } catch (error) {
        console.log("Error: deleteCourseCategory: ", error);
        throw new Error("Error in deleting course category. Please try again")
    }
}

export async function getCourseCategory(categoryId: string) {
    try {
        const res = await protectedApi.get<any, AxiosResponse<ApiResponse<CourseCategory>>>(`/course-category/byId/${categoryId}`);
        const data = res.data.data;
        return data;
    } catch (error) {
        console.log("Error: getCourseCategory: ", error);
        throw new Error("Error in fetching course category. Please try again")
    }
}
