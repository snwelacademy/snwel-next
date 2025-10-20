import { z } from 'zod';

// Snwel Enquiry Schema based on backend API
export const createSnwelEnquirySchema = z.object({
  name: z.string().min(1, "Name is required"),
  businessEmail: z.string().email("Invalid business email address"),
  company: z.string().min(1, "Company is required"),
  enquiryType: z.string().min(1, "Enquiry type is required"),
  mobileNo: z.string().min(10, "Invalid mobile number"),
  description: z.string().max(200, "Description must be 200 characters or less"),
  consentGiven: z.boolean().refine((val) => val === true, {
    message: "Consent must be given",
  }),
  otpValidated: z.boolean().refine((val) => val === true, {
    message: "OTP must be validated",
  }),
});

export const updateSnwelEnquirySchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  businessEmail: z.string().email("Invalid business email address").optional(),
  company: z.string().min(1, "Company is required").optional(),
  enquiryType: z.string().min(1, "Enquiry type is required").optional(),
  mobileNo: z.string().min(10, "Invalid mobile number").optional(),
  description: z.string().max(200, "Description must be 200 characters or less").optional(),
  consentGiven: z.boolean().optional(),
  otpValidated: z.boolean().optional(),
});

export type CreateSnwelEnquiry = z.infer<typeof createSnwelEnquirySchema>;
export type UpdateSnwelEnquiry = z.infer<typeof updateSnwelEnquirySchema>;

export interface SnwelEnquiry {
  _id: string;
  name: string;
  businessEmail: string;
  company: string;
  enquiryType: string;
  mobileNo: string;
  description: string;
  consentGiven: boolean;
  otpValidated: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}
