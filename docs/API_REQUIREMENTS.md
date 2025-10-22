# API Requirements for Admin Panel

This document lists all API endpoints required to make the admin panel fully functional.

## 📊 Dashboard APIs

### 1. Dashboard Statistics
**Endpoint:** `GET /api/admin/dashboard/stats`
**Purpose:** Get overview statistics for dashboard cards

**Response:**
```json
{
  "revenue": {
    "total": 125000,
    "change": 12.5,
    "trend": "up"
  },
  "courses": {
    "total": 45,
    "published": 38,
    "drafts": 7
  },
  "enrollments": {
    "total": 1250,
    "thisMonth": 180,
    "change": 8.2
  },
  "enquiries": {
    "total": 450,
    "pending": 23,
    "resolved": 427
  }
}
```

### 2. Revenue Trends
**Endpoint:** `GET /api/admin/dashboard/revenue-trend`
**Purpose:** Get monthly revenue data for charts

**Query Parameters:**
- `period`: string (optional) - "6months", "12months", "year"
- `startDate`: ISO date (optional)
- `endDate`: ISO date (optional)

**Response:**
```json
{
  "data": [
    { "month": "Jan", "revenue": 15000, "enrollments": 120 },
    { "month": "Feb", "revenue": 18000, "enrollments": 145 },
    { "month": "Mar", "revenue": 22000, "enrollments": 180 }
  ],
  "total": 55000,
  "average": 18333
}
```

### 3. Top Performing Courses
**Endpoint:** `GET /api/admin/dashboard/top-courses`
**Purpose:** Get best-selling courses data

**Query Parameters:**
- `limit`: number (default: 5)
- `period`: string - "week", "month", "quarter", "year"

**Response:**
```json
{
  "courses": [
    {
      "courseId": "course_123",
      "title": "React Masterclass",
      "enrollments": 145,
      "revenue": 14500,
      "trend": "up",
      "percentageChange": 12.3
    }
  ]
}
```

### 4. Recent Enrollments
**Endpoint:** `GET /api/admin/dashboard/recent-enrollments`
**Purpose:** Get latest course purchases

**Query Parameters:**
- `limit`: number (default: 10)

**Response:**
```json
{
  "enrollments": [
    {
      "enrollmentId": "enr_123",
      "user": {
        "name": "John Doe",
        "email": "john@example.com",
        "avatar": "url"
      },
      "course": {
        "title": "React Masterclass",
        "id": "course_123"
      },
      "amount": 99,
      "currency": "USD",
      "timestamp": "2025-10-22T08:30:00Z"
    }
  ]
}
```

### 5. Activity Feed
**Endpoint:** `GET /api/admin/dashboard/activity-feed`
**Purpose:** Get recent platform activities

**Query Parameters:**
- `limit`: number (default: 10)
- `types`: array - ["course", "user", "revenue", "blog", "job"]

**Response:**
```json
{
  "activities": [
    {
      "id": "act_123",
      "type": "course",
      "action": "created",
      "user": {
        "name": "Admin User",
        "id": "user_123"
      },
      "target": {
        "title": "Advanced TypeScript",
        "id": "course_456"
      },
      "timestamp": "2025-10-22T08:30:00Z"
    }
  ]
}
```

---

## 📚 Course Management APIs

### 6. List Courses (Enhanced)
**Endpoint:** `GET /api/admin/course`
**Status:** ✅ Already exists (needs verification)

**Required Query Parameters:**
- `page`: number
- `limit`: number
- `status`: "ALL" | "PUBLISHED" | "SAVED"
- `search`: string (optional)
- `category`: string (optional)
- `sortBy`: "createdAt" | "title" | "enrollments" (optional)
- `sortOrder`: "asc" | "desc" (optional)

### 7. Course Statistics
**Endpoint:** `GET /api/admin/course/statistics`
**Purpose:** Get aggregated course metrics

**Response:**
```json
{
  "totalCourses": 45,
  "publishedCourses": 38,
  "draftCourses": 7,
  "totalEnrollments": 1250,
  "averageRating": 4.5,
  "completionRate": 68.5
}
```

