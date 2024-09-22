// src/types/JobApplication.ts
//title slug _id companyName
export type JobApplication = {
    _id: string;
    applicantName: string;
    email: string;
    phone: string;
    appliedDate: string; // ISO 8601 date string
    status: 'applied' | 'interview' | 'offered' | 'rejected'; // Example statuses
    resumeUrl?: string; // Optional field
    coverLetter?: string; // Optional field
    notes?: string; // Optional field
    jobId: {
        title: string,
        companyName: string,
        slug: string,
        _id: string
    },
    createdAt: string| Date,
    updatedAt: string | Date
  };
  