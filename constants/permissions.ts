/**
 * Permission Constants
 * 
 * This file contains all permission codes used throughout the application.
 * These codes must match exactly with the backend permission system.
 * 
 * Reference: Backend Permission System Documentation
 */

// ============================================================================
// USER MANAGEMENT MODULE
// ============================================================================
export const USER_PERMISSIONS = {
  USER_CREATE: 'USER_CREATE',
  USER_VIEW: 'USER_VIEW',
  USER_UPDATE: 'USER_UPDATE',
  USER_DELETE: 'USER_DELETE',
  ROLE_ASSIGN: 'ROLE_ASSIGN',
  ROLE_CREATE: 'ROLE_CREATE',
  ROLE_VIEW: 'ROLE_VIEW',
  ROLE_UPDATE: 'ROLE_UPDATE',
  ROLE_DELETE: 'ROLE_DELETE',
} as const

// ============================================================================
// COURSE MANAGEMENT MODULE
// ============================================================================
export const COURSE_PERMISSIONS = {
  COURSE_CREATE: 'COURSE_CREATE',
  COURSE_VIEW: 'COURSE_VIEW',
  COURSE_UPDATE: 'COURSE_UPDATE',
  COURSE_DELETE: 'COURSE_DELETE',
  COURSE_PUBLISH: 'COURSE_PUBLISH',
  CATEGORY_MANAGE: 'CATEGORY_MANAGE',
  ENROLLMENT_VIEW: 'ENROLLMENT_VIEW',
  ENROLLMENT_MANAGE: 'ENROLLMENT_MANAGE',
} as const

// ============================================================================
// BLOG MODULE
// ============================================================================
export const BLOG_PERMISSIONS = {
  BLOG_CREATE: 'BLOG_CREATE',
  BLOG_VIEW: 'BLOG_VIEW',
  BLOG_UPDATE: 'BLOG_UPDATE',
  BLOG_DELETE: 'BLOG_DELETE',
  BLOG_PUBLISH: 'BLOG_PUBLISH',
} as const

// ============================================================================
// BLOG CATEGORY MODULE
// ============================================================================
export const BLOG_CATEGORY_PERMISSIONS = {
  BLOG_CATEGORY_CREATE: 'BLOG_CATEGORY_CREATE',
  BLOG_CATEGORY_VIEW: 'BLOG_CATEGORY_VIEW',
  BLOG_CATEGORY_UPDATE: 'BLOG_CATEGORY_UPDATE',
  BLOG_CATEGORY_DELETE: 'BLOG_CATEGORY_DELETE',
} as const

// ============================================================================
// JOB MANAGEMENT MODULE
// ============================================================================
export const JOB_PERMISSIONS = {
  JOB_CREATE: 'JOB_CREATE',
  JOB_VIEW: 'JOB_VIEW',
  JOB_UPDATE: 'JOB_UPDATE',
  JOB_DELETE: 'JOB_DELETE',
  JOB_PUBLISH: 'JOB_PUBLISH',
} as const

// ============================================================================
// JOB CATEGORY MODULE
// ============================================================================
export const JOB_CATEGORY_PERMISSIONS = {
  JOB_CATEGORY_CREATE: 'JOB_CATEGORY_CREATE',
  JOB_CATEGORY_VIEW: 'JOB_CATEGORY_VIEW',
  JOB_CATEGORY_UPDATE: 'JOB_CATEGORY_UPDATE',
  JOB_CATEGORY_DELETE: 'JOB_CATEGORY_DELETE',
} as const

// ============================================================================
// JOB APPLICATION MODULE
// ============================================================================
export const JOB_APPLICATION_PERMISSIONS = {
  JOB_APP_VIEW: 'JOB_APP_VIEW',
  JOB_APP_UPDATE: 'JOB_APP_UPDATE',
  JOB_APP_DELETE: 'JOB_APP_DELETE',
  JOB_APP_EXPORT: 'JOB_APP_EXPORT',
} as const

// ============================================================================
// WEBINAR MODULE
// ============================================================================
export const WEBINAR_PERMISSIONS = {
  WEBINAR_CREATE: 'WEBINAR_CREATE',
  WEBINAR_VIEW: 'WEBINAR_VIEW',
  WEBINAR_UPDATE: 'WEBINAR_UPDATE',
  WEBINAR_DELETE: 'WEBINAR_DELETE',
  WEBINAR_PUBLISH: 'WEBINAR_PUBLISH',
} as const

