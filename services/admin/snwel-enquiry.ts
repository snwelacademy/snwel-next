// src/services/enquiryService.ts

import { Enquiry } from '@/types/snwelEnquiry';
import { DEFAULT_LIST_OPTIONS } from '@/types/ListOptions';
import { api, protectedApi } from "@/lib/api";
import { ApiResponse, ListResponse } from '@/types/ApiResponses';
import { ListOptions } from "@/types/ListOptions";
import { AxiosResponse } from 'axios';
import { objectToQueryString } from '@/lib/utils';
import XLSX from 'json-as-xlsx';
import dayjs from 'dayjs';

// Fetch all enquiries with optional pagination and filters
export async function getAllEnquiries(options?: ListOptions) {
    try {
        options = { ...DEFAULT_LIST_OPTIONS, ...options };
        const res = await api.get<any, AxiosResponse<ApiResponse<ListResponse<Enquiry>>>>(`/enquiry?${objectToQueryString(options)}`);
        const data = res.data.data;
        return data;
    } catch (error) {
        console.error("Error: getAllEnquiries: ", error);
        throw new Error("Error in fetching enquiry list. Please try again");
    }
}

// Export enquiries to an XLSX file
export async function exportAllEnquiries(options?: ListOptions) {
    try {
        const data = await getAllEnquiries(options);

        // Prepare the data for export
        const enquiries = [
            {
                sheet: "Enquiries",
                columns: [
                    { label: "Name", value: "name" },
                    { label: "Business Email", value: "businessEmail" },
                    { label: "Company", value: "company" },
                    { label: "Enquiry Type", value: "enquiryType" },
                    { label: "Mobile No", value: "mobileNo" },
                    { label: "Description", value: "description" },
                    { label: "Created Date", value: (row: any) => dayjs(row.createdAt).format('MM/DD/YYYY') },
                ],
                content: data.docs.map(enquiry => ({
                    name: enquiry.name,
                    businessEmail: enquiry.businessEmail,
                    company: enquiry.company,
                    enquiryType: enquiry.enquiryType,
                    mobileNo: enquiry.mobileNo,
                    description: enquiry.description,
                    createdAt: enquiry.createdAt,
                })),
            }
        ];

        const optionsXLSX = {
            fileName: `enquiries_${options?.page || 1}`,
            sheet: 'Enquiries',
        };

        // Create the XLSX file
        const blob = XLSX(enquiries, optionsXLSX);
        return blob;
    } catch (error) {
        console.error("Error fetching enquiry list: ", error);
        throw new Error("Failed to fetch enquiry list. Please try again.");
    }
}

// Create a new enquiry
export async function createEnquiry(mutateEnquiry: any) {
    try {
        const res = await protectedApi.post<any, AxiosResponse<ApiResponse<Enquiry>>>('/enquiry', mutateEnquiry);
        const data = res.data.data;
        return data;
    } catch (error) {
        console.error("Error: createEnquiry: ", error);
        throw new Error("Error in creating enquiry. Please try again");
    }
}

// Update an existing enquiry by ID
export async function updateEnquiry(enquiryId: string, mutateEnquiry: any) {
    try {
        const res = await protectedApi.put<any, AxiosResponse<ApiResponse<Enquiry>>>(`/enquiry/${enquiryId}`, mutateEnquiry);
        const data = res.data.data;
        return data;
    } catch (error) {
        console.error("Error: updateEnquiry: ", error);
        throw new Error("Error in updating enquiry. Please try again");
    }
}

// Delete an enquiry by ID
export async function deleteEnquiry(enquiryId: string) {
    try {
        const res = await protectedApi.delete<any, AxiosResponse<ApiResponse<Enquiry>>>(`/enquiry/${enquiryId}`);
        const data = res.data.data;
        return data;
    } catch (error) {
        console.error("Error: deleteEnquiry: ", error);
        throw new Error("Error in deleting enquiry. Please try again");
    }
}

// Fetch an enquiry by ID
export async function getEnquiry(enquiryId: string) {
    try {
        const res = await api.get<any, AxiosResponse<ApiResponse<Enquiry>>>(`/enquiry/${enquiryId}`);
        const data = res.data.data;
        return data;
    } catch (error) {
        console.error("Error: getEnquiry: ", error);
        throw new Error("Error in getting enquiry. Please try again");
    }
}
