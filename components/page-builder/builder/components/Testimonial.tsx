'use client'
import CtaOne from "@/components/shared/CtaOne";
import Testimonial from "@/components/shared/Testimonial";
import { ComponentConfig } from "@measured/puck";

export type TestimonialComponentProps = {
    
  };

export const TestimonialComponent: ComponentConfig<TestimonialComponentProps> = {
    render: () => {
        return  <div className="">
            <Testimonial/>
        </div> 
    }
}