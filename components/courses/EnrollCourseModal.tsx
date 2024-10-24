'use client'

import { ReactNode, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import JoinCourseForm from '../shared/JoinCourseForm'
import Logo from '../shared/Logo'
import { Course } from '@/types'

const EnrollCourseModal = ({
    trigger,
    courseId,
    widget,
    targetCourse
}: {
    trigger: ReactNode,
    courseId: string,
    widget?: string,
    targetCourse?: Course
}) => {
  const [open, setOpen] = useState(false)
  console.log("TG:",{targetCourse})
  return (
    <Dialog open={open} onOpenChange={setOpen} >
        <DialogTrigger asChild >{trigger}</DialogTrigger>
        <DialogContent className='max-w-full w-[720px]'>
          <DialogHeader >
            <div className='flex items-center justify-center'><Logo/></div>
            <DialogTitle className='font-bold text-center'>Start Your Career Journey With Industry Experts!</DialogTitle>
          </DialogHeader>
            <JoinCourseForm 
            value={{name: '', email: '', courseId, phone: '', extra: {agree: false}, mode: '', occupation: '', location: {} as any, qualification: '', widget }} 
            targetCourse={targetCourse} 
            onClose={() => setOpen(false)} 
            />
        </DialogContent>
    </Dialog>
  )
}

export default EnrollCourseModal