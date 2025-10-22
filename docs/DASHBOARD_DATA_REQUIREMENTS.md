# Dashboard Data Requirements for Backend Team

This document specifies the exact data structure and business logic needed for the admin dashboard.

---

## 📊 Dashboard Overview Section

### 1. Revenue Card
**Endpoint:** `GET /api/admin/dashboard/stats`

**Required Data:**
```typescript
{
  revenue: {
    total: number,              // Total revenue (all time or period)
    thisMonth: number,          // Revenue for current month
    lastMonth: number,          // Revenue for previous month
    change: number,             // Percentage change (thisMonth vs lastMonth)
    trend: 'up' | 'down' | 'stable',
    currency: string            // e.g., "USD", "INR"
  }
}
```

**Business Logic:**
- Calculate `change = ((thisMonth - lastMonth) / lastMonth) * 100`
- `trend = 'up'` if change > 0, `'down'` if < 0, `'stable'` if === 0
- Include decimal places (2 digits)

**Example:**
```json
{
  "revenue": {
    "total": 125000,
    "thisMonth": 15500,
    "lastMonth": 13800,
    "change": 12.32,
    "trend": "up",
    "currency": "USD"
  }
}
```

---

### 2. Courses Card
**Endpoint:** `GET /api/admin/dashboard/stats`

**Required Data:**
```typescript
{
  courses: {
    total: number,              // Total number of courses
    published: number,          // Courses with status = PUBLISHED
    drafts: number,             // Courses with status = SAVED/DRAFT
    inactive: number            // Courses that are archived/inactive
  }
}
```

**Business Logic:**
- Count all courses in database
- Filter by status field
- `drafts = total - published - inactive`

**Example:**
```json
{
  "courses": {
    "total": 45,
    "published": 38,
    "drafts": 7,
    "inactive": 0
  }
}
```

---

### 3. Enrollments Card
**Endpoint:** `GET /api/admin/dashboard/stats`

**Required Data:**
```typescript
{
  enrollments: {
    total: number,              // All-time enrollments
    thisMonth: number,          // Enrollments this month
    lastMonth: number,          // Enrollments last month
    change: number,             // Percentage change
    active: number,             // Currently active students
    completed: number           // Completed enrollments
  }
}
```

**Business Logic:**
- Count from enrollments table/collection
- Filter by `createdAt` date for month comparison
- `active = enrollments with status = 'ACTIVE'`
- `completed = enrollments with status = 'COMPLETED'`

**Example:**
```json
{
  "enrollments": {
    "total": 1250,
    "thisMonth": 180,
    "lastMonth": 166,
    "change": 8.43,
    "active": 892,
    "completed": 358
  }
}
```

---

### 4. Enquiries Card
**Endpoint:** `GET /api/admin/dashboard/stats`

**Required Data:**
```typescript
{
  enquiries: {
    total: number,              // All enquiries
    pending: number,            // Enquiries needing attention
    resolved: number,           // Resolved enquiries
    thisWeek: number            // New enquiries this week
  }
}
```

**Business Logic:**
- Count from enquiries table (snwel_enquiries, course_enquiries, etc.)
- `pending = status === 'PENDING' || status === 'NEW'`
- `resolved = status === 'RESOLVED' || status === 'CLOSED'`

**Example:**
```json
{
  "enquiries": {
    "total": 450,
    "pending": 23,
    "resolved": 427,
    "thisWeek": 12
  }
}
```

---

## 📈 Revenue Trend Chart

### Endpoint: `GET /api/admin/dashboard/revenue-trend`

**Query Parameters:**
```typescript
{
  period?: '6months' | '12months' | 'year',  // Default: '6months'
  startDate?: string,                         // ISO date (optional)
  endDate?: string                            // ISO date (optional)
}
```

