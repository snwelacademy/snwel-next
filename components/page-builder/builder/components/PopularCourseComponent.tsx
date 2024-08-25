'use client'
import PopularCourseSlider from "@/components/courses/PopularCourseSlider";
import SectionTitle from "@/components/shared/SectionTitle";
import { ComponentConfig } from "@measured/puck";

export type PopularCourseSliderProps = {
    
  };

export const PopularCourseSliderComponent: ComponentConfig<PopularCourseSliderProps> = {
    render: () => {
        return  <div className="">
            <SectionTitle title="Popular Courses" />
            <PopularCourseSlider />
        </div> 
    }
}