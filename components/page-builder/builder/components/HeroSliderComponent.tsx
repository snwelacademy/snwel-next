'use client'
import Hero from "@/components/shared/Hero";
import { ComponentConfig } from "@measured/puck";

export type HeroProps = {
    
  };

export const HeroSliderComponent: ComponentConfig<HeroProps> = {
    render: () => {
        return <Hero/>
    }
}