/* eslint-disable @next/next/no-img-element */
'use client'
import { useSetting } from "@/hooks/useSetting"
import { SETTINGS } from "@/types"


const Logo = () => {
  const {data} = useSetting({code: SETTINGS.GENERAL})
  return (
    <span className='inline-flex text-3xl font-bold text-primary rounded-full pt-2'>
    <img alt="snwel-academy logo" className="w-[100px] md:w-[200px]" src={data ? data.data.logoUrl : ""}/>
  </span>
  )
}

export default Logo