'use client'
import { nanoid } from 'nanoid'
import { ReactNode } from 'react'
import Typography from '../typography'
import SectionTitle from './SectionTitle'
import { CommandIcon } from 'lucide-react'

const content: { title: string, desc: string, icon: ReactNode }[] = [
    {
        title: 'Master In-Demand Skills',
        desc: 'Gain the specialized expertise employers are looking for, making you a more competitive candidate in the job market.',
        icon: <CommandIcon className='text-primary-foreground group-hover:text-primary' />
    },
    {
        title: 'Expert Faculty',
        desc: 'Learn from industry veterans and experienced professionals who bring real-world insights into the classroom.',
        icon: <CommandIcon className='text-primary-foreground group-hover:text-primary' />
    },
    {
        title: 'State-of-the-Art Facilities',
        desc: 'Our cutting-edge infrastructure supports an immersive learning experience, with access to the latest tools and technologies.',
        icon: <CommandIcon className='text-primary-foreground group-hover:text-primary' />
    },
    {
        title: 'Career-Focused Training',
        desc: 'Every course is designed with your future success in mind, providing you with the skills and knowledge needed to thrive in a competitive environment.',
        icon: <CommandIcon className='text-primary-foreground group-hover:text-primary' />
    },
]

const MarketingOne = () => {
    return (
        <div>
            <div className='flex flex-col items-center justify-center mb-16'>
                <SectionTitle className='max-w-2]xl text-center' title="Our Commitment to Excellence" />
                <Typography as="p" className='max-w-4xl text-center'>We empower individuals and businesses to achieve their career goals through our job-guaranteed courses, tailored to meet the demands of today's competitive job market. Our modern, innovative learning environment, combined with our commitment to delivering top-quality education, ensures that you receive the best possible training experience.</Typography>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8 pt-12 '>
                {
                    content.map(ct => {
                        return <div className='bg-white rounded-2xl relative odd:-top-10 group ' key={nanoid()}>
                            <div className='rounded-2xl bg-primary/10 space-y-3 p-4 hover:bg-primary shadow-xl'>
                                <span className='w-12 h-12 rounded-full bg-primary flex items-center justify-center group-hover:bg-primary-foreground'>
                                    {ct.icon}
                                </span>
                                <Typography as="h3" className='text-primary group-hover:text-primary-foreground'>{ct.title}</Typography>
                                <Typography as="p" className='text-muted-foreground leading-relaxed group-hover:text-primary-foreground '>{ct.desc}</Typography>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default MarketingOne