/**
 * Dashboard Service
 * Handles all dashboard-related API calls
 */

import { ApiResponse } from '@/types/ApiResponses';
import { fetchClient } from '@/lib/fetchClient';

// ============= TYPES =============

export interface DashboardStats {
  revenue: {
    total: number;
    thisMonth: number;
    lastMonth: number;
    change: number;
    trend: 'up' | 'down' | 'stable';
    currency: string;
  };
  courses: {
    total: number;
    published: number;
    drafts: number;
    inactive: number;
  };
  enrollments: {
    total: number;
    thisMonth: number;
    lastMonth: number;
    change: number;
    active: number;
    completed: number;
  };
  enquiries: {
    total: number;
    pending: number;
    resolved: number;
    thisWeek: number;
  };
}

export interface RevenueTrendData {
  month: string;
  revenue: number;
  enrollments: number;
  avgOrderValue: number;
}

export interface RevenueTrend {
  data: RevenueTrendData[];
  summary: {
    totalRevenue: number;
    totalEnrollments: number;
    averageMonthly: number;
    highestMonth: string;
    lowestMonth: string;
  };
}

export interface TopCourse {
  courseId: string;
  title: string;
  thumbnail: string;
  enrollments: number;
  revenue: number;
  trend: 'up' | 'down';
  percentageChange: number;
  rating: number;
  completionRate: number;
}

export interface RecentEnrollment {
  enrollmentId: string;
  user: {
    userId: string;
    name: string;
    email: string;
    avatar?: string;
  };
  course: {
    courseId: string;
    title: string;
    thumbnail: string;
  };
  amount: number;
  currency: string;
  paymentMethod: string;
  timestamp: string;
  status: 'ACTIVE' | 'PENDING' | 'COMPLETED';
}

export interface Activity {
  activityId: string;
  type: 'course' | 'user' | 'revenue' | 'blog' | 'job' | 'enquiry';
  action: 'created' | 'updated' | 'deleted' | 'published';
  actor: {
    userId: string;
    name: string;
    role: string;
  };
  target: {
    id: string;
    type: string;
    title: string;
  };
  metadata?: any;
  timestamp: string;
  icon: string;
  color: string;
}

// ============= API CALLS =============

/**
 * Get dashboard overview statistics
 * @permission ANALYTICS_VIEW
 */
export async function getDashboardStats(): Promise<DashboardStats> {
  try {
    const fallback: DashboardStats = {
      revenue: { total: 0, thisMonth: 0, lastMonth: 0, change: 0, trend: 'stable', currency: 'USD' },
      courses: { total: 0, published: 0, drafts: 0, inactive: 0 },
      enrollments: { total: 0, thisMonth: 0, lastMonth: 0, change: 0, active: 0, completed: 0 },
      enquiries: { total: 0, pending: 0, resolved: 0, thisWeek: 0 }
    }

    const res = await fetchClient('/admin/dashboard/stats', { method: 'GET' })

    if (!res.ok) {
      console.log('getDashboardStats: non-ok response', res.status)
      return fallback
    }

    let data: ApiResponse<DashboardStats> | null = null
    try {
      data = await res.json() as ApiResponse<DashboardStats>
    } catch (e) {
      console.log('getDashboardStats: JSON parse failed', e)
      return fallback
    }

    if (!data?.data) {
      console.log('getDashboardStats: missing data in response')
      return fallback
    }

    return data.data
  } catch (error) {
    console.log('Error: getDashboardStats:', error)
    return {
      revenue: { total: 0, thisMonth: 0, lastMonth: 0, change: 0, trend: 'stable', currency: 'USD' },
      courses: { total: 0, published: 0, drafts: 0, inactive: 0 },
      enrollments: { total: 0, thisMonth: 0, lastMonth: 0, change: 0, active: 0, completed: 0 },
      enquiries: { total: 0, pending: 0, resolved: 0, thisWeek: 0 }
    }
  }
}

/**
 * Get revenue trend data for charts
 * @permission ANALYTICS_VIEW
 */
export async function getRevenueTrend(params?: {
  period?: '6months' | '12months' | 'year';
  startDate?: string;
  endDate?: string;
}): Promise<RevenueTrend> {
  try {
    const queryParams = new URLSearchParams()
    if (params?.period) queryParams.append('period', params.period)
    if (params?.startDate) queryParams.append('startDate', params.startDate)
    if (params?.endDate) queryParams.append('endDate', params.endDate)

    const url = `/admin/dashboard/revenue-trend${queryParams.toString() ? `?${queryParams.toString()}` : ''}`

    const fallback: RevenueTrend = {
      data: [],
      summary: {
        totalRevenue: 0,
        totalEnrollments: 0,
        averageMonthly: 0,
        highestMonth: '',
        lowestMonth: ''
      }
    }

    const res = await fetchClient(url, { method: 'GET' })
    if (!res.ok) {
      console.log('getRevenueTrend: non-ok response', res.status)
      return fallback
    }

    let data: ApiResponse<RevenueTrend> | null = null
    try {
      data = await res.json() as ApiResponse<RevenueTrend>
    } catch (e) {
      console.log('getRevenueTrend: JSON parse failed', e)
      return fallback
    }

    if (!data?.data) {
      console.log('getRevenueTrend: missing data in response')
      return fallback
    }

    return data.data
  } catch (error) {
    console.log('Error: getRevenueTrend:', error)
    return {
      data: [],
      summary: {
        totalRevenue: 0,
        totalEnrollments: 0,
        averageMonthly: 0,
        highestMonth: '',
        lowestMonth: ''
      }
    }
  }
}

