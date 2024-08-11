import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { ListOptions } from '@/types/ListOptions';

import {
    getPopularCourses,
    getTotalEnrolledUsers,
    getUpcomingWebinars,
    getCoursesByCategory,
    getTotalRevenue,
    getTopRatedCourses,
    getTotalCourses,
    getTotalUsers,
    getUserEnrollments,
    getImportantEntitiesCount,
    getRecentSales,
    getYearlySalesData
} from '@/services/admin/dashboard';

export const usePopularCourses = (options?: ListOptions) => {
    return useQuery({queryKey: ['popularCourses', options], queryFn: () => getPopularCourses(options)});
};

export const useTotalEnrolledUsers = (options?: ListOptions) => {
    return useQuery({queryKey: ['totalEnrolledUsers'], queryFn: () => getTotalEnrolledUsers(options)});
};

export const useUpcomingWebinars = (options?: ListOptions) => {
    return useQuery({queryKey: ['upcomingWebinars', options], queryFn: () => getUpcomingWebinars(options)});
};

export const useCoursesByCategory = (categoryId: string, options?: ListOptions) => {
    return useQuery({queryKey: ['coursesByCategory', categoryId, options], queryFn: () => getCoursesByCategory(categoryId, options)});
};

export const useTotalRevenue = () => {
    return useQuery({queryKey: ['totalRevenue'], queryFn: getTotalRevenue});
};

export const useTopRatedCourses = (options?: ListOptions)=> {
    return useQuery({queryKey: ['topRatedCourses', options], queryFn: () => getTopRatedCourses(options)});
};

export const useTotalCourses = ()=> {
    return useQuery({queryKey: ['totalCourses'], queryFn: getTotalCourses});
};

export const useTotalUsers = () => {
    return useQuery({queryKey: ['totalUsers'], queryFn: getTotalUsers});
};

export const useUserEnrollments = (userId: string, options?: ListOptions) => {
    return useQuery({queryKey: ['userEnrollments', userId, options], queryFn: () => getUserEnrollments(userId, options)});
};

export const useImportantEntitiesCount = () => {
    return useQuery({queryKey: ['importantEntitiesCount'], queryFn: getImportantEntitiesCount});
};

export const useRecentSales = (options?: ListOptions) => {
    return useQuery({queryKey: ['recentSales', options], queryFn: () => getRecentSales(options)});
};

export const useYearlySalesData = (year?: number): UseQueryResult<{ month: string; totalAmount: number }[], Error> => {
    return useQuery({queryKey: ['yearlySalesData', year], queryFn: () => getYearlySalesData(year)});
};