// ============================================================================
// ENQUIRY MODULE
// ============================================================================
export const ENQUIRY_PERMISSIONS = {
  ENQUIRY_VIEW: 'ENQUIRY_VIEW',
  ENQUIRY_UPDATE: 'ENQUIRY_UPDATE',
  ENQUIRY_DELETE: 'ENQUIRY_DELETE',
  ENQUIRY_EXPORT: 'ENQUIRY_EXPORT',
} as const

// ============================================================================
// SNWEL ENQUIRY MODULE
// ============================================================================
export const SNWEL_ENQUIRY_PERMISSIONS = {
  SNWEL_ENQUIRY_VIEW: 'SNWEL_ENQUIRY_VIEW',
  SNWEL_ENQUIRY_UPDATE: 'SNWEL_ENQUIRY_UPDATE',
  SNWEL_ENQUIRY_DELETE: 'SNWEL_ENQUIRY_DELETE',
  SNWEL_ENQUIRY_EXPORT: 'SNWEL_ENQUIRY_EXPORT',
} as const

// ============================================================================
// GALLERY MODULE
// ============================================================================
export const GALLERY_PERMISSIONS = {
  GALLERY_CREATE: 'GALLERY_CREATE',
  GALLERY_VIEW: 'GALLERY_VIEW',
  GALLERY_UPDATE: 'GALLERY_UPDATE',
  GALLERY_DELETE: 'GALLERY_DELETE',
} as const

// ============================================================================
// WIDGET MODULE
// ============================================================================
export const WIDGET_PERMISSIONS = {
  WIDGET_CREATE: 'WIDGET_CREATE',
  WIDGET_VIEW: 'WIDGET_VIEW',
  WIDGET_UPDATE: 'WIDGET_UPDATE',
  WIDGET_DELETE: 'WIDGET_DELETE',
} as const

// ============================================================================
// INTEGRATION MODULE
// ============================================================================
export const INTEGRATION_PERMISSIONS = {
  INTEGRATION_VIEW: 'INTEGRATION_VIEW',
  INTEGRATION_UPDATE: 'INTEGRATION_UPDATE',
} as const

// ============================================================================
// SETTINGS MODULE
// ============================================================================
export const SETTINGS_PERMISSIONS = {
  SETTINGS_VIEW: 'SETTINGS_VIEW',
  SETTINGS_UPDATE: 'SETTINGS_UPDATE',
} as const

// ============================================================================
// FILE MODULE
// ============================================================================
export const FILE_PERMISSIONS = {
  FILE_UPLOAD: 'FILE_UPLOAD',
  FILE_VIEW: 'FILE_VIEW',
  FILE_DELETE: 'FILE_DELETE',
} as const

// ============================================================================
// PAGE MODULE
// ============================================================================
export const PAGE_PERMISSIONS = {
  PAGE_CREATE: 'PAGE_CREATE',
  PAGE_VIEW: 'PAGE_VIEW',
  PAGE_UPDATE: 'PAGE_UPDATE',
  PAGE_DELETE: 'PAGE_DELETE',
} as const

// ============================================================================
// MASTER DATA MODULE
// ============================================================================
export const MASTER_PERMISSIONS = {
  MASTER_CREATE: 'MASTER_CREATE',
  MASTER_VIEW: 'MASTER_VIEW',
  MASTER_UPDATE: 'MASTER_UPDATE',
  MASTER_DELETE: 'MASTER_DELETE',
} as const

// ============================================================================
// PAYMENT MODULE
// ============================================================================
export const PAYMENT_PERMISSIONS = {
  PAYMENT_VIEW: 'PAYMENT_VIEW',
  PAYMENT_REFUND: 'PAYMENT_REFUND',
  PAYMENT_EXPORT: 'PAYMENT_EXPORT',
} as const

// ============================================================================
// OTP MODULE
// ============================================================================
export const OTP_PERMISSIONS = {
  OTP_SEND: 'OTP_SEND',
  OTP_VIEW: 'OTP_VIEW',
} as const

// ============================================================================
// ANALYTICS MODULE
// ============================================================================
export const ANALYTICS_PERMISSIONS = {
  ANALYTICS_VIEW: 'ANALYTICS_VIEW',
} as const

// ============================================================================
// TESTIMONIAL MODULE
// ============================================================================
export const TESTIMONIAL_PERMISSIONS = {
  TESTIMONIAL_CREATE: 'TESTIMONIAL_CREATE',
  TESTIMONIAL_VIEW: 'TESTIMONIAL_VIEW',
  TESTIMONIAL_UPDATE: 'TESTIMONIAL_UPDATE',
  TESTIMONIAL_DELETE: 'TESTIMONIAL_DELETE',
} as const

