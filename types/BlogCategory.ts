import { z } from "zod";

export interface BlogCategory {
    _id: string;
    name: string;
    slug: string;
    description?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}


export const CreateBlogCategoryDtoSchema = z.object({
    name: z.string(),
    slug: z.string(),
    description: z.string(),
    isActive: z.boolean()
})


export const UpdateBlogCategoryDtoSchema =  z.object({
    name: z.string().optional(),
    slug: z.string().optional(),
    description: z.string().optional(),
    isActive: z.boolean().optional()
})