### 8. Course by ID
**Endpoint:** `GET /api/admin/course/byId/:courseId`
**Status:** ✅ Already exists

### 9. Create Course
**Endpoint:** `POST /api/admin/course`
**Status:** ✅ Already exists

### 10. Update Course
**Endpoint:** `PUT /api/admin/course/:courseId`
**Status:** ✅ Already exists

### 11. Partial Update Course
**Endpoint:** `PUT /api/admin/course/partial-update/:courseId`
**Status:** ✅ Already exists

### 12. Delete Course
**Endpoint:** `DELETE /api/admin/course/:courseId`
**Status:** ✅ Already exists

---

## 📝 Blog Management APIs

### 13. List Blogs
**Endpoint:** `GET /api/admin/blogs`
**Purpose:** Get paginated list of blog posts

**Query Parameters:**
- `page`: number
- `limit`: number
- `status`: "ALL" | "PUBLISHED" | "DRAFT"
- `search`: string (optional)
- `author`: string (optional)
- `category`: string (optional)

**Response:**
```json
{
  "docs": [
    {
      "_id": "blog_123",
      "title": "Getting Started with Next.js",
      "slug": "getting-started-nextjs",
      "author": "John Doe",
      "status": "PUBLISHED",
      "excerpt": "Learn the basics...",
      "featuredImage": "url",
      "createdAt": "2025-10-01T00:00:00Z",
      "updatedAt": "2025-10-20T00:00:00Z"
    }
  ],
  "total": 125,
  "page": 1,
  "limit": 20,
  "pages": 7
}
```

### 14. Blog Statistics
**Endpoint:** `GET /api/admin/blogs/statistics`
**Purpose:** Get blog metrics

**Response:**
```json
{
  "totalBlogs": 125,
  "published": 98,
  "drafts": 27,
  "totalViews": 45000,
  "avgViewsPerPost": 360
}
```

### 15. Create Blog
**Endpoint:** `POST /api/admin/blogs`

### 16. Update Blog
**Endpoint:** `PUT /api/admin/blogs/:id`

### 17. Delete Blog
**Endpoint:** `DELETE /api/admin/blogs/:id`

---

## 🎨 Widget Management APIs

### 18. List Widgets
**Endpoint:** `GET /api/admin/widgets`
**Purpose:** Get all widgets

**Query Parameters:**
- `type`: "Slider" | "ctaBanner" | "marketingPopup" | "cdtWidget"
- `isActive`: boolean

**Response:**
```json
{
  "widgets": [
    {
      "_id": "widget_123",
      "title": "Homepage Countdown",
      "code": "HOMEPAGE_COUNTDOWN",
      "type": "cdtWidget",
      "isActive": true,
      "content": {},
      "settings": {},
      "createdAt": "2025-10-01T00:00:00Z"
    }
  ]
}
```

### 19. Get Widget by ID
**Endpoint:** `GET /api/admin/widgets/:id`

### 20. Create Widget
**Endpoint:** `POST /api/admin/widgets`
**Status:** ✅ Already exists (verify)

**Request Body:**
```json
{
  "title": "Homepage Countdown",
  "code": "HOMEPAGE_COUNTDOWN",
  "type": "cdtWidget",
  "content": {
    "startTime": "2025-10-22T00:00:00Z",
    "endTime": "2025-12-31T23:59:59Z",
    "timeZone": "UTC",
    "position": "FLOATING_TOP",
    "message": "<p>Sale ends soon!</p>"
  },
  "settings": {
    "countDisplay": {
      "day": { "isActive": true, "label": "Days" },
      "hrs": { "isActive": true, "label": "Hours" },
      "minutes": { "isActive": true, "label": "Minutes" },
      "seconds": { "isActive": true, "label": "Seconds" }
    },
    "button": {
      "text": "Shop Now",
      "link": "/courses",
      "isActive": true
    },
    "actionAfterComplete": {
      "action": "HIDE"
    },
    "appearance": {
      "colors": {
        "timerColor": "#3b82f6",
        "timerTextColor": "#ffffff",
        "labelsColor": "#64748b",
        "messageColor": "#1e293b",
        "buttonColor": "#3b82f6",
        "buttonTextColor": "#ffffff",
        "bgColor": "#ffffff"
      }
    }
  }
}
```

