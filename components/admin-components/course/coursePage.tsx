'use client'

import BreadCrumb from '@/components/BreadCrumb'
import Loader from '@/components/Loader'
import { columns } from '@/components/tables/course-table/columns'
import { DataTable } from '@/components/shared/DataTable'
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
  const searchParams = useSearchParams();
  const {data, isLoading} = useQuery({
    queryKey: ['/admin/course', searchParams.toString()], 
    queryFn: () => getAllCourses(getListOptionsFromSearchParams(searchParams))
  })

  const filters = [
    { lable: 'All', identifier: 'all', filterKey: 'status', filterValue: 'ALL' },
    { lable: 'Published', identifier: 'published', filterKey: 'status', filterValue: 'PUBLISHED' },
    { lable: 'Saved (Draft)', identifier: 'saved', filterKey: 'status', filterValue: 'SAVED' },
  ]



  return (
    <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
      <BreadCrumb items={breadcrumbItems} />

      <div className="flex items-start justify-between">
        <Heading
          title={`Courses (${data?.total || 0})`}
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
    </div>
  )
}

export default CoursePage