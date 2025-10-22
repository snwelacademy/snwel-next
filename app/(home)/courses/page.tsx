import CourseCard from '@/components/courses/CourseCard'
import PageHeader from '@/components/shared/PageHeader'
import { getListOptionsFromSearchParams } from '@/lib/utils'
import { getPublicCourses } from '@/services/public/course-service'
import { nanoid } from 'nanoid'


const CourseListPage = async ({searchParams}: {searchParams: any}) => {
    const courses = await getPublicCourses(getListOptionsFromSearchParams(new URLSearchParams(searchParams) ))
    return (
        <>
            <PageHeader title="Course Listing" />

            <section className='py-20 px-4'>
                <div className="container mx-auto px-4">
                    <div className='grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 items-center justify-items-center mt-10'>
                        {
                            courses?.docs.map(cs => {
                                return <div className='w-full' key={nanoid()}><CourseCard course={cs} key={nanoid()} /></div>
                            })
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default CourseListPage