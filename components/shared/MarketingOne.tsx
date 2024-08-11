import { nanoid } from 'nanoid'
import { ReactNode } from 'react'
import Typography from '../typography'
import SectionTitle from './SectionTitle'
import { CommandIcon } from 'lucide-react'

const content: {title: string, desc: string, icon: ReactNode}[] = [
    {
        title: 'Master In-Demand Skills',
        desc: 'Gain the specialized expertise employers are looking for, making you a more competitive candidate in the job market.',
        icon: <CommandIcon className='text-primary-foreground group-hover:text-primary'/>
    },
    {
        title: 'Boost Your Confidence',
        desc: 'Enhance your knowledge and practical abilities, allowing you to tackle new challenges with greater confidence.',
        icon: <CommandIcon className='text-primary-foreground group-hover:text-primary'/>
    },
    {
        title: 'Increase Your Earning Potential',
        desc: 'Equip yourself with the skills that command higher salaries and career advancement opportunities.',
        icon: <CommandIcon className='text-primary-foreground group-hover:text-primary'/>
    },
    {
        title: 'Network with Industry Experts',
        desc: 'Connect with experienced instructors and peers, expanding and gaining valuable insights.',
        icon: <CommandIcon className='text-primary-foreground group-hover:text-primary'/>
    },
]

const MarketingOne = () => {
  return (
    <div>
        <div className='flex items-center justify-center mb-16'>
            <SectionTitle className='max-w-2xl text-center' title="Invest in Yourself, Unlock Your Engineering Potential"/>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8 '>
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