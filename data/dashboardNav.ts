import {Icons} from "@/components/icons"

type NavItem = {
  title: string
  href: string
  icon: keyof typeof Icons
  label: string
}

type GroupedNavItems = {
  group: string
  items: NavItem[]
}

export const navItems: GroupedNavItems[] = [
  {
    group: "Main",
    items: [
      {
        title: "Dashboard",
        href: "/admin",
        icon: "dashboard",
        label: "Dashboard",
      },
    ],
  },
  {
    group: "Courses",
    items: [
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
    ],
  },
  {
    group: "Content",
    items: [
      {
        title: "Pages",
        href: "/admin/pages",
        icon: "pages",
        label: "Pages",
      },
      {
        title: "Widgets",
        href: "/admin/widgets",
        icon: "component",
        label: "widgets",
      },
      {
        title: "Manage Gallery",
        href: "/admin/gallery-manager",
        icon: "gallery",
        label: "Manage Gallery",
      },
    ],
  },
  {
    group: "Webinars",
    items: [
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
    ],
  },
  {
    group: "Jobs",
    items: [
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
    ],
  },
  {
    group: "Blogs",
    items: [
      {
        title: "Blog Category",
        href: "/admin/blog/categories",
        icon: "blogCategory",
        label: "Blogs Category",
      },
      {
        title: "Blogs",
        href: "/admin/blog",
        icon: "blog",
        label: "Blogs",
      },
    ],
  },
  {
    group: "Enquiries",
    items: [
      {
        title: "General Enq",
        href: "/admin/general-enquiry",
        icon: "user",
        label: "Enquiries",
      },
      {
        title: "Snwel Enquiries",
        href: "/admin/snwel-enquiry",
        icon: "snwelEnquiry",
        label: "Snwel Enquiries",
      },
    ],
  },
  {
    group: "System",
    items: [
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
    ],
  },
]