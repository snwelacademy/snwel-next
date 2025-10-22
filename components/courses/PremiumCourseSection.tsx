import { getPublicCourses } from '@/services/public/course-service'
import PremiumCourseSectionUi from './PremiumCourseSectionUi'

const PremiumCourseSection = async ({ className }: { className?: string }) => {

    const data = await getPublicCourses({filter: {isPremium: true}})
    return (
        <PremiumCourseSectionUi data={data.docs} className={className}/>
    )
}

export default PremiumCourseSection