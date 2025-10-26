'use client'

/* eslint-disable react-hooks/rules-of-hooks */
import ModernLoader, { CardLoader } from '@/components/ModernLoader';
import { Overview } from '@/components/overview';
import { RecentSales } from '@/components/recent-sales';
import { RevenueChart, TopCourses, RecentEnrollments, ActivityFeed } from './dashboard/DashboardCharts';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useImportantEntitiesCount, useTotalRevenue } from '@/hooks/useAnalytics';
import { getCurrencySymbol } from '@/lib/utils';
import { 
  TrendingUp, 
  GraduationCap, 
  ShoppingCart, 
  MessageSquare,
  Plus,
  FileText,
  Users,
  Briefcase,
  ArrowUpRight,
  Activity,
  TrendingDown
} from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { getDashboardStats } from '@/services/admin/dashboard-service';
import { usePermission } from '@/hooks/usePermissions';
import { ANALYTICS_PERMISSIONS, COURSE_PERMISSIONS, BLOG_PERMISSIONS, USER_PERMISSIONS, JOB_PERMISSIONS } from '@/constants/permissions';
import { InlinePermissionGuard } from '@/components/guards/PermissionGuard';

export default function page() {
  const { data: totalRevenue, isLoading: revenueLoading } = useTotalRevenue();
  const { data: count, isLoading: countLoading } = useImportantEntitiesCount();
  const { user } = useAuth();

  // Fetch dashboard stats from new API
  const { data: dashboardStats, isLoading: statsLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: getDashboardStats,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    refetchInterval: 5 * 60 * 1000, // Auto-refresh every 5 minutes
  });

  const quickActions = [
    { label: 'New Course', href: '/admin/courses/new', icon: GraduationCap, permission: COURSE_PERMISSIONS.COURSE_CREATE },
    { label: 'New Blog', href: '/admin/blogs/new', icon: FileText, permission: BLOG_PERMISSIONS.BLOG_CREATE },
    { label: 'New User', href: '/admin/users?action=new', icon: Users, permission: USER_PERMISSIONS.USER_CREATE },
    { label: 'New Job', href: '/admin/job-vacancies/new', icon: Briefcase, permission: JOB_PERMISSIONS.JOB_CREATE },
  ];

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-6 p-4 pt-6 md:p-8">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Welcome back, {user?.name || 'Admin'} 👋
            </h1>
            <p className="text-muted-foreground mt-1">
              Here's what's happening with your platform today.
            </p>
          </div>
          {/* <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin/analytics">
                <Activity className="h-4 w-4 mr-2" />
                View Analytics
              </Link>
            </Button>
          </div> */}
        </div>
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
            <CardDescription>Common tasks to get you started</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {quickActions.map((action) => (
                <InlinePermissionGuard key={action.href} permission={action.permission}>
                  <Button
                    variant="outline"
                    className="h-auto flex-col gap-2 p-4 hover:bg-primary/5 hover:border-primary"
                    asChild
                  >
                    <Link href={action.href}>
                      <action.icon className="h-5 w-5 text-primary" />
                      <span className="text-sm font-medium">{action.label}</span>
                    </Link>
                  </Button>
                </InlinePermissionGuard>
              ))}
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            {statsLoading ? (
              <CardLoader />
            ) : dashboardStats ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {/* Revenue Card */}
                <Card className="hover:shadow-md transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Revenue
                    </CardTitle>
                    <div className={`p-2 rounded-lg ${dashboardStats.revenue.trend === 'up' ? 'bg-green-100 dark:bg-green-900/20' : dashboardStats.revenue.trend === 'down' ? 'bg-red-100 dark:bg-red-900/20' : 'bg-gray-100 dark:bg-gray-900/20'}`}>
                      {dashboardStats.revenue.trend === 'up' ? (
                        <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
                      ) : dashboardStats.revenue.trend === 'down' ? (
                        <TrendingDown className="h-4 w-4 text-red-600 dark:text-red-400" />
                      ) : (
                        <TrendingUp className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {getCurrencySymbol(dashboardStats.revenue.currency)} {dashboardStats.revenue.total.toLocaleString()}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                      {dashboardStats.revenue.trend === 'up' && (
                        <ArrowUpRight className="h-3 w-3 text-green-500" />
                      )}
                      <span className={dashboardStats.revenue.trend === 'up' ? 'text-green-600' : dashboardStats.revenue.trend === 'down' ? 'text-red-600' : ''}>
                        {dashboardStats.revenue.change > 0 ? '+' : ''}{dashboardStats.revenue.change.toFixed(1)}%
                      </span>
                      {' '}from last month
                    </p>
                  </CardContent>
                </Card>

                {/* Courses Card */}
                <Card className="hover:shadow-md transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Courses
                    </CardTitle>
                    <div className="p-2 bg-blue-100 rounded-lg dark:bg-blue-900/20">
                      <GraduationCap className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{dashboardStats.courses.total}</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {dashboardStats.courses.published} published, {dashboardStats.courses.drafts} drafts
                    </p>
                  </CardContent>
                </Card>

                {/* Enrollments Card */}
                <Card className="hover:shadow-md transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Enrollments</CardTitle>
                    <div className="p-2 bg-purple-100 rounded-lg dark:bg-purple-900/20">
                      <ShoppingCart className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{dashboardStats.enrollments.total.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      <span className={dashboardStats.enrollments.change > 0 ? 'text-green-600' : 'text-red-600'}>
                        {dashboardStats.enrollments.change > 0 ? '+' : ''}{dashboardStats.enrollments.change.toFixed(1)}%
                      </span>
                      {' '}from last month ({dashboardStats.enrollments.thisMonth} new)
                    </p>
                  </CardContent>
                </Card>

                {/* Enquiries Card */}
                <Card className="hover:shadow-md transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Enquiries
                    </CardTitle>
                    <div className="p-2 bg-orange-100 rounded-lg dark:bg-orange-900/20">
                      <MessageSquare className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{dashboardStats.enquiries.total}</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {dashboardStats.enquiries.pending} pending, {dashboardStats.enquiries.thisWeek} this week
                    </p>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {/* Fallback to old data if new API fails */}
                <Card className="hover:shadow-md transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Revenue
                    </CardTitle>
                    <div className="p-2 bg-green-100 rounded-lg dark:bg-green-900/20">
                      <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {`${getCurrencySymbol(totalRevenue?.currency || '')} ${totalRevenue?.amount?.toLocaleString() || 0}`}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                      <ArrowUpRight className="h-3 w-3 text-green-500" />
                      All time earnings
                    </p>
                  </CardContent>
                </Card>
                <Card className="hover:shadow-md transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Courses
                    </CardTitle>
                    <div className="p-2 bg-blue-100 rounded-lg dark:bg-blue-900/20">
                      <GraduationCap className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{count?.totalCourses || 0}</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Active learning programs
                    </p>
                  </CardContent>
                </Card>
                <Card className="hover:shadow-md transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Paid Enrollments</CardTitle>
                    <div className="p-2 bg-purple-100 rounded-lg dark:bg-purple-900/20">
                      <ShoppingCart className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{count?.paidEnrollments || 0}</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Successful purchases
                    </p>
                  </CardContent>
                </Card>
                <Card className="hover:shadow-md transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Enquiries
                    </CardTitle>
                    <div className="p-2 bg-orange-100 rounded-lg dark:bg-orange-900/20">
                      <MessageSquare className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{count?.allEnrollments || 0}</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Course interest queries
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Revenue Overview</CardTitle>
                  <CardDescription>Monthly revenue trends</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <Overview />
                </CardContent>
              </Card>

              <RecentSales />
            </div>

            {/* Additional Charts */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <div className="col-span-4">
                <TopCourses />
              </div>
              <div className="col-span-3">
                <RevenueChart />
              </div>
            </div>

            {/* Recent Activity Grid */}
            <div className="grid gap-4 md:grid-cols-2">
              <RecentEnrollments />
              <ActivityFeed />
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <ActivityFeed />
              <RecentEnrollments />
            </div>
            <TopCourses />
          </TabsContent>
        </Tabs>
      </div>
    </ScrollArea>
  );
}