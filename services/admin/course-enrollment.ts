import { DEFAULT_LIST_OPTIONS } from './../../types/ListOptions';
import { protectedApi } from "@/lib/api";
import { ApiResponse, ListResponse } from '@/types/ApiResponses';
import { ListOptions } from "@/types/ListOptions";
import { AxiosResponse } from 'axios';
import { CourseEnrollment, CreateCourseQuery } from '@/types/CourseEnrollment';
import { objectToQueryString } from '@/lib/utils';
import dayjs from 'dayjs';
import XLSX, { IJsonSheet } from 'json-as-xlsx';

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

export async function exportAllEnrollments(options?: ListOptions) {
    try {
        const data = await getAllEnrollments(options)

        const transformedData = data.docs.map(enrollment => ({
            studentName: enrollment.userId.name,
            studentEmail: enrollment.userId.email,
            courseTitle: enrollment.courseId.title,
            coursePrice: `${enrollment.courseId.currency} ${enrollment.courseId.price}`,
            enrollmentStatus: enrollment.status,
            paymentStatus: enrollment.paymentStatus,
            paymentMethod: enrollment.paymentMethod,
            expiryDate: dayjs(enrollment.expiredAt).format('MM/DD/YYYY'),
            createdDate: dayjs(enrollment.createdAt).format('MM/DD/YYYY'),
            otpVerified: enrollment.otp?.verified ? "Yes" : "No"
        }));

        const sheets: IJsonSheet[] = [
            {
                sheet: "Course Enrollments",
                columns: [
                    { label: "Student Name", value: "studentName" },
                    { label: "Student Email", value: "studentEmail" },
                    { label: "Course Title", value: "courseTitle" },
                    { label: "Course Price", value: "coursePrice" },
                    { label: "Enrollment Status", value: "enrollmentStatus" },
                    { label: "Payment Status", value: "paymentStatus" },
                    { label: "Payment Method", value: "paymentMethod" },
                    { label: "Expiry Date", value: "expiryDate" },
                    { label: "Created Date", value: "createdDate" },
                    { label: "OTP Verified", value: "otpVerified" },
                ],
                content: transformedData
            }
        ];

        const optionsXLSX = {
            fileName: `course_enrollments_${options?.page || 1}`,
            sheet: 'Course Enrollments',
            tableOptions: {},
        };

        const blob = XLSX(sheets, optionsXLSX);
        return blob;
    } catch (error) {
        console.error("Error exporting enrollments: ", error);
        throw new Error("Failed to export enrollments. Please try again.");
    }
}

