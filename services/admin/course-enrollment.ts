
import { DEFAULT_LIST_OPTIONS } from './../../types/ListOptions';
import { protectedApi } from "@/lib/api";
import { ApiResponse, ListResponse } from '@/types/ApiResponses';
import { ListOptions } from "@/types/ListOptions";
import { AxiosResponse } from 'axios';
import { CourseEnrollment, CreateCourseQuery } from '@/types/CourseEnrollment';
import { objectToQueryString } from '@/lib/utils';
import dayjs from 'dayjs';
import XLSX from 'json-as-xlsx';

export async function getAllEnrollments (options?: ListOptions) {
    try {
        console.log({options})
        options = {...DEFAULT_LIST_OPTIONS, ...options}
        const res = await protectedApi.get<any, AxiosResponse<ApiResponse<ListResponse<CourseEnrollment>>>>(`/course-enroll?${objectToQueryString(options)}`);
        const data = res.data.data;
        return data;
    } catch (error) {
        console.log("Error: getAllEnrollments: ", error);
        throw new Error("Error in fetching enrollments list. Please try again")
    }
}
export async function createEnrollment (data: CreateCourseQuery) {
    try {
        
        const res = await protectedApi.post<any, AxiosResponse<ApiResponse<CourseEnrollment>>>('/course-enroll', data);
        return res.data.data;
    } catch (error) {
        console.log("Error: createCourse: ", error);
        throw new Error("Error in creating Enrollment list. Please try again")
    }
}
export async function updateEnrollment (id: string, data: any) {
    try {
        
        const res = await protectedApi.put<any, AxiosResponse<ApiResponse<CourseEnrollment>>>(`/course-enroll/${id}`, data);
        return res.data.data;
    } catch (error) {
        console.log("Error: updateCourse: ", error);
        throw new Error("Error in updating Enrollment. Please try again")
    }
}
export async function deleteEnrollment (id: string) {
    try {
        const res = await protectedApi.delete<any, AxiosResponse<ApiResponse<CourseEnrollment>>>(`/course-enroll/${id}`);
        return res.data.data;
    } catch (error) {
        console.log("Error: deleteCourse: ", error);
        throw new Error("Error in deleting Enrollment. Please try again")
    }
}
export async function getEnrollment (id: string) {
    try {
        const res = await protectedApi.get<any, AxiosResponse<ApiResponse<CourseEnrollment>>>(`/course-enroll/byId/${id}`);
        const data = res.data.data;
        return data;
    } catch (error) {
        console.log("Error: deleteCourse: ", error);
        throw new Error("Error in deleting Enrollment. Please try again")
    }
}

export async function exportAllJobApplications(options?: ListOptions) {
    try {
        const data = await getAllEnrollments(options) // Adjust if needed based on your API response

        // Prepare the data for export
        const jobApplications = [
            {
                sheet: "Job Applications",
                columns: [
                    { label: "Course", value: "course" },
                    { label: "Name", value: "name" },
                    { label: "Email", value: "email" },
                    { label: "Job Title", value: (row: any) => row.jobId.title }, // Custom format
                    { label: "Status", value: "status" },
                    { label: "Resume", value: "resumeUrl" },
                    { label: "Cover Letter", value: "coverLetter" },
                    { label: "Applied Date", value: (row: any) => dayjs(row.appliedDate).format('MM/DD/YYYY') }, // Format date
                ],
                content: data.docs.map(enrollments => ({
                    course: enrollments.courseId.title,
                    name: enrollments.userId.name,
                    email: enrollments.userId.email,
                    
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
        console.error("Error fetching job enrollments list: ", error);
        throw new Error("Failed to fetch job enrollments list. Please try again.");
    }
}

