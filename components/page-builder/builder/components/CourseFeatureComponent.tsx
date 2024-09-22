'use client'
import CourseFeatures from "@/components/shared/CourseFeatures";
import { ComponentConfig } from "@measured/puck";

export type CourseFeatureComponentProps = {
    
  };

export const CourseFeatureComponent: ComponentConfig<CourseFeatureComponentProps> = {
    render: () => {
        return  <div className="">
            <CourseFeatures/>
        </div> 
    }
}