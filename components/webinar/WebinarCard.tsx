
import Typography from '../typography'
import { Button } from '../ui/button'

import { PlayCircle } from 'lucide-react'
import { Webinar } from '@/types/Webinar'
import dayjs from 'dayjs';
import Link from 'next/link';

const WebinarCard = ({
    webinar
}: {
    webinar: Webinar
}) => {
    return (
        <div className='rounded-2xl border-2 border-primary/10 shadow-xl shadow-primary/5 group hover:shadow transition-all duration-200'>
            <div className='aspect-video rounded-2xl overflow-hidden'>
                <img className='w-full' src={webinar.thumbnail} />
            </div>

            <div className='p-3 space-y-3'>
            <Link className='block' href={`/webinars/${webinar.slug}`} ><Typography as="h3" className='line-clamp-2 group-hover:text-primary duration-200 transition-all cursor-pointer'>{webinar.title}</Typography></Link>
                {/* <Typography as="p" className='line-clamp-2' >{webinar.shortDescription}</Typography> */}
               
                <div className='flex items-center justify-between'>
                    <span className='text-xs font-bold text-gray-600'>{dayjs(webinar.startDate).format('MMM DD, YYYY')}</span>
                    <Link href={`/webinars/${webinar.slug}`} ><Button variant={'secondary'} className='space-x-2 border rounded-full'><span>Watch Now</span> <PlayCircle/></Button></Link>
                </div>
            </div>
        </div>
    )
}

export default WebinarCard