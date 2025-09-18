'use client'
import dynamic from 'next/dynamic'
const Hero = dynamic(() => import('@/components/shared/Hero'), { ssr: false })
import { ComponentConfig } from "@measured/puck";

export type HeroProps = {
    
  };

export const HeroSliderComponent: ComponentConfig<HeroProps> = {
    render: () => {
        return <Hero/>
    }
}