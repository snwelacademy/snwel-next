# Backend Permissions API Specification

## Overview

This document specifies the required backend API endpoint for fetching the permissions list. This will enable the frontend to dynamically load permissions instead of hardcoding them.

---

## Why We Need This API

### Current Situation
- ✅ Frontend has all permissions hardcoded in `constants/permissions.ts`
- ✅ Works for now, but requires frontend deployment to add new permissions
- ⚠️ Risk of frontend/backend permission codes getting out of sync

### Benefits of Backend API
1. **Single Source of Truth** - Backend controls what permissions exist
2. **Dynamic Updates** - Add new permissions without frontend deployment
3. **Consistency** - Ensures frontend and backend are always in sync
4. **Better UX** - Can show user-friendly names and descriptions from backend
5. **Flexibility** - Can add/modify permissions without code changes

---

## API Endpoint Specification

### 1. Get All Permissions

**Endpoint:** `GET /api/admin/permissions`

**Authentication:** Required (Admin only)

**Required Permission:** `ROLE_VIEW` or `ROLE_CREATE` or `ROLE_UPDATE`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "code": "USER_CREATE",
      "name": "Create Users",
      "description": "Can create new users",
      "module": "USER_MANAGEMENT"
    },
    {
      "code": "COURSE_VIEW",
      "name": "View Courses",
      "description": "Can view courses",
      "module": "COURSE_MANAGEMENT"
    },
    {
      "code": "BLOG_CREATE",
      "name": "Create Blog",
      "description": "Can create blog posts",
      "module": "BLOG_MANAGEMENT"
    },
    {
      "code": "ENQUIRY_EXPORT",
      "name": "Export Enquiries",
      "description": "Can export enquiries",
      "module": "ENQUIRY"
    }
    // ... all other permissions
  ]
}
```

**Error Responses:**

```json
// 401 Unauthorized
{
  "success": false,
  "code": "UNAUTHORIZED",
  "message": "Authentication required"
}

