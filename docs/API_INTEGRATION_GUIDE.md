# API Integration Guide

Complete guide to integrating the backend APIs into the frontend.

---

## 🎯 Quick Start

All backend APIs are **LIVE and READY** to use! Follow this guide to integrate them into your components.

---

## 📦 Service Layer

We've created service files that wrap all API calls with proper typing and error handling.

### **Available Services:**

1. **`services/admin/dashboard-service.ts`** - Dashboard statistics & charts
2. **`services/admin/statistics-service.ts`** - Module-specific statistics
3. **Existing services** - Course, Blog, User, Role, etc. (already implemented)

---

## 🔧 How to Use Services

### **1. Import the Service Function**

```typescript
import { getDashboardStats, getRevenueTrend, getTopCourses } from '@/services/admin/dashboard-service';
```

### **2. Use with React Query (Recommended)**

```typescript
import { useQuery } from '@tanstack/react-query';
import { getDashboardStats } from '@/services/admin/dashboard-service';

function DashboardComponent() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: getDashboardStats,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    refetchInterval: 5 * 60 * 1000, // Auto-refresh
  });

  if (isLoading) return <ModernLoader />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Revenue: ${data.revenue.total}</h1>
      <p>Trend: {data.revenue.trend}</p>
    </div>
  );
}
```

### **3. Use with Async/Await**

```typescript
import { getDashboardStats } from '@/services/admin/dashboard-service';

async function fetchData() {
  try {
    const stats = await getDashboardStats();
    console.log(stats.revenue.total);
  } catch (error) {
    console.error('Failed:', error.message);
  }
}
```

---

## 📊 Dashboard Integration Example

### **Complete Component Example:**

```typescript
'use client'

import { useQuery } from '@tanstack/react-query';
import {
  getDashboardStats,
  getRevenueTrend,
  getTopCourses,
  getRecentEnrollments,
  getActivityFeed
} from '@/services/admin/dashboard-service';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ModernLoader from '@/components/ModernLoader';

export default function DashboardPage() {
  // Fetch all dashboard data
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: getDashboardStats,
    staleTime: 5 * 60 * 1000,
  });

  const { data: revenueTrend } = useQuery({
    queryKey: ['revenue-trend', '6months'],
    queryFn: () => getRevenueTrend({ period: '6months' }),
  });

  const { data: topCourses } = useQuery({
    queryKey: ['top-courses'],
    queryFn: () => getTopCourses({ limit: 5 }),
  });

  const { data: recentEnrollments } = useQuery({
    queryKey: ['recent-enrollments'],
    queryFn: () => getRecentEnrollments({ limit: 10 }),
  });

  const { data: activityFeed } = useQuery({
    queryKey: ['activity-feed'],
    queryFn: () => getActivityFeed({ limit: 10 }),
  });

  if (statsLoading) return <ModernLoader variant="dots" />;

  return (
    <div className="p-8 space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              ${stats?.revenue.total.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">
              {stats?.revenue.change > 0 ? '+' : ''}
              {stats?.revenue.change.toFixed(1)}% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats?.courses.total}</p>
            <p className="text-sm text-muted-foreground">
              {stats?.courses.published} published
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Enrollments</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {stats?.enrollments.total.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">
              {stats?.enrollments.thisMonth} this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Enquiries</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats?.enquiries.total}</p>
            <p className="text-sm text-muted-foreground">
              {stats?.enquiries.pending} pending
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            {revenueTrend?.data.map((item) => (
              <div key={item.month} className="flex justify-between">
                <span>{item.month}</span>
                <span>${item.revenue.toLocaleString()}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Top Courses */}
        <Card>
          <CardHeader>
            <CardTitle>Top Courses</CardTitle>
          </CardHeader>
          <CardContent>
            {topCourses?.courses.map((course) => (
              <div key={course.courseId} className="flex justify-between">
                <span>{course.title}</span>
                <span>${course.revenue.toLocaleString()}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
```

---

## 📚 Available Service Functions

### **Dashboard Service (`dashboard-service.ts`)**

| Function | Parameters | Returns | Permission |
|----------|-----------|---------|------------|
| `getDashboardStats()` | None | `DashboardStats` | `ANALYTICS_VIEW` |
| `getRevenueTrend()` | `{ period?, startDate?, endDate? }` | `RevenueTrend` | `ANALYTICS_VIEW` |
| `getTopCourses()` | `{ limit?, period? }` | `{ courses, period }` | `ANALYTICS_VIEW` |
| `getRecentEnrollments()` | `{ limit?, offset? }` | `{ enrollments, total, hasMore }` | `ANALYTICS_VIEW` |
| `getActivityFeed()` | `{ limit?, types?, startDate?, endDate? }` | `{ activities, total }` | `ANALYTICS_VIEW` |

