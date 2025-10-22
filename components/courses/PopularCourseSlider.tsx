'use client'
import Autoplay from "embla-carousel-autoplay"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    // CarouselNext,
    // CarouselPrevious,
} from "@/components/ui/carousel"
import CourseCard from './CourseCard';
import { useQuery } from '@tanstack/react-query';
import { getPublicCourses } from '@/services/public/course-service';
import { useListOptions } from '@/hooks/useListOption';
import Loader from '../Loader';

const PopularCourseSlider = () => {
    const [options] = useListOptions()
    const {data, isLoading} = useQuery({
        queryKey: ['public/courses', {isPopular: true}], 
        queryFn: () => {
            return getPublicCourses({filter: {isPopular: true}})
        },
        enabled: Boolean(options)
      })
    return (
        <div>
            <Carousel
            
            opts={{
                loop: true
            }}
            plugins={[
                Autoplay({
                  delay: 5000,
                }),

              ]}
            >
                <CarouselContent>
                  
                    {
                    isLoading ? 
                    <Loader type="default" />:
                    data?.docs.map((courseData) => (
                        <CarouselItem className='md:basis-1/2 lg:basis-1/3' key={courseData._id}>
                            <CourseCard course={courseData}  />
                        </CarouselItem>
                    ))
                    }
        
                </CarouselContent>
                {/* <CarouselPrevious />
                <CarouselNext /> */}
            </Carousel>

        </div>
    )
}

export default PopularCourseSlider