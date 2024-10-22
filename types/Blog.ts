import { z } from 'zod';
export interface Blog {
    _id: string; // Assuming this is a string type, like a UUID
    title: string;
    content: string;
    slug?: string;
    coverImage?: string,
    coverPic?: string,
    excerpt?: string,
    tags?: string[],
    author?: {
        _id: string,
        name: string,
        email: string,
        profilePic: string
    }; // ID of the author
    category?: {
        _id: string,
        name: string,
        slug: string
    },
    createdAt: Date;
    updatedAt: Date;
    isDeleted?: boolean; // Optional for soft delete
    published: boolean; // To check if the blog is published
}



// Blog creation schema
export const createBlogSchema = z.object({
    title: z.string().min(1, 'Title is required').max(255, 'Title must be at most 255 characters'),
    content: z.string().min(1, 'Content is required'),
    authorId: z.string().uuid('Author ID must be a valid UUID'),
    published: z.boolean().optional().default(false), // Optional field, defaults to false
});

// Blog update schema
export const updateBlogSchema = z.object({
    title: z.string().min(1, 'Title is required').max(255, 'Title must be at most 255 characters').optional(),
    content: z.string().min(1, 'Content is required').optional(),
    published: z.boolean().optional(),
});

// Example usage
export type CreateBlog = z.infer<typeof createBlogSchema>;
export type UpdateBlog = z.infer<typeof updateBlogSchema>;