// 403 Forbidden
{
  "success": false,
  "code": "PERMISSION_DENIED",
  "message": "You do not have permission to view permissions",
  "requiredPermission": "ROLE_VIEW"
}
```

---

## Data Model

### Permission Document (MongoDB)

```javascript
{
  "_id": ObjectId,
  "code": String,        // Unique permission code (e.g., "USER_CREATE")
  "name": String,        // User-friendly name (e.g., "Create Users")
  "description": String, // What this permission allows
  "module": String,      // Module/category (e.g., "USER_MANAGEMENT")
  "createdAt": Date,
  "updatedAt": Date,
  "__v": Number
}
```

### Field Specifications

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `code` | String | Yes | Unique permission identifier | "USER_CREATE" |
| `name` | String | Yes | Display name for UI | "Create Users" |
| `description` | String | Yes | What the permission allows | "Can create new users" |
| `module` | String | Yes | Permission category/module | "USER_MANAGEMENT" |

---

## Module Categories

The `module` field should use these standardized values:

```javascript
const PERMISSION_MODULES = {
  USER_MANAGEMENT: 'USER_MANAGEMENT',
  COURSE_MANAGEMENT: 'COURSE_MANAGEMENT',
  BLOG_MANAGEMENT: 'BLOG_MANAGEMENT',
  BLOG_CATEGORY: 'BLOG_CATEGORY',
  JOB_MANAGEMENT: 'JOB_MANAGEMENT',
  JOB_CATEGORY: 'JOB_CATEGORY',
  JOB_APPLICATION: 'JOB_APPLICATION',
  WEBINAR: 'WEBINAR',
  ENQUIRY: 'ENQUIRY',
  SNWEL_ENQUIRY: 'SNWEL_ENQUIRY',
  GALLERY: 'GALLERY',
  WIDGET: 'WIDGET',
  INTEGRATION: 'INTEGRATION',
  SETTINGS: 'SETTINGS',
  FILE: 'FILE',
  MASTER: 'MASTER',
  PAYMENT: 'PAYMENT',
  OTP: 'OTP',
  ANALYTICS: 'ANALYTICS'
}
```

---

## Complete Permissions List

Based on the current system, here are all permissions that should exist in the database:

### User Management (9 permissions)
```javascript
{ code: 'USER_CREATE', name: 'Create Users', description: 'Can create new users', module: 'USER_MANAGEMENT' }
{ code: 'USER_VIEW', name: 'View Users', description: 'Can view user list and details', module: 'USER_MANAGEMENT' }
{ code: 'USER_UPDATE', name: 'Update Users', description: 'Can update user details', module: 'USER_MANAGEMENT' }
{ code: 'USER_DELETE', name: 'Delete Users', description: 'Can delete users', module: 'USER_MANAGEMENT' }
{ code: 'ROLE_ASSIGN', name: 'Assign Roles', description: 'Can assign roles to users', module: 'USER_MANAGEMENT' }
{ code: 'ROLE_CREATE', name: 'Create Roles', description: 'Can create new roles', module: 'USER_MANAGEMENT' }
{ code: 'ROLE_VIEW', name: 'View Roles', description: 'Can view role list', module: 'USER_MANAGEMENT' }
{ code: 'ROLE_UPDATE', name: 'Update Roles', description: 'Can update role details', module: 'USER_MANAGEMENT' }
{ code: 'ROLE_DELETE', name: 'Delete Roles', description: 'Can delete roles', module: 'USER_MANAGEMENT' }
```

### Course Management (8 permissions)
```javascript
{ code: 'COURSE_CREATE', name: 'Create Courses', description: 'Can create courses', module: 'COURSE_MANAGEMENT' }
{ code: 'COURSE_VIEW', name: 'View Courses', description: 'Can view courses', module: 'COURSE_MANAGEMENT' }
{ code: 'COURSE_UPDATE', name: 'Update Courses', description: 'Can update courses', module: 'COURSE_MANAGEMENT' }
{ code: 'COURSE_DELETE', name: 'Delete Courses', description: 'Can delete courses', module: 'COURSE_MANAGEMENT' }
{ code: 'COURSE_PUBLISH', name: 'Publish Courses', description: 'Can publish courses', module: 'COURSE_MANAGEMENT' }
{ code: 'CATEGORY_MANAGE', name: 'Manage Categories', description: 'Can manage course categories', module: 'COURSE_MANAGEMENT' }
{ code: 'ENROLLMENT_VIEW', name: 'View Enrollments', description: 'Can view enrollments', module: 'COURSE_MANAGEMENT' }
{ code: 'ENROLLMENT_MANAGE', name: 'Manage Enrollments', description: 'Can manage enrollments', module: 'COURSE_MANAGEMENT' }
```

### Blog Management (5 permissions)
```javascript
{ code: 'BLOG_CREATE', name: 'Create Blog', description: 'Can create blog posts', module: 'BLOG_MANAGEMENT' }
{ code: 'BLOG_VIEW', name: 'View Blog', description: 'Can view blog posts (admin)', module: 'BLOG_MANAGEMENT' }
{ code: 'BLOG_UPDATE', name: 'Update Blog', description: 'Can update blog posts', module: 'BLOG_MANAGEMENT' }
{ code: 'BLOG_DELETE', name: 'Delete Blog', description: 'Can delete blog posts', module: 'BLOG_MANAGEMENT' }
{ code: 'BLOG_PUBLISH', name: 'Publish Blog', description: 'Can publish blog posts', module: 'BLOG_MANAGEMENT' }
```

### Blog Category (4 permissions)
```javascript
{ code: 'BLOG_CATEGORY_CREATE', name: 'Create Blog Category', description: 'Can create blog categories', module: 'BLOG_CATEGORY' }
{ code: 'BLOG_CATEGORY_VIEW', name: 'View Blog Category', description: 'Can view blog categories', module: 'BLOG_CATEGORY' }
{ code: 'BLOG_CATEGORY_UPDATE', name: 'Update Blog Category', description: 'Can update blog categories', module: 'BLOG_CATEGORY' }
{ code: 'BLOG_CATEGORY_DELETE', name: 'Delete Blog Category', description: 'Can delete blog categories', module: 'BLOG_CATEGORY' }
```

### Job Management (5 permissions)
```javascript
{ code: 'JOB_CREATE', name: 'Create Job', description: 'Can create job vacancies', module: 'JOB_MANAGEMENT' }
{ code: 'JOB_VIEW', name: 'View Job', description: 'Can view job vacancies (admin)', module: 'JOB_MANAGEMENT' }
{ code: 'JOB_UPDATE', name: 'Update Job', description: 'Can update job vacancies', module: 'JOB_MANAGEMENT' }
{ code: 'JOB_DELETE', name: 'Delete Job', description: 'Can delete job vacancies', module: 'JOB_MANAGEMENT' }
{ code: 'JOB_PUBLISH', name: 'Publish Job', description: 'Can publish job vacancies', module: 'JOB_MANAGEMENT' }
```

### Job Category (4 permissions)
```javascript
{ code: 'JOB_CATEGORY_CREATE', name: 'Create Job Category', description: 'Can create job categories', module: 'JOB_CATEGORY' }
{ code: 'JOB_CATEGORY_VIEW', name: 'View Job Category', description: 'Can view job categories', module: 'JOB_CATEGORY' }
{ code: 'JOB_CATEGORY_UPDATE', name: 'Update Job Category', description: 'Can update job categories', module: 'JOB_CATEGORY' }
{ code: 'JOB_CATEGORY_DELETE', name: 'Delete Job Category', description: 'Can delete job categories', module: 'JOB_CATEGORY' }
```

### Job Application (4 permissions)
```javascript
{ code: 'JOB_APP_VIEW', name: 'View Applications', description: 'Can view job applications', module: 'JOB_APPLICATION' }
{ code: 'JOB_APP_UPDATE', name: 'Update Applications', description: 'Can update job applications', module: 'JOB_APPLICATION' }
{ code: 'JOB_APP_DELETE', name: 'Delete Applications', description: 'Can delete job applications', module: 'JOB_APPLICATION' }
{ code: 'JOB_APP_EXPORT', name: 'Export Applications', description: 'Can export job applications', module: 'JOB_APPLICATION' }
```

### Webinar (5 permissions)
```javascript
{ code: 'WEBINAR_CREATE', name: 'Create Webinar', description: 'Can create webinars', module: 'WEBINAR' }
{ code: 'WEBINAR_VIEW', name: 'View Webinar', description: 'Can view webinars (admin)', module: 'WEBINAR' }
{ code: 'WEBINAR_UPDATE', name: 'Update Webinar', description: 'Can update webinars', module: 'WEBINAR' }
{ code: 'WEBINAR_DELETE', name: 'Delete Webinar', description: 'Can delete webinars', module: 'WEBINAR' }
{ code: 'WEBINAR_PUBLISH', name: 'Publish Webinar', description: 'Can publish webinars', module: 'WEBINAR' }
```

### Enquiry (4 permissions)
```javascript
{ code: 'ENQUIRY_VIEW', name: 'View Enquiries', description: 'Can view enquiries', module: 'ENQUIRY' }
{ code: 'ENQUIRY_UPDATE', name: 'Update Enquiries', description: 'Can update enquiries', module: 'ENQUIRY' }
{ code: 'ENQUIRY_DELETE', name: 'Delete Enquiries', description: 'Can delete enquiries', module: 'ENQUIRY' }
{ code: 'ENQUIRY_EXPORT', name: 'Export Enquiries', description: 'Can export enquiries', module: 'ENQUIRY' }
```

### SNWEL Enquiry (4 permissions)
```javascript
{ code: 'SNWEL_ENQUIRY_VIEW', name: 'View SNWEL Enquiries', description: 'Can view Snwel enquiries', module: 'SNWEL_ENQUIRY' }
{ code: 'SNWEL_ENQUIRY_UPDATE', name: 'Update SNWEL Enquiries', description: 'Can update Snwel enquiries', module: 'SNWEL_ENQUIRY' }
{ code: 'SNWEL_ENQUIRY_DELETE', name: 'Delete SNWEL Enquiries', description: 'Can delete Snwel enquiries', module: 'SNWEL_ENQUIRY' }
{ code: 'SNWEL_ENQUIRY_EXPORT', name: 'Export SNWEL Enquiries', description: 'Can export Snwel enquiries', module: 'SNWEL_ENQUIRY' }
```

### Gallery (4 permissions)
```javascript
{ code: 'GALLERY_CREATE', name: 'Create Gallery', description: 'Can create gallery assets', module: 'GALLERY' }
{ code: 'GALLERY_VIEW', name: 'View Gallery', description: 'Can view gallery', module: 'GALLERY' }
{ code: 'GALLERY_UPDATE', name: 'Update Gallery', description: 'Can update gallery', module: 'GALLERY' }
{ code: 'GALLERY_DELETE', name: 'Delete Gallery', description: 'Can delete gallery', module: 'GALLERY' }
```

### Widget (4 permissions)
```javascript
{ code: 'WIDGET_CREATE', name: 'Create Widget', description: 'Can create widgets', module: 'WIDGET' }
{ code: 'WIDGET_VIEW', name: 'View Widget', description: 'Can view widgets', module: 'WIDGET' }
{ code: 'WIDGET_UPDATE', name: 'Update Widget', description: 'Can update widgets', module: 'WIDGET' }
{ code: 'WIDGET_DELETE', name: 'Delete Widget', description: 'Can delete widgets', module: 'WIDGET' }
```

### Integration (2 permissions)
```javascript
{ code: 'INTEGRATION_VIEW', name: 'View Integrations', description: 'Can view integrations', module: 'INTEGRATION' }
{ code: 'INTEGRATION_UPDATE', name: 'Update Integrations', description: 'Can update integrations', module: 'INTEGRATION' }
```

### Settings (2 permissions)
```javascript
{ code: 'SETTINGS_VIEW', name: 'View Settings', description: 'Can view settings', module: 'SETTINGS' }
{ code: 'SETTINGS_UPDATE', name: 'Update Settings', description: 'Can update settings', module: 'SETTINGS' }
```

### File (3 permissions)
```javascript
{ code: 'FILE_UPLOAD', name: 'Upload Files', description: 'Can upload files', module: 'FILE' }
{ code: 'FILE_VIEW', name: 'View Files', description: 'Can view files', module: 'FILE' }
{ code: 'FILE_DELETE', name: 'Delete Files', description: 'Can delete files', module: 'FILE' }
```

### Master (4 permissions)
```javascript
{ code: 'MASTER_CREATE', name: 'Create Master Data', description: 'Can create master data', module: 'MASTER' }
{ code: 'MASTER_VIEW', name: 'View Master Data', description: 'Can view master data', module: 'MASTER' }
{ code: 'MASTER_UPDATE', name: 'Update Master Data', description: 'Can update master data', module: 'MASTER' }
{ code: 'MASTER_DELETE', name: 'Delete Master Data', description: 'Can delete master data', module: 'MASTER' }
```

### Payment (3 permissions)
```javascript
{ code: 'PAYMENT_VIEW', name: 'View Payments', description: 'Can view payments', module: 'PAYMENT' }
{ code: 'PAYMENT_REFUND', name: 'Refund Payments', description: 'Can refund payments', module: 'PAYMENT' }
{ code: 'PAYMENT_EXPORT', name: 'Export Payments', description: 'Can export payments', module: 'PAYMENT' }
```

### OTP (2 permissions)
```javascript
{ code: 'OTP_SEND', name: 'Send OTP', description: 'Can send OTP', module: 'OTP' }
{ code: 'OTP_VIEW', name: 'View OTP', description: 'Can view OTP logs', module: 'OTP' }
```

### Analytics (1 permission)
```javascript
{ code: 'ANALYTICS_VIEW', name: 'View Analytics', description: 'Can view analytics', module: 'ANALYTICS' }
```

---

## Frontend Integration

Once the backend API is ready, update the frontend service:

### Create Permission Service

**File:** `services/admin/permission-service.ts`

```typescript
import { fetchClient } from '@/lib/fetchClient'

