
import Typography from '../typography'
import {BookTextIcon, HandCoinsIcon, LandPlotIcon, TestTube2Icon } from 'lucide-react'
import HeadingSubtitle from './SectionLable'
import JoinCourseForm from './JoinCourseForm'

const JoinCourseSection2 = () => {
  return (
    <section className='py-36 px-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 items-center justify-items-center container mx-auto bg-primary text-primary-foreground py-10 rounded-2xl shadow-2xl'>
        <div className='text-primary-foreground'>
            <HeadingSubtitle title="HOW TO START" className=' text-primary-foreground before:bg-primary-foreground after:bg-primary-foreground mb-4'/>
            <Typography as="title" className='block mb-4 text-primary-foreground'>Begin With Our Cost-Free Seminars</Typography>
            <Typography as="lable" className='text-primary-foreground'>Sit amet dictum sit amet justo donec enim. Posuere lorem ipsum dolor sit amet consectetur. Tristique senectus et netus et malesuada fames ac.</Typography>
            <div className='mt-10 space-y-3 text-primary-foreground'>
                <div className='flex gap-4 items-center'>
                    <BookTextIcon className='w-10 h-10'/>
                    <Typography as="h3" className=''>We Offer Hands-On Instructions.</Typography>
                </div>
                <div className='flex gap-4 items-center'>
                    <HandCoinsIcon className='w-10 h-10'/>
                    <Typography as="h3" className=''>100% Placement Assistance.</Typography>
                </div>
                <div className='flex gap-4  items-center'>
                    <LandPlotIcon className='w-10 h-10'/>
                    <Typography as="h3" className='' >Tailor Made Courses.</Typography>
                </div>
                <div className='flex gap-4  items-center'>
                    <TestTube2Icon className='w-10 h-10'/>
                    <Typography as="h3" className='' >Real Time Projects.</Typography>
                </div>
            </div>
        </div>
        <div className='mt-10 md:mt-0 overflow-hidden rounded-2xl'>
            <JoinCourseForm className=' bg-primary-foreground'/>
        </div>
    </div>
    </section>
  )
}

export default JoinCourseSection2