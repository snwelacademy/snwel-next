import { z } from 'zod';

// Location schema
const locationSchema = z.object({
  country: z.string().min(2).max(50).optional(),
  state: z.string().min(2).max(50),
  city: z.string().min(2).max(50),
  address: z.string().min(5).max(100),
  zipcode: z.string().min(4).max(20),
}).optional();

// Job vacancy schema
export const createJobVacancySchema = z.object({
  title: z.string().min(3).max(50),
  slug: z.string().min(3).max(50),
  companyName: z.string().min(3).max(50),
  description: z.string().min(10),
  requirements: z.string().min(10),
  location: locationSchema,
  salaryRange: z.string().optional(),
  employmentType: z.enum(['full-time', 'part-time', 'contract', 'temporary']),
  applicationDeadline: z.date(),
  categories: z.array(z.string()).min(1), // Assuming category IDs are strings
  postedDate: z.date().optional(),
  contactInfo: z.string().optional(),
  experienceLevel: z.enum(['entry-level', 'mid-level', 'senior-level']),
  companyLogo: z.string().optional(),
  additionalInfo: z.string().optional(),
  status: z.enum(['open', 'closed', 'filled']).optional(),
  remoteWorkOption: z.boolean().optional(),
  benefits: z.string().optional(),
  applicationLink: z.string().optional(),
});

export const updateJobVacancySchema = createJobVacancySchema.partial();

export type CreateJobVacancy = z.infer<typeof createJobVacancySchema>;
export type UpdateJobVacancy = z.infer<typeof updateJobVacancySchema>;

// Job vacancy type with Mongoose Document properties
export interface JobVacancyType {
  _id: string;
  title: string;
  slug: string;
  companyName: string;
  description: string;
  requirements: string;
  location?: {
    country: string;
    state: string;
    city: string;
    address: string;
    zipcode: string;
  };
  salaryRange?: string;
  employmentType: 'full-time' | 'part-time' | 'contract' | 'temporary';
  applicationDeadline: Date;
  categories: {name: string, _id: string}[]; // Array of category IDs
  postedDate?: Date;
  contactInfo?: string;
  experienceLevel: 'entry-level' | 'mid-level' | 'senior-level';
  companyLogo?: string;
  additionalInfo?: string;
  status?: 'open' | 'closed' | 'filled';
  remoteWorkOption?: boolean;
  benefits?: string;
  applicationLink?: string;
  isFeatured?: boolean;
  isActive?: boolean;
}

