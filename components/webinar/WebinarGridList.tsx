
import { nanoid } from 'nanoid'
import WebinarCard from './WebinarCard'
import { Webinar } from '@/types/Webinar'
import { Skeleton } from '../ui/skeleton';

const LoadingSkeleton = () => (
    <>
      <div className="border-2 border-primary/10 shadow-xl shadow-primary/5 rounded-2xl">
       
          <Skeleton className="w-full aspect-video" />
       
        <div className="p-3 space-y-3">
          <h3 className="line-clamp-2 group-hover:text-primary">
            <Skeleton className="w-[336px] max-w-full" />
          </h3>
          <div className="flex items-center justify-between">
            <span>
              <Skeleton className="w-[96px] max-w-full" />
            </span>
            <a>
              <div className="inline-flex items-center justify-center transition-colors h-10 px-4 py-2 space-x-2 border rounded-xl">
                <span>
                  <Skeleton className="w-[72px] max-w-full" />
                </span>
                <Skeleton className="w-[24px] h-[24px]" />
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
  

const WebinarGridList = ({
    webinarList,
    loading
}: {
    webinarList: Webinar[],
    loading?: boolean
}) => {

    if(loading){
        return <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-items-center gap-10'>
            {
                Array(5).fill(null).map(() => {
                    return <div className='w-full' key={nanoid()}><LoadingSkeleton/></div>
                })
            }
        </div>
    }
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-items-center gap-10'>
            {
                webinarList.map(wb => {
                    return <div className='w-full' key={nanoid()}><WebinarCard webinar={wb} /></div>
                })
            }
        </div>
    )
}

export default WebinarGridList