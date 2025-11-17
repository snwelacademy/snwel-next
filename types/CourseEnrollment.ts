import { z } from "zod";
import { Widget } from "./WidgetTypes";

export type CourseEnrollment = {
    _id: string,
    userId?: {
        _id: string,
        email: string,
        name: string,
        profilePic?: string
    },
    courseId: {
        _id: string,
        title: string,
        slug: string,
        currency: string,
        price: number
    },
    status: 'ACTIVE' | 'PENDING' | 'DECLINED',
    paymentStatus: 'PAID'| 'PENDING'| 'FAILED',
    paymentMethod: 'CASH'| 'EXTERNAL'| 'INAPP',
    expiredAt: string,
    createdAt: Date,
    updatedAt: Date,
    widget?: Widget,
    otp?: {
        verified: boolean;
    },
    applicant?: {
        name: string;
        email: string;
        phone?: string;
        location?: {
            addr?: string;
            city?: string;
            state?: string;
            country?: string;
        };
    }
}

export const createCourseEnrollment = z.object({
    userId: z.string(),
    courseId: z.string(),
    status: z.enum(['ACTIVE', 'PENDING', 'DECLINED']).default('PENDING').optional(),
    paymentStatus: z.enum(['PAID', 'PENDING', 'FAILED']).default('PENDING').optional(),
    paymentMethod: z.enum(['CASH', 'EXTERNAL', 'INAPP']).optional(),
    expiredAt: z.string(),
    widget: z.string().optional()
})
export const updateCourseEnrollment = z.object({
    _id: z.string()
}).merge(createCourseEnrollment);

export type CreateCourseQuery = z.infer<typeof createCourseEnrollment>;
export type UpdateCourseQuery = z.infer<typeof updateCourseEnrollment>;