'use client'
import PopularBlogsSection from "@/components/blog/PopularBlogsSection";
import { ComponentConfig } from "@measured/puck";

export type PopulartBlogComponentProps = {
    
  };

export const PopularBlogComponent: ComponentConfig<PopulartBlogComponentProps> = {
    render: () => {
        return  <div className="">
            <PopularBlogsSection/>
        </div> 
    }
}