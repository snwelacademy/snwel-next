
import { protectedApi } from "@/lib/api";
import { ApiResponse, ListResponse } from '@/types/ApiResponses';
import { ListOptions } from "@/types/ListOptions";
import { AxiosResponse } from 'axios';
import { DEFAULT_LIST_OPTIONS } from '@/types/ListOptions';
import { CreateSettingInput, Setting, UpdateSettingInput } from "@/types/Setting";

export async function getAllSettings(options?: ListOptions) {
    try {
        options = { ...DEFAULT_LIST_OPTIONS, ...options };
        const res = await protectedApi.get<any, AxiosResponse<ApiResponse<ListResponse<Setting>>>>(`/settings?page=${options.page}&limit=${options.limit}${options.search ? '&search=' + options.search : ''}`);
        const data = res.data.data;
        return data;
    } catch (error) {
        console.log("Error: getAllSettings: ", error);
        throw new Error("Error in fetching settings list. Please try again.");
    }
}

export async function createSetting(mutateSetting: CreateSettingInput<any>) {
    try {
        const res = await protectedApi.post<any, AxiosResponse<ApiResponse<Setting>>>('/settings', mutateSetting);
        const data = res.data.data;
        return data;
    } catch (error) {
        console.log("Error: createSetting: ", error);
        throw new Error("Error in creating setting. Please try again.");
    }
}

export async function updateSetting(code: string, mutateSetting: UpdateSettingInput<any>) {
    try {
        const res = await protectedApi.put<any, AxiosResponse<ApiResponse<Setting>>>(`/settings/${code}`, mutateSetting);
        const data = res.data.data;
        return data;
    } catch (error) {
        console.log("Error: updateSetting: ", error);
        throw new Error("Error in updating setting. Please try again.");
    }
}

export async function partialUpdateSetting(code: string, mutateSetting: Partial<UpdateSettingInput<any>>) {
    try {
        const res = await protectedApi.patch<any, AxiosResponse<ApiResponse<Setting>>>(`/settings/${code}`, mutateSetting);
        const data = res.data.data;
        return data;
    } catch (error) {
        console.log("Error: partialUpdateSetting: ", error);
        throw new Error("Error in partially updating setting. Please try again.");
    }
}

export async function deleteSetting(code: string) {
    try {
        const res = await protectedApi.delete<any, AxiosResponse<ApiResponse<Setting>>>(`/settings/${code}`);
        const data = res.data.data;
        return data;
    } catch (error) {
        console.log("Error: deleteSetting: ", error);
        throw new Error("Error in deleting setting. Please try again.");
    }
}

export async function getSetting<T=any>(code: string) {
    try {
        const res = await protectedApi.get<any, AxiosResponse<ApiResponse<Setting<T>>>>(`/settings/${code}`);
        const data = res.data.data;
        console.log({data})
        return data;
    } catch (error) {
        console.log("Error: getSetting: ", error);
        throw new Error("Error in fetching setting. Please try again.");
    }
}
