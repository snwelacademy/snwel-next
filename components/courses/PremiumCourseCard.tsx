

/* eslint-disable @next/next/no-img-element */
import { cn } from '@/lib/utils'
import { Course } from '@/types/Course';
import Typography from '../typography'
import { Button } from '../ui/button'
import { ArrowRight } from 'lucide-react'
import EnrollCourseModal from './EnrollCourseModal';
import { nanoid } from 'nanoid';
import Link from 'next/link';

const PremiumCourseCard = ({
    className,
    course,
    courseImage
}: {
    className?: string,
    course: Course,
    courseImage?: string
}) => {
  return (
    <div className={cn([
        'rounded-2xl relative w-full aspect-square shadow-2xl hover:shadow-none transition duration-300',
        {
            'bg-primary': !course.appearence?.themeColor,
            "text-primary-foreground": !course.appearence?.forgroundColor
        },
        className
    ])}
    style={{
        backgroundColor: course.appearence?.themeColor,
        color: course.appearence?.forgroundColor
    }}
    >
        <span className='inline-block w-14 h-14 top-0 right-0 absolute'><img alt="" className='w-full' src="/assets/images/284-2840858_100-job-guarantee-logo-hd-png-download.png" /></span>
        <img alt="" className='absolute w-[70%] right-0 bottom-0 ' src={courseImage} />
        <div className='absolute top-0 left-0 w-full h-full p-5'>
            {
                course.categories.map(ct => {
                    return <Typography key={nanoid()} as="lable" className={'tracking-wider uppercase text-xs'}>{ct.title}</Typography>
                })
            }
            <Link className='block' href={`/courses/${course._id}`}><Typography as="h2" className='text-2xl lg:text-3xl'>{course.title}</Typography></Link>
        </div>
        <EnrollCourseModal
        targetCourse={course}
        trigger={<Button className='absolute left-5 bottom-5 bg-amber-500 hover:bg-amber-600 text-white'><span>ENROLL NOW</span><ArrowRight/></Button>}
        courseId={course._id}
         />
    </div>
  )
}

export default PremiumCourseCard