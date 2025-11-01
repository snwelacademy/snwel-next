'use client'

import Typography from '../typography'
import { Button } from '../ui/button'
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel'
import HighlightPan from './HighlightPan'
import HeadingSubtitle from './SectionLable'
import { useRef } from 'react'
import EnrollCourseModal from '../courses/EnrollCourseModal'
import Link from 'next/link'
import Image from 'next/image'


const Hero = () => {
    const container = useRef(null);

    return (
        <Carousel
            onChange={e => console.log({ e })}
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
                                        <img alt="" src="assets/images/hero-img-1.webp" className="w-full hero-img-1" />
                                    </div>
                                    <div className="flex items-center">
                                        <div className=" lg:mt-0 text-center ">
                                            <HeadingSubtitle className='hero-title text-primary-foreground before:bg-primary-foreground after:bg-primary-foreground' title='Independent institution empowering future professionals' />
                                            <Typography as={'heroTitle'} className="hero-subtitle mb-16 text-4xl font-black tracking-tight md:text-6xl xl:text-6xl text-primary-foreground text-center">
                                            Welcome to <span className='text-green-700'>SNWEL Academy</span> <br/> Your Pathway to Professional Excellence
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
                                        <img alt="" src="/assets/images/hero-img-2.webp" className="w-full hero-img-1" />
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
{/* 
                <CarouselItem>
                    <div className="container mx-auto px-4 py-12">
                        <div className="flex flex-col md:flex-row items-center justify-between">
                            <div className="md:w-1/2 mb-8 md:mb-0">
                                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                                    Take student experience to the next level
                                    <span className="text-purple-600 text-6xl">.</span>
                                </h1>
                                <p className="text-gray-600 mb-6">
                                    Power school is doing everything we can to make it easy for
                                    districts to get up and running with distance learning.
                                </p>
                                <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3">
                                    LEARN NOW
                                </Button>
                            </div>
                            <div className="md:w-1/2 relative">
                                <div className="bg-purple-500 rounded-full w-64 h-64 md:w-80 md:h-80 overflow-hidden">
                                    <Image
                                        src="/placeholder.svg?height=320&width=320"
                                        alt="Student"
                                        width={320}
                                        height={320}
                                        className="object-cover"
                                    />
                                </div>
                                <div className="absolute top-0 right-0 bg-white p-2 rounded-full shadow-lg">
                                    <Image
                                        src="/placeholder.svg?height=24&width=24"
                                        alt="Google Drive"
                                        width={24}
                                        height={24}
                                    />
                                </div>
                                <div className="absolute bottom-0 left-0 bg-white p-2 rounded-full shadow-lg">
                                    <Image
                                        src="/placeholder.svg?height=24&width=24"
                                        alt="Google Meet"
                                        width={24}
                                        height={24}
                                    />
                                </div>
                                <div className="absolute top-1/2 right-0 bg-white p-2 rounded-full shadow-lg">
                                    <Image
                                        src="/placeholder.svg?height=24&width=24"
                                        alt="YouTube"
                                        width={24}
                                        height={24}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                </CarouselItem> */}

            </CarouselContent>
        </Carousel >
    )
}

export default Hero