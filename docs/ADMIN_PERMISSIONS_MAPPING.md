# Admin Panel Permissions Mapping

This document maps each admin page/component to its required permissions.

## Permission Implementation Status

### ✅ Implemented
- User Management Module

### ⚠️ Needs Implementation
- All other modules listed below

---

## Module Permissions Mapping

### 1. Dashboard (`/admin`)
**Required Permissions:**
- `ANALYTICS_VIEW` - View dashboard statistics

**Components:**
- `DashboardPage.tsx` - Main dashboard

**Actions:**
- View revenue stats
- View user stats
- View enrollment stats
- View course stats

---

### 2. Courses (`/admin/courses`)
**Required Permissions:**
- `COURSE_VIEW` - View courses list
- `COURSE_CREATE` - Create new course
- `COURSE_UPDATE` - Edit existing course
- `COURSE_DELETE` - Delete course
- `COURSE_PUBLISH` - Publish/unpublish course

**Pages:**
- `/admin/courses` - Course list page
- `/admin/courses/new` - Create course page
- `/admin/courses/[id]` - Edit course page

**Components:**
- `coursePage.tsx` - Course list component
- `createCoursePage.tsx` - Course creation form

**Actions:**
- View courses table
- Create new course button
- Edit course button
- Delete course button
- Publish/unpublish toggle

---

### 3. Course Categories (`/admin/course-category`)
**Required Permissions:**
- `CATEGORY_MANAGE` - Manage course categories

**Pages:**
- `/admin/course-category` - Category management

**Actions:**
- View categories
- Create category
- Edit category
- Delete category

---

### 4. Course Queries (`/admin/course-queries`)
**Required Permissions:**
- `ENROLLMENT_VIEW` - View course queries/enrollments

**Pages:**
- `/admin/course-queries` - Course queries list

**Actions:**
- View queries
- Respond to queries
- Delete queries

---

### 5. Blog (`/admin/blog`)
**Required Permissions:**
- `BLOG_VIEW` - View blog posts
- `BLOG_CREATE` - Create blog post
- `BLOG_UPDATE` - Edit blog post
- `BLOG_DELETE` - Delete blog post
- `BLOG_PUBLISH` - Publish blog post

**Pages:**
- `/admin/blog` - Blog list
- `/admin/blog/new` - Create blog
- `/admin/blog/[id]` - Edit blog

**Components:**
- `BlogPage.tsx` - Blog list component

**Actions:**
- View blogs table
- Create blog button
- Edit blog button
- Delete blog button
- Publish/unpublish toggle

---

### 6. Job Vacancies (`/admin/job-vacancies`)
**Required Permissions:**
- `JOB_VIEW` - View job vacancies
- `JOB_CREATE` - Create job vacancy
- `JOB_UPDATE` - Edit job vacancy
- `JOB_DELETE` - Delete job vacancy
- `JOB_PUBLISH` - Publish job vacancy

**Pages:**
- `/admin/job-vacancies` - Job list
- `/admin/job-vacancies/new` - Create job
- `/admin/job-vacancies/[id]` - Edit job

**Actions:**
- View jobs table
- Create job button
- Edit job button
- Delete job button
- Publish/unpublish toggle

---

### 7. Job Categories (`/admin/job-category`)
**Required Permissions:**
- `JOB_CATEGORY_VIEW` - View job categories
- `JOB_CATEGORY_CREATE` - Create job category
- `JOB_CATEGORY_UPDATE` - Edit job category
- `JOB_CATEGORY_DELETE` - Delete job category

**Pages:**
- `/admin/job-category` - Job category management

**Actions:**
- View categories
- Create category
- Edit category
- Delete category

---

### 8. Job Applications (`/admin/job-applications`)
**Required Permissions:**
- `JOB_APP_VIEW` - View job applications
- `JOB_APP_UPDATE` - Update application status
- `JOB_APP_DELETE` - Delete application
- `JOB_APP_EXPORT` - Export applications to CSV