**Required Response:**
```typescript
{
  data: Array<{
    month: string,              // e.g., "Jan", "Feb", "Mar"
    revenue: number,            // Total revenue for that month
    enrollments: number,        // Number of enrollments
    avgOrderValue: number       // revenue / enrollments
  }>,
  summary: {
    totalRevenue: number,
    totalEnrollments: number,
    averageMonthly: number,
    highestMonth: string,
    lowestMonth: string
  }
}
```

**Business Logic:**
1. Group revenue by month
2. Sum all transactions per month
3. Count enrollments per month
4. Calculate `avgOrderValue = revenue / enrollments`
5. Sort by date ascending

**Example:**
```json
{
  "data": [
    { "month": "May", "revenue": 18000, "enrollments": 120, "avgOrderValue": 150 },
    { "month": "Jun", "revenue": 22000, "enrollments": 145, "avgOrderValue": 151.72 },
    { "month": "Jul", "revenue": 25000, "enrollments": 180, "avgOrderValue": 138.89 }
  ],
  "summary": {
    "totalRevenue": 125000,
    "totalEnrollments": 850,
    "averageMonthly": 20833.33,
    "highestMonth": "Oct",
    "lowestMonth": "May"
  }
}
```

---

## 🏆 Top Performing Courses

### Endpoint: `GET /api/admin/dashboard/top-courses`

**Query Parameters:**
```typescript
{
  limit?: number,                             // Default: 5
  period?: 'week' | 'month' | 'quarter' | 'year'  // Default: 'month'
}
```

**Required Response:**
```typescript
{
  courses: Array<{
    courseId: string,
    title: string,
    thumbnail: string,          // Image URL
    enrollments: number,        // Total enrollments in period
    revenue: number,            // Total revenue generated
    trend: 'up' | 'down',       // Compared to previous period
    percentageChange: number,   // % change in enrollments
    rating: number,             // Average rating (0-5)
    completionRate: number      // % of students who completed
  }>,
  period: string                // The period used for calculation
}
```

**Business Logic:**
1. Filter enrollments by date range (based on period)
2. Group by courseId
3. Count enrollments per course
4. Sum revenue per course (enrollment price × count)
5. Sort by revenue DESC
6. Limit to top N (default 5)
7. Compare with previous period for trend
8. Calculate `percentageChange = ((current - previous) / previous) * 100`

**Example:**
```json
{
  "courses": [
    {
      "courseId": "course_123",
      "title": "React Masterclass 2024",
      "thumbnail": "https://cdn.example.com/react.jpg",
      "enrollments": 145,
      "revenue": 14500,
      "trend": "up",
      "percentageChange": 12.3,
      "rating": 4.7,
      "completionRate": 68.5
    },
    {
      "courseId": "course_456",
      "title": "Node.js Complete Guide",
      "thumbnail": "https://cdn.example.com/node.jpg",
      "enrollments": 132,
      "revenue": 13200,
      "trend": "up",
      "percentageChange": 8.9,
      "rating": 4.6,
      "completionRate": 72.1
    }
  ],
  "period": "month"
}
```

---

## 🎓 Recent Enrollments

### Endpoint: `GET /api/admin/dashboard/recent-enrollments`

**Query Parameters:**
```typescript
{
  limit?: number,                             // Default: 10
  offset?: number                             // For pagination
}
```

**Required Response:**
```typescript
{
  enrollments: Array<{
    enrollmentId: string,
    user: {
      userId: string,
      name: string,
      email: string,
      avatar?: string           // Profile picture URL (optional)
    },
    course: {
      courseId: string,
      title: string,
      thumbnail: string
    },
    amount: number,             // Price paid
    currency: string,           // e.g., "USD"
    paymentMethod: string,      // e.g., "Credit Card", "PayPal"
    timestamp: string,          // ISO date string
    status: 'ACTIVE' | 'PENDING' | 'COMPLETED'
  }>,
  total: number,
  hasMore: boolean
}
```

