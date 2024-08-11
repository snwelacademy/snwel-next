'use client'

import { ReactNode } from 'react'
import Logo from '../shared/Logo'
import Typography from '../typography'
import { Facebook, LinkedinIcon, X } from 'lucide-react'
import { Button } from '../ui/button'
import { nanoid } from 'nanoid'
import NewsLetterForm from '../shared/NewsLetterForm'
import { useQuery } from '@tanstack/react-query'
import { getAllCourseCategories } from '@/services/admin/course-category-service'
import Link from 'next/link'

const socialIcons: { link: string, icon: ReactNode }[] = [
    {
        link: "#",
        icon: <Facebook />
    },
    {
        link: "#",
        icon: <LinkedinIcon />
    },
    {
        link: "#",
        icon: <X />
    },
];

const importantLink: { title: string, link: string }[] = [
    {
        title: "Home",
        link: "/"
    },
    {
        title: "About",
        link: "/about"
    },
    {
        title: "Contact",
        link: "/contact"
    },
    {
        title: "All Courses",
        link: "/courses"
    },
    {
        title: "Terms & Conditions",
        link: "#"
    },

]


const Footer = () => {
    const { data } = useQuery({
        queryKey: ['admin/course-category'],
        queryFn: () => getAllCourseCategories()
    })
    return (
        <div className='grid grid-cols-1 items-start md:grid-cols-2 lg:grid-cols-4 gap-5 py-10 container mx-auto text-white'>
            <div className='space-y-3'>
                <div><Logo /></div>
                <Typography as="p" className='text-muted'>We are passionate about bridging the gap between academic knowledge and practical industry applications. We achieve this by:</Typography>

                <div className='space-x-2'>
                    {
                        socialIcons.map(sci => {
                            return <Button key={nanoid()} size={'icon'} className='bg-gradient'>{sci.icon}</Button>
                        })
                    }
                </div>
            </div>

            <div>
                <Typography as="h4" className='' >Categories</Typography>
                <div className='flex flex-col items-start'>
                    {
                        data?.docs.map(ctg => {
                            return <Link key={nanoid()} href={`/courses/?category=${ctg.slug}`}><Button className='py-0' key={nanoid()} variant={'link'}>{ctg.title}</Button></Link>
                        })
                    }
                </div>
            </div>
            <div>
                <Typography as="h4" className=''>Important Links</Typography>
                <div className='flex flex-col items-start'>
                    {
                        importantLink.map(ctg => {
                            return <Link key={nanoid()} href={ctg.link}><Button className='py-0' key={nanoid()} variant={'link'}>{ctg.title}</Button></Link>
                        })
                    }
                </div>
            </div>
            <div>
                <Typography as="h4" className=''>Our NewsLetter</Typography>
                <div className='flex flex-col items-start mt-4'>
                    <div className=''><NewsLetterForm /></div>
                </div>
            </div>
        </div>
    )
}

export default Footer