/**
 * Get top performing courses
 * @permission ANALYTICS_VIEW
 */
export async function getTopCourses(params?: {
  limit?: number;
  period?: 'week' | 'month' | 'quarter' | 'year';
}): Promise<{ courses: TopCourse[]; period: string }> {
  try {
    const queryParams = new URLSearchParams()
    if (params?.limit) queryParams.append('limit', params.limit.toString())
    if (params?.period) queryParams.append('period', params.period)

    const url = `/admin/dashboard/top-courses${queryParams.toString() ? `?${queryParams.toString()}` : ''}`

    const fallback = { courses: [] as TopCourse[], period: params?.period || 'month' }

    const res = await fetchClient(url, { method: 'GET' })
    if (!res.ok) {
      console.log('getTopCourses: non-ok response', res.status)
      return fallback
    }

    let data: ApiResponse<{ courses: TopCourse[]; period: string }> | null = null
    try {
      data = await res.json() as ApiResponse<{ courses: TopCourse[]; period: string }>
    } catch (e) {
      console.log('getTopCourses: JSON parse failed', e)
      return fallback
    }

    if (!data?.data) {
      console.log('getTopCourses: missing data in response')
      return fallback
    }

    return data.data
  } catch (error) {
    console.log('Error: getTopCourses:', error)
    return { courses: [], period: params?.period || 'month' }
  }
}

/**
 * Get recent enrollments
 * @permission ANALYTICS_VIEW
 */
export async function getRecentEnrollments(params?: {
  limit?: number;
  offset?: number;
}): Promise<{ enrollments: RecentEnrollment[]; total: number; hasMore: boolean }> {
  try {
    const queryParams = new URLSearchParams()
    if (params?.limit) queryParams.append('limit', params.limit.toString())
    if (params?.offset) queryParams.append('offset', params.offset.toString())

    const url = `/admin/dashboard/recent-enrollments${queryParams.toString() ? `?${queryParams.toString()}` : ''}`

    const fallback = { enrollments: [] as RecentEnrollment[], total: 0, hasMore: false }

    const res = await fetchClient(url, { method: 'GET' })
    if (!res.ok) {
      console.log('getRecentEnrollments: non-ok response', res.status)
      return fallback
    }

    let data: ApiResponse<{ enrollments: RecentEnrollment[]; total: number; hasMore: boolean }> | null = null
    try {
      data = await res.json() as ApiResponse<{ enrollments: RecentEnrollment[]; total: number; hasMore: boolean }>
    } catch (e) {
      console.log('getRecentEnrollments: JSON parse failed', e)
      return fallback
    }

    if (!data?.data) {
      console.log('getRecentEnrollments: missing data in response')
      return fallback
    }

    return data.data
  } catch (error) {
    console.log('Error: getRecentEnrollments:', error)
    return { enrollments: [], total: 0, hasMore: false }
  }
}

/**
 * Get activity feed
 * @permission ANALYTICS_VIEW
 */
export async function getActivityFeed(params?: {
  limit?: number;
  types?: string[];
  startDate?: string;
  endDate?: string;
}): Promise<{ activities: Activity[]; total: number }> {
  try {
    const queryParams = new URLSearchParams()
    if (params?.limit) queryParams.append('limit', params.limit.toString())
    if (params?.types && params.types.length > 0) queryParams.append('types', params.types.join(','))
    if (params?.startDate) queryParams.append('startDate', params.startDate)
    if (params?.endDate) queryParams.append('endDate', params.endDate)

    const url = `/admin/dashboard/activity-feed${queryParams.toString() ? `?${queryParams.toString()}` : ''}`

    const fallback = { activities: [] as Activity[], total: 0 }

    const res = await fetchClient(url, { method: 'GET' })
    if (!res.ok) {
      console.log('getActivityFeed: non-ok response', res.status)
      return fallback
    }

    let data: ApiResponse<{ activities: Activity[]; total: number }> | null = null
    try {
      data = await res.json() as ApiResponse<{ activities: Activity[]; total: number }>
    } catch (e) {
      console.log('getActivityFeed: JSON parse failed', e)
      return fallback
    }

    if (!data?.data) {
      console.log('getActivityFeed: missing data in response')
      return fallback
    }

    return data.data
  } catch (error) {
    console.log('Error: getActivityFeed:', error)
    return { activities: [], total: 0 }
  }
}
