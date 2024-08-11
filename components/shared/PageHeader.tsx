
import Typography from '../typography'
import { constants } from '@/config/constants'

const PageHeader = ({
    title,
    image
}: {
    title: string,
    image?: string
}) => {
  return (
    <div className='relative w-full bg-center bg-cover flex items-center justify-center  min-h-72' style={{backgroundImage: `url(${image || constants.imagePath+'/bim.jpg'})`}}>
        <div className='absolute w-full h-full bg-primary/50 let-0 right-0 top-0 bottom-0 '></div>
        <Typography  as="heroTitle" className='text-primary-foreground z-20 max-w-3xl text-center'>{title}</Typography>
    </div>
  )
}

export default PageHeader