// ============================================================================
// ALL PERMISSIONS (Flat structure for easy lookup)
// ============================================================================
export const PERMISSIONS = {
  ...USER_PERMISSIONS,
  ...COURSE_PERMISSIONS,
  ...BLOG_PERMISSIONS,
  ...BLOG_CATEGORY_PERMISSIONS,
  ...JOB_PERMISSIONS,
  ...JOB_CATEGORY_PERMISSIONS,
  ...JOB_APPLICATION_PERMISSIONS,
  ...WEBINAR_PERMISSIONS,
  ...ENQUIRY_PERMISSIONS,
  ...SNWEL_ENQUIRY_PERMISSIONS,
  ...GALLERY_PERMISSIONS,
  ...WIDGET_PERMISSIONS,
  ...INTEGRATION_PERMISSIONS,
  ...SETTINGS_PERMISSIONS,
  ...FILE_PERMISSIONS,
  ...PAGE_PERMISSIONS,
  ...MASTER_PERMISSIONS,
  ...PAYMENT_PERMISSIONS,
  ...OTP_PERMISSIONS,
  ...ANALYTICS_PERMISSIONS,
  ...TESTIMONIAL_PERMISSIONS,
} as const

// ============================================================================
// PERMISSION GROUPS (For UI organization)
// ============================================================================
export const PERMISSION_GROUPS = {
  USER_MANAGEMENT: {
    label: 'User Management',
    permissions: Object.values(USER_PERMISSIONS),
  },
  COURSE_MANAGEMENT: {
    label: 'Course Management',
    permissions: Object.values(COURSE_PERMISSIONS),
  },
  BLOG_MANAGEMENT: {
    label: 'Blog Management',
    permissions: [...Object.values(BLOG_PERMISSIONS), ...Object.values(BLOG_CATEGORY_PERMISSIONS)],
  },
  JOB_MANAGEMENT: {
    label: 'Job Management',
    permissions: [
      ...Object.values(JOB_PERMISSIONS),
      ...Object.values(JOB_CATEGORY_PERMISSIONS),
      ...Object.values(JOB_APPLICATION_PERMISSIONS),
    ],
  },
  WEBINAR_MANAGEMENT: {
    label: 'Webinar Management',
    permissions: Object.values(WEBINAR_PERMISSIONS),
  },
  ENQUIRY_MANAGEMENT: {
    label: 'Enquiry Management',
    permissions: [...Object.values(ENQUIRY_PERMISSIONS), ...Object.values(SNWEL_ENQUIRY_PERMISSIONS)],
  },
  CONTENT_MANAGEMENT: {
    label: 'Content Management',
    permissions: [
      ...Object.values(GALLERY_PERMISSIONS),
      ...Object.values(WIDGET_PERMISSIONS),
      ...Object.values(MASTER_PERMISSIONS),
    ],
  },
  SYSTEM_SETTINGS: {
    label: 'System & Settings',
    permissions: [
      ...Object.values(SETTINGS_PERMISSIONS),
      ...Object.values(INTEGRATION_PERMISSIONS),
      ...Object.values(FILE_PERMISSIONS),
      ...Object.values(PAGE_PERMISSIONS),
    ],
  },
  ANALYTICS: {
    label: 'Analytics & Reports',
    permissions: [...Object.values(ANALYTICS_PERMISSIONS), ...Object.values(PAYMENT_PERMISSIONS)],
  },
  OTP: {
    label: 'OTP Management',
    permissions: Object.values(OTP_PERMISSIONS),
  },
  MASTER_DATA_MANAGEMENT: {
    label: 'Master Data Management',
    permissions: Object.values(MASTER_PERMISSIONS),
  },
} as const

// ============================================================================
// TYPE EXPORTS
// ============================================================================
export type PermissionCode = (typeof PERMISSIONS)[keyof typeof PERMISSIONS]
export type PermissionGroup = keyof typeof PERMISSION_GROUPS