**Business Logic:**
1. Join enrollments with users and courses tables
2. Sort by `createdAt` DESC
3. Limit to N most recent
4. Include user profile data (name, email, avatar)
5. Include course basic info
6. Format timestamp as ISO string
7. Calculate relative time (e.g., "2 hours ago")

**Example:**
```json
{
  "enrollments": [
    {
      "enrollmentId": "enr_123",
      "user": {
        "userId": "user_456",
        "name": "John Doe",
        "email": "john@example.com",
        "avatar": "https://cdn.example.com/avatars/john.jpg"
      },
      "course": {
        "courseId": "course_123",
        "title": "React Masterclass 2024",
        "thumbnail": "https://cdn.example.com/react.jpg"
      },
      "amount": 99,
      "currency": "USD",
      "paymentMethod": "Credit Card",
      "timestamp": "2025-10-22T08:30:00Z",
      "status": "ACTIVE"
    }
  ],
  "total": 1250,
  "hasMore": true
}
```

---

## 📢 Activity Feed

### Endpoint: `GET /api/admin/dashboard/activity-feed`

**Query Parameters:**
```typescript
{
  limit?: number,                             // Default: 10
  types?: string[],                           // Filter by activity type
  startDate?: string,                         // ISO date (optional)
  endDate?: string                            // ISO date (optional)
}
```

**Required Response:**
```typescript
{
  activities: Array<{
    activityId: string,
    type: 'course' | 'user' | 'revenue' | 'blog' | 'job' | 'enquiry',
    action: 'created' | 'updated' | 'deleted' | 'published',
    actor: {                    // The user who performed action
      userId: string,
      name: string,
      role: string
    },
    target: {                   // The object affected
      id: string,
      type: string,
      title: string
    },
    metadata?: object,          // Additional context
    timestamp: string,          // ISO date
    icon: string,               // Icon name for UI
    color: string               // Color code for UI
  }>,
  total: number
}
```

**Business Logic:**
1. Aggregate activities from multiple tables:
   - Course creation/updates
   - New user registrations
   - Payment transactions
   - Blog posts published
   - Job applications
   - New enquiries
2. Sort by timestamp DESC
3. Limit to N most recent
4. Map activity type to icon and color:
   - course → Activity, blue
   - user → Users, green
   - revenue → DollarSign, purple
   - blog → FileText, orange
   - job → Briefcase, teal

**Example:**
```json
{
  "activities": [
    {
      "activityId": "act_123",
      "type": "course",
      "action": "created",
      "actor": {
        "userId": "admin_1",
        "name": "Admin User",
        "role": "Administrator"
      },
      "target": {
        "id": "course_456",
        "type": "course",
        "title": "Advanced TypeScript"
      },
      "metadata": {
        "category": "Programming",
        "price": 149
      },
      "timestamp": "2025-10-22T08:30:00Z",
      "icon": "Activity",
      "color": "blue"
    },
    {
      "activityId": "act_124",
      "type": "user",
      "action": "created",
      "actor": {
        "userId": "system",
        "name": "System",
        "role": "System"
      },
      "target": {
        "id": "user_789",
        "type": "user",
        "title": "sarah.jones@example.com"
      },
      "timestamp": "2025-10-22T08:15:00Z",
      "icon": "Users",
      "color": "green"
    },
    {
      "activityId": "act_125",
      "type": "revenue",
      "action": "created",
      "actor": {
        "userId": "user_789",
        "name": "Sarah Jones",
        "role": "Student"
      },
      "target": {
        "id": "payment_999",
        "type": "payment",
        "title": "$299 from Premium Plan"
      },
      "metadata": {
        "amount": 299,
        "currency": "USD",
        "method": "Stripe"
      },
      "timestamp": "2025-10-22T07:45:00Z",
      "icon": "DollarSign",
      "color": "purple"
    }
  ],
  "total": 543
}
```

---

## 📊 Additional Dashboard Widgets (Future)

### User Growth Chart
**Endpoint:** `GET /api/admin/dashboard/user-growth`

