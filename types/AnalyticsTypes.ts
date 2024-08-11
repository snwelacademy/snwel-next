// Analytics types
export interface PopularCourse {
    id: string;
    image: string;
    title: string;
    slug: string;
    shortDescription: string;
    rating: number;
    enrolled: number;
    isPopular: boolean;
    price: number;
    currency: string;
}

export interface TotalEnrolledUsers {
    totalEnrolled: number;
}

export interface UpcomingWebinar {
    id: string;
    title: string;
    shortDescription: string;
    startDate: string;
    slug: string;
    thumbnail: string;
    isActive: boolean;
    hosts: { id: string, name: string }[];
}

export interface CourseByCategory {
    id: string;
    image: string;
    title: string;
    slug: string;
    shortDescription: string;
    rating: number;
    enrolled: number;
    price: number;
    currency: string;
}

export interface TotalRevenue {
    amount: number;
    currency: string;
    comparison: number
}

export interface TopRatedCourse {
    id: string;
    image: string;
    title: string;
    slug: string;
    shortDescription: string;
    rating: number;
    enrolled: number;
    price: number;
    currency: string;
}

export interface TotalCourses {
    totalCourses: number;
}

export interface TotalUsers {
    totalUsers: number;
}

export interface UserEnrollment {
    id: string;
    userId: string;
    courseId: string;
    status: 'ACTIVE' | 'PENDING' | 'DECLINED';
    paymentStatus: 'PAID' | 'PENDING' | 'FAILED';
    paymentMethod: 'CASH' | 'EXTERNAL' | 'INAPP';
    expiredAt?: Date;
}

export interface ImportantEntitiesCount {
    totalCourses: number;
    totalUsers: number;
    totalRevenue: number;
    paidEnrollments: number;
    allEnrollments: number
}

export interface RecentSale {
    id: string;
    courseId: string;
    userId: string;
    amount: number;
    currency: string;
    date: string;
}
