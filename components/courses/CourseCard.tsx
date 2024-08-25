import { Course } from '@/types/Course'
import { Card } from '../ui/card';
import { PersonIcon, ClockIcon } from '@radix-ui/react-icons'
import { BookTextIcon } from 'lucide-react';
import Typography from '../typography';
import { formatToLocalCurrency } from '@/lib/utils';
import Link from 'next/link';

type CourseCardProps = {
  course: Course
}


const CourseCard = ({
  course: {
    title,
    shortDescription,
    image,
    enrolled,
    courseDuration,
    price,
    slug,
    isPopular,
    isPremium,
  }
}: CourseCardProps) => {


  return (
    <Link href={`/courses/${slug}`} className='bg-white cursor-pointer block'>
      <Card className="max-w-md rounded-2xl overflow-hidden shadow-lg relative pb-12 bg-primary/10 bg-zinc-800 text-white">
        <div className='aspect-video bg-center bg-cover bg-no-repeat relative' style={{ backgroundImage: `url(${image})` }}>
          {/* <img className="w-full" src={image} alt={title} /> */}
          <div className='absolute bottom-0 px-3 py-2 flex items-center gap-3'>
            <Typography as="label" className='inline-block bg-orange-500 text-white p-1 rounded '>
              {formatToLocalCurrency(price)}
            </Typography>
            {/* <span className='inline-block bg-orange-500 text-white p-1 rounded-full'>
                {getCurrencySymbol(currency)}{price}
            </span> */}
          </div>
        </div>

        {
         ( isPopular && !isPremium) && <span className='inline-block absolute top-3 right-3 w-6 h-6 bg-contain bg-center ' style={{backgroundImage: `url(/assets/images/icon/on-fire.png)`}}></span>
        }
        <div className="px-6 py-4">
          <Typography as="h4" className='line-clamp-1'>{title}</Typography>
          <Typography as="subtitle" className='text-green-600 text-sm font-light '>{shortDescription}</Typography>
        </div>
        <div className=" py-2 absolute bottom-0 left-0 w-full flex items-center justify-between border-t border-t-muted-foreground">
          <span className="inline-flex items-center justify-center px-3 py-1 text-sm font-semibold text-gray-300 mr-2">
            <PersonIcon className='inline-block mr-1 ' /><span>{enrolled}</span>
          </span>
          <span className="inline-flex items-center justify-center  px-3 py-1 text-sm font-semibold text-gray-300 mr-2">
            <ClockIcon className='inline-block mr-1 ' /><span>{courseDuration}h</span>
          </span>
          <span className="inline-block l px-3 py-1 text-sm font-semibold text-gray-300">
            <BookTextIcon className='inline-block mr-1  w-4' /><span>Lecture</span>
          </span>
        </div>
      </Card>
    </Link>
  )
}

export default CourseCard