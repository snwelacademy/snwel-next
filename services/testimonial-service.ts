import { api } from "@/lib/api";
import { ApiResponse, ListResponse } from '@/types/ApiResponses';
import { ListOptions } from "@/types/ListOptions";
import { Testimonial } from "@/types/Testimonial";
import { AxiosResponse } from 'axios';
import { objectToQueryString } from '@/lib/utils';

export async function getAllTestimonials(options?: ListOptions) {
    try {
        const res = await api.get<any, AxiosResponse<ApiResponse<ListResponse<Testimonial>>>>(`/guest/testimonials?${objectToQueryString(options || {})}`);
        const data = res.data.data;
        return data;
    } catch (error) {
        console.log("Error: getAllTestimonials: ", error);
        throw new Error("Error in fetching testimonial list. Please try again");
    }
}