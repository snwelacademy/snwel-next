'use client'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
// import Logo from '../shared/Logo';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { SearchIcon, ShoppingBagIcon } from 'lucide-react';
import { nanoid } from 'nanoid';
import MobileNavbar from './MobileNavbar';
import { useQuery } from '@tanstack/react-query';
import { getAllCourseCategories } from '@/services/admin/course-category-service';
import { Menu } from '@/data/menu';
import EnrollCourseModal from '../courses/EnrollCourseModal';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import AuthButton from "../AuthButton";
import Logo from "../shared/Logo";


const MenuItemChildren = ({
  menu
}: { menu: Menu }) => {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className='text-lg text-primary font-bold'><Link href={menu.link || '#'}>{menu.label}</Link></NavigationMenuTrigger>
      <NavigationMenuContent className="left-0">
        <div className='w-[200px] flex flex-col items-center justify-center gap-2 p-2'>
          {
            menu.children?.map(m => {
              return <Link href={m.link || '#'} className='flex w-full' key={nanoid()}>
                <NavigationMenuLink className={cn([navigationMenuTriggerStyle(), 'block w-full'])}>
                  {m.label}
                </NavigationMenuLink>
              </Link>
            })
          }
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  )
}

const SimpleNavlink = ({ menu }: { menu: Menu }) => {
  const [isActive, setIsActive] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsActive(Boolean(menu.link && menu.link === pathname));
  }, [pathname])

  return (
    <Link href={menu?.link || '#'} >
      <NavigationMenuLink className={cn([

        navigationMenuTriggerStyle(),
        'text-lg font-bold text-primary',
        {
          'bg-destructive text-destructive-foreground hover:bg-destructive/80 hover:text-destructive-foreground': isActive
        }
      ])}>
        {menu.label}
      </NavigationMenuLink>
    </Link>
  )
}



const MainNavbar = () => {
  const { data: categories } = useQuery({
    queryKey: ['/admin/course-category'],
    queryFn: () => getAllCourseCategories()
  });
  return (
    <div className='flex items-center justify-between gap-4 py-3 px-2 md:px-10 bg-background h-[92px] '>

      <div>
        <Link href="/"><Logo /></Link>
      </div>

      <div className='hidden md:block'>
        <NavigationMenu>
          <NavigationMenuList>

            <SimpleNavlink menu={{ label: "Home", link: "/" }} />
            <MenuItemChildren menu={{
              label: "Courses",
              link: "/courses",
              children: categories?.docs.map(ctg => ({ label: ctg.title, link: `/courses/?category=${ctg.slug}` }))
            }} key={nanoid()} />
            <SimpleNavlink menu={{ label: "About", link: "/about" }} />
            <SimpleNavlink menu={{ label: "Contact", link: "/contact" }} />
            <SimpleNavlink menu={{ label: "Webinars", link: "/webinars" }} />
            {/* <SimpleNavlink menu={{ label: "Live Projects", link: "/live-projects" }} /> */}
            <SimpleNavlink menu={{ label: "Job Vacancy", link: "/job-vacancies" }} />
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className='block md:hidden'>
        <MobileNavbar />
      </div>

      <div className=' items-center gap-3 hidden md:inline-flex'>
        {/* <Buthrefn size={'icon'} variant={'ghost'}><SearchIcon /></Buthrefn>
        <Buthrefn size={'icon'} variant={'ghost'}><ShoppingBagIcon /></Buthrefn> */}
        <EnrollCourseModal
          trigger={<Button className='hero-btn-1' size={'hero'} variant={'destructive'}>Register</Button>}
          courseId=''
        />
        <AuthButton/>
      </div>

    </div>
  )
}

export default MainNavbar