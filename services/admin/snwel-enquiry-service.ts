import { protectedApi } from "@/lib/api";
import { ApiResponse, ListResponse } from '@/types/ApiResponses';
import { ListOptions, DEFAULT_LIST_OPTIONS } from '@/types/ListOptions';
import { AxiosResponse } from 'axios';
import { listOptionsToUrlSearchParams } from '@/lib/utils';
import { CreateSnwelEnquiry, SnwelEnquiry, UpdateSnwelEnquiry } from '@/types/SnwelEnquiryTypes';

/**
 * Get all Snwel enquiries (paginated)
 * GET /snwel-enquiry/
 */
export async function getAllSnwelEnquiries(options?: ListOptions) {
    try {
        options = { ...DEFAULT_LIST_OPTIONS, ...options };
        const res = await protectedApi.get<any, AxiosResponse<ApiResponse<ListResponse<SnwelEnquiry>>>>(`/snwel-enquiry?${listOptionsToUrlSearchParams(options)}`);
        const data = res.data.data;
        return data;
    } catch (error) {
        console.log("Error: getAllSnwelEnquiries: ", error);
        throw new Error("Error in fetching Snwel enquiry list. Please try again.");
    }
}

/**
 * Create a new Snwel enquiry
 * POST /snwel-enquiry/
 */
export async function createSnwelEnquiry(mutateEnquiry: CreateSnwelEnquiry) {
    try {
        const res = await protectedApi.post<any, AxiosResponse<ApiResponse<SnwelEnquiry>>>('/snwel-enquiry', mutateEnquiry);
        const data = res.data.data;
        return data;
    } catch (error) {
        console.log("Error: createSnwelEnquiry: ", error);
        throw new Error("Error in creating Snwel enquiry. Please try again.");
    }
}

/**
 * Update a Snwel enquiry by ID
 * PUT /snwel-enquiry/:id
 */
export async function updateSnwelEnquiry(enquiryId: string, mutateEnquiry: UpdateSnwelEnquiry) {
    try {
        const res = await protectedApi.put<any, AxiosResponse<ApiResponse<SnwelEnquiry>>>(`/snwel-enquiry/${enquiryId}`, mutateEnquiry);
        const data = res.data.data;
        return data;
    } catch (error) {
        console.log("Error: updateSnwelEnquiry: ", error);
        throw new Error("Error in updating Snwel enquiry. Please try again.");
    }
}

/**
 * Delete a Snwel enquiry by ID
 * DELETE /snwel-enquiry/:id
 */
export async function deleteSnwelEnquiry(enquiryId: string) {
    try {
        const res = await protectedApi.delete<any, AxiosResponse<ApiResponse<{ message: string }>>>(`/snwel-enquiry/${enquiryId}`);
        const data = res.data.data;
        return data;
    } catch (error) {
        console.log("Error: deleteSnwelEnquiry: ", error);
        throw new Error("Error in deleting Snwel enquiry. Please try again.");
    }
}

/**
 * Get a single Snwel enquiry by ID
 * GET /snwel-enquiry/:id
 */
export async function getSnwelEnquiry(enquiryId: string) {
    try {
        const res = await protectedApi.get<any, AxiosResponse<ApiResponse<SnwelEnquiry>>>(`/snwel-enquiry/${enquiryId}`);
        const data = res.data.data;
        return data;
    } catch (error) {
        console.log("Error: getSnwelEnquiry: ", error);
        throw new Error("Error in fetching Snwel enquiry. Please try again.");
    }
}

/**
 * Export Snwel enquiries as CSV
 * GET /snwel-enquiry/export
 */
export async function exportSnwelEnquiries(options?: { page?: number; limit?: number }) {
    try {
        const params = new URLSearchParams();
        if (options?.page) params.append('page', options.page.toString());
        if (options?.limit) params.append('limit', options.limit.toString());
        
        const res = await protectedApi.get(`/snwel-enquiry/export?${params.toString()}`, {
            responseType: 'blob',
        });
        
        // Create a download link
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `snwel_enquiries_${options?.page || 1}.csv`);
        document.body.appendChild(link);
        link.click();
        link.remove();
        
        return true;
    } catch (error) {
        console.log("Error: exportSnwelEnquiries: ", error);
        throw new Error("Error in exporting Snwel enquiries. Please try again.");
    }
}
