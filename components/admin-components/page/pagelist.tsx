'use client'
import { CustomIcon } from '@/components/icons';
import { getListOptionsFromSearchParams } from '@/lib/utils';
import { getAllMasters } from '@/services/admin/admin-master';
import { useQuery } from '@tanstack/react-query';
import { nanoid } from 'nanoid';
import Link from 'next/link';



const PageCard = ({ title, data }: { title: string, data?: any, createdAt?: string }) => {
    return (
        <div className='space-y-3 group '>
            <div className='aspect-[2/3] rounded-xl shadow-xl w-full h-full group-hover:shadow group-hover:shadow-primary/15 transition-all duration-300'>
                {
                    !data ? <div className='w-full h-full grid place-content-center'>
                        <span className='w-[100px] text-center font-bold text-gray-500'>No Page Content Available</span>
                    </div>
                    : <div className='w-full h-full grid place-content-center'>
                    <span className='w-[100px] text-center font-bold text-gray-500'>{data.name}</span>
                </div>
                }
            </div>
            <div className='flex items-center gap-2 transition-all duration-300'>
                <CustomIcon icon='pages' className='group-hover:text-primary ' />
                <p className='font-bold text-gray-600 group-hover:text-primary'>{title}</p>
            </div>
        </div>
    )
}

const PageList = () => {
  
    const { data } = useQuery({
        queryKey: ['/admin/masters', getListOptionsFromSearchParams(new URLSearchParams({ parentCode: 'PAGE' }))],
        queryFn: () => getAllMasters(getListOptionsFromSearchParams((new URLSearchParams({ parentCode: 'PAGE' }))))
    });
    return (
        <div className='grid grid-cols-2 md:grid-cols-4 items-center justify-items-center gap-5 container mx-auto'>
            {
                data?.docs.map(dt => {
                    return <Link href={{pathname: `pages/${dt._id}`, search: 'mode=edit'}} className='w-full' key={(nanoid())}><PageCard title={dt.name} data={dt} /></Link>
                })
            }
        </div>
    )
}

export default PageList