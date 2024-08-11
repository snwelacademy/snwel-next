import { z } from "zod";
export type CourseCategory = {
    _id: string,
    title: string,
    description?: string,
    shortDescription?: string,
    isPremium?: boolean,
    parentCategory?: CourseCategory,
    courseCount: number,
    slug: string
}


export const createCourseCategory = z.object({
    title: z.string(),
    description: z.string(),
    shortDescription: z.string(),
    isPremium: z.boolean().optional().default(false),
    parentCategory: z.string().optional(),
    slug: z.string(),
    isActive: z.boolean().optional()
});

export const updateCourseCategory = z.object({
    _id: z.string().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    shortDescription: z.string().optional(),
    isPremium: z.boolean().optional(),
    parentCategory: z.string().optional(),
    slug: z.string().optional(),
    isActive: z.boolean().optional()
});

export type CreateCourseCategory = z.infer<typeof createCourseCategory>;
export type UpdateCourseCategory = z.infer<typeof updateCourseCategory>;