**Required Data:**
```typescript
{
  data: Array<{
    date: string,               // YYYY-MM-DD
    newUsers: number,
    activeUsers: number,
    totalUsers: number
  }>,
  summary: {
    growthRate: number,         // Percentage
    averageDailySignups: number
  }
}
```

---

### Course Completion Rates
**Endpoint:** `GET /api/admin/dashboard/completion-rates`

**Required Data:**
```typescript
{
  overall: {
    completionRate: number,     // Percentage (0-100)
    averageTimeToComplete: number,  // In days
    dropoffPoints: Array<{
      point: string,            // e.g., "Lesson 3"
      percentage: number        // % of users who drop at this point
    }>
  },
  byCourse: Array<{
    courseId: string,
    title: string,
    completionRate: number,
    enrolled: number,
    completed: number
  }>
}
```

---

## 🔐 Important Notes for Backend

### 1. Performance Optimization
- **Cache dashboard stats for 5 minutes** (Redis recommended)
- Use database indexes on:
  - `enrollments.createdAt`
  - `courses.status`
  - `users.createdAt`
  - `transactions.createdAt`

### 2. Real-time Updates (Optional)
Consider WebSocket for:
- New enrollment notifications
- Revenue updates
- New enquiry alerts

### 3. Date Range Handling
- All dates should be in **ISO 8601 format**
- Server should handle timezone conversion
- Default to UTC for storage
- Support user timezone for display

### 4. Aggregation Queries
Use efficient aggregation pipelines (MongoDB) or GROUP BY queries (SQL):

```sql
-- Example: Revenue by month
SELECT 
  DATE_FORMAT(created_at, '%Y-%m') as month,
  SUM(amount) as revenue,
  COUNT(*) as enrollments
FROM transactions
WHERE created_at >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
GROUP BY month
ORDER BY month ASC
```

### 5. Error Handling
Return meaningful errors:
```json
{
  "success": false,
  "error": {
    "code": "INSUFFICIENT_DATA",
    "message": "Not enough data for the requested period",
    "details": {
      "minDate": "2025-01-01",
      "requestedPeriod": "12months"
    }
  }
}
```

---

## 📋 Testing Checklist for Backend

- [ ] All endpoints return data in correct format
- [ ] Percentage calculations are accurate (2 decimal places)
- [ ] Date filtering works correctly
- [ ] Pagination is implemented
- [ ] Empty states handled (no data scenarios)
- [ ] Large datasets don't timeout (use limits)
- [ ] Currency symbols match user/system settings
- [ ] Timezone conversions are correct
- [ ] Cache invalidation works on data updates
- [ ] Response times < 500ms for dashboard stats

---

## 🚀 Implementation Priority

### Phase 1 (Week 1) - Critical
1. ✅ Dashboard Stats endpoint
2. ✅ Revenue Trend endpoint
3. ✅ Top Courses endpoint

### Phase 2 (Week 2) - Important
4. Recent Enrollments endpoint
5. Activity Feed endpoint
6. Course/Blog/Job Statistics

### Phase 3 (Week 3) - Enhancement
7. Analytics endpoints
8. User growth data
9. Completion rate tracking

---

## Sample Integration Code (Frontend)

```typescript
// services/admin/dashboard-service.ts
export async function getDashboardStats() {
  const response = await fetch('/api/admin/dashboard/stats', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  return response.json()
}

// components/admin-components/DashboardPage.tsx
const { data, isLoading } = useQuery({
  queryKey: ['dashboard-stats'],
  queryFn: getDashboardStats,
  staleTime: 5 * 60 * 1000, // 5 minutes cache
  refetchInterval: 5 * 60 * 1000 // Auto-refresh every 5 min
})
```

---

## Contact Information

For questions or clarifications on data requirements:
- Frontend Team: [Your contact]
- Backend Team: [Backend contact]
- Database Schema: [Link to schema docs]
