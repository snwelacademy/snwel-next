import { Testimonial } from '@/types/Testimonial';
import { DEFAULT_LIST_OPTIONS } from './../../types/ListOptions';
import { api, protectedApi } from "@/lib/api";
import { ApiResponse, ListResponse } from '@/types/ApiResponses';
import { ListOptions } from "@/types/ListOptions";
import { AxiosResponse } from 'axios';
import { objectToQueryString } from '@/lib/utils';

export async function getAllTestimonials(options?: ListOptions) {
    try {
        options = { ...DEFAULT_LIST_OPTIONS, ...options };
        const res = await protectedApi.get<any, AxiosResponse<ApiResponse<ListResponse<Testimonial>>>>(`/testimonials?${objectToQueryString(options)}`);
        const data = res.data.data;
        return data;
    } catch (error) {
        console.log("Error: getAllTestimonials: ", error);
        throw new Error("Error in fetching testimonial list. Please try again");
    }
}

export async function getTestimonial(id: string) {
    try {
        const res = await protectedApi.get<any, AxiosResponse<ApiResponse<Testimonial>>>(`/testimonials/${id}`);
        const data = res.data.data;
        return data;
    } catch (error) {
        console.log("Error: getTestimonial: ", error);
        throw new Error("Error in fetching testimonial. Please try again");
    }
}

export async function createTestimonial(testimonial: Partial<Testimonial>) {
    try {
        const res = await protectedApi.post<any, AxiosResponse<ApiResponse<Testimonial>>>(`/testimonials`, testimonial);
        const data = res.data.data;
        return data;
    } catch (error) {
        console.log("Error: createTestimonial: ", error);
        throw new Error("Error in creating testimonial. Please try again");
    }
}

export async function updateTestimonial(id: string, testimonial: Partial<Testimonial>) {
    try {
        const res = await protectedApi.put<any, AxiosResponse<ApiResponse<Testimonial>>>(`/testimonials/${id}`, testimonial);
        const data = res.data.data;
        return data;
    } catch (error) {
        console.log("Error: updateTestimonial: ", error);
        throw new Error("Error in updating testimonial. Please try again");
    }
}

export async function deleteTestimonial(id: string) {
    try {
        const res = await protectedApi.delete<any, AxiosResponse<ApiResponse<{ message: string }>>>(`/testimonials/${id}`);
        const data = res.data.data;
        return data;
    } catch (error) {
        console.log("Error: deleteTestimonial: ", error);
        throw new Error("Error in deleting testimonial. Please try again");
    }
}
