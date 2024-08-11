'use client'

import Typography from '../typography'
import { Button } from '../ui/button'
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel'
import HighlightPan from './HighlightPan'
import HeadingSubtitle from './SectionLable'
import { useRef } from 'react'
import EnrollCourseModal from '../courses/EnrollCourseModal'
import Link from 'next/link'
      

const Hero = () => {
    const container = useRef(null);

    return (
        <Carousel 
        onChange={e => console.log({e})}
        opts={{
            loop: true
        }}
        plugins={[
            

          ]}
        >
            <CarouselContent ref={container}>
                <CarouselItem>
                    {/* <Parallax speed={-10}> */}
                    <div className='min-h-screen pb-5' style={{ backgroundImage: `url(${"/assets/images/hero-bg.png"})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                        <div className="px-6 text-center lg:text-left bg-transparent">
                            <div className="w-100 mx-auto pt-20">
                                <div className="flex flex-col lg:flex-row">
                                    <div className="w-full  lg:w-[40%]">
                                        <img alt="" src="assets/images/hero-img-1.webp" className="w-full hero-img-1"  />
                                    </div>
                                    <div className="flex items-center">
                                        <div className=" lg:mt-0 text-center ">
                                            <HeadingSubtitle className='hero-title text-primary-foreground before:bg-primary-foreground after:bg-primary-foreground' title='independent institution with' />
                                            <Typography as={'heroTitle'} className="hero-subtitle mb-16 text-4xl font-black tracking-tight md:text-6xl xl:text-6xl text-primary-foreground text-center">
                                                Elevate Your Engineering Expertise <br />with Specialized Training
                                            </Typography>
                                            <div className='space-x-2 space-y-4'>
                                                <span className='inline-block'>
                                                <EnrollCourseModal
                                                trigger={<Button size={'hero'} variant={'destructive'}>Get Started</Button>}
                                                courseId=''
                                                />
                                                </span>
                                                <Link href="/courses" className=' inline-block'><Button className='hero-btn-2' size={'hero'} variant={'secondary'}>EXPLORE COURSES</Button></Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="hidden lg:block w-[40%]">
                                        <img alt="" src="/assets/images/hero-img-2.webp" className="w-full hero-img-1"  />
                                    </div>
                                </div>

                                <div className='mt-10 lg:mt-0 highlight-pan'>
                                    <HighlightPan />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* </Parallax> */}
                </CarouselItem>
                {/* <CarouselItem> */}
                {/* <Parallax speed={-10}> */}
                    {/* <div className='min-h-screen pb-5' style={{ backgroundImage: 'url(assets/images/hero-bg.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                        <div className="px-6 text-center lg:text-left bg-transparent">
                            <div className="w-100 mx-auto pt-20">
                                <div className="flex flex-col lg:flex-row">
                                    <div className="w-full  lg:w-[40%]">
                                        <img alt="" src="/assets/images/hero-img-1.webp" className="w-full"  />
                                    </div>
                                    <div className="flex items-center">
                                        <div className=" lg:mt-0 text-center ">
                                            <HeadingSubtitle className='text-primary-foreground before:bg-primary-foreground after:bg-primary-foreground' title='independent institution with' />
                                            <Typography as={'heroTitle'} className="mb-16 text-4xl font-black tracking-tight md:text-6xl xl:text-6xl text-primary-foreground text-center">
                                                Elevate Your Engineering Expertise <br />with Specialized Training
                                            </Typography>
                                            <div className='space-x-2'>
                                                <Button size={'lg'} variant={'destructive'}>GET STARTED</Button>
                                                <Button size={'lg'} variant={'secondary'}>LEARN MORE</Button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="hidden lg:block w-[40%]">
                                        <img alt="" src="/assets/images/hero-img-2.webp" className="w-full" />
                                    </div>
                                </div>

                                <div className='mt-10 lg:mt-0'>
                                    <HighlightPan />
                                </div>
                            </div>
                        </div>
                    </div> */}
                    {/* </Parallax> */}
                {/* </CarouselItem> */}
            </CarouselContent>
        </Carousel>
    )
}

export default Hero