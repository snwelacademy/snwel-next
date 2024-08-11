'use client'

import { ReactNode, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import JoinCourseForm from '../shared/JoinCourseForm'
import Logo from '../shared/Logo'

const EnrollCourseModal = ({
    trigger,
    courseId
}: {
    trigger: ReactNode,
    courseId: string
}) => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen} >
        <DialogTrigger asChild >{trigger}</DialogTrigger>
        <DialogContent className='max-w-full w-[720px]'>
          <DialogHeader >
            <div className='flex items-center justify-center'><Logo/></div>
            <DialogTitle className='font-bold text-center'>Start Your Career Journey With Industry Experts!</DialogTitle>
          </DialogHeader>
            <JoinCourseForm value={{name: '', email: '', courseId, phone: '', agree: '', mode: '', status: '', location: '', qualification: ''}} onClose={() => setOpen(false)} />
        </DialogContent>
    </Dialog>
  )
}

export default EnrollCourseModal