### **Statistics Service (`statistics-service.ts`)**

| Function | Parameters | Returns | Permission |
|----------|-----------|---------|------------|
| `getCourseStatistics()` | None | `CourseStatistics` | `COURSE_VIEW` |
| `getUserStatistics()` | None | `UserStatistics` | `USER_VIEW` |
| `getJobStatistics()` | None | `JobStatistics` | `JOB_VIEW` |
| `getBlogStatistics()` | None | `BlogStatistics` | `BLOG_VIEW` |

---

## 🔒 Authentication & Permissions

### **All API calls automatically include:**
- JWT token from cookies (`credentials: 'include'`)
- Proper error handling
- Type safety

### **Permission Checking:**

The backend enforces permissions on all endpoints. Frontend should also check permissions for UI gating:

```typescript
import { useAuth } from '@/context/AuthContext';

function AdminComponent() {
  const { user } = useAuth();
  
  // Check if user has permission
  const canViewAnalytics = user?.permissions?.includes('ANALYTICS_VIEW');
  
  if (!canViewAnalytics) {
    return <div>Access Denied</div>;
  }
  
  // Render component...
}
```

---

## 🎨 Chart Integration

### **Revenue Trend Chart (Recharts)**

```typescript
import { useQuery } from '@tanstack/react-query';
import { getRevenueTrend } from '@/services/admin/dashboard-service';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function RevenueChart() {
  const { data } = useQuery({
    queryKey: ['revenue-trend'],
    queryFn: () => getRevenueTrend({ period: '6months' }),
  });

  return (
    <LineChart width={600} height={300} data={data?.data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
      <Line type="monotone" dataKey="enrollments" stroke="#82ca9d" />
    </LineChart>
  );
}
```

---

## 🔄 React Query Best Practices

### **Cache Configuration:**

```typescript
// components/providers.tsx or app layout
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

export function Providers({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
```

### **Query Keys Convention:**

```typescript
// Use descriptive, hierarchical keys
['dashboard-stats']
['revenue-trend', '6months']
['top-courses', 'month', 5] // period, limit
['recent-enrollments', { limit: 10, offset: 0 }]
['course-stats']
['user-stats']
```

### **Refetch Strategies:**

```typescript
// Auto-refresh every 5 minutes
useQuery({
  queryKey: ['dashboard-stats'],
  queryFn: getDashboardStats,
  refetchInterval: 5 * 60 * 1000,
});

// Manual refetch with button
const { refetch } = useQuery({
  queryKey: ['dashboard-stats'],
  queryFn: getDashboardStats,
});

<Button onClick={() => refetch()}>Refresh</Button>
```

### **Dependent Queries:**

```typescript
// Fetch user first, then their stats
const { data: user } = useQuery({
  queryKey: ['current-user'],
  queryFn: getCurrentUser,
});

const { data: userStats } = useQuery({
  queryKey: ['user-stats', user?.id],
  queryFn: () => getUserStatistics(user.id),
  enabled: !!user?.id, // Only fetch when user is loaded
});
```

---

## 🚨 Error Handling

### **Global Error Handling:**

```typescript
import { useQuery } from '@tanstack/react-query';
import { getDashboardStats } from '@/services/admin/dashboard-service';
import { toast } from 'sonner';

function DashboardComponent() {
  const { data, error, isError } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: getDashboardStats,
    onError: (error: Error) => {
      toast.error('Failed to load dashboard', {
        description: error.message,
      });
    },
  });

  if (isError) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Failed to load data</p>
        <p className="text-sm text-muted-foreground">{error.message}</p>
      </div>
    );
  }

  // Render data...
}
```

### **Retry Logic:**

```typescript
useQuery({
  queryKey: ['dashboard-stats'],
  queryFn: getDashboardStats,
  retry: (failureCount, error) => {
    // Don't retry on 401/403 errors
    if (error.message.includes('401') || error.message.includes('403')) {
      return false;
    }
    // Retry up to 3 times for other errors
    return failureCount < 3;
  },
  retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
});
```

---

## 📊 Loading States

### **Using ModernLoader:**

```typescript
import ModernLoader from '@/components/ModernLoader';

function DashboardComponent() {
  const { data, isLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: getDashboardStats,
  });

  if (isLoading) {
    return <ModernLoader variant="dots" />;
  }

  return <div>{/* Content */}</div>;
}
```

