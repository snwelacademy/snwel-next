/* eslint-disable @typescript-eslint/no-explicit-any */
import { protectedApi } from "@/lib/api";
import { CourseByCategory, ImportantEntitiesCount, PopularCourse, RecentSale, TopRatedCourse, TotalCourses, TotalRevenue, TotalUsers, UpcomingWebinar, UserEnrollment } from "@/types/AnalyticsTypes";
import { ApiResponse, ListResponse } from '@/types/ApiResponses';
import { CourseEnrollment } from "@/types/CourseEnrollment";
import { ListOptions } from "@/types/ListOptions";
import { AxiosResponse } from 'axios';


export async function getPopularCourses(options?: ListOptions) {
    try {
        const res = await protectedApi.get<any, AxiosResponse<ApiResponse<ListResponse<PopularCourse>>>>(`/analytics/popular-courses`, {
            params: options
        });
        return res.data.data;
    } catch (error) {
        console.log("Error: getPopularCourses: ", error);
        throw new Error("Error in fetching popular courses. Please try again");
    }
}

export async function getTotalEnrolledUsers(options?: ListOptions) {
    try {
        const res = await protectedApi.get<any, AxiosResponse<ApiResponse<ListResponse<CourseEnrollment>>>>(`/analytics/total-enrolled-users`,{
            params: options
        });
        return res.data.data;
    } catch (error) {
        console.log("Error: getTotalEnrolledUsers: ", error);
        throw new Error("Error in fetching total enrolled users. Please try again");
    }
}

export async function getUpcomingWebinars(options?: ListOptions) {
    try {
        const res = await protectedApi.get<any, AxiosResponse<ApiResponse<ListResponse<UpcomingWebinar>>>>(`/analytics/upcoming-webinars`, {
            params: options
        });
        return res.data.data;
    } catch (error) {
        console.log("Error: getUpcomingWebinars: ", error);
        throw new Error("Error in fetching upcoming webinars. Please try again");
    }
}

export async function getCoursesByCategory(categoryId: string, options?: ListOptions) {
    try {
        const res = await protectedApi.get<any, AxiosResponse<ApiResponse<ListResponse<CourseByCategory>>>>(`/analytics/courses-by-category/${categoryId}`, {
            params: options
        });
        return res.data.data;
    } catch (error) {
        console.log("Error: getCoursesByCategory: ", error);
        throw new Error("Error in fetching courses by category. Please try again");
    }
}

export async function getTotalRevenue() {
    try {
        const res = await protectedApi.get<any, AxiosResponse<ApiResponse<TotalRevenue>>>(`/analytics/total-revenue`);
        return res.data.data;
    } catch (error) {
        console.log("Error: getTotalRevenue: ", error);
        throw new Error("Error in fetching total revenue. Please try again");
    }
}

export async function getTopRatedCourses(options?: ListOptions) {
    try {
        const res = await protectedApi.get<any, AxiosResponse<ApiResponse<ListResponse<TopRatedCourse>>>>(`/analytics/top-rated-courses`, {
            params: options
        });
        return res.data.data;
    } catch (error) {
        console.log("Error: getTopRatedCourses: ", error);
        throw new Error("Error in fetching top-rated courses. Please try again");
    }
}

export async function getTotalCourses() {
    try {
        const res = await protectedApi.get<any, AxiosResponse<ApiResponse<TotalCourses>>>(`/analytics/total-courses`);
        return res.data.data;
    } catch (error) {
        console.log("Error: getTotalCourses: ", error);
        throw new Error("Error in fetching total courses. Please try again");
    }
}

export async function getTotalUsers() {
    try {
        const res = await protectedApi.get<any, AxiosResponse<ApiResponse<TotalUsers>>>(`/analytics/total-users`);
        return res.data.data;
    } catch (error) {
        console.log("Error: getTotalUsers: ", error);
        throw new Error("Error in fetching total users. Please try again");
    }
}

export async function getUserEnrollments(userId: string, options?: ListOptions) {
    try {
        const res = await protectedApi.get<any, AxiosResponse<ApiResponse<ListResponse<UserEnrollment>>>>(`/analytics/user-enrollments/${userId}`, {
            params: options
        });
        return res.data.data;
    } catch (error) {
        console.log("Error: getUserEnrollments: ", error);
        throw new Error("Error in fetching user enrollments. Please try again");
    }
}

export async function getImportantEntitiesCount() {
    try {
        const res = await protectedApi.get<any, AxiosResponse<ApiResponse<ImportantEntitiesCount>>>(`/analytics/count`);
        return res.data.data;
    } catch (error) {
        console.log("Error: getImportantEntitiesCount: ", error);
        throw new Error("Error in fetching important entities count. Please try again");
    }
}

export async function getRecentSales(options?: ListOptions) {
    try {
        const res = await protectedApi.get<any, AxiosResponse<ApiResponse<ListResponse<RecentSale>>>>(`/analytics/recent-sales`, {
            params: options
        });
        return res.data.data;
    } catch (error) {
        console.log("Error: getRecentSales: ", error);
        throw new Error("Error in fetching recent sales. Please try again");
    }
}

export async function getYearlySalesData(year?: number): Promise<{ month: string; totalAmount: number }[]> {
    try {
        const res = await protectedApi.get<any, AxiosResponse<ApiResponse<{ month: string; totalAmount: number }[]>>>(`/analytics/yearly-sales?year=${year || new Date().getFullYear()}`);
        return res.data.data;
    } catch (error) {
        console.error('Error: getYearlySalesData: ', error);
        throw new Error('Error: 500: Error in fetching yearly sales data. Please try again.');
    }
}
