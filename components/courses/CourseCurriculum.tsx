
import { nanoid } from 'nanoid'
import Typography from '../typography'
import { Book, Clock } from 'lucide-react'
import { Master } from '@/types/master'

const CourseCurriculum = ({
    curriculum
}: {
    curriculum: {
        title: string,
        duration: string,
        unit?: string,
        curriculumType?: Master, 
        classCount?: string
    }[]
}) => {
    return (
        <div className='p-3 md:p-5 lg:p-5 rounded-xl shadow space-y-5'>
            {
                curriculum.map(cc => {
                    return <div key={nanoid()} className='flex md:items-start md:justify-between justify-start flex-col md:flex-row gap-3 py-2 border-b last:border-b-0'>
                       <div className='flex-auto'>
                       <Typography as="p" className='flex-auto flex items-center gap-2'><Book className='w-4 h-4 text-primary' /><span>{cc.title}</span></Typography>
                       <p className='text-xs text-gray-500'>{typeof cc.curriculumType === 'string' ? cc.curriculumType : cc?.curriculumType?.name}</p>
                       
                       </div>

                        <Typography as="p" className='flex items-center gap-2'>
                            {
                                !!cc.classCount && <><Book className='w-4 h-4 text-primary' /><span>{cc.classCount} Classes</span></>
                            }
                            {
                                !!cc.duration && <><Clock className='w-4 h-4 text-primary' /><span>{cc.duration} {cc.unit || ''}</span></>
                            }
                        </Typography>
                    </div>
                })
            }
        </div>
    )
}

export default CourseCurriculum