'use client'
import SectionTitle from './SectionTitle'
import Typography from '../typography'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay"
import { getAllTestimonials } from '@/services/testimonial-service';
import { nanoid } from 'nanoid';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';

const Testimonial = () => {
    const { data: testimonialData, isLoading } = useQuery({
        queryKey: ['/testimonials'],
        queryFn: () => getAllTestimonials({ limit: 20 })
    })

    const testimonials = testimonialData?.docs || []

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <div className="col-span-2 flex flex-col gap-4">
                    <SectionTitle title='What they say about us' />
                    <Typography as="p" className='max-w-2xl'>Loading testimonials...</Typography>
                </div>
            </div>
        )
    }

    if (testimonials.length === 0) {
        return null
    }

    return (
        <div>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-5 '>
                <div className='col-span-2 flex-col gap-4'>
                    <SectionTitle title='What they say about us' />
                    <Typography as="p" className='max-w-2xl'>Hear what our students and clients have to say about their experience with SNWEL Academy.</Typography>

                    <Carousel
                        plugins={[
                            Autoplay({
                                delay: 2000,
                            }),
                        ]}
                    >
                        <CarouselContent>
                            {testimonials.map((tst) => (
                                <CarouselItem className='md:basis-1/2 lg:basis-1/3' key={nanoid()}>
                                    <div className='rounded-xl overflow-hidden p-4 flex flex-col gap-3'>
                                        <Typography as="p" className='text-muted-foreground text-center'>&quot;{tst.content}&quot;</Typography>

                                        {tst.rating && (
                                            <div className='flex justify-center gap-1'>
                                                {Array.from({ length: tst.rating }).map((_, i) => (
                                                    <span key={i} className='text-yellow-500'>⭐</span>
                                                ))}
                                            </div>
                                        )}

                                        <div className='flex items-center gap-4'>
                                            <span className='inline-block w-12 h-12 bg-center bg-cover rounded-full relative overflow-hidden'>
                                                <Image
                                                    src={tst.avatar || '/assets/images/avatar.jpg'}
                                                    alt={tst.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </span>

                                            <div className=''>
                                                <Typography as="lable" className='text-primary capitalize'>{tst.name}</Typography>
                                                <Typography as="p" className='text-xs text-muted-foreground'>
                                                    {tst.position}{tst.position && tst.company && ' at '}{tst.company}
                                                </Typography>
                                            </div>
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                </div>

                <div>
                    <img src="/assets/images/testimonial-2.png" alt="" />
                </div>
            </div>
        </div>
    )
}

export default Testimonial