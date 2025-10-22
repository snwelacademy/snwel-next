/**
 * Statistics Service
 * Handles all statistics-related API calls for various modules
 */

import { ApiResponse } from '@/types/ApiResponses';
import { fetchClient } from '@/lib/fetchClient';

// ============= TYPES =============

export interface CourseStatistics {
  totalCourses: number;
  publishedCourses: number;
  draftCourses: number;
  totalEnrollments: number;
  averageRating: number;
  completionRate: number;
}

export interface UserStatistics {
  totalUsers: number;
  activeUsers: number;
  newThisMonth: number;
  byRole: {
    [roleName: string]: number;
  };
}

export interface JobStatistics {
  activeJobs: number;
  totalApplications: number;
  pendingReview: number;
  avgApplicationsPerJob: number;
}

export interface BlogStatistics {
  totalBlogs: number;
  published: number;
  drafts: number;
  totalViews: number;
  avgViewsPerPost: number;
}

// ============= API CALLS =============

/**
 * Get course statistics
 * @permission COURSE_VIEW
 */
export async function getCourseStatistics(): Promise<CourseStatistics> {
  try {
    const fallback: CourseStatistics = {
      totalCourses: 0,
      publishedCourses: 0,
      draftCourses: 0,
      totalEnrollments: 0,
      averageRating: 0,
      completionRate: 0,
    }

    const res = await fetchClient('/admin/course/statistics', { method: 'GET' })

    if (!res.ok) {
      console.log('getCourseStatistics: non-ok response', res.status)
      return fallback
    }

    let data: ApiResponse<CourseStatistics> | null = null
    try {
      data = await res.json() as ApiResponse<CourseStatistics>
    } catch (e) {
      console.log('getCourseStatistics: JSON parse failed', e)
      return fallback
    }

    if (!data?.data) {
      console.log('getCourseStatistics: missing data in response')
      return fallback
    }

    return data.data
  } catch (error) {
    console.log('Error: getCourseStatistics:', error)
    return {
      totalCourses: 0,
      publishedCourses: 0,
      draftCourses: 0,
      totalEnrollments: 0,
      averageRating: 0,
      completionRate: 0,
    }
  }
}

/**
 * Get user statistics
 * @permission USER_VIEW
 */
export async function getUserStatistics(): Promise<UserStatistics> {
  try {
    const fallback: UserStatistics = {
      totalUsers: 0,
      activeUsers: 0,
      newThisMonth: 0,
      byRole: {}
    }

    const res = await fetchClient('/admin/users/statistics', { method: 'GET' })

    if (!res.ok) {
      console.log('getUserStatistics: non-ok response', res.status)
      return fallback
    }

    let data: ApiResponse<UserStatistics> | null = null
    try {
      data = await res.json() as ApiResponse<UserStatistics>
    } catch (e) {
      console.log('getUserStatistics: JSON parse failed', e)
      return fallback
    }

    if (!data?.data) {
      console.log('getUserStatistics: missing data in response')
      return fallback
    }

    return data.data
  } catch (error) {
    console.log('Error: getUserStatistics:', error)
    return { totalUsers: 0, activeUsers: 0, newThisMonth: 0, byRole: {} }
  }
}

/**
 * Get job statistics
 * @permission JOB_VIEW
 */
export async function getJobStatistics(): Promise<JobStatistics> {
  try {
    const fallback: JobStatistics = {
      activeJobs: 0,
      totalApplications: 0,
      pendingReview: 0,
      avgApplicationsPerJob: 0,
    }

    const res = await fetchClient('/jobvacancies/statistics', { method: 'GET' })

    if (!res.ok) {
      console.log('getJobStatistics: non-ok response', res.status)
      return fallback
    }

    let data: ApiResponse<JobStatistics> | null = null
    try {
      data = await res.json() as ApiResponse<JobStatistics>
    } catch (e) {
      console.log('getJobStatistics: JSON parse failed', e)
      return fallback
    }

    if (!data?.data) {
      console.log('getJobStatistics: missing data in response')
      return fallback
    }

    return data.data
  } catch (error) {
    console.log('Error: getJobStatistics:', error)
    return { activeJobs: 0, totalApplications: 0, pendingReview: 0, avgApplicationsPerJob: 0 }
  }
}

/**
 * Get blog statistics
 * @permission BLOG_VIEW
 */
export async function getBlogStatistics(): Promise<BlogStatistics> {
  try {
    const fallback: BlogStatistics = {
      totalBlogs: 0,
      published: 0,
      drafts: 0,
      totalViews: 0,
      avgViewsPerPost: 0,
    }

    const res = await fetchClient('/blogs/statistics', { method: 'GET' })

    if (!res.ok) {
      console.log('getBlogStatistics: non-ok response', res.status)
      return fallback
    }

    let data: ApiResponse<BlogStatistics> | null = null
    try {
      data = await res.json() as ApiResponse<BlogStatistics>
    } catch (e) {
      console.log('getBlogStatistics: JSON parse failed', e)
      return fallback
    }

    if (!data?.data) {
      console.log('getBlogStatistics: missing data in response')
      return fallback
    }

    return data.data
  } catch (error) {
    console.log('Error: getBlogStatistics:', error)
    return { totalBlogs: 0, published: 0, drafts: 0, totalViews: 0, avgViewsPerPost: 0 }
  }
}
