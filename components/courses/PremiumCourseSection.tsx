
import { getAllCourses } from '@/services/admin/admin-course-service'
import PremiumCourseSectionUi from './PremiumCourseSectionUi'

const PremiumCourseSection = async ({ className }: { className?: string }) => {

    const data = await getAllCourses({filter: {isPremium: true}})
    return (
        <PremiumCourseSectionUi data={data.docs}/>
    )
}

export default PremiumCourseSection