### **Skeleton Loading:**

```typescript
import { CardLoader } from '@/components/ModernLoader';

function DashboardComponent() {
  const { data, isLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: getDashboardStats,
  });

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-4">
        <CardLoader />
        <CardLoader />
        <CardLoader />
        <CardLoader />
      </div>
    );
  }

  return <div>{/* Cards */}</div>;
}
```

---

## 🔍 TypeScript Types

All service functions return fully-typed data:

```typescript
import type {
  DashboardStats,
  RevenueTrend,
  TopCourse,
  RecentEnrollment,
  Activity
} from '@/services/admin/dashboard-service';

import type {
  CourseStatistics,
  UserStatistics,
  JobStatistics,
  BlogStatistics
} from '@/services/admin/statistics-service';

// Use in your components
const stats: DashboardStats | undefined = data;
const courses: TopCourse[] = topCoursesData?.courses || [];
```

---

## 🧪 Testing

### **Mock Service Functions:**

```typescript
// __tests__/dashboard.test.tsx
import { getDashboardStats } from '@/services/admin/dashboard-service';

jest.mock('@/services/admin/dashboard-service');

test('renders dashboard with stats', async () => {
  (getDashboardStats as jest.Mock).mockResolvedValue({
    revenue: { total: 125000, change: 12.5, trend: 'up', currency: 'USD' },
    courses: { total: 45, published: 38, drafts: 7 },
    // ... rest of data
  });

  render(<DashboardPage />);
  
  await waitFor(() => {
    expect(screen.getByText('$125,000')).toBeInTheDocument();
  });
});
```

---

## 🚀 Performance Optimization

### **1. Prefetch Data:**

```typescript
import { useQueryClient } from '@tanstack/react-query';
import { getDashboardStats } from '@/services/admin/dashboard-service';

function Sidebar() {
  const queryClient = useQueryClient();

  const prefetchDashboard = () => {
    queryClient.prefetchQuery({
      queryKey: ['dashboard-stats'],
      queryFn: getDashboardStats,
    });
  };

  return (
    <Link
      href="/admin/dashboard"
      onMouseEnter={prefetchDashboard} // Prefetch on hover
    >
      Dashboard
    </Link>
  );
}
```

### **2. Parallel Queries:**

```typescript
// Fetch all data in parallel
function DashboardPage() {
  const queries = useQueries({
    queries: [
      { queryKey: ['dashboard-stats'], queryFn: getDashboardStats },
      { queryKey: ['revenue-trend'], queryFn: () => getRevenueTrend({ period: '6months' }) },
      { queryKey: ['top-courses'], queryFn: () => getTopCourses({ limit: 5 }) },
    ],
  });

  const [statsQuery, trendQuery, coursesQuery] = queries;

  if (queries.some(q => q.isLoading)) {
    return <ModernLoader />;
  }

  // All data loaded in parallel!
}
```

### **3. Background Updates:**

```typescript
useQuery({
  queryKey: ['dashboard-stats'],
  queryFn: getDashboardStats,
  staleTime: 5 * 60 * 1000,
  refetchInterval: 5 * 60 * 1000, // Auto-refresh in background
  refetchIntervalInBackground: true, // Continue when tab is inactive
});
```

---

## 📝 Checklist for Integration

- [ ] Install/verify `@tanstack/react-query` is in package.json
- [ ] Wrap app with `QueryClientProvider`
- [ ] Import service functions
- [ ] Use `useQuery` hooks in components
- [ ] Add loading states with `ModernLoader`
- [ ] Handle errors gracefully
- [ ] Check user permissions before rendering
- [ ] Configure cache/refetch strategies
- [ ] Test with real API endpoints
- [ ] Add TypeScript types to components

---

## 🆘 Troubleshooting

### **Error: "Failed to fetch"**
- Check if API server is running
- Verify JWT token is valid (check `/api/auth/me`)
- Ensure user has required permission

### **Error: "401 Unauthorized"**
- User is not logged in
- Redirect to login page

### **Error: "403 Forbidden"**
- User lacks required permission
- Show "Access Denied" message

### **Data not updating:**
- Check `staleTime` configuration
- Manually call `refetch()` if needed
- Clear cache with `queryClient.invalidateQueries()`

---

## 📞 Support

For issues or questions:
1. Check this guide
2. Review `docs/API_REQUIREMENTS.md`
3. Review `docs/DASHBOARD_DATA_REQUIREMENTS.md`
4. Contact backend team for API issues
5. Contact frontend team for integration issues

---

**Happy Coding! 🎉**
