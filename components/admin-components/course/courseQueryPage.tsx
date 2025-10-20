'use client'
import BreadCrumb from '@/components/BreadCrumb'
import Loader from '@/components/Loader'
import { DataTable } from '@/components/ui/data-table'
import { columns } from '@/components/tables/course-query-table/columns'
import { Heading } from '@/components/ui/Heading'
import { getListOptionsFromSearchParams, getTotalPages } from '@/lib/utils'
import { getAllEnrollments, exportAllEnrollments } from '@/services/admin/course-enrollment'
import { CourseEnrollment } from '@/types/CourseEnrollment'
import { Separator } from '@radix-ui/react-separator'
import { useQuery } from '@tanstack/react-query'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { toast } from '@/components/ui/use-toast'

const breadcrumbItems = [{ title: "Queries", link: "/admin/course-queries" }];

const CourseQueryPage = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const {data, isLoading} = useQuery({
    queryKey: ['/admin/enrollments', searchParams.toString()], 
    queryFn: () => getAllEnrollments(getListOptionsFromSearchParams(searchParams))
  })

  const [exporting, setExporting] = useState(false)

  // Handle options change from DataTable
  const handleOptionsChange = (options: any) => {
    const params = new URLSearchParams(searchParams.toString())
    
    // Update search params based on options
    if (options.search) params.set('search', options.search)
    else params.delete('search')
    
    if (options.page) params.set('page', options.page.toString())
    if (options.limit) params.set('limit', options.limit.toString())
    
    if (options.sort) {
      const [field, order] = Object.entries(options.sort)[0]
      params.set('sortBy', field as string)
      params.set('sortOrder', order as string)
    } else {
      params.delete('sortBy')
      params.delete('sortOrder')
    }

    // Handle filters
    if (options.filter) {
      Object.entries(options.filter).forEach(([key, value]) => {
        if (value) params.set(key, value as string)
        else params.delete(key)
      })
    }

    router.push(`${pathname}?${params.toString()}`)
  }

  // Handle export
  const handleExport = async () => {
    try {
      setExporting(true)
      const csvContent = await exportAllEnrollments(getListOptionsFromSearchParams(searchParams))
      
      if (!csvContent) {
        return;
      }

      // Create a Blob with the Excel content
      const blob = new Blob([csvContent], { 
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      })
      const url = URL.createObjectURL(blob)

      // Create a link and trigger the download
      const link = document.createElement("a")
      link.setAttribute("href", url)
      link.setAttribute("download", `course_enrollments_${searchParams.get('page') || 1}.xlsx`)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

    } catch (error: any) {
      toast({
        title: "Export failed",
        description: error.message || "There was a problem exporting the data",
        variant: "destructive"
      })
    } finally {
      setExporting(false)
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <BreadCrumb items={breadcrumbItems} />

      <div className="flex items-start justify-between">
        <Heading
          title={`Enrollments (${data?.total || 0})`}
          description="Manage All Course Enrollments List"
        />
      </div>
      <Separator />

      <DataTable<CourseEnrollment>
        columns={columns as any[]}
        data={data as any ?? {
          docs: [],
          total: 0,
          limit: 10,
          page: 1,
          pages: 1,
          hasNext: false,
          hasPrev: false
        }}
        loading={isLoading}
        enableSearch
        enableDateFilter
        enableExport
        onExport={handleExport}
        itemsPerPage={10}
        onOptionsChange={handleOptionsChange}
      />
    </div>
  )
}

export default CourseQueryPage