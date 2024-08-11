/* eslint-disable @typescript-eslint/no-explicit-any */
import { protectedApi } from "@/lib/api";
import { ApiResponse, ListResponse } from '@/types/ApiResponses';
import { ListOptions, DEFAULT_LIST_OPTIONS } from '@/types/ListOptions';
import { AxiosResponse } from 'axios';
import { listOptionsToUrlSearchParams } from '@/lib/utils';
import { CreateEnquirySchema, Enquiry } from '@/types/EnquiryTypes';

export async function getAllEnquiries(options?: ListOptions) {
    try {
        options = { ...DEFAULT_LIST_OPTIONS, ...options };
        const res = await protectedApi.get<any, AxiosResponse<ApiResponse<ListResponse<Enquiry>>>>(`/enquiries?${listOptionsToUrlSearchParams(options)}`);
        const data = res.data.data;
        return data;
    } catch (error) {
        console.log("Error: getAllEnquiries: ", error);
        throw new Error("Error in fetching enquiry list. Please try again.");
    }
}

export async function createEnquiry(mutateEnquiry: CreateEnquirySchema) {
    try {
        const res = await protectedApi.post<any, AxiosResponse<ApiResponse<Enquiry>>>('/enquiries', mutateEnquiry);
        const data = res.data.data;
        return data;
    } catch (error) {
        console.log("Error: createEnquiry: ", error);
        throw new Error("Error in creating enquiry. Please try again.");
    }
}

export async function updateEnquiry(enquiryId: string, mutateEnquiry: Enquiry) {
    try {
        const res = await protectedApi.put<any, AxiosResponse<ApiResponse<Enquiry>>>(`/enquiries/${enquiryId}`, mutateEnquiry);
        const data = res.data.data;
        return data;
    } catch (error) {
        console.log("Error: updateEnquiry: ", error);
        throw new Error("Error in updating enquiry. Please try again.");
    }
}

export async function deleteEnquiry(enquiryId: string) {
    try {
        const res = await protectedApi.delete<any, AxiosResponse<ApiResponse<Enquiry>>>(`/enquiries/${enquiryId}`);
        const data = res.data.data;
        return data;
    } catch (error) {
        console.log("Error: deleteEnquiry: ", error);
        throw new Error("Error in deleting enquiry. Please try again.");
    }
}

export async function getEnquiry(enquiryId: string) {
    try {
        const res = await protectedApi.get<any, AxiosResponse<ApiResponse<Enquiry>>>(`/enquiries/${enquiryId}`);
        const data = res.data.data;
        return data;
    } catch (error) {
        console.log("Error: getEnquiry: ", error);
        throw new Error("Error in fetching enquiry. Please try again.");
    }
}
