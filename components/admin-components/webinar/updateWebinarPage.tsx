'use client'

import BreadCrumb from '@/components/BreadCrumb';
import Loader from '@/components/Loader';
import { Heading } from '@/components/ui/Heading';
import { Separator } from '@/components/ui/separator';
import MutateWebinar from '@/components/webinar/MutateWebinar';
import { getWebinar } from '@/services/admin/webinar-service';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';



const UpdateWebinarPage = () => {
  const params = useParams();
  const { data, isLoading } = useQuery({
    queryKey: [`webinar`, params.id],
    queryFn: () => getWebinar(params.id! as string)
  });
  const breadcrumbItems = [{ title: `Update ${data ? " : " + data.title : 'Webinar'}`, link: `/admin/webinar/${params.id}` }];

  return (
    <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
      <BreadCrumb items={breadcrumbItems} />

      <div className="flex items-start justify-between">
        <Heading
          title={"Update Webinar"}
          description={params.id ? 'Update webinar' : 'Create Webinars'}
        />
      </div>
      <Separator />

      {
        isLoading ? <Loader type={'default'} /> : !data ? <div>Invalid Webinar</div> : <MutateWebinar data={data} />
      }
    </div>
  )
}

export default UpdateWebinarPage