import { getPublicImage } from '@/lib/utils'
import Typography from '../typography'
import { nanoid } from 'nanoid'

const content = [
    {
        title: "Learner’s Community",
        subTitle: "Group learning will always have a beneficial effect on practical and diversified thoughts.",
        desc: "Our Learners Community” refers to a group of individuals who come together to learn, share knowledge and experiences, and support each other in their educational journeys. This community may consist of students, teachers, mentors, or anyone who is passionate about learning and self-improvement.",
        image: getPublicImage('/learners-community.svg')
    },
    {
        title: "Live Classroom Training",
        subTitle: "We won’t be able to get everything online.",
        desc: "Live classroom training refers to a traditional style of learning where instructors and learners interact face-to-face in a physical classroom. It allows for real-time feedback and personal interaction between learners and instructors, making it an effective mode of education.",
        image: getPublicImage('/live-classroom.svg')
    },
    {
        title: "Hybrid Training Model",
        subTitle: "Offline (Classroom) Online (Live Interactive) Training Methodology",
        desc: "A hybrid training model combines traditional classroom instruction with online learning, providing students with a flexible and personalized educational experience. This approach allows for both synchronous and asynchronous learning, promoting student engagement and self-directed learning.",
        image: getPublicImage('/hybrid-training-model.svg')
    },
]

const MarketingFour = () => {
    return (
        <div className='space-y-16 md:space-y-10'>
            {
                content.map(ct => {
                    return <div key={nanoid()} className='flex items-center gap-5 md:gap-10 flex-col md:flex-row odd:md:flex-row-reverse '>
                        <div className='space-y-4 max-w-xl'>
                            <Typography as="h1" className='from-blue-500 to-purple-500 bg-gradient-to-r bg-clip-text text-transparent inline-block'>{ct.title}</Typography>
                            <Typography as="p" className='font-bold'>{ct.subTitle}</Typography>
                            <Typography as="p">{ct.desc}</Typography>
                        </div>

                        <div className='w-full rounded-2xl overflow-hidden shadow shadow-primary/5'>
                            <img src={ct.image}/>
                        </div>
                    </div>
                })
            }
        </div>
    )
}

export default MarketingFour