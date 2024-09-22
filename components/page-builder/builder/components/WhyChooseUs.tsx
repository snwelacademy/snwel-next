'use client'
import WhyChooseUs from "@/components/shared/WhyChooseUs";
import { ComponentConfig } from "@measured/puck";

export type WhyChooseUsComponentProps = {
    
  };

export const WhyChooseUsComponent: ComponentConfig<WhyChooseUsComponentProps> = {
    render: () => {
        return  <div className="">
            <WhyChooseUs/>
        </div> 
    }
}