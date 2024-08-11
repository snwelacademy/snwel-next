/* eslint-disable @typescript-eslint/no-explicit-any */
import { protectedApi } from "@/lib/api";
import { ApiResponse, ListResponse } from '@/types/ApiResponses';
import { ListOptions, DEFAULT_LIST_OPTIONS } from '@/types/ListOptions';
import { AxiosResponse } from 'axios';
import { listOptionsToUrlSearchParams } from '@/lib/utils';
import { Master, CreateMasterDTO, UpdateMasterDTO } from '@/types/master';

// Get all masters with optional list options
export async function getAllMasters(options?: ListOptions) {
    try {
        options = { ...DEFAULT_LIST_OPTIONS, ...options };
        const res = await protectedApi.get<any, AxiosResponse<ApiResponse<ListResponse<Master>>>>(`/master?${listOptionsToUrlSearchParams(options)}`);
        const data = res.data.data;
        return data;
    } catch (error) {
        console.log("Error: getAllMasters: ", error);
        throw new Error("Error in fetching master list. Please try again.");
    }
}

// Create a new master record
export async function createMaster(mutateMaster: CreateMasterDTO) {
    try {
        const res = await protectedApi.post<any, AxiosResponse<ApiResponse<Master>>>('/master', mutateMaster);
        const data = res.data.data;
        return data;
    } catch (error) {
        console.log("Error: createMaster: ", error);
        throw new Error("Error in creating master record. Please try again.");
    }
}

// Update an existing master record by ID
export async function updateMaster(masterId: string, mutateMaster: UpdateMasterDTO) {
    try {
        const res = await protectedApi.put<any, AxiosResponse<ApiResponse<Master>>>(`/master/${masterId}`, mutateMaster);
        const data = res.data.data;
        return data;
    } catch (error) {
        console.log("Error: updateMaster: ", error);
        throw new Error("Error in updating master record. Please try again.");
    }
}

// Get a master record by ID
export async function getMaster(masterId: string) {
    try {
        const res = await protectedApi.get<any, AxiosResponse<ApiResponse<Master>>>(`/master/${masterId}`);
        const data = res.data.data;
        return data;
    } catch (error) {
        console.log("Error: getMaster: ", error);
        throw new Error("Error in fetching master record. Please try again.");
    }
}

// Delete a master record by ID
export async function deleteMaster(masterId: string) {
    try {
        const res = await protectedApi.delete<any, AxiosResponse<ApiResponse<Master>>>(`/master/${masterId}`);
        const data = res.data.data;
        return data;
    } catch (error) {
        console.log("Error: deleteMaster: ", error);
        throw new Error("Error in deleting master record. Please try again.");
    }
}
