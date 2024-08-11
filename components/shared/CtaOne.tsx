
import EnrollCourseModal from '../courses/EnrollCourseModal'
import Typography from '../typography'
import { Button } from '../ui/button'

const CtaOne = () => {
  return (
    <div className='py-36 px-4 relative z-20' style={{backgroundImage: 'url(/assets/images/collection-of-multiethnic-business-people-portraits-collage-gray-backgrounds-square.jpg)', backgroundRepeat: 'repeat-x', backgroundPosition: 'center', backgroundSize: 'contain'}}>
        <div className='primary-overlay -z-10 '></div>
        <div className='container mx-auto z-10 flex items-center justify-center flex-col gap-5'>
            <Typography as={'heroTitle'} className='text-primary-foreground tracking-tight text-center font-black max-w-4xl '>Build Your Future: Enroll Now and Unlock a Rewarding Engineering Career</Typography>
            <Typography as={'subtitle'} className='text-primary-foreground leading-relaxed text-center max-w-4xl '>Invest in your future with Snwel Academy and unlock a rewarding engineering career!</Typography>
            <EnrollCourseModal trigger={<Button size={'lg'} variant={'secondary'}>Enroll Now!</Button>} courseId={''} />
        </div>
    </div>
  )
}

export default CtaOne