'use client'
import {DoubleArrowRightIcon} from '@radix-ui/react-icons'
import { ReactNode } from 'react'
import SectionTitle from './SectionTitle'
import Typography from '../typography'
import { Button } from '../ui/button'
import { nanoid } from 'nanoid'
import Link from 'next/link'

const content: { title: string, desc: string, icon?: ReactNode }[] = [
    {
        title: "Students",
        desc: "Start your career with confidence. Our courses provide the hands-on experience and industry exposure that sets you apart in the job market. Turn your academic knowledge into practical skills that employers value.",
        icon: <DoubleArrowRightIcon className='w-14 h-14 text-primary-foreground' />
    },
    {
        title: "Job Seekers",
        desc: "Enhance your employability and secure your dream job with our specialized training programs. We focus on the skills that matter most to employers, making you more competitive and marketable in a crowded job market.",
        icon: <DoubleArrowRightIcon className='w-14 h-14 text-primary-foreground' />
    },
    {
        title: "Working Professionals ",
        desc: "Stay ahead of the curve with advanced courses designed to keep you at the forefront of your industry. Whether you’re looking to update your skills or take on new challenges, SNWEL Academy helps you remain productive and successful.",
        icon: <DoubleArrowRightIcon className=' w-14 h-14 text-primary-foreground' />
    },
    // {
    //     title: "Providing interactive learning",
    //     desc: "We offer a stimulating learning environment that combines interactive sessions, practical exercises, and personalized feedback for deeper understanding.",
    //     icon: <ChevronsLeftRight className='text-primary-foreground' />
    // }
]

const WhyChooseUs = () => {
    return (
        <div className='grid grid-cols-1 items-center md:grid-cols-2 gap-5'>
            <div className='flex justify-center md:block flex-col text-center md:text-start'>
                <SectionTitle title=' Who We Serve' />
                <Typography as="p" className='max-w-2xl'>We empower individuals and businesses to achieve their career goals through our job-guaranteed courses, tailored to meet the demands of today's competitive job market.</Typography>
                <Link href="/about"><Button size="lg" className='mt-5'>Learn More</Button></Link>
            </div>
            <div className='space-y-3'>
                {
                    content.map(ct => {
                        return <div key={nanoid()} className='rounded-xl overflow-hidden p-4 flex gap-3 bg-primary/10 items-center'>
                            <span className='inline-block p-3 bg-gradient rounded-xl '>{ct.icon}</span>
                            <div className='space-y-2'>
                                <Typography as={'h3'}>{ct.title}</Typography>
                                <Typography as={'p'}>{ct.desc}</Typography>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default WhyChooseUs