
import Autoplay from "embla-carousel-autoplay"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { LayersIcon } from 'lucide-react';
import Typography from '../typography';
import { CourseCategory } from '@/types';

const PopularCategories = () => {
    const categories = [] as CourseCategory[]
    return (
        <div>
            <Carousel
                plugins={[
                    Autoplay({
                        delay: 2000,
                    }),
                ]}
            >
                <CarouselContent>
                    {categories.map((courseData) => (
                        <CarouselItem className='md:basis-1/2 lg:basis-1/3' key={courseData._id}>
                            <div className='bg-white rounded-2xl'>
                                <div className='rounded-2xl bg-primary/10 space-y-3 p-4'>
                                    <span className='w-12 h-12 rounded-full bg-primary flex items-center justify-center'>
                                        <LayersIcon className='text-primary-foreground' />
                                    </span>

                                    <Typography as="h3" className='text-primary'>{courseData.title}</Typography>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                        <CarouselNext />
            </Carousel>

        </div>
    )
}

export default PopularCategories