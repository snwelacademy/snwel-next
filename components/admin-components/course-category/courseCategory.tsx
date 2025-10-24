'use client'

import BreadCrumb from '@/components/BreadCrumb';
import ModernLoader from '@/components/ModernLoader';
import { DataTable } from '@/components/shared/DataTable';
import { Heading } from '@/components/ui/Heading';
import { Button } from '@/components/ui/button';
import {  getListOptionsFromSearchParams, getTotalPages } from '@/lib/utils';
import { Separator } from '@radix-ui/react-separator';
import { Plus } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getAllCourseCategories } from '@/services/admin/course-category-service';
import { columns } from '@/components/tables/course-category/columns';
import MutateCategoryDrawer from '@/components/course-category/MutateCategoryDrawer';
import { useSearchParams } from 'next/navigation';

const breadcrumbItems = [{ title: "Course Categories", link: "/admin/course-category" }];

const CourseCategoryPage = () => {
  const searchParams = useSearchParams();
  const { data, isLoading } = useQuery({
    queryKey: ['/admin/course-category'],
    queryFn: () => getAllCourseCategories(getListOptionsFromSearchParams(searchParams))
  });

  return (
    <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
      <BreadCrumb items={breadcrumbItems} />

      <div className="flex items-start justify-between">
        <Heading
          title={`Course Categories (${data?.total || 0})`}
          description="Manage All Course Category List"
        />

        <MutateCategoryDrawer trigger={<Button> <Plus className="mr-2 h-4 w-4" /> Add New</Button>} />

      </div>
      <Separator />

      {
        isLoading ?
          <ModernLoader variant="default" />
          :
          <DataTable
            searchKey="title"
            pageNo={data?.currentPage || 1}
            columns={columns}
            total={data?.total || 0}
            data={data?.docs || []}
            pageCount={data?.total ? getTotalPages(data.total, data.limit) : 0}
          />
      }
    </div>
  );
};

export default CourseCategoryPage;
