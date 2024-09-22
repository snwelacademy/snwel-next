'use client'
import MarketingOne from "@/components/shared/MarketingOne";
import { ComponentConfig } from "@measured/puck";

export type MarketingOneComponentProps = {
    
  };

export const MarketingOneComponent: ComponentConfig<MarketingOneComponentProps> = {
    render: () => {
        return  <div className="">
            <MarketingOne/>
        </div> 
    }
}