
import { cn } from '@/lib/utils'
import { Course } from '@/types'
import React from 'react'
import HeadingSubtitle from '../shared/SectionLable'
import HighlightedText from '../typography/HighlightedHeading'
import Typography from '../typography'
import PremiumCourseCard from './PremiumCourseCard'
import { nanoid } from 'nanoid'

type PremiumCourseProps = {
    data: Course[],
    className?: string
}

const PremiumCourseSectionUi = ({
    data,
    className
} : PremiumCourseProps) => {
  return (
    <section className={cn(['py-20 bg-primary/5 px-4', className])}>
            <div className='text-primary flex items-center justify-center flex-col max-w-4xl mx-auto text-center mb-10'>
                <HeadingSubtitle title='LINKING UP EDUCATION' className='before:bg-primary after:bg-primary text-primary' />
                <Typography as="title" className='mb-7'>Explore Our <HighlightedText>Job Guaranteed Courses</HighlightedText></Typography>
                <Typography as="p" >
                We've partnered with industry leaders to offer programs that equip you with the skills and knowledge needed for in-demand jobs. Our dedicated team provides personalized guidance and support, ensuring you're well-prepared to succeed in your chosen field.
                </Typography>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-items-center container gap-10 '>
               
                {
                    
                 
                   data?.map(pc => {
                        return <PremiumCourseCard key={nanoid()} course={pc} courseImage={pc.images?.promotionalCardImage} />
                    })
                    
                }
              
            </div>

        </section>
  )
}

export default PremiumCourseSectionUi