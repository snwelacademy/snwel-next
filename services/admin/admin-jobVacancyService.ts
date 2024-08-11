/* eslint-disable @typescript-eslint/no-explicit-any */
import { protectedApi } from "@/lib/api";
import { ApiResponse, ListResponse } from '@/types/ApiResponses';
import { ListOptions, DEFAULT_LIST_OPTIONS } from '@/types/ListOptions';
import { AxiosResponse } from 'axios';
import { listOptionsToUrlSearchParams } from '@/lib/utils';
import { CreateJobVacancy, JobVacancyType, UpdateJobVacancy } from '@/types/JobVacancyTypes';

export async function getAllJobVacancies(options?: ListOptions) {
    try {
        options = { ...DEFAULT_LIST_OPTIONS, ...options };
        const res = await protectedApi.get<any, AxiosResponse<ApiResponse<ListResponse<JobVacancyType>>>>(`/jobvacancies?${listOptionsToUrlSearchParams(options)}`);
        const data = res.data.data;
        return data;
    } catch (error) {
        console.log("Error: getAllJobVacancies: ", error);
        throw new Error("Error in fetching job vacancies list. Please try again.");
    }
}

export async function createJobVacancy(mutateJobVacancy: CreateJobVacancy) {
    try {
        const res = await protectedApi.post<any, AxiosResponse<ApiResponse<JobVacancyType>>>('/jobvacancies', mutateJobVacancy);
        const data = res.data.data;
        return data;
    } catch (error) {
        console.log("Error: createJobVacancy: ", error);
        throw new Error("Error in creating job vacancy. Please try again.");
    }
}

export async function updateJobVacancy(jobVacancyId: string, mutateJobVacancy: UpdateJobVacancy) {
    try {
        const res = await protectedApi.put<any, AxiosResponse<ApiResponse<JobVacancyType>>>(`/jobvacancies/${jobVacancyId}`, mutateJobVacancy);
        const data = res.data.data;
        return data;
    } catch (error) {
        console.log("Error: updateJobVacancy: ", error);
        throw new Error("Error in updating job vacancy. Please try again.");
    }
}

export async function getJobVacancy(jobVacancyId: string) {
    try {
        const res = await protectedApi.get<any, AxiosResponse<ApiResponse<JobVacancyType>>>(`/jobvacancies/${jobVacancyId}`);
        const data = res.data.data;
        return data;
    } catch (error) {
        console.log("Error: getJobVacancy: ", error);
        throw new Error("Error in fetching job vacancy. Please try again.");
    }
}
export async function deleteJobVacancy(jobVacancyId: string) {
    try {
        const res = await protectedApi.delete<any, AxiosResponse<ApiResponse<JobVacancyType>>>(`/jobvacancies/${jobVacancyId}`);
        const data = res.data.data;
        return data;
    } catch (error) {
        console.log("Error: getJobVacancy: ", error);
        throw new Error("Error in fetching job vacancy. Please try again.");
    }
}