**Pages:**
- `/admin/job-applications` - Applications list

**Actions:**
- View applications table
- View application details
- Update application status
- Delete application
- Export to CSV button

---

### 9. Webinars (`/admin/webinars`)
**Required Permissions:**
- `WEBINAR_VIEW` - View webinars
- `WEBINAR_CREATE` - Create webinar
- `WEBINAR_UPDATE` - Edit webinar
- `WEBINAR_DELETE` - Delete webinar
- `WEBINAR_PUBLISH` - Publish webinar

**Pages:**
- `/admin/webinars` - Webinar list
- `/admin/webinars/new` - Create webinar
- `/admin/webinars/[id]` - Edit webinar

**Actions:**
- View webinars table
- Create webinar button
- Edit webinar button
- Delete webinar button
- Publish/unpublish toggle

---

### 10. Webinar Queries (`/admin/webinar-queries`)
**Required Permissions:**
- `WEBINAR_VIEW` - View webinar queries

**Pages:**
- `/admin/webinar-queries` - Webinar queries list

**Actions:**
- View queries
- Respond to queries
- Delete queries

---

### 11. General Enquiry (`/admin/general-enquiry`)
**Required Permissions:**
- `ENQUIRY_VIEW` - View enquiries
- `ENQUIRY_UPDATE` - Update enquiry status
- `ENQUIRY_DELETE` - Delete enquiry
- `ENQUIRY_EXPORT` - Export enquiries

**Pages:**
- `/admin/general-enquiry` - Enquiry list

**Actions:**
- View enquiries table
- View enquiry details
- Update status
- Delete enquiry
- Export to CSV

---

### 12. SNWEL Enquiry (`/admin/snwel-enquiry`)
**Required Permissions:**
- `SNWEL_ENQUIRY_VIEW` - View SNWEL enquiries
- `SNWEL_ENQUIRY_UPDATE` - Update enquiry
- `SNWEL_ENQUIRY_DELETE` - Delete enquiry
- `SNWEL_ENQUIRY_EXPORT` - Export enquiries

**Pages:**
- `/admin/snwel-enquiry` - SNWEL enquiry list
- `/admin/snwel-enquiry/[id]` - Enquiry details

**Actions:**
- View enquiries table
- View enquiry details
- Update status
- Delete enquiry
- Export to CSV

---

### 13. Users (`/admin/users`)
**Required Permissions:**
- `USER_VIEW` - View users list ✅
- `USER_CREATE` - Create new user ✅
- `USER_UPDATE` - Edit user ✅
- `USER_DELETE` - Delete user ✅
- `ROLE_ASSIGN` - Assign roles to user ✅

**Pages:**
- `/admin/users` - User management

**Components:**
- `UserManagement` module ✅

**Status:** ✅ Fully implemented with permission checks

---

### 14. Roles (`/admin/roles`)
**Required Permissions:**
- `ROLE_VIEW` - View roles
- `ROLE_CREATE` - Create role
- `ROLE_UPDATE` - Edit role
- `ROLE_DELETE` - Delete role

**Pages:**
- `/admin/roles` - Role list
- `/admin/roles/[id]` - Role details/edit

**Actions:**
- View roles table
- Create role button
- Edit role button
- Delete role button
- Manage permissions

---

### 15. Gallery Manager (`/admin/gallery-manager`)
**Required Permissions:**
- `GALLERY_VIEW` - View gallery
- `GALLERY_CREATE` - Upload images
- `GALLERY_UPDATE` - Update image details
- `GALLERY_DELETE` - Delete images

**Pages:**
- `/admin/gallery-manager` - Gallery management

**Actions:**
- View gallery
- Upload images
- Edit image details
- Delete images

---