### 21. Update Widget
**Endpoint:** `PUT /api/admin/widgets/:id`
**Status:** ✅ Already exists (verify)

### 22. Delete Widget
**Endpoint:** `DELETE /api/admin/widgets/:id`

---

## 👥 User Management APIs

### 23. List Users (Enhanced)
**Endpoint:** `GET /api/admin/users`
**Status:** ✅ Likely exists (verify pagination)

**Query Parameters:**
- `page`: number
- `limit`: number
- `search`: string (optional)
- `role`: string (optional)
- `status`: "ACTIVE" | "INACTIVE" | "ALL"

### 24. User Statistics
**Endpoint:** `GET /api/admin/users/statistics`

**Response:**
```json
{
  "totalUsers": 1250,
  "activeUsers": 1180,
  "newThisMonth": 85,
  "byRole": {
    "admin": 5,
    "instructor": 20,
    "student": 1225
  }
}
```

---

## 🛡️ Role & Permission APIs

### 25. List Roles
**Endpoint:** `GET /api/admin/roles`
**Status:** ✅ Already exists

### 26. Get Role by ID
**Endpoint:** `GET /api/admin/roles/:id`

### 27. Create Role
**Endpoint:** `POST /api/admin/roles`
**Status:** ✅ Already exists

### 28. Update Role
**Endpoint:** `PUT /api/admin/roles/:id`
**Status:** ✅ Already exists

### 29. Delete Role
**Endpoint:** `DELETE /api/admin/roles/:id`
**Status:** ✅ Already exists

### 30. List All Permissions
**Endpoint:** `GET /api/admin/permissions`
**Purpose:** Get all available permissions with categories

**Response:**
```json
{
  "permissions": [
    {
      "code": "COURSE_CREATE",
      "name": "Create Course",
      "category": "Content Management",
      "description": "Ability to create new courses"
    }
  ],
  "categories": [
    "Content Management",
    "User & Access",
    "Enrollments & Enquiries",
    "Jobs & Recruitment",
    "System & Settings"
  ]
}
```

---

## 💼 Jobs Management APIs

### 31. List Job Vacancies
**Endpoint:** `GET /api/admin/job-vacancies`

**Query Parameters:**
- `page`: number
- `limit`: number
- `status`: "ACTIVE" | "CLOSED" | "ALL"
- `search`: string

### 32. Job Applications
**Endpoint:** `GET /api/admin/job-applications`

**Query Parameters:**
- `page`: number
- `limit`: number
- `status`: "PENDING" | "REVIEWED" | "ACCEPTED" | "REJECTED"
- `jobId`: string (optional)

### 33. Job Statistics
**Endpoint:** `GET /api/admin/jobs/statistics`

**Response:**
```json
{
  "activeJobs": 12,
  "totalApplications": 450,
  "pendingReview": 23,
  "avgApplicationsPerJob": 37.5
}
```

---

## 📧 Enquiry Management APIs

### 34. SNWEL Enquiries
**Endpoint:** `GET /api/admin/snwel-enquiry`
**Status:** ✅ Already exists

**Query Parameters:**
- `page`: number
- `limit`: number
- `status`: "PENDING" | "RESOLVED" | "ALL"

### 35. Export Enquiries as CSV
**Endpoint:** `GET /api/admin/snwel-enquiry/export`
**Status:** ✅ Already exists
**Response Type:** CSV file

### 36. Course Enquiries
**Endpoint:** `GET /api/admin/course-enquiries`

---

## 📈 Analytics APIs

### 37. Platform Analytics
**Endpoint:** `GET /api/admin/analytics/overview`

**Query Parameters:**
- `startDate`: ISO date
- `endDate`: ISO date
- `granularity`: "day" | "week" | "month"

