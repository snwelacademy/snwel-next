'use client'
import Loader from '@/components/Loader';
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
        <Loader type={'default'} /> : 
        !data ? <div>Invalid Page</div> : 
        <div className='relative pt-6'>
            <PageEditor data={data}/>
        </div>
      }
    </>
  )
}

export default EditPage