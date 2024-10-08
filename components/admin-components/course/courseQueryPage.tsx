'use client'
import BreadCrumb from '@/components/BreadCrumb'
import Loader from '@/components/Loader'
import { DataTable } from '@/components/shared/DataTable'
import { columns } from '@/components/tables/course-query-table/columns'
import { Heading } from '@/components/ui/Heading'
import {  getListOptionsFromSearchParams, getTotalPages, queryStringToObject } from '@/lib/utils'
import { getAllEnrollments } from '@/services/admin/course-enrollment'
import { Separator } from '@radix-ui/react-separator'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'

const breadcrumbItems = [{ title: "Queries", link: "/admin/course-queries" }];

const CourseQueryPage = () => {
  const totalUsers = 10;
  const searchParams = useSearchParams();
  const {data, isLoading} = useQuery({
    queryKey: ['/admin/enrollments', searchParams.toString()], 
    queryFn: () => getAllEnrollments(queryStringToObject(searchParams.toString()))
  })



  return (
    <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
      <BreadCrumb items={breadcrumbItems} />

      <div className="flex items-start justify-between">
        <Heading
          title={`Enrollments (${data?.total||0})`}
          description="Manage All Course Enrollments List"
        />

  
      </div>
      <Separator />

      {
        isLoading ? 
        <Loader type="default" />
        : <DataTable
        searchKey="title"
        pageNo={data?.currentPage||1}
        columns={columns as any[]}
        total={data?.total||0}
        data={data?.docs||[]}
        pageCount={data?.total ? getTotalPages(data.total, data.limit): 1}
        filter={[
          {
            lable: 'Verified',
            identifier: "verified",
            filterKey: 'status',
            filterValue: 'ACTIVE'
          },
          {
            lable: 'Pending',
            identifier: "pending",
            filterKey: 'status',
            filterValue: 'PENDING'
          },
        ]}
      />
      }
    </div>
  )
}

export default CourseQueryPage