**Response:**
```json
{
  "revenue": {
    "total": 125000,
    "byPeriod": []
  },
  "enrollments": {
    "total": 1250,
    "byPeriod": []
  },
  "users": {
    "new": 180,
    "active": 850,
    "byPeriod": []
  },
  "traffic": {
    "pageViews": 45000,
    "uniqueVisitors": 8500
  }
}
```

### 38. Course Analytics
**Endpoint:** `GET /api/admin/analytics/courses/:courseId`

**Response:**
```json
{
  "courseId": "course_123",
  "enrollments": {
    "total": 145,
    "trend": []
  },
  "revenue": 14500,
  "completionRate": 68.5,
  "averageRating": 4.7,
  "reviews": 89
}
```

---

## 📁 File Upload APIs

### 39. Upload Image
**Endpoint:** `POST /api/admin/upload/image`
**Purpose:** Upload images for courses, blogs, etc.

**Request:** FormData with `file` field

**Response:**
```json
{
  "url": "https://cdn.example.com/images/filename.jpg",
  "filename": "filename.jpg",
  "size": 245678,
  "mimeType": "image/jpeg"
}
```

### 40. Upload Media
**Endpoint:** `POST /api/admin/upload/media`
**Purpose:** Upload videos, PDFs, etc.

---

## 🔔 Notifications APIs

### 41. Get Notifications
**Endpoint:** `GET /api/admin/notifications`

**Query Parameters:**
- `page`: number
- `limit`: number
- `unreadOnly`: boolean

**Response:**
```json
{
  "notifications": [
    {
      "id": "notif_123",
      "type": "enrollment",
      "title": "New Enrollment",
      "message": "John Doe enrolled in React Masterclass",
      "isRead": false,
      "createdAt": "2025-10-22T08:30:00Z",
      "link": "/admin/enrollments/enr_123"
    }
  ],
  "unreadCount": 5
}
```

### 42. Mark as Read
**Endpoint:** `PUT /api/admin/notifications/:id/read`

---

## 🔍 Search APIs

### 43. Global Search
**Endpoint:** `GET /api/admin/search`

**Query Parameters:**
- `q`: string (search query)
- `types`: array - ["courses", "blogs", "users", "jobs"]
- `limit`: number

**Response:**
```json
{
  "results": {
    "courses": [],
    "blogs": [],
    "users": [],
    "jobs": []
  },
  "totalResults": 23
}
```

---

## Priority Implementation Order

### High Priority (Dashboard Functional)
1. ✅ Dashboard Statistics (GET /api/admin/dashboard/stats)
2. ✅ Revenue Trends (GET /api/admin/dashboard/revenue-trend)
3. ✅ Top Courses (GET /api/admin/dashboard/top-courses)
4. ✅ Recent Enrollments (GET /api/admin/dashboard/recent-enrollments)
5. ✅ Activity Feed (GET /api/admin/dashboard/activity-feed)

### Medium Priority (Core Features)
6. ⚠️ Blog Statistics (GET /api/admin/blogs/statistics)
7. ⚠️ User Statistics (GET /api/admin/users/statistics)
8. ⚠️ Job Statistics (GET /api/admin/jobs/statistics)
9. ⚠️ Course Statistics (GET /api/admin/course/statistics)

### Low Priority (Enhancement)
10. Platform Analytics APIs
11. Search APIs
12. Notifications APIs

---

## Notes for Backend Team

1. **Pagination Standard:** All list endpoints should return:
   ```json
   {
     "docs": [],
     "total": 0,
     "page": 1,
     "limit": 20,
     "pages": 5
   }
   ```

2. **Error Response Format:**
   ```json
   {
     "success": false,
     "error": {
       "code": "ERROR_CODE",
       "message": "Human readable message"
     }
   }
   ```

3. **Success Response Format:**
   ```json
   {
     "success": true,
     "data": {}
   }
   ```

4. **Authentication:** All endpoints require valid JWT token in Authorization header

5. **Rate Limiting:** Implement rate limiting for all endpoints (100 requests/minute per user)

6. **Caching:** Dashboard stats should be cached for 5 minutes
