'use client'

import BreadCrumb from '@/components/BreadCrumb';
import Loader from '@/components/Loader';
import MutateCourse from '@/components/courses/MutateCourse';
import { Heading } from '@/components/ui/Heading';
import { Separator } from '@/components/ui/separator';
import { getCourse } from '@/services/admin/admin-course-service';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';



const MutateCoursePage = () => {
  const params = useParams();
  const {data, isLoading} = useQuery({
    queryKey: [`course`, params.id],
    queryFn: () => getCourse(params.id as string)
    });
    const breadcrumbItems = [{ title: "Courses", link: "/admin/courses/create" }];
    
  return (
    <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
      <BreadCrumb items={breadcrumbItems} />

      <div className="flex items-start justify-between">
        <Heading
          title={params.id ? 'Update Course' : 'Create Course'}
          description={params.id ? 'Update Course' : 'Create new Course'}
        />
      </div>
      <Separator />

      {
        isLoading ? <Loader type={'default'}/> : !data ? <div>Invalid Course</div> : <MutateCourse courseData={data} />
      }
    </div>
  )
}

export default MutateCoursePage