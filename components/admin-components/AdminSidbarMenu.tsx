"use client"

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { Icons } from '../icons'


interface NavItem {
  title: string
  href: string
  icon: string
  label: string
}


const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: "dashboard",
    label: "Dashboard",
  },
  {
    title: "Course",
    href: "/admin/courses",
    icon: "course",
    label: "Courses",
  },
  {
    title: "Course Category",
    href: "/admin/course-category",
    icon: "category",
    label: "Courses",
  },
  {
    title: "Course Queries",
    href: "/admin/course-queries",
    icon: "enrollments",
    label: "course queries",
  },
  {
    title: "Pages",
    href: "/admin/pages",
    icon: "pages",
    label: "Pages",
  },
  {
    title: "Webinars",
    href: "/admin/webinars",
    icon: "webinar",
    label: "webinar",
  },
  {
    title: "Webinar Requests",
    href: "/admin/webinar-queries",
    icon: "webinarEnroll",
    label: "weibinar-queries",
  },
  {
    title: "Widgets",
    href: "/admin/widgets",
    icon: "component",
    label: "widgets",
  },
  {
    title: "General Enq",
    href: "/admin/general-enquiry",
    icon: "user",
    label: "Enquiries",
  },
  {
    title: "Job Vacancy",
    href: "/admin/job-vacancies",
    icon: "bag",
    label: "Job Vacancy",
  },
  {
    title: "Job Applications",
    href: "/admin/job-applications",
    icon: "jobApplications",
    label: "Job Applications",
  },
  {
    title: "Job Category",
    href: "/admin/job-category",
    icon: "job_category",
    label: "Job Vacancy",
  },
  {
    title: "Manage Gallery",
    href: "/admin/gallery-manager",
    icon: "gallery",
    label: "Manage Gallery",
  },
  {
    title: "Master",
    href: "/admin/masters?type=MASTER",
    icon: "job_category",
    label: "Master",
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: "kanban",
    label: "kanban",
  },
  {
    title: "App Center",
    href: "/admin/app-center",
    icon: "apps",
    label: "App Center",
  },
  {
    title: "Snwel Enquiries",
    href: "/admin/snwel-enquiry",
    icon: "snwelEnquiry",
    label: "Snwel Enquiries",
  },
]

export default function AdminNavbar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <div className={cn(
      "flex flex-col h-screen bg-gray-100 border-r",
      isCollapsed ? "w-16" : "w-64"
    )}>
      <div className="flex items-center justify-between p-4 border-b">
        {!isCollapsed && <h1 className="text-xl font-bold">Admin Panel</h1>}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {/* {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />} */}
        </Button>
      </div>
      <ScrollArea className="flex-1">
        <nav className="p-2">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900",
                pathname === item.href && "bg-gray-200 text-gray-900",
                isCollapsed && "justify-center"
              )}
            >
              {/* {Icons[item.icon as any]}
              {!isCollapsed && <span>{item.title}</span>} */}
            </Link>
          ))}
        </nav>
      </ScrollArea>
    </div>
  )
}