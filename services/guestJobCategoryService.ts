
import { api, api as publicApi } from "@/lib/api";
import { ApiResponse, ListResponse } from '@/types/ApiResponses';
import { AxiosResponse } from 'axios';
import { JobCategoryType } from '@/types/JobCategory';
import { DEFAULT_LIST_OPTIONS, ListOptions } from "@/types/ListOptions";
import { listOptionsToUrlSearchParams } from "@/lib/utils";

export async function getAllJobCategories(options?: ListOptions) {
    try {
        options = { ...DEFAULT_LIST_OPTIONS, ...options };
        const res = await api.get<any, AxiosResponse<ApiResponse<ListResponse<JobCategoryType>>>>(`/jobcategories?${listOptionsToUrlSearchParams(options)}`);
        const data = res.data.data;
        return data;
    } catch (error: any) {
        console.log("Error: getAllJobCategories: ", error);
        throw new Error(error?.response?.data?.message ||"Error in fetching job categories list. Please try again.");
    }
}

export async function getJobCategory(jobCategoryId: string) {
    try {
        const res = await publicApi.get<any, AxiosResponse<ApiResponse<JobCategoryType>>>(`/jobcategories/${jobCategoryId}`);
        const data = res.data.data;
        return data;
    } catch (error: any) {
        console.log("Error: getJobCategory: ", error);
        throw new Error(error?.response?.data?.message ||"Error in fetching job category. Please try again.");
    }
}
