/* eslint-disable @typescript-eslint/no-explicit-any */
// types/EnquiryTypes.ts
import { z } from 'zod';
import { Webinar } from './Webinar';


// Define the base enquiry schema
export const baseEnquirySchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Invalid phone number"),
  message: z.string().optional(),
  type: z.string(),
  isUnique: z.boolean().optional()
});

const GeneralEnquiry = z.object({
  message: z.string().max(500, "Message must be 500 characters or less").optional()
})

const WebinarEnquiry = z.object({
  webinarId: z.string({ required_error: "Webinar ID is required" }).min(1),
  message: z.string().max(500, "Message must be 500 characters or less").optional(),
  location: z.object({
    country: z.string({ required_error: "Country is required" }),
    city: z.string({ required_error: "City is required" }),
    state: z.string({ required_error: "State is required" }),
    address: z.string({ required_error: "Address is required" })
  }).optional(),
});

// Create a union schema for all enquiry types
export const enquirySchema = baseEnquirySchema.merge(z.object({
  extraInfo: z.union([WebinarEnquiry, GeneralEnquiry]),
}));


export type CreateEnquirySchema = z.infer<typeof enquirySchema>;
export type BaseEnquiry = z.infer<typeof baseEnquirySchema>;
export interface DynamicEnquiry<T= any> extends BaseEnquiry{
  _id: string
  extraInfo: T,
  createdAt: Date | string,
  updatedAt: Date | string
}
export type WebinarEnquiry = z.infer<typeof WebinarEnquiry> & {webinar?: Webinar};
export type GeneralEnquiry = z.infer<typeof GeneralEnquiry>;
export type Enquiry = BaseEnquiry & (GeneralEnquiry | WebinarEnquiry) & { _id: string, createdAt: Date|string, updatedAt: Date|string };


