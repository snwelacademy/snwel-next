'use client'

import BreadCrumb from '@/components/BreadCrumb';
import Loader from '@/components/Loader';
import MutateJobVacancy from '@/components/job-vacancy/mutateJobVacancy';
import { Heading } from '@/components/ui/Heading';
import { Separator } from '@/components/ui/separator';
import { getJobVacancy } from '@/services/admin/admin-jobVacancyService';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';


const UpdateJobVacancyPage = () => {
  const params = useParams();
  const { data, isLoading } = useQuery({
    queryKey: [`job-vacancy`, params.id],
    queryFn: () => getJobVacancy(params.id! as string)
  });
  const breadcrumbItems = [{ title: `Update ${data ? " : " + data.title : 'Vacancy'}`, link: `/admin/vacancy/${params.id}` }];

  return (
    <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
      <BreadCrumb items={breadcrumbItems} />

      <div className="flex items-start justify-between">
        <Heading
          title={"Update Vacancy"}
          description={params.id ? 'Update Vacancy' : 'Create Vacancy'}
        />
      </div>
      <Separator />

      {
        isLoading ? <Loader type={'default'} /> : !data ? <div>Invalid Vacancy</div> : <MutateJobVacancy data={data} />
      }
    </div>
  )
}

export default UpdateJobVacancyPage