'use client'
import PremiumCourseClientWrapper from "@/components/courses/PremiumCourseClientWrapper";
// import PremiumCourseSection from "@/components/courses/PremiumCourseSection";
import { ComponentConfig } from "@measured/puck";

export type PremiumCourseProps = {
    
  };

export const PremiumCourseComponent: ComponentConfig<PremiumCourseProps> = {
    render: () => {
        return  <div className="">
            <PremiumCourseClientWrapper/>
        </div> 
    }
}


