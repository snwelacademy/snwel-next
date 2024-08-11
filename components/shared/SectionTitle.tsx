
import { ReactNode } from 'react'
import Typography from '../typography'
import { cn } from '@/lib/utils'

const SectionTitle = ({
    title,
    className,
    children
}: {
    title?: string,
    className?: string,
    children?: ReactNode
}) => {

  return (
    <div className='mb-7'>
        <Typography as="title" className={cn([
        ' relative inline-block z-20 text-center',
        className
    ])}>
        {title}
        {children}
        {/* <span className='inline-block absolute w-1/3 bg-primary/20 top-0 left-0 bottom-0 -z-10'></span> */}
    </Typography>
    </div>
  )
}

export default SectionTitle