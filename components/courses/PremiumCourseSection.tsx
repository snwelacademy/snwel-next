// 'use client'
import { cn } from '@/lib/utils'
import HeadingSubtitle from '../shared/SectionLable'
import Typography from '../typography'
import HighlightedText from '../typography/HighlightedHeading'
import PremiumCourseCard from './PremiumCourseCard'
// import FadeInStaggered from '../animate/FadeinStaggered'
import { nanoid } from 'nanoid'
// import { CourseFilterData } from './CourseFilter'
// import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAllCourses } from '@/services/admin/admin-course-service'
import { useListOptions } from '@/hooks/useListOption'
import Loader from '../Loader'

const PremiumCourseSection = async ({ className }: { className?: string }) => {

    const data = await getAllCourses({filter: {isPremium: true}})
    // const [courseFilter, setFilter] = useState<CourseFilterData>();
    // const [options] = useListOptions()
    // const {data, isLoading} = useQuery({
    //     queryKey: ['/admin/course', options.filter], 
    //     queryFn: () => {
    //         return getAllCourses({filter: {isPremium: true}})
    //     },
    //     enabled: Boolean(options)
    //   })

    
    return (
        <section className={cn(['py-20 bg-primary/5 px-4', className])}>
            <div className='text-primary flex items-center justify-center flex-col max-w-4xl mx-auto text-center mb-10'>
                <HeadingSubtitle title='LINKING UP EDUCATION' className='before:bg-primary after:bg-primary text-primary' />
                <Typography as="title" className='mb-7'>Explore Our <HighlightedText>Job Guaranteed Courses</HighlightedText></Typography>
                <Typography as="p" >
                    Amet nisl suscipit adipiscing bibendum est ultricies integer quis auctor. Velit euismod in pellentesque massa placerat duis. Nisi quis eleifend quam adipiscing vitae. Egestas pretium aenean.
                </Typography>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-items-center container gap-10 '>
               
                {
                    
                 
                   data?.docs?.map(pc => {
                        return <PremiumCourseCard key={nanoid()} course={pc} courseImage={pc.images?.promotionalCardImage} />
                    })
                    
                }
              
            </div>

        </section>
    )
}

export default PremiumCourseSection