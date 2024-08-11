/* eslint-disable @typescript-eslint/no-explicit-any */
import { protectedApi } from "@/lib/api";
import { ApiResponse, ListResponse } from '@/types/ApiResponses';
import { AxiosResponse } from 'axios';
import { JobCategoryType } from '@/types/JobCategory';
import { DEFAULT_LIST_OPTIONS, ListOptions } from "@/types/ListOptions";
import { listOptionsToUrlSearchParams } from "@/lib/utils";

export async function getAllJobCategories(options?: ListOptions) {
    try {
        options = { ...DEFAULT_LIST_OPTIONS, ...options };
        const res = await protectedApi.get<any, AxiosResponse<ApiResponse<ListResponse<JobCategoryType>>>>(`/jobcategories?${listOptionsToUrlSearchParams(options)}`);
        const data = res.data.data;
        return data;
    } catch (error) {
        console.log("Error: getAllJobCategories: ", error);
        throw new Error("Error in fetching job categories list. Please try again.");
    }
}

export async function createJobCategory(mutateJobCategory: Partial<JobCategoryType>) {
    try {
        const res = await protectedApi.post<any, AxiosResponse<ApiResponse<JobCategoryType>>>('/jobcategories', mutateJobCategory);
        const data = res.data.data;
        return data;
    } catch (error) {
        console.log("Error: createJobCategory: ", error);
        throw new Error("Error in creating job category. Please try again.");
    }
}

export async function updateJobCategory(jobCategoryId: string, mutateJobCategory: Partial<JobCategoryType>) {
    try {
        const res = await protectedApi.put<any, AxiosResponse<ApiResponse<JobCategoryType>>>(`/jobcategories/${jobCategoryId}`, mutateJobCategory);
        const data = res.data.data;
        return data;
    } catch (error) {
        console.log("Error: updateJobCategory: ", error);
        throw new Error("Error in updating job category. Please try again.");
    }
}

export async function deleteJobCategory(jobCategoryId: string) {
    try {
        const res = await protectedApi.delete<any, AxiosResponse<ApiResponse<JobCategoryType>>>(`/jobcategories/${jobCategoryId}`);
        const data = res.data.data;
        return data;
    } catch (error) {
        console.log("Error: deleteJobCategory: ", error);
        throw new Error("Error in deleting job category. Please try again.");
    }
}
