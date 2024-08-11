
import HighlightedText from '../typography/HighlightedHeading'
import Typography from '../typography'
import {BookTextIcon, HandCoinsIcon, LandPlotIcon, TestTube2Icon } from 'lucide-react'
import HeadingSubtitle from './SectionLable'
import JoinCourseForm from './JoinCourseForm'

const JoinCourseSection = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 items-center content-center'>
        <div className=''>
            <HeadingSubtitle title="HOW TO START" className='before:bg-primary text-primary mb-4'/>
            <Typography as="title" className='block mb-4'>Begin With Our <HighlightedText>Cost-Free</HighlightedText> Seminars</Typography>
            <Typography as="lable" className='text-primary'>Sit amet dictum sit amet justo donec enim. Posuere lorem ipsum dolor sit amet consectetur. Tristique senectus et netus et malesuada fames ac.</Typography>
            <div className='mt-10 space-y-3'>
                <div className='flex gap-4 text-primary items-center'>
                    <BookTextIcon className='w-10 h-10'/>
                    <Typography as="h3" className='text-primary'>We Offer Hands-On Instructions.</Typography>
                </div>
                <div className='flex gap-4 text-primary items-center'>
                    <HandCoinsIcon className='w-10 h-10'/>
                    <Typography as="h3" className='text-primary'>100% Placement Assistance.</Typography>
                </div>
                <div className='flex gap-4 text-primary items-center'>
                    <LandPlotIcon className='w-10 h-10'/>
                    <Typography as="h3" className='text-primary' >Tailor Made Courses.</Typography>
                </div>
                <div className='flex gap-4 text-primary items-center'>
                    <TestTube2Icon className='w-10 h-10'/>
                    <Typography as="h3" className='text-primary' >Real Time Projects.</Typography>
                </div>
            </div>
        </div>
        <div className='mt-10 md:mt-0'>
            <JoinCourseForm/>
        </div>
    </div>
  )
}

export default JoinCourseSection