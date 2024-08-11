'use client'

import BreadCrumb from '@/components/BreadCrumb';
import Loader from '@/components/Loader';
import { DataTable } from '@/components/shared/DataTable';
import { JobVacancyColumns } from '@/components/tables/job-vacancy/JobVacancyColumns';
import { Heading } from '@/components/ui/Heading';
import { buttonVariants } from '@/components/ui/button';
import { cn, getListOptionsFromSearchParams, getTotalPages } from '@/lib/utils';
import { getAllJobVacancies } from '@/services/admin/admin-jobVacancyService';
import { Separator } from '@radix-ui/react-separator';
import { useQuery } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const breadcrumbItems = [{ title: "Job Vacancies", link: "/admin/job-vacancies" }];

const JobVacancyPage = () => {
  const totalJobVacancies = 10;
  const searchParams = useSearchParams();
  const { data, isLoading } = useQuery({
    queryKey: ['/admin/job-vacancies', searchParams],
    queryFn: () => getAllJobVacancies(getListOptionsFromSearchParams(searchParams))
  });

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <BreadCrumb items={breadcrumbItems} />

      <div className="flex items-start justify-between">
        <Heading
          title={`Job Vacancies (${totalJobVacancies})`}
          description="Manage All Job Vacancies List"
        />

        <Link
          href={"/admin/job-vacancies/new"}
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
        columns={JobVacancyColumns}
        total={totalJobVacancies}
        data={data?.docs || []}
        pageCount={data?.total ? getTotalPages(data.total, data.limit) : 0}
      />
      }
    </div>
  );
}

export default JobVacancyPage;
