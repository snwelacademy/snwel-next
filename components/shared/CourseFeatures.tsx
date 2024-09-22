'use client'

import { Dice5Icon, ListMinusIcon, NotebookIcon, Play, SettingsIcon, TangentIcon, User2Icon, ZapIcon } from 'lucide-react'
import  { ReactNode } from 'react'
import SectionTitle from './SectionTitle'
import HeadingSubtitle from './SectionLable'
import { nanoid } from 'nanoid'
import Typography from '../typography'
import HighlightedText from '../typography/HighlightedHeading'

const content: {
    title: string,
    subtitle: string,
    icon: ReactNode
}[] = [
    {
        title: 'Certification Courses with Industry Recognition',
        subtitle: 'Gain credentials that are recognized and valued by employers in the industry. Our certification programs boost your resume and open doors to better job opportunities.',
        icon: <ZapIcon className='w-12 h-12 text-primary group-hover:text-primary-foreground' />
    },
    {
        title: 'Personalized Training Tailored to Your Needs',
        subtitle: 'Receive customized learning experiences that match your skill level and career goals. Our tailored approach ensures you get the most out of your training.',
        icon: <Play className='w-12 h-12 text-primary group-hover:text-primary-foreground' />
    },
    {
        title: '100% Job-Oriented Courses with Placement Assistance',
        subtitle: 'Our courses are designed to meet the demands of today’s job market, ensuring you acquire the skills employers seek. Benefit from our dedicated placement support to secure your dream job.',
        icon: <NotebookIcon className='w-12 h-12 text-primary group-hover:text-primary-foreground' />
    },
    {
        title: 'Mentoring by Industry Experts and Access to Latest Technologies',
        subtitle: 'Learn from seasoned professionals who bring real-world experience into the classroom. Stay ahead with training on the latest tools and technologies used in the industry',
        icon: <TangentIcon className='w-12 h-12 text-primary group-hover:text-primary-foreground' />
    },
    {
        title: 'Hands-On Training with Live Projects & Soft Skills Development',
        subtitle: 'Get practical experience by working on real-world projects that prepare you for the challenges of your career. Our programs also include soft skills training to enhance your communication and teamwork abilities.',
        icon: <ListMinusIcon className='w-12 h-12 text-primary group-hover:text-primary-foreground' />
    },
    {
        title: 'First-Time Scholarship Programs in the Eastern Region',
        subtitle: 'Take advantage of exclusive scholarships that make our courses more accessible. We’re the first in the region to offer these financial support options to deserving students.',
        icon: <Dice5Icon className='w-12 h-12 text-primary group-hover:text-primary-foreground' />
    },
    {
        title: 'Job Guarantee & Money-Back Guarantee on Long-Term Courses',
        subtitle: 'We’re confident in our training programs, offering a job guarantee or your money back on select long-term courses. Your success is our priority',
        icon: <SettingsIcon className='w-12 h-12 text-primary group-hover:text-primary-foreground' />
    },
    {
        title: 'Flexible Timing & Lowest Price Guarantee on Courses',
        subtitle: 'Choose from a variety of schedules, including weekdays and weekends, to fit your lifestyle. We offer the best value with a lowest price guarantee, so you get top-quality education at an affordable rate',
        icon: <User2Icon className='w-12 h-12 text-primary group-hover:text-primary-foreground' />
    },
]

const CourseFeatures = () => {
  return (
    <section className='py-24 bg-primary/5 '>
        <div className='container mx-auto px-4'>
        <HeadingSubtitle title="Our Course Features" className='text-primary before:bg-primary' />
        <SectionTitle>Unleash Your <HighlightedText>Engineering Potential</HighlightedText></SectionTitle>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center  gap-7 mt-16 '>
            {
                content.map(ct => {
                    return <div key={nanoid()} className=' group bg-background h-full border-2 border-primary/30 rounded-2xl p-3 hover:bg-primary hover:text-primary-foreground transition duration-300' >
                        <span className='mb-3 inline-block'>{ct.icon}</span>
                        <Typography as="h3" >{ct.title}</Typography>
                        <Typography as="lable" >{ct.subtitle}</Typography>
                    </div>
                })
            }
        </div>
        </div>
    </section>
  )
}

export default CourseFeatures