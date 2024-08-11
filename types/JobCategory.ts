import { z } from 'zod';

// Job category schema
export const createJobCategorySchema = z.object({
  name: z.string().min(3).max(50),
  description: z.string().min(10).optional(),
});

export const updateJobCategorySchema = createJobCategorySchema.partial();

export type CreatedJobCategory = z.infer<typeof createJobCategorySchema>;
export type UpdateJobCategory = z.infer<typeof updateJobCategorySchema>;


// Job category type with Mongoose Document properties
export interface JobCategoryType {
  _id: string;
  name: string;
  description?: string;
}
