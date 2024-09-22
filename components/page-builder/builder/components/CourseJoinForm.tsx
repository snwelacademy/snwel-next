'use client'
import PopularBlogsSection from "@/components/blog/PopularBlogsSection";
import JoinCourseSection from "@/components/shared/JoinCourseSection";
import { ComponentConfig } from "@measured/puck";

export type JoinCourseComponentProps = {
    
  };

export const JoinCourseComponent: ComponentConfig<JoinCourseComponentProps> = {
    render: () => {
        return  <div className="">
            <JoinCourseSection/>
        </div> 
    }
}