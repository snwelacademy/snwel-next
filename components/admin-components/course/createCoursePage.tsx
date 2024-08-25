'use client'
import BreadCrumb from '@/components/BreadCrumb';
import MutateCourse from '@/components/courses/MutateCourse';
import { Heading } from '@/components/ui/Heading';
import { Separator } from '@/components/ui/separator';



const CreateNewCoursePage = () => {
  
    const breadcrumbItems = [{ title: "Courses", link: "/admin/courses/create" }];
    
  return (
    <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
      <BreadCrumb items={breadcrumbItems} />

      <div className="flex items-start justify-between">
        <Heading
          title={'Create Course'}
          description={'Create new Course'}
        />
      </div>
      <Separator />

      
       <MutateCourse />
      
    </div>
  )
}

export default CreateNewCoursePage