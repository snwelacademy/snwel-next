import { PermissionCode } from './../modules/user-management/types/permission.types';
import {Icons} from "@/components/icons"
import { AdminPanelPermissions } from "./permissions-list";

type NavItem = {
  title: string
  href: string
  icon: keyof typeof Icons
  label: string,
  permissions?: PermissionCode[]
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
                permissions: [AdminPanelPermissions.VIEW_JOB_VACANCIES, AdminPanelPermissions.CREATE_JOB_VACANCIES, AdminPanelPermissions.EDIT_JOB_VACANCIES, AdminPanelPermissions.DELETE_JOB_VACANCIES, AdminPanelPermissions.PUBLISH_JOB_VACANCIES]
      },
      {
        title: "Job Applications",
        href: "/admin/job-applications",
        icon: "jobApplications",
        label: "Job Applications",
        permissions: [AdminPanelPermissions.VIEW_JOB_QUERY]
      },
      {
        title: "Job Category",
        href: "/admin/job-category",
        icon: "job_category",
        label: "Job Vacancy",
        permissions: [AdminPanelPermissions.VIEW_JOB_CATEGORIES]
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
        title: "Users",
        href: "/admin/users",
        icon: "user",
        label: "Users",
                permissions: [AdminPanelPermissions.VIEW_USERS, AdminPanelPermissions.CREATE_USERS, AdminPanelPermissions.EDIT_USERS, AdminPanelPermissions.DELETE_USERS]
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
    ],
  },
]