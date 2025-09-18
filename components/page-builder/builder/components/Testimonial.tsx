'use client'
import CtaOne from "@/components/shared/CtaOne";
import dynamic from 'next/dynamic'
const TestimonialWidget = dynamic(() => import('@/components/shared/Testimonial'), { ssr: false })
import { ComponentConfig } from "@measured/puck";

export type TestimonialComponentProps = {
    
  };

export const TestimonialComponent: ComponentConfig<TestimonialComponentProps> = {
    render: () => {
        return  <div className="">
            <TestimonialWidget/>
        </div> 
    }
}