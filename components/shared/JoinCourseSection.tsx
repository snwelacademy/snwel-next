'use client'
import HighlightedText from '../typography/HighlightedHeading'
import Typography from '../typography'
import {BookTextIcon, HandCoinsIcon, LandPlotIcon, TestTube2Icon } from 'lucide-react'
import HeadingSubtitle from './SectionLable'
import JoinCourseForm from './JoinCourseForm'

const JoinCourseSection = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 items-center content-center from-blue-500 to-purple-500 bg-gradient-to-r p-10 rounded-3xl'>
        <div className=' text-primary-foreground'>
            <HeadingSubtitle title="HOW TO START" className='before:bg-primary text-primary-foreground mb-4'/>
            <Typography as="title" className='block mb-4 text-primary-foreground'>Enroll in Our Top-Rated Courses</Typography>
            <Typography as="lable" className='text-primary-foreground'> Discover why our job-guaranteed programs are the preferred choice for career-driven individuals seeking quality education, expert guidance, and real-world experience.</Typography>
            <div className='mt-10 space-y-3'>
                <div className='flex gap-4 text-primary-foreground items-center'>
                    <BookTextIcon className='w-10 h-10'/>
                    <Typography as="h3" className='text-primary-foreground'>We Offer Hands-On Instructions.</Typography>
                </div>
                <div className='flex gap-4 text-primary-foreground items-center'>
                    <HandCoinsIcon className='w-10 h-10'/>
                    <Typography as="h3" className='text-primary-foreground'>100% Placement Assistance.</Typography>
                </div>
                <div className='flex gap-4 text-primary-foreground items-center'>
                    <LandPlotIcon className='w-10 h-10'/>
                    <Typography as="h3" className='text-primary-foreground' >Tailor Made Courses.</Typography>
                </div>
                <div className='flex gap-4 text-primary-foreground items-center'>
                    <TestTube2Icon className='w-10 h-10'/>
                    <Typography as="h3" className='text-primary-foreground' >Real Time Projects.</Typography>
                </div>
            </div>
        </div>
        <div className='mt-10 md:mt-0 bg-primary-foreground rounded-3xl'>
            <JoinCourseForm/>
        </div>
    </div>
  )
}

export default JoinCourseSection