// ============================================================================
// PERMISSION DESCRIPTIONS (For UI tooltips/help text)
// ============================================================================
export const PERMISSION_DESCRIPTIONS: Record<string, string> = {
  // User Management
  USER_CREATE: 'Can create new users',
  USER_VIEW: 'Can view user list and details',
  USER_UPDATE: 'Can update user details',
  USER_DELETE: 'Can delete users',
  ROLE_ASSIGN: 'Can assign roles to users',
  ROLE_CREATE: 'Can create new roles',
  ROLE_VIEW: 'Can view role list',
  ROLE_UPDATE: 'Can update role details',
  ROLE_DELETE: 'Can delete roles',

  // Course Management
  COURSE_CREATE: 'Can create courses',
  COURSE_VIEW: 'Can view courses',
  COURSE_UPDATE: 'Can update courses',
  COURSE_DELETE: 'Can delete courses',
  COURSE_PUBLISH: 'Can publish courses',
  CATEGORY_MANAGE: 'Can manage course categories',
  ENROLLMENT_VIEW: 'Can view enrollments',
  ENROLLMENT_MANAGE: 'Can manage enrollments',

  // Blog
  BLOG_CREATE: 'Can create blog posts',
  BLOG_VIEW: 'Can view blog posts (admin)',
  BLOG_UPDATE: 'Can update blog posts',
  BLOG_DELETE: 'Can delete blog posts',
  BLOG_PUBLISH: 'Can publish blog posts',

  // Blog Category
  BLOG_CATEGORY_CREATE: 'Can create blog categories',
  BLOG_CATEGORY_VIEW: 'Can view blog categories',
  BLOG_CATEGORY_UPDATE: 'Can update blog categories',
  BLOG_CATEGORY_DELETE: 'Can delete blog categories',

  // Job
  JOB_CREATE: 'Can create job vacancies',
  JOB_VIEW: 'Can view job vacancies (admin)',
  JOB_UPDATE: 'Can update job vacancies',
  JOB_DELETE: 'Can delete job vacancies',
  JOB_PUBLISH: 'Can publish job vacancies',

  // Job Category
  JOB_CATEGORY_CREATE: 'Can create job categories',
  JOB_CATEGORY_VIEW: 'Can view job categories',
  JOB_CATEGORY_UPDATE: 'Can update job categories',
  JOB_CATEGORY_DELETE: 'Can delete job categories',

  // Job Application
  JOB_APP_VIEW: 'Can view job applications',
  JOB_APP_UPDATE: 'Can update job applications',
  JOB_APP_DELETE: 'Can delete job applications',
  JOB_APP_EXPORT: 'Can export job applications',

  // Webinar
  WEBINAR_CREATE: 'Can create webinars',
  WEBINAR_VIEW: 'Can view webinars (admin)',
  WEBINAR_UPDATE: 'Can update webinars',
  WEBINAR_DELETE: 'Can delete webinars',
  WEBINAR_PUBLISH: 'Can publish webinars',

  // Enquiry
  ENQUIRY_VIEW: 'Can view enquiries',
  ENQUIRY_UPDATE: 'Can update enquiries',
  ENQUIRY_DELETE: 'Can delete enquiries',
  ENQUIRY_EXPORT: 'Can export enquiries',

  // SNWEL Enquiry
  SNWEL_ENQUIRY_VIEW: 'Can view Snwel enquiries',
  SNWEL_ENQUIRY_UPDATE: 'Can update Snwel enquiries',
  SNWEL_ENQUIRY_DELETE: 'Can delete Snwel enquiries',
  SNWEL_ENQUIRY_EXPORT: 'Can export Snwel enquiries',

  // Gallery
  GALLERY_CREATE: 'Can create gallery assets',
  GALLERY_VIEW: 'Can view gallery',
  GALLERY_UPDATE: 'Can update gallery',
  GALLERY_DELETE: 'Can delete gallery',

  // Widget
  WIDGET_CREATE: 'Can create widgets',
  WIDGET_VIEW: 'Can view widgets',
  WIDGET_UPDATE: 'Can update widgets',
  WIDGET_DELETE: 'Can delete widgets',

  // Integration
  INTEGRATION_VIEW: 'Can view integrations',
  INTEGRATION_UPDATE: 'Can update integrations',

  // Settings
  SETTINGS_VIEW: 'Can view settings',
  SETTINGS_UPDATE: 'Can update settings',

  // File
  FILE_UPLOAD: 'Can upload files',
  FILE_VIEW: 'Can view files',
  FILE_DELETE: 'Can delete files',

  // Page
  PAGE_CREATE: 'Can create pages',
  PAGE_VIEW: 'Can view pages',
  PAGE_UPDATE: 'Can update pages',
  PAGE_DELETE: 'Can delete pages',

  // Master
  MASTER_CREATE: 'Can create master data',
  MASTER_VIEW: 'Can view master data',
  MASTER_UPDATE: 'Can update master data',
  MASTER_DELETE: 'Can delete master data',

  // Payment
  PAYMENT_VIEW: 'Can view payments',
  PAYMENT_REFUND: 'Can refund payments',
  PAYMENT_EXPORT: 'Can export payments',

  // OTP
  OTP_SEND: 'Can send OTP',
  OTP_VIEW: 'Can view OTP logs',

  // Analytics
  ANALYTICS_VIEW: 'Can view analytics',
}
