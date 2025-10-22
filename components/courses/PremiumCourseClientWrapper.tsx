'use client'

import { useQuery } from '@tanstack/react-query'
import { getPublicCourses } from '@/services/public/course-service'
import { useListOptions } from '@/hooks/useListOption'
import PremiumCourseSectionUi from './PremiumCourseSectionUi'
import { useState } from 'react'
import { CourseFilterData } from './CourseFilter'

const PremiumCourseClientWrapper = ({ className }: { className?: string }) => {

    const [courseFilter, setFilter] = useState<CourseFilterData>();
    const [options] = useListOptions()
    const {data, isLoading} = useQuery({
        queryKey: ['public/courses', options.filter], 
        queryFn: () => {
            return getPublicCourses({filter: {isPremium: true}})
        },
        enabled: Boolean(options)
      })

    
    return (
        <PremiumCourseSectionUi data={data?.docs||[]}/>
    )
}

export default PremiumCourseClientWrapper