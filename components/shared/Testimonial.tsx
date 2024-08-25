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

const Testimonial = () => {
    const testimonials = getAllTestimonials()
  return (
    <div>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-5 '>
            <div className='col-span-2 flex-col gap-4'>
                <SectionTitle title='What they say about us'/>
                <Typography as="p" className='max-w-2xl'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</Typography>

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
                                <Typography as="p" className='text-muted-foreground text-center'>&quot;{tst.text}&quot;</Typography>

                                <div className='flex items-center gap-4'>
                                    <span className='inline-block w-12 h-12 bg-center bg-cover rounded-full' style={{backgroundImage: `url(${tst.image})`}}></span>

                                    <div className=''>
                                        <Typography as="lable" className='text-primary capitalize'>{tst.name}</Typography>
                                    </div>

                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                {/* <CarouselPrevious />
                <CarouselNext /> */}
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