'use client'

import BreadCrumb from '@/components/BreadCrumb';
import ModernLoader from '@/components/ModernLoader';
import MutateMaster from '@/components/master/mutateMasterForm';
import { Heading } from '@/components/ui/Heading';
import { Separator } from '@/components/ui/separator';
import { getMaster } from '@/services/admin/admin-master';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';


const UpdateMasterPage = () => {
  const params = useParams();
  const { data, isLoading } = useQuery({
    queryKey: [`master`, params.id],
    queryFn: () => getMaster(params.id! as string)
  });
  const breadcrumbItems = [{ title: `Update ${data ? " : " + data.name : 'Master'}`, link: `/admin/master/${params.id}` }];

  return (
    <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
      <BreadCrumb items={breadcrumbItems} />

      <div className="flex items-start justify-between">
        <Heading
          title={"Update Vacancy"}
          description={params.id ? 'Update Master' : 'Create Master'}
        />
      </div>
      <Separator />

      {
        isLoading ? <ModernLoader variant={'default'} /> : !data ? <div>Invalid Master</div> : <MutateMaster data={data} />
      }
    </div>
  )
}

export default UpdateMasterPage