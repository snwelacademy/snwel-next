'use client'
import ModernLoader from '@/components/ModernLoader';
import { PageEditor } from '@/components/page-builder/PageEditor';
import { getMaster } from '@/services/admin/admin-master';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';



const EditPage = () => {
  const params = useParams();
  const { data, isLoading } = useQuery({
    queryKey: [`master`, params.id],
    queryFn: () => getMaster(params.id! as string)
  });

  return (
    <>
      {
        isLoading ? 
        <ModernLoader variant={'default'} /> : 
        !data ? <div>Invalid Page</div> : 
        <div className='relative pt-12'>
            <PageEditor data={data}/>
        </div>
      }
    </>
  )
}

export default EditPage