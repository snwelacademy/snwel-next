'use client'
import BreadCrumb from '@/components/BreadCrumb';
import Loader from '@/components/Loader';
import { DataTable } from '@/components/shared/DataTable';
import { JobCategoryColumns } from '@/components/tables/job-category/JobCategoryColumns';
import { Heading } from '@/components/ui/Heading';
import { buttonVariants } from '@/components/ui/button';
import { cn, getListOptionsFromSearchParams, getTotalPages } from '@/lib/utils';
import { getAllJobCategories } from '@/services/admin/admin-jobCategoryService';
import { Separator } from '@radix-ui/react-separator';
import { useQuery } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';


const breadcrumbItems = [{ title: "Job Vacancies", link: "/admin/job-vacancies" }];

const JobCategoryPage = () => {
  const searchParams = useSearchParams();
  const { data, isLoading } = useQuery({
    queryKey: ['/admin/job-categories', searchParams],
    queryFn: () => getAllJobCategories(getListOptionsFromSearchParams(searchParams))
  });

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <BreadCrumb items={breadcrumbItems} />

      <div className="flex items-start justify-between">
        <Heading
          title={`Job Category (${data?.total||0})`}
          description="Manage All Job Category List"
        />

        <Link
          href={"/admin/job-category/new"}
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
        pageNo={data?.currentPage || 1}
        columns={JobCategoryColumns}
        total={data?.total||0}
        data={data?.docs || []}
        pageCount={data?.total ? getTotalPages(data.total, data.limit) : 0}
      />
      }
    </div>
  );
}

export default JobCategoryPage;
