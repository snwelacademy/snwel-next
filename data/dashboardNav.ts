
import { NavItemWithOptionalChildren } from "@/types";

export type NavGroup = {
  title: string
  items: NavItemWithOptionalChildren[]
}

export const navGroups: NavGroup[] = [
  {
    title: "Overview",
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
    title: "Content Management",
    items: [
      {
        title: "Courses",
        href: "/admin/courses",
        icon: "course",
        label: "Courses",
        permissions: "COURSE_VIEW",
      },
      {
        title: "Course Categories",
        href: "/admin/course-category",
        icon: "category",
        label: "Course Categories",
        permissions: "CATEGORY_MANAGE",
      },
      {
        title: "Blogs",
        href: "/admin/blog",
        icon: "blog",
        label: "Blogs",
        permissions: "BLOG_VIEW",
      },
      {
        title: "Blog Categories",
        href: "/admin/blog/categories",
        icon: "blogCategory",
        label: "Blog Categories",
        permissions: "BLOG_CATEGORY_VIEW",
      },
      {
        title: "Pages",
        href: "/admin/pages",
        icon: "pages",
        label: "Pages",
        permissions: "PAGE_VIEW",
      },
      {
        title: "Webinars",
        href: "/admin/webinars",
        icon: "webinar",
        label: "Webinars",
        permissions: "WEBINAR_VIEW",
      },
      {
        title: "Testimonials",
        href: "/admin/testimonials",
        icon: "post",
        label: "Testimonials",
        permissions: "TESTIMONIAL_VIEW",
      },
      {
        title: "Widgets",
        href: "/admin/widgets",
        icon: "component",
        label: "Widgets",
        permissions: "WIDGET_VIEW",
      },
    ],
  },
  {
    title: "User Management",
    items: [
      {
        title: "Users",
        href: "/admin/users",
        icon: "user",
        label: "Users",
        permissions: "USER_VIEW",
      },
      {
        title: "Roles",
        href: "/admin/roles",
        icon: "settings",
        label: "Roles",
        permissions: "ROLE_VIEW",
      },
    ],
  },
  {
    title: "Jobs & Recruitment",
    items: [
      {
        title: "Job Vacancies",
        href: "/admin/job-vacancies",
        icon: "bag",
        label: "Job Vacancies",
        permissions: "JOB_VIEW",
      },
      {
        title: "Applications",
        href: "/admin/job-applications",
        icon: "jobApplications",
        label: "Job Applications",
        permissions: "JOB_VIEW",
      },
      {
        title: "Job Categories",
        href: "/admin/job-category",
        icon: "job_category",
        label: "Job Categories",
        permissions: "JOB_VIEW",
      },
    ],
  },
  {
    title: "Enquiries & Requests",
    items: [
      {
        title: "Course Queries",
        href: "/admin/course-queries",
        icon: "enrollments",
        label: "Course Queries",
        permissions: ["ENQUIRY_VIEW", "ENROLLMENT_VIEW"],
      },
      {
        title: "Webinar Requests",
        href: "/admin/webinar-queries",
        icon: "webinarEnroll",
        label: "Webinar Requests",
        permissions: "WEBINAR_VIEW",
      },
      {
        title: "General Enquiries",
        href: "/admin/general-enquiry",
        icon: "user",
        label: "General Enquiries",
        permissions: "ENQUIRY_VIEW",
      },
      // {
      //   title: "Snwel Enquiries",
      //   href: "/admin/snwel-enquiry",
      //   icon: "snwelEnquiry",
      //   label: "Snwel Enquiries",
      //   permissions: "SNWEL_ENQUIRY_VIEW",
      // },
    ],
  },
  {
    title: "System & Settings",
    items: [
      {
        title: "Gallery Manager",
        href: "/admin/gallery-manager",
        icon: "gallery",
        label: "Gallery Manager",
        permissions: "GALLERY_VIEW",
      },
      {
        title: "Master Data",
        href: "/admin/masters?type=MASTER",
        icon: "job_category",
        label: "Master Data",
        permissions: "MASTER_VIEW",
      },
      {
        title: "Settings",
        href: "/admin/settings",
        icon: "settings",
        label: "Settings",
        permissions: "SETTINGS_VIEW",
      },
      {
        title: "Integrations",
        href: "/admin/app-center",
        icon: "apps",
        label: "Integrations",
        permissions: "INTEGRATION_VIEW",
      },
      // {
      //   title: "Analytics",
      //   href: "/admin/analytics",
      //   icon: "laptop",
      //   label: "Analytics",
      //   permissions: "ANALYTICS_VIEW",
      // },
    ],
  },
];

// Flatten for backwards compatibility
export const navItems: NavItemWithOptionalChildren[] = navGroups.flatMap(g => g.items);
