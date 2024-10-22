'use client'

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ReactNode } from "react"

type CourseEnrollment = {
  _id: string,
  userId: {
    _id: string,
    email: string,
    name: string,
    profilePic?: string
  },
  courseId: {
    _id: string,
    title: string,
    slug: string,
    currency: string,
    price: number
  },
  status: 'ACTIVE' | 'PENDING' | 'DECLINED',
  paymentStatus: 'PAID' | 'PENDING' | 'FAILED',
  paymentMethod: 'CASH' | 'EXTERNAL' | 'INAPP',
  expiredAt: string,
  createdAt: Date,
  updatedAt: Date,
}

// Mock data for a single enrollment
// const enrollment: CourseEnrollment = {
//   _id: '1',
//   userId: { 
//     _id: 'u1', 
//     email: 'john@example.com', 
//     name: 'John Doe',
//     profilePic: '/placeholder.svg?height=40&width=40'
//   },
//   courseId: { 
//     _id: 'c1', 
//     title: 'React Fundamentals', 
//     slug: 'react-fundamentals', 
//     currency: 'USD', 
//     price: 99 
//   },
//   status: 'ACTIVE',
//   paymentStatus: 'PAID',
//   paymentMethod: 'INAPP',
//   expiredAt: '2024-10-15',
//   createdAt: new Date('2023-10-15'),
//   updatedAt: new Date('2023-10-15')
// }

export default function SingleEnrollmentSheet({
    enrollment,
    trigger
}: {
    enrollment: CourseEnrollment,
    trigger?: ReactNode
}) {
  const statusColor = {
    ACTIVE: 'bg-green-500',
    PENDING: 'bg-yellow-500',
    DECLINED: 'bg-red-500',
    PAID: 'bg-green-500',
    FAILED: 'bg-red-500'
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        {
            trigger || <Button variant="outline">View</Button>
        }
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Enrollment Details</SheetTitle>
          <SheetDescription>
            Detailed view of the course enrollment
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>User Information</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={enrollment.userId.profilePic} alt={enrollment.userId.name} />
                <AvatarFallback>{enrollment.userId.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{enrollment.userId.name}</p>
                <p className="text-sm text-gray-500">{enrollment.userId.email}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Course Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-medium">{enrollment.courseId.title}</p>
              <p className="text-sm text-gray-500">Slug: {enrollment.courseId.slug}</p>
              <p className="mt-2">
                Price: {enrollment.courseId.currency} {enrollment.courseId.price}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Enrollment Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between items-center">
                <span>Status:</span>
                <Badge className={`${statusColor[enrollment.status]} text-white`}>
                  {enrollment.status}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Payment Status:</span>
                <Badge className={`${statusColor[enrollment.paymentStatus]} text-white`}>
                  {enrollment.paymentStatus}
                </Badge>
              </div>
              <p>Payment Method: {enrollment.paymentMethod}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Dates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>Expires on: {new Date(enrollment.expiredAt).toLocaleDateString()}</p>
              <p>Created at: {enrollment.createdAt.toLocaleString()}</p>
              <p>Last updated: {enrollment.updatedAt.toLocaleString()}</p>
            </CardContent>
          </Card>
        </div>
      </SheetContent>
    </Sheet>
  )
}