export interface Permission {
  code: string
  name: string
  description: string
  module: string
}

export interface PermissionsResponse {
  success: boolean
  data: Permission[]
}

export async function getAllPermissions(): Promise<Permission[]> {
  const response = await fetchClient('/api/admin/permissions', {
    method: 'GET',
  })
  
  if (!response.ok) {
    throw new Error('Failed to fetch permissions')
  }
  
  const data: PermissionsResponse = await response.json()
  return data.data
}
```

### Update RoleDetailPage

```typescript
// In RoleDetailPage.tsx
const { data: permissions, isLoading } = useQuery({
  queryKey: ['permissions'],
  queryFn: getAllPermissions,
  staleTime: 10 * 60 * 1000, // Cache for 10 minutes
})

// Group permissions by module
const permissionsByModule = permissions?.reduce((acc, perm) => {
  if (!acc[perm.module]) {
    acc[perm.module] = []
  }
  acc[perm.module].push(perm)
  return acc
}, {} as Record<string, Permission[]>)
```

---

## Implementation Priority

### Phase 1: Basic API (Immediate)
- ✅ Create GET /api/admin/permissions endpoint
- ✅ Return all permissions with code, name, description, module
- ✅ Add proper authentication and permission checks

### Phase 2: Frontend Integration (After Phase 1)
- Update RoleDetailPage to fetch from API
- Add loading states
- Add error handling
- Cache permissions in React Query

### Phase 3: Admin Management (Future)
- Create UI to add/edit/delete permissions
- Add permission seeding script
- Add permission validation

---

## Testing

### Test Cases

1. **Successful Fetch**
   - Request: GET /api/admin/permissions
   - Expected: 200 OK with all permissions

2. **Unauthorized Access**
   - Request: GET /api/admin/permissions (no auth)
   - Expected: 401 Unauthorized

3. **Insufficient Permissions**
   - Request: GET /api/admin/permissions (user without ROLE_VIEW)
   - Expected: 403 Forbidden

4. **Performance**
   - Should return all ~70 permissions in < 100ms
   - Should support caching

---

## Summary

**Recommendation:** ✅ **YES, implement the backend API**

**Benefits:**
- Single source of truth for permissions
- No frontend deployment needed for new permissions
- Better consistency between frontend and backend
- Improved user experience with descriptions

**Priority:** Medium-High (should be done soon, but not blocking current work)

**Estimated Effort:** 2-3 hours for backend team

**Current Workaround:** Frontend uses hardcoded permissions in `constants/permissions.ts` - works fine for now but should be replaced with API when available.
