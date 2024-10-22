'use client'

import { Skeleton } from "@/components/ui/skeleton"
import Typography from "../typography"
import HeadingSubtitle from "../shared/SectionLable"

const PopularBlogsSkeleton = () => {
  return (
    <div>
      <HeadingSubtitle title="Blogs" className="mb-3" />
      <Typography as="title">Popular Blogs up</Typography>

      <div className="py-10 grid grid-cols-1 items-center justify-items-center md:grid-cols-2 lg:grid-cols-3 gap-5">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="w-full max-w-sm">
            <Skeleton className="h-48 w-full rounded-lg mb-4" />
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2 mb-4" />
            <div className="flex items-center space-x-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PopularBlogsSkeleton