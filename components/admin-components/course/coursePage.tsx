'use client'

import BreadCrumb from '@/components/BreadCrumb'
import ModernLoader, { CardLoader } from '@/components/ModernLoader'
import { columns } from '@/components/tables/course-table/columns'
import { DataTable } from '@/components/shared/DataTable'
import { Heading } from '@/components/ui/Heading'
import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn, getListOptionsFromSearchParams, getTotalPages } from '@/lib/utils'
import { getAllCourses } from '@/services/admin/admin-course-service'
import { Separator } from '@radix-ui/react-separator'
import { useQuery } from '@tanstack/react-query'
import { Plus, GraduationCap, BookOpen, Eye, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { usePermission } from '@/hooks/usePermissions'
import { COURSE_PERMISSIONS } from '@/constants/permissions'
import { PermissionGuard } from '@/components/guards/PermissionGuard'

const breadcrumbItems = [{ title: "Courses", link: "/admin/courses" }];

const CoursePage = () => {
  const searchParams = useSearchParams();
  const canCreateCourse = usePermission(COURSE_PERMISSIONS.COURSE_CREATE);
  
  const {data, isLoading} = useQuery({
    queryKey: ['/admin/course', searchParams.toString()], 
    queryFn: () => getAllCourses(getListOptionsFromSearchParams(searchParams))
  })

  const filters = [
    { lable: 'All', identifier: 'all', filterKey: 'status', filterValue: 'ALL' },
    { lable: 'Published', identifier: 'published', filterKey: 'status', filterValue: 'PUBLISHED' },
    { lable: 'Saved (Draft)', identifier: 'saved', filterKey: 'status', filterValue: 'SAVED' },
  ]

  const publishedCount = data?.docs?.filter((c: any) => c.status === 'PUBLISHED').length || 0
  const draftCount = data?.docs?.filter((c: any) => c.status === 'SAVED').length || 0

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <BreadCrumb items={breadcrumbItems} />

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <GraduationCap className="h-8 w-8 text-primary" />
            Courses Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Create, manage and organize your courses
          </p>
        </div>
        {canCreateCourse && (
          <Button asChild size="lg" className="gap-2">
            <Link href="/admin/courses/new">
              <Plus className="h-4 w-4" />
              Create Course
            </Link>
          </Button>
        )}
      </div>

      {/* Stats Cards */}
      {isLoading ? (
        <CardLoader />
      ) : (
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
              <div className="p-2 bg-blue-100 rounded-lg dark:bg-blue-900/20">
                <BookOpen className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data?.total || 0}</div>
              <p className="text-xs text-muted-foreground mt-1">
                All courses in system
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Published</CardTitle>
              <div className="p-2 bg-green-100 rounded-lg dark:bg-green-900/20">
                <Eye className="h-4 w-4 text-green-600 dark:text-green-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{publishedCount}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Live and accessible
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Drafts</CardTitle>
              <div className="p-2 bg-orange-100 rounded-lg dark:bg-orange-900/20">
                <TrendingUp className="h-4 w-4 text-orange-600 dark:text-orange-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{draftCount}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Work in progress
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Courses Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Courses</CardTitle>
          <CardDescription>Browse and manage your course catalog</CardDescription>
        </CardHeader>
        <CardContent>
          {
            isLoading ? 
            <ModernLoader variant="skeleton" />
            : <DataTable
            searchKey="title"
            pageNo={data?.currentPage||1}
            columns={columns}
            total={data?.total || 0}
            data={data?.docs||[]}
            pageCount={data?.total ? getTotalPages(data.total, data.limit): 0}
            dateRange={false}
            filter={filters}
          />
          }
        </CardContent>
      </Card>
    </div>
  )
}

// Wrap with permission guard
const CoursePageWithPermission = () => (
  <PermissionGuard permission={COURSE_PERMISSIONS.COURSE_VIEW}>
    <CoursePage />
  </PermissionGuard>
)

export default CoursePageWithPermission