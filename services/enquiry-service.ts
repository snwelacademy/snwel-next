
import { api } from "@/lib/api";
import { ApiResponse } from "@/types/ApiResponses";
import { CreateEnquirySchema, Enquiry } from "@/types/EnquiryTypes";
import { AxiosResponse } from "axios";


export async function createEnquiry(mutateEnquiry: CreateEnquirySchema) {
    try {
        const res = await api.post<any, AxiosResponse<ApiResponse<Enquiry>>>('/enquiries', mutateEnquiry);
        const data = res.data.data;
        return data;
    } catch (error : any) {
        console.log("Error: createEnquiry: ", error);
        throw new Error(error?.response?.data?.message || "Error in creating enquiry. Please try again.");
    }
}