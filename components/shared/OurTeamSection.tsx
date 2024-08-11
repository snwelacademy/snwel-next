
import { cn } from '@/lib/utils'
import HeadingSubtitle from '../shared/SectionLable'
import Typography from '../typography'
import HighlightedText from '../typography/HighlightedHeading'
import { Button } from '../ui/button'
import { constants } from '@/config/constants'
import { nanoid } from 'nanoid'


const teamMembers: { image: string, name: string }[] = [
    {
        image: constants.imagePath + '/team-m-1.webp',
        name: "Jackson"
    },

    {
        image: constants.imagePath + '/team-m-2.webp',
        name: "Dickinson"
    },
    {
        image: constants.imagePath + '/team-m-3.webp',
        name: "Alexander"
    },
    {
        image: constants.imagePath + '/team-m-4.webp',
        name: "Hellan"
    },
]

const OurTeamSection = ({ className }: { className?: string }) => {

    return (
        <section className={cn(['py-36 bg-primary/5 px-4', className])}>
            <div className='text-primary  flex-col max-w-4xl mx-auto text-center mb-10'>
                <HeadingSubtitle title='LINKING UP EDUCATION' className='before:bg-primary after:bg-primary text-primary' />
                <div className="flex items-center justify-between flex-col gap-3">
                    <Typography as="title" className='mb-7'>Meet Our <HighlightedText>Instructors</HighlightedText></Typography>
                    <Button size={'lg'}>View All Instructors</Button>
                </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center justify-items-center container gap-10 '>
                {
                    teamMembers.map(tm => {
                        return <div key={nanoid()} className='aspect-[3/4] z-10 relative shadow-xl rounded-xl overflow-hidden'>
                            <div className='-z-10'>
                                <img className='w-full ' src={tm.image} />
                            </div>

                            <div className='absolute bottom-0 left-0 right-0 w-full p-4 bg-primary space-y-3 text-primary-foreground z-20 text-center'>
                                <Typography as="h3">{tm.name}</Typography>
                            </div>
                        </div>
                    })
                }
            </div>
        </section>
    )
}

export default OurTeamSection