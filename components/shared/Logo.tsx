/* eslint-disable @next/next/no-img-element */
'use client'
import { useSetting } from "@/hooks/useSetting"
import { cn } from "@/lib/utils"
import { SETTINGS } from "@/types"


const Logo = ({className}: {className?: string}) => {
  const {data} = useSetting({code: SETTINGS.GENERAL})
  return (
    <span className={cn([
      'inline-flex text-3xl font-bold text-primary rounded-full pt-2 w-[100px] md:w-[200px]',
      className
    ])}>
    <img alt="snwel-academy logo" className="max-w-full" src={data ? data.data.logoUrl : "/assets/images/logo.png"}/>
  </span>
  )
}

export default Logo