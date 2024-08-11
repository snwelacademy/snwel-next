import {DoubleArrowRightIcon} from '@radix-ui/react-icons'
import { ReactNode } from 'react'
import SectionTitle from './SectionTitle'
import Typography from '../typography'
import { Button } from '../ui/button'
import { nanoid } from 'nanoid'
import Link from 'next/link'

const content: { title: string, desc: string, icon?: ReactNode }[] = [
    {
        title: "Collaborating with experienced professionals",
        desc: "Our instructors are renowned practitioners who share their real-world expertise and insights, ensuring you learn from the best.",
        icon: <DoubleArrowRightIcon className='w-14 h-14 text-primary-foreground' />
    },
    {
        title: "Developing cutting-edge curriculum",
        desc: "Our courses are constantly updated to reflect the latest industry trends and standards, keeping you ahead of the curve.",
        icon: <DoubleArrowRightIcon className='w-14 h-14 text-primary-foreground' />
    },
    {
        title: "Catering to diverse disciplines ",
        desc: "We offer a wide range of programs across various engineering fields, allowing you to find the perfect fit for your career goals.",
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
                <SectionTitle title=' Who We Are: Building Your Engineering Expertise' />
                <Typography as="p" className='max-w-2xl'>Empower your engineering career with Snwel Academy, your trusted partner for industry-relevant training.</Typography>
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