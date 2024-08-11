/* eslint-disable @typescript-eslint/no-explicit-any */
import { DEFAULT_LIST_OPTIONS } from './../../types/ListOptions';
import {  protectedApi } from "@/lib/api";
import { ApiResponse, ListResponse } from '@/types/ApiResponses';
import { ListOptions } from "@/types/ListOptions";
import { AxiosResponse } from 'axios';
import { User } from '@/types/User';

export async function getAllUser (options?: ListOptions) {
    try {
        options = {...DEFAULT_LIST_OPTIONS, ...options}
        const res = await protectedApi.get<any, AxiosResponse<ApiResponse<ListResponse<User>>>>(`/user?page=${options.page}&limit=${options.limit}${options.search ? '&search='+options.search : ''}`);
        const data = res.data.data;
        return data;
    } catch (error) {
        console.log("Error: getAllUser: ", error);
        throw new Error("Error in fetching user list. Please try again")
    }
}




