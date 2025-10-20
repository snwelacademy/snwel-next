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
import { cn } from '@/lib/utils';
import MobileNavbar from './MobileNavbar';
import EnrollCourseModal from '../courses/EnrollCourseModal';
import Link from "next/link";
import { Button } from "../ui/button";
import Logo from "../shared/Logo";
import { useContext } from "react";
import { AppContext } from "../AppProviders";
import { SETTINGS } from "@/types";



export function NavigationMenuComponent() {
  const { settings } = useContext(AppContext);

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {settings.find(val => val.code === SETTINGS.MENUBUILDER)?.data.menus.map((item: any) => (
          <NavigationMenuItemWithChildren key={item.id} item={item} />
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

// Recursive component to render navigation items and their children
type NavItemProps = {
  item: {
    id: string;
    name: string;
    href: string;
    img?: string;
    children: any[];
    desc?: string
  };
};

const NavigationMenuItemWithChildren: React.FC<NavItemProps> = ({ item }) => {
  const hasChildren = item.children && item.children.length > 0;

  if (!hasChildren) {
    return (
      <NavigationMenuItem>
        <Link href={item.href} legacyBehavior passHref>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            {item.name}
          </NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>{item.name}</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-[400px] gap-3 p-4 md:w-[600px] md:grid-cols-2 lg:w-[1000px] justify-items-stretch">
          {item.children.map((child) => (
            <ListItemWithChildren key={child.id} item={child} />
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

// Component for rendering list items with children
const ListItemWithChildren: React.FC<NavItemProps> = ({ item }) => {
  const hasChildren = item.children && item.children.length > 0;
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link href={item.href || '#'} className={cn([
          "rounded-xl bg-red-700/10  px-5 py-2 flex gap-5 h-full items-center group hover:bg-red-600/30 hover:text-primary-foreground duration-200 transition-all  [&>*]:duration-200 [&>*]:transition-all",
        
        ])}>

          <div className={cn([
            "bg-contain aspect-square bg-center bg-no-repeat max-w-[100px] md:max-w-[200px] w-full group-hover:fill-primary-foreground fill-primary stroke-primary group-hover:stroke-primary-foreground flex items-center",
            {
              "aspect-auto h-[200px] w-0": !item.img
            }
          ])} 
          style={{ backgroundImage: `url(${item.img})` }}
          >
            {/* <div className="bg-center bg-no-repeat bg-cover w-full h-full" style={{ backgroundImage: `url(${item.img})` }}></div> */}
          </div>
          <div>
            <h3 className='text-slate-700 text-lg  font-bold group-hover:text-primary-foreground col-span-2 leading-tight'>{item.name}</h3>
            <p className="text-sm">{item.desc}</p>
            </div>
        </Link>
      </NavigationMenuLink>

      {hasChildren && (
        <ul className="ml-4 mt-2 space-y-1">
          {item.children.map((child) => (
            <ListItemWithChildren key={child.id} item={child} />
          ))}
        </ul>
      )}
    </li>
  );
};




const MainNavbar = () => {
  const { settings } = useContext(AppContext);

  return (
    <div className='flex items-center justify-between gap-4 py-3 px-2 md:px-10 bg-background lg:h-[92px] h-[70px] '>

      <div>
        <Link href="/"><Logo /></Link>
      </div>

      <div className='hidden md:block'>
        <NavigationMenuComponent />
      </div>

      <div className='block md:hidden'>
        <MobileNavbar 
        navItems={settings?.find(nv => nv.code === SETTINGS.MENUBUILDER)?.data.menus} 
        logo={settings.find(st => st.code === SETTINGS.GENERAL)?.data?.logoUrl}
        />
      </div>

      <div className=' items-center gap-3 hidden md:inline-flex'>
        {/* <Buthrefn size={'icon'} variant={'ghost'}><SearchIcon /></Buthrefn>
        <Buthrefn size={'icon'} variant={'ghost'}><ShoppingBagIcon /></Buthrefn> */}
        <EnrollCourseModal
          trigger={<Button className='hero-btn-1' size={'hero'} variant={'destructive'}>Register</Button>}
          courseId=''
        />
        {/* <AuthButton/> */}
      </div>

    </div>
  )
}

export default MainNavbar