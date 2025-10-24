'use client'

import BreadCrumb from '@/components/BreadCrumb';
import ModernLoader from '@/components/ModernLoader';
import { Heading } from '@/components/ui/Heading';
import { Separator } from '@/components/ui/separator';
import MutateWidgetForm from '@/components/widget/MutateWidgetForm';
import { fetchWidgetById } from '@/services/admin/admin-widget-service';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import WidgetEditor from './WidgetEditor';



const UpdateWidgetPage = () => {
  const params = useParams();
  const { data, isLoading } = useQuery({
    queryKey: [`widget`, params.id],
    queryFn: () => fetchWidgetById(params.id! as string)
  });
  const breadcrumbItems = [{ title: `Update ${data ? " : " + data.title : 'Widget'}`, link: `/admin/widgets/${params.id}?type=${data?.type}` }];

  return (
    <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
      

      {
        isLoading ? <ModernLoader variant={'default'} /> : !data ? <div>Invalid Webinar</div> : <WidgetEditor widgetData={data} type={data.type} />
      }
    </div>
  )
}

export default UpdateWidgetPage