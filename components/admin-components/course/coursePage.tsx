'use client'

import BreadCrumb from '@/components/BreadCrumb'
import Loader from '@/components/Loader'
import { columns } from '@/components/tables/course-table/columns'
import CourseTable from '@/components/tables/course-table/course-table'
import { Heading } from '@/components/ui/Heading'
import { buttonVariants } from '@/components/ui/button'
import { cn, getListOptionsFromSearchParams, getTotalPages } from '@/lib/utils'
import { getAllCourses } from '@/services/admin/admin-course-service'
import { Separator } from '@radix-ui/react-separator'
import { useQuery } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

const breadcrumbItems = [{ title: "Courses", link: "/admin/courses" }];

const CoursePage = () => {
  const totalUsers = 10;
  const searchParams = useSearchParams();
  const {data, isLoading} = useQuery({
    queryKey: ['/admin/course'], 
    queryFn: () => getAllCourses(getListOptionsFromSearchParams(searchParams))
  })



  return (
    <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
      <BreadCrumb items={breadcrumbItems} />

      <div className="flex items-start justify-between">
        <Heading
          title={`Courses (${data?.total||0})`}
          description="Manage All Courses List"
        />

        <Link
          href={"/admin/courses/new"}
          className={cn(buttonVariants({ variant: "default" }))}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Link>
      </div>
      <Separator />

      {
        isLoading ? 
        <Loader type="default" />
        : <CourseTable
        searchKey="title"
        pageNo={data?.currentPage||1}
        columns={columns}
        totalUsers={data?.total||0}
        data={data?.docs||[]}
        pageCount={data?.total ? getTotalPages(data.total, data.limit): 1}
      />
      }
    </div>
  )
}

export default CoursePage