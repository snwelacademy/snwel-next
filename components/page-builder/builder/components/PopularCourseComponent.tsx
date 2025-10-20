'use client'
import dynamic from 'next/dynamic'
const PopularCourseSlider = dynamic(() => import('@/components/courses/PopularCourseSlider'), { ssr: false })
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