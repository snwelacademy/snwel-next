'use client'
import BreadCrumb from '@/components/BreadCrumb'
import Loader from '@/components/Loader'
import { DataTable } from '@/components/shared/DataTable'
import { WebinarEnquiryColumn } from '@/components/tables/webinar-enquiry/columns'
import { Heading } from '@/components/ui/Heading'
import { buttonVariants } from '@/components/ui/button'
import { cn, getListOptionsFromSearchParams, getTotalPages } from '@/lib/utils'
import { getAllEnquiries } from '@/services/admin/admin-enquiry-service'
import { Separator } from '@radix-ui/react-separator'
import { useQuery } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'


const breadcrumbItems = [{ title: "Webinars", link: "/admin/webinar" }];

const WebinarEnquiryPage = () => {
  const totalUsers = 10;
  const searchParams = useSearchParams();
  const {data, isLoading} = useQuery({
    queryKey: ['/admin/webinar-inquiry', searchParams], 
    queryFn: () => getAllEnquiries({...getListOptionsFromSearchParams(searchParams), filter: {type: 'webinar'}})
  })



  return (
    <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
      <BreadCrumb items={breadcrumbItems} />

      <div className="flex items-start justify-between">
        <Heading
          title={`Webinars (${totalUsers})`}
          description="Manage All Webinar List"
        />

        <Link
          href={"/admin/webinar/new"}
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
        columns={WebinarEnquiryColumn as any}
        total={totalUsers}
        data={data?.docs||[]}
        pageCount={data?.total ? getTotalPages(data.total, data.limit): 0}
      />
      }
    </div>
  )
}

export default WebinarEnquiryPage