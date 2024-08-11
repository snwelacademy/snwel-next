import { cn } from '@/lib/utils'

const HeadingSubtitle = ({
    className,
    title
}: {
    className?: string,
    title: string
}) => {
  return (
    <span 
    className={cn([
        `heading-subtitle text-primary before:bg-primary after:bg-primary  tracking-widest text-xs md:text-base text-center mb-10`,
        className
    ])}
    >{title}</span>
  )
}

export default HeadingSubtitle