'use client'

import { useQuery } from '@tanstack/react-query'
import { getAllCourses } from '@/services/admin/admin-course-service'
import { useListOptions } from '@/hooks/useListOption'
import PremiumCourseSectionUi from './PremiumCourseSectionUi'
import { useState } from 'react'
import { CourseFilterData } from './CourseFilter'

const PremiumCourseClientWrapper = ({ className }: { className?: string }) => {

    const [courseFilter, setFilter] = useState<CourseFilterData>();
    const [options] = useListOptions()
    const {data, isLoading} = useQuery({
        queryKey: ['/admin/course', options.filter], 
        queryFn: () => {
            return getAllCourses({filter: {isPremium: true}})
        },
        enabled: Boolean(options)
      })

    
    return (
        <PremiumCourseSectionUi data={data?.docs||[]}/>
    )
}

export default PremiumCourseClientWrapper