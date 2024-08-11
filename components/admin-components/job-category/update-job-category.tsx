'use client'

import BreadCrumb from '@/components/BreadCrumb';
import Loader from '@/components/Loader';
import MutateJobCategory from '@/components/job-category/mutate-job-category';
import { Heading } from '@/components/ui/Heading';
import { Separator } from '@/components/ui/separator';
import { getJobCategory } from '@/services/guestJobCategoryService';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';


const UpdateJobCategoryPage = () => {
  const params = useParams();
  const { data, isLoading } = useQuery({
    queryKey: [`job-category`, params.id],
    queryFn: () => getJobCategory(params.id! as string)
  });
  const breadcrumbItems = [{ title: `Update ${data ? " : " + data.name : 'Category'}`, link: `/admin/job-category/${params.id}` }];

  return (
    <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
      <BreadCrumb items={breadcrumbItems} />

      <div className="flex items-start justify-between">
        <Heading
          title={"Update Category"}
          description={params.id ? 'Update Category' : 'Create Category'}
        />
      </div>
      <Separator />

      {
        isLoading ? <Loader type={'default'} /> : !data ? <div>Invalid Job Category</div> : <MutateJobCategory data={data} />
      }
    </div>
  )
}

export default UpdateJobCategoryPage