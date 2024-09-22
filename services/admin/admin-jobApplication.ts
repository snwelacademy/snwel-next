import { JobApplication } from '@/types/JobApplication';
import { DEFAULT_LIST_OPTIONS } from './../../types/ListOptions';
import { api, protectedApi } from "@/lib/api";
import { ApiResponse, ListResponse } from '@/types/ApiResponses';
import { ListOptions } from "@/types/ListOptions";
import { AxiosResponse } from 'axios';
import { objectToQueryString } from '@/lib/utils';
import XLSX from 'json-as-xlsx';
import dayjs from 'dayjs';

export async function getAllJobApplications(options?: ListOptions) {
    try {
        options = { ...DEFAULT_LIST_OPTIONS, ...options };
        const res = await api.get<any, AxiosResponse<ApiResponse<ListResponse<JobApplication>>>>(`/job-application?${objectToQueryString(options)}`);
        const data = res.data.data;
        return data;
    } catch (error) {
        console.log("Error: getAllJobApplications: ", error);
        throw new Error("Error in fetching job application list. Please try again");
    }
}
export async function exportAllJobApplications(options?: ListOptions) {
    try {
        const data = await getAllJobApplications(options) // Adjust if needed based on your API response

        // Prepare the data for export
        const jobApplications = [
            {
                sheet: "Job Applications",
                columns: [
                    { label: "Applicant Name", value: "applicantName" },
                    { label: "Email", value: "email" },
                    { label: "Phone", value: "phone" },
                    { label: "Job Title", value: (row: any) => row.jobId.title }, // Custom format
                    { label: "Status", value: "status" },
                    { label: "Resume", value: "resumeUrl" },
                    { label: "Cover Letter", value: "coverLetter" },
                    { label: "Applied Date", value: (row: any) => dayjs(row.appliedDate).format('MM/DD/YYYY') }, // Format date
                ],
                content: data.docs.map(application => ({
                    applicantName: application.applicantName,
                    email: application.email,
                    phone: application.phone,
                    jobId: application.jobId, // Assuming jobId has title field
                    status: application.status,
                    resumeUrl: application.resumeUrl||'N/A',
                    coverLetter: application.coverLetter||'N/A',
                    appliedDate: application.appliedDate,
                })),
            }
        ];
        const optionsXLSX = {
            fileName: `job_applications_${options?.page || 1}`,
            sheet: 'Job Applications',
            tableOptions: {
            },
        };

        // Create the XLSX file
        const blob = XLSX(jobApplications, optionsXLSX);
        return blob;
    } catch (error) {
        console.error("Error fetching job application list: ", error);
        throw new Error("Failed to fetch job application list. Please try again.");
    }
}

export async function createJobApplication(mutateJobApplication: any) {
    try {
        const res = await protectedApi.post<any, AxiosResponse<ApiResponse<JobApplication>>>('/job-application', mutateJobApplication);
        const data = res.data.data;
        return data;
    } catch (error) {
        console.log("Error: createJobApplication: ", error);
        throw new Error("Error in creating job application. Please try again");
    }
}

export async function updateJobApplication(jobApplicationId: string, mutateJobApplication: any) {
    try {
        const res = await protectedApi.put<any, AxiosResponse<ApiResponse<JobApplication>>>(`/job-application/${jobApplicationId}`, mutateJobApplication);
        const data = res.data.data;
        return data;
    } catch (error) {
        console.log("Error: updateJobApplication: ", error);
        throw new Error("Error in updating job application. Please try again");
    }
}

export async function deleteJobApplication(jobApplicationId: string) {
    try {
        const res = await protectedApi.delete<any, AxiosResponse<ApiResponse<JobApplication>>>(`/job-application/${jobApplicationId}`);
        const data = res.data.data;
        return data;
    } catch (error) {
        console.log("Error: deleteJobApplication: ", error);
        throw new Error("Error in deleting job application. Please try again");
    }
}

export async function getJobApplication(jobApplicationId: string) {
    try {
        const res = await api.get<any, AxiosResponse<ApiResponse<JobApplication>>>(`/job-application/${jobApplicationId}`);
        const data = res.data.data;
        return data;
    } catch (error) {
        console.log("Error: getJobApplication: ", error);
        throw new Error("Error in getting job application. Please try again");
    }
}

export async function getJobApplicationBySlug(slug: string) {
    try {
        const res = await api.get<any, AxiosResponse<ApiResponse<JobApplication>>>(`/job-application/${slug}`);
        const data = res.data.data;
        return data;
    } catch (error) {
        console.log("Error: getJobApplicationBySlug: ", error);
        throw new Error("Error in getting job application. Please try again");
    }
}
