import { ReactNode } from 'react'
import HeadingSubtitle from './SectionLable'
import Typography from '../typography'
import HighlightedText from '../typography/HighlightedHeading'
import { Calendar, CreditCard, DiamondIcon, RocketIcon } from 'lucide-react'
import { nanoid } from 'nanoid'
import { Button } from '../ui/button'

const content: { title: string, icon: ReactNode, subtitle: string }[] = [
    {
        title: 'Program',
        subtitle: 'Learn the latest skills in engineering to enhance your skills and become more marketable, productive.',
        icon: <Calendar className='w-10 h-10' />
    },
    {
        title: "Affordability",
        subtitle: "We provide affordable courses to students in a group, job-seeker and financially back-ward students. Ask for scholarship program",
        icon: <DiamondIcon className='w-10 h-10' />
    },
    {
        title: "Certification",
        subtitle: "Professional certificates add valuable credentials to a resume by showing potential or current employers.",
        icon: <CreditCard className='w-10 h-10' />
    },
    {
        title: "ISO Certification",
        subtitle: "We provide supports for students even after completion of the course to brush-up their skills and job assistance.",
        icon: <RocketIcon className='w-10 h-10' />
    },

]

const RoudendPan = ({
    image
}: {
    image?: string,
}) => {
    return <div className='rounded-2xl overflow-hidden max-w-[300px]'>
        <img className='w-full' src={image} />
    </div>
}




const StatisticsSection = () => {
    return (
        <section className='grid lg:grid-cols-2 grid-cols-1 gap-5'>
            <div className='flex gap-5'>
                <div className='flex items-center justify-center flex-col gap-5'>
                    <RoudendPan image="/assets/images/New-Rectangle-2.webp" />
                    <RoudendPan image="/assets/images/Vector-1.2.webp" />
                </div>
                <div className='flex flex-col gap-5'>
                    <RoudendPan image="/assets/images/advanced-stress-anlysis-piping-system-sq.jpg" />
                    <RoudendPan image="/assets/images/New-Rectangle-4.webp" />
                </div>
            </div>

            <div >
                <HeadingSubtitle className='text-primary before:bg-primary ' title="Flexible supported learning" />
                <Typography as="title" className='mb-7'>
                    Expertise Across <HighlightedText>All Disciplines</HighlightedText>
                </Typography>

                <Typography as="lable" className='text-primary'>
                    Metus dictum at tempor commodo ullamcorper a lacus vestibulum. In hendrerit gravida rutrum quisque non tellus. Egestas sed sed risus pretium quam vulputate.
                </Typography>

                <div className='grid gap-5 grid-cols-1 items-center md:grid-cols-2 mt-10 '>
                    {
                        content.map(ct => {
                            return <div key={nanoid()} className='flex gap-5 '>
                                <div className='flex items-start justify-start text-primary'>
                                    <span> {ct.icon}</span>
                                </div>
                                <div>
                                    <Typography as="h1" className={"font-bold mb-4 text-3xl md:text-4xl text-primary"}>{ct.title}</Typography>
                                    <Typography as="lable" className='text-primary'>{ct.subtitle}</Typography>
                                </div>
                            </div>
                        })
                    }
                </div>

                <div className='mt-5'>
                    <Button size={'lg'} className='w-full '>Learn More</Button>
                </div>
            </div>
        </section>
    )
}

export default StatisticsSection