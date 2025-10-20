import {  z } from "zod";
import { CourseCategory } from ".";
import { Master } from "./master";

export enum COURSE_STATUS {
    SAVED = 'SAVED',
    PUBLISHED = 'PUBLISHED'
}

export const CourseTabContentTypeSchema = z.enum(['COMPONENT', 'RICH_TEXT']);
export type CourseTabContentType = z.infer<typeof CourseTabContentTypeSchema>;
export const CourseTabSchema = z.object({
    name: z.string(),
    contentType: CourseTabContentTypeSchema,
    content: z.string(),
    isActive: z.boolean().default(true)
})

export const CourseInfoSchema = z.object({
    lable: z.string(),
    type: z.enum(['PREBUILT', 'CUSTOM', 'VIDEO_LINK', 'IMAGE_LINK', "LINK"]),
    style: z.object({
        buttonType: z.string().default('primary').optional(),
        linkType: z.string(),
        linkStyle: z.string(),
        name: z.string()
    }).optional(),
    imageLink: z.string().optional(),
    value: z.string(),
    isActive: z.boolean().default(false),
})

export type CourseInfoType = z.infer<typeof CourseInfoSchema>;

export type CourseTabType = z.infer<typeof CourseTabSchema>;




export type Course = {
    _id: string,
    image?: string,
    title: string;
    shortDescription: string;
    slug: string,
    text: string;
    courseDuration: string;
    categories: CourseCategory[];
    difficulty: string;
    language: string[];
    assessment: string;
    certificate: boolean;
    lessons: number;
    rating: number;
    enrolled: number;
    isPopular: boolean;
    price: number,
    currency: string,
    discount?: number,
    isPremium?: boolean,
    masterCategory: string,
    appearence?: {
        themeColor?: string,
        forgroundColor?: string
    }
    images?: {
        promotionalCardImage?: string,
        iconImage?: string
    },
    curriculum:{title: string, duration: string, unit: string, curriculumType?: string, classCount?: string } [],
    status: COURSE_STATUS,
    content?: {
        tabs: CourseTabType[],
        info?: CourseInfoType[],
        durationUnit?: string,
        showPrice?: boolean
    },
    widget?: string,
    qualifications?: Master[],
    trainingModes?: Master[]
}