### 16. Widgets (`/admin/widgets`)
**Required Permissions:**
- `WIDGET_VIEW` - View widgets
- `WIDGET_CREATE` - Create widget
- `WIDGET_UPDATE` - Edit widget
- `WIDGET_DELETE` - Delete widget

**Pages:**
- `/admin/widgets` - Widget list
- `/admin/widgets/new` - Create widget
- `/admin/widgets/[id]` - Edit widget

**Actions:**
- View widgets table
- Create widget button
- Edit widget button
- Delete widget button

---

### 17. Pages (`/admin/pages`)
**Required Permissions:**
- Custom permissions (to be defined)

**Pages:**
- `/admin/pages` - Page management

---

### 18. Masters (`/admin/masters`)
**Required Permissions:**
- `MASTER_VIEW` - View master data
- `MASTER_CREATE` - Create master data
- `MASTER_UPDATE` - Edit master data
- `MASTER_DELETE` - Delete master data

**Pages:**
- `/admin/masters` - Master data management

**Actions:**
- View master data
- Create entry
- Edit entry
- Delete entry

---

### 19. Settings (`/admin/settings`)
**Required Permissions:**
- `SETTINGS_VIEW` - View settings
- `SETTINGS_UPDATE` - Update settings

**Pages:**
- `/admin/settings` - Settings page

**Actions:**
- View settings
- Update settings

---

### 20. App Center (`/admin/app-center`)
**Required Permissions:**
- `INTEGRATION_VIEW` - View integrations
- `INTEGRATION_UPDATE` - Manage integrations

**Pages:**
- `/admin/app-center` - App center/integrations

**Actions:**
- View integrations
- Configure integrations
- Enable/disable integrations

---

## Implementation Checklist

### High Priority
- [ ] Dashboard - Add `ANALYTICS_VIEW` check
- [ ] Courses - Add all course permissions
- [ ] Blog - Add all blog permissions
- [ ] Job Vacancies - Add all job permissions
- [ ] Job Applications - Add all application permissions

### Medium Priority
- [ ] Webinars - Add all webinar permissions
- [ ] General Enquiry - Add all enquiry permissions
- [ ] SNWEL Enquiry - Add all SNWEL enquiry permissions
- [ ] Widgets - Add all widget permissions
- [ ] Gallery - Add all gallery permissions

### Low Priority
- [ ] Course Categories - Add category permissions
- [ ] Job Categories - Add job category permissions
- [ ] Masters - Add master data permissions
- [ ] Settings - Add settings permissions
- [ ] App Center - Add integration permissions

---

## Implementation Pattern

For each page/component:

1. **Wrap page with PermissionGuard:**
```tsx
import { PermissionGuard } from '@/components/guards/PermissionGuard'
import { PERMISSIONS } from '@/constants/permissions'

export default function MyPage() {
  return (
    <PermissionGuard permission={PERMISSIONS.COURSE_VIEW}>
      {/* Page content */}
    </PermissionGuard>
  )
}
```

2. **Check permissions for actions:**
```tsx
import { usePermission } from '@/hooks/usePermissions'
import { PERMISSIONS } from '@/constants/permissions'

function MyComponent() {
  const canCreate = usePermission(PERMISSIONS.COURSE_CREATE)
  const canDelete = usePermission(PERMISSIONS.COURSE_DELETE)
  
  return (
    <>
      {canCreate && <Button>Create</Button>}
      {canDelete && <Button>Delete</Button>}
    </>
  )
}
```

3. **Handle API errors:**
```tsx
import { handlePermissionError } from '@/lib/permissionErrorHandler'

try {
  await deleteCourse(id)
} catch (error) {
  handlePermissionError(error)
}
```

---

## Notes

- SUPER_ADMIN role bypasses all permission checks
- All permissions are checked on both frontend (UX) and backend (security)
- Permission codes must match exactly between frontend and backend
- Use `InlinePermissionGuard` for small UI elements (buttons, links)
- Use `PermissionGuard` for full page/section protection
