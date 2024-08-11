
import { api as publicApi } from "@/lib/api";
import { ApiResponse, ListResponse } from '@/types/ApiResponses';
import { AxiosResponse } from 'axios';
import { JobVacancyType } from '@/types/JobVacancyTypes';
import { DEFAULT_LIST_OPTIONS, ListOptions } from "@/types/ListOptions";
import { listOptionsToUrlSearchParams } from "@/lib/utils";

export async function getAllJobVacancies(options?: ListOptions) {
    try {
        options = { ...DEFAULT_LIST_OPTIONS, ...options };
        const res = await publicApi.get<any, AxiosResponse<ApiResponse<ListResponse<JobVacancyType>>>>(`/jobvacancies?${listOptionsToUrlSearchParams(options)}`);
        const data = res.data.data;
        return data;
    } catch (error) {
        console.log("Error: getAllJobVacancies: ", error);
        throw new Error("Error in fetching job vacancies list. Please try again.");
    }
}

export async function getJobVacancy(jobVacancyId: string) {
    try {
        const res = await publicApi.get<any, AxiosResponse<ApiResponse<JobVacancyType>>>(`/jobvacancies/${jobVacancyId}`);
        const data = res.data.data;
        return data;
    } catch (error: any) {
        console.log("Error: getJobVacancy: ", error);
        throw new Error(error?.response?.data?.message ||"Error in fetching job vacancy. Please try again.");
    }
}
