'use client'
import CtaOne from "@/components/shared/CtaOne";
import { ComponentConfig } from "@measured/puck";

export type CtaOneComponentProps = {
    
  };

export const CTAOneComponent: ComponentConfig<CtaOneComponentProps> = {
    render: () => {
        return  <div className="">
            <CtaOne/>
        </div> 
    }
}