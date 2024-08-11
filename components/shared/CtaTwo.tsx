
import EnrollCourseModal from '../courses/EnrollCourseModal'
import Typography from '../typography'
import { Button } from '../ui/button'

const CtaTwo = () => {
  return (
    <div className='py-36 px-4 relative z-20' style={{backgroundImage: 'url(https://web.moxcreative.com/markeezo/wp-content/uploads/sites/18/2023/03/boost-your-business-or-marketing-strategy-concept.jpg)', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover'}}>
        <div className='primary-overlay -z-10 '></div>
        <div className='container mx-auto z-10 flex items-center justify-center flex-col gap-5'>
            <div></div>
            <Typography as={'heroTitle'} className='text-primary-foreground tracking-tight text-center font-black max-w-4xl '>Limited Time Offer: Enroll & Save!</Typography>
            <Typography as={'subtitle'} className='text-primary-foreground leading-relaxed text-center max-w-4xl '>Invest in Your Future at a Discounted Price & Gain Industry-Relevant Expertise. Enroll Now & Save Before This Limited-Time Offer Expires!</Typography>
            <EnrollCourseModal trigger={<Button size={'lg'} variant={'secondary'}>Enroll Now!</Button>} courseId={''} />
        </div>
    </div>
  )
}

export default CtaTwo