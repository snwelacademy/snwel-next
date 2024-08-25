'use client'
import StatisticsSection from "@/components/shared/StatisticsSection";
import { ComponentConfig } from "@measured/puck";

export type StatisticsProps = {
    
  };

export const StatisticsComponent: ComponentConfig<StatisticsProps> = {
    render: () => {
        return  <div className="">
            <StatisticsSection/>
        </div> 
    }
}