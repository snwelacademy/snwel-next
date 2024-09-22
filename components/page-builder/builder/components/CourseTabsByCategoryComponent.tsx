'use client'
import CourseTabByCategory from "@/components/courses/CourseTabByCategory";
import SectionTitle from "@/components/shared/SectionTitle";
import { ComponentConfig } from "@measured/puck";

export type CourseTabsComponentProps = {
    
  };

export const CourseTabsComponent: ComponentConfig<CourseTabsComponentProps> = {
    render: () => {
        return  <div className="">
         <SectionTitle title="Our Courses" />
            <CourseTabByCategory/>
        </div> 
    }
}