'use client'

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"

import { Button } from '../ui/button'
import { MenuIcon } from 'lucide-react'
import Logo from "../shared/Logo"
import { nanoid } from "nanoid"
import { constants } from "@/config/constants"
import { useQuery } from "@tanstack/react-query"
import { getAllCourseCategories } from "@/services/admin/course-category-service"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ScrollArea } from "../ui/scroll-area"
import { CaretSortIcon } from "@radix-ui/react-icons"
import { useState } from "react"
import Link from "next/link"


const MobileNavbar = () => {
    const [open, setOpen] = useState(false);
    const { data: categories } = useQuery({
        queryKey: ['/admin/course-category'],
        queryFn: () => getAllCourseCategories()
    });

    return (
        <Drawer direction="left" shouldScaleBackground onOpenChange={setOpen} open={open}>
            <DrawerTrigger asChild ><Button><MenuIcon /></Button></DrawerTrigger>
            <DrawerContent className="h-full rounded-none rounded-tr-2xl rounded-br-2xl w-[80%] overflow-hidden" style={{ backgroundImage: `url(${constants.imagePath + '/mobile-menu-bg.jpg'})` }}>
                <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full -z-10 bg-white"></div>
                <DrawerHeader className="justify-center">
                    <DrawerTitle><Logo /></DrawerTitle>
                </DrawerHeader>
                <ScrollArea >
                    <div className="h-full flex  flex-col items-start justify-center gap-2 text-lg">
                        <div className="px-4 font-extralight" key={nanoid()}>
                            <Link href="/" >Home</Link>
                        </div>

                        <Collapsible>
                            <div className="flex items-center justify-center space-x-4 px-4">
                                <h4 className="">
                                    Courses
                                </h4>
                                <CollapsibleTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                        <CaretSortIcon className="h-4 w-4" />
                                        <span className="sr-only">Toggle</span>
                                    </Button>
                                </CollapsibleTrigger>
                            </div>

                            <CollapsibleContent className="flex flex-col items-start justify-start pl-4">
                                {
                                    categories?.docs.map(ctg => {
                                        return <div onClick={() => setOpen(v => !v)} key={nanoid()} className="w-full text-left" >
                                            <Link href={`/category/${ctg.slug}` || '#'} onClick={() => setOpen(v => !v)} >
                                                {ctg.title}
                                            </Link>
                                        </div>
                                    })
                                }
                            </CollapsibleContent>
                        </Collapsible>


                        <div className="px-4  font-extralight" key={nanoid()}>
                            <Link href="/about" >About</Link>
                        </div>
                        <div className="px-4 font-extralight" key={nanoid()}>
                            <Link href="/contact" >Contact</Link>
                        </div>
                        <div className="px-4  font-extralight" key={nanoid()}>
                            <Link href="/blogs" >Blogs</Link>
                        </div>
                        <div className="px-4 font-extralight" key={nanoid()}>
                            <Link href="/webinars" >Webinars</Link>
                        </div>
                    </div>
                </ScrollArea>
                <DrawerFooter>
                    <DrawerClose>
                        <a href="mail:shivamsi687@gmail.com"><Button className="w-full">Email Us</Button></a>
                    </DrawerClose>
                    {/* <DrawerClose>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose> */}
                </DrawerFooter>
            </DrawerContent>
        </Drawer>

    )
}

export default MobileNavbar