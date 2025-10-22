'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  TrendingUp, 
  TrendingDown,
  Users, 
  DollarSign,
  Activity,
  Calendar
} from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { getActivityFeed, getRecentEnrollments, getRevenueTrend, getTopCourses } from '@/services/admin/dashboard-service'
import { CardLoader } from '@/components/ModernLoader'
import { getCurrencySymbol, formatDateInReadable } from '@/lib/utils'

export function RevenueChart() {
  const { data, isLoading } = useQuery({
    queryKey: ['revenue-trend', '6months'],
    queryFn: () => getRevenueTrend({ period: '6months' })
  })

  const rows = data?.data || []
  const maxRevenue = rows.length ? Math.max(...rows.map(d => d.revenue)) : 0
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue Trend</CardTitle>
        <CardDescription>Monthly revenue over the last 6 months</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <CardLoader />
        ) : (
          <div className="space-y-4">
            {rows.map((item) => {
              const widthPct = maxRevenue ? (item.revenue / maxRevenue) * 100 : 0
              return (
                <div key={item.month} className="flex items-center gap-4">
                  <span className="text-sm font-medium w-12">{item.month}</span>
                  <div className="flex-1 bg-muted rounded-full h-8 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-primary to-primary/70 h-full flex items-center justify-end pr-2 transition-all duration-500"
                      style={{ width: `${widthPct}%` }}
                    >
                      <span className="text-xs text-primary-foreground font-medium">
                        {item.revenue.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export function TopCourses() {
  const { data, isLoading } = useQuery({
    queryKey: ['top-courses', 'month', 5],
    queryFn: () => getTopCourses({ period: 'month', limit: 5 })
  })

  const courses = data?.courses || []

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Performing Courses</CardTitle>
        <CardDescription>Best selling courses this month</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <CardLoader />
        ) : (
          <div className="space-y-4">
            {courses.map((course, idx) => (
              <div key={course.courseId} className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
                    #{idx + 1}
                  </div>
                  <div>
                    <p className="font-medium">{course.title}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-2">
                      <Users className="h-3 w-3" />
                      {course.enrollments} enrollments
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <p className="font-semibold">{course.revenue.toLocaleString()}</p>
                    <div className="flex items-center gap-1 text-xs">
                      {course.trend === 'up' ? (
                        <>
                          <TrendingUp className="h-3 w-3 text-green-500" />
                          <span className="text-green-500">+{course.percentageChange?.toFixed?.(1) ?? 0}%</span>
                        </>
                      ) : (
                        <>
                          <TrendingDown className="h-3 w-3 text-red-500" />
                          <span className="text-red-500">{course.percentageChange ? `-${course.percentageChange.toFixed(1)}%` : '-0%'}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export function RecentEnrollments() {
  const { data, isLoading } = useQuery({
    queryKey: ['recent-enrollments', 10],
    queryFn: () => getRecentEnrollments({ limit: 10 })
  })

  const enrollments = data?.enrollments || []

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Enrollments</CardTitle>
        <CardDescription>Latest course purchases</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <CardLoader />
        ) : (
          <div className="space-y-3">
            {enrollments.map((enr) => (
              <div key={enr.enrollmentId} className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/50 transition-colors">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center text-primary font-semibold">
                  {enr.user?.name?.charAt(0) || '?'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{enr.user?.name}</p>
                  <p className="text-sm text-muted-foreground truncate">{enr.course?.title}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-sm">{getCurrencySymbol(enr.currency)} {enr.amount}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {formatDateInReadable(enr.timestamp)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export function ActivityFeed() {
  const { data, isLoading } = useQuery({
    queryKey: ['activity-feed', 10],
    queryFn: () => getActivityFeed({ limit: 10 })
  })

  const activities = data?.activities || []

  const iconColors = {
    course: 'text-blue-500 bg-blue-100 dark:bg-blue-900/20',
    user: 'text-green-500 bg-green-100 dark:bg-green-900/20',
    revenue: 'text-purple-500 bg-purple-100 dark:bg-purple-900/20',
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity Feed</CardTitle>
        <CardDescription>Recent platform activities</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <CardLoader />
        ) : (
          <div className="space-y-4">
            {activities.map((activity, idx) => {
              const Icon = activity.type === 'user' ? Users : activity.type === 'revenue' ? DollarSign : Activity
              return (
                <div key={activity.activityId || idx} className="flex items-start gap-3">
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${iconColors[activity.type as keyof typeof iconColors]}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground truncate">{activity.target?.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{formatDateInReadable(activity.timestamp)}</p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
