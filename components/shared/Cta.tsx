import React, { ReactNode } from 'react'
import Typography from '../typography'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'


export type CtaProps = {
    title: string
    subtitle: string
    children?: React.ReactNode,
    icon?: ReactNode,
    iconClassname?: string,
    bgImage?: string
}

const Cta = ({
    title,
    subtitle,
    children,
    iconClassname,
    icon,
    bgImage
}: CtaProps) => {
  return (
    <div className='py-36 px-4 relative z-20' style={{backgroundImage: `url(${bgImage})`, backgroundRepeat: 'repeat-x', backgroundPosition: 'center', backgroundSize: 'contain'}}>
        <div className='primary-overlay -z-10 '></div>
        <div className='container mx-auto z-10 flex items-center justify-center flex-col gap-5'>
            <span className={cn('text-primary-foreground bg-primary p-4 rounded-xl inline-flex', iconClassname)}>{icon}</span>
            <Typography as={'heroTitle'} className='text-primary-foreground tracking-tight text-center font-black max-w-4xl '>{title}</Typography>
            <Typography as={'subtitle'} className='text-primary-foreground leading-relaxed text-center max-w-4xl '>{subtitle}</Typography>
            {
                children ?
                <div className='flex items-center justify-center gap-5'>
                    {children}
                </div>
                : <Button size={'lg'} variant={'secondary'}>Enroll Now!</Button>
            }
        </div>
    </div>
  )
}

export default Cta