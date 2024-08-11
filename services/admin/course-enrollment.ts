/* eslint-disable @typescript-eslint/no-explicit-any */
import { DEFAULT_LIST_OPTIONS } from './../../types/ListOptions';
import { protectedApi } from "@/lib/api";
import { ApiResponse, ListResponse } from '@/types/ApiResponses';
import { ListOptions } from "@/types/ListOptions";
import { AxiosResponse } from 'axios';
import { CourseEnrollment, CreateCourseQuery } from '@/types/CourseEnrollment';

export async function getAllEnrollments (options?: ListOptions) {
    try {
        options = {...DEFAULT_LIST_OPTIONS, ...options}
        const res = await protectedApi.get<any, AxiosResponse<ApiResponse<ListResponse<CourseEnrollment>>>>(`/course-enroll?page=${options.page}&limit=${options.limit}${options.search ? '&search='+options.search : ''}`);
        const data = res.data.data;
        return data;
    } catch (error) {
        console.log("Error: getAllEnrollments: ", error);
        throw new Error("Error in fetching enrollments list. Please try again")
    }
}
export async function createEnrollment (data: CreateCourseQuery) {
    try {
        
        const res = await protectedApi.post<any, AxiosResponse<ApiResponse<CourseEnrollment>>>('/course-enroll', data);
        return res.data.data;
    } catch (error) {
        console.log("Error: createCourse: ", error);
        throw new Error("Error in creating Enrollment list. Please try again")
    }
}
export async function updateEnrollment (id: string, data: any) {
    try {
        
        const res = await protectedApi.put<any, AxiosResponse<ApiResponse<CourseEnrollment>>>(`/course-enroll/${id}`, data);
        return res.data.data;
    } catch (error) {
        console.log("Error: updateCourse: ", error);
        throw new Error("Error in updating Enrollment. Please try again")
    }
}
export async function deleteEnrollment (id: string) {
    try {
        const res = await protectedApi.delete<any, AxiosResponse<ApiResponse<CourseEnrollment>>>(`/course-enroll/${id}`);
        return res.data.data;
    } catch (error) {
        console.log("Error: deleteCourse: ", error);
        throw new Error("Error in deleting Enrollment. Please try again")
    }
}
export async function getEnrollment (id: string) {
    try {
        const res = await protectedApi.get<any, AxiosResponse<ApiResponse<CourseEnrollment>>>(`/course-enroll/byId/${id}`);
        const data = res.data.data;
        return data;
    } catch (error) {
        console.log("Error: deleteCourse: ", error);
        throw new Error("Error in deleting Enrollment. Please try again")
    }
}

