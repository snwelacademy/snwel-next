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
        title: 'Effective Lessons',
        subtitle: 'Course lesson allows students to interact and ask questions, tap into their background knowledge, and build new skills.',
        icon: <ZapIcon className='w-12 h-12 text-primary group-hover:text-primary-foreground' />
    },
    {
        title: 'Audio Visual Learning',
        subtitle: 'Our Courses are designed with audio-visual aids to provide you better understanding of the subject in a innovative modern classroom.',
        icon: <Play className='w-12 h-12 text-primary group-hover:text-primary-foreground' />
    },
    {
        title: 'Planned Curriculum',
        subtitle: 'Designed Courses Curriculum for each course provides skill matrix based learning.',
        icon: <NotebookIcon className='w-12 h-12 text-primary group-hover:text-primary-foreground' />
    },
    {
        title: 'Focus On Details',
        subtitle: 'Our Trainers simplifies the lessons based on students understanding & provides individual focus to students.',
        icon: <TangentIcon className='w-12 h-12 text-primary group-hover:text-primary-foreground' />
    },
    {
        title: 'Doubt Clearing & Recapitulation',
        subtitle: 'Our classes begins with doubt clearance of each students & summarizing the last class learning.',
        icon: <ListMinusIcon className='w-12 h-12 text-primary group-hover:text-primary-foreground' />
    },
    {
        title: 'Advanced Exercises',
        subtitle: 'Exercises are designed, focusing with theory & practical; provides better confidence to students.',
        icon: <Dice5Icon className='w-12 h-12 text-primary group-hover:text-primary-foreground' />
    },
    {
        title: '100% Job Oriented Courses',
        subtitle: 'Our courses are customized to industry needs with specific job requirements.',
        icon: <SettingsIcon className='w-12 h-12 text-primary group-hover:text-primary-foreground' />
    },
    {
        title: 'Industry Experts Mentoring',
        subtitle: 'Our classes are imparted by industry experts with 15+ years of experience.',
        icon: <User2Icon className='w-12 h-12 text-primary group-hover:text-primary-foreground' />
    },
]

const CourseFeatures = () => {
  return (
    <section className='py-24 bg-primary/5 '>
        <div className='container mx-auto px-4'>
        <HeadingSubtitle title="Our Course Features" className='text-primary before:bg-primary' />
        <SectionTitle>Unleash Your <HighlightedText>Engineering Potential</HighlightedText></SectionTitle>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center  gap-7 mt-16'>
            {
                content.map(ct => {
                    return <div key={nanoid()} className=' group bg-background border-2 border-primary/30 rounded-2xl p-3 hover:bg-primary hover:text-primary-foreground transition duration-300' >
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