'use client'
import BreadCrumb from '@/components/BreadCrumb';
import Loader from '@/components/Loader';
import { DataTable } from '@/components/shared/DataTable';
import { GeneralEnquiryColumn } from '@/components/tables/general-enquiry/columns';
import { Heading } from '@/components/ui/Heading';
import { buttonVariants } from '@/components/ui/button';
import { cn, getListOptionsFromSearchParams, getTotalPages } from '@/lib/utils';
import { getAllEnquiries } from '@/services/admin/admin-enquiry-service';
import { Separator } from '@radix-ui/react-separator';
import { useQuery } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';


const breadcrumbItems = [{ title: "General Enquiry", link: "/admin/general-enquiry" }];

const GeneralEnquiryPage = () => {
  const searchParams = useSearchParams();
  const { data, isLoading } = useQuery({
    queryKey: ['/admin/enquiry', searchParams], 
    queryFn: () => getAllEnquiries({...getListOptionsFromSearchParams(searchParams), filter: {type: 'general'}})
  });

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <BreadCrumb items={breadcrumbItems} />

      <div className="flex items-start justify-between">
        <Heading
          title={`Enquiries (${data?.total || 0})`}
          description="Manage All General Enquiry List"
        />

        {/* <Link
          href={"/admin/widget/new"}
          className={cn(buttonVariants({ variant: "default" }))}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Link> */}
      </div>
      <Separator />

      {isLoading ? 
        <Loader type="default" /> :
        <DataTable
          searchKey="name"
          pageNo={data?.currentPage || 1}
          columns={GeneralEnquiryColumn as any}
          total={data?.total || 0}
          data={data?.docs || []}
          pageCount={data?.total ? getTotalPages(data.total, data.limit) : 1}
        />
      }
    </div>
  );
};

export default GeneralEnquiryPage;
