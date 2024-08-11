/* eslint-disable @typescript-eslint/no-explicit-any */
import { Webinar } from '@/types';
import { DEFAULT_LIST_OPTIONS } from './../../types/ListOptions';
import { api, protectedApi } from "@/lib/api";
import { ApiResponse, ListResponse } from '@/types/ApiResponses';
import { ListOptions } from "@/types/ListOptions";
import { AxiosResponse } from 'axios';

export async function getAllWebinars (options?: ListOptions) {
    try {
        options = {...DEFAULT_LIST_OPTIONS, ...options}
        const res = await api.get<any, AxiosResponse<ApiResponse<ListResponse<Webinar>>>>(`/webinar?page=${options.page}&limit=${options.limit}${options.search ? '&search='+options.search : ''}`);
        const data = res.data.data;
        return data;
    } catch (error) {
        console.log("Error: getAllWebinar: ", error);
        throw new Error("Error in fetching webinar list. Please try again")
    }
}
export async function createWebinar (mutateWebinar: any) {
    try {
        const res = await protectedApi.post<any, AxiosResponse<ApiResponse<Webinar>>>('/webinar', mutateWebinar);
        const data = res.data.data;
        return data;
    } catch (error) {
        console.log("Error: createWebinar: ", error);
        throw new Error("Error in creating Webinar list. Please try again")
    }
}
export async function updateWebinar (webinarId: string, mutateWebinar: any) {
    try {
        
        const res = await protectedApi.put<any, AxiosResponse<ApiResponse<Webinar>>>(`/webinar/${webinarId}`, mutateWebinar);
        const data = res.data.data;
        return data;
    } catch (error) {
        console.log("Error: updateWebinar: ", error);
        throw new Error("Error in updating Webinar. Please try again")
    }
}
export async function deleteWebinar (webinarId: string) {
    try {
        const res = await protectedApi.delete<any, AxiosResponse<ApiResponse<Webinar>>>(`/webinar/${webinarId}`);
        const data = res.data.data;
        return data;
    } catch (error) {
        console.log("Error: deleteWebinar: ", error);
        throw new Error("Error in deleting Webinar. Please try again")
    }
}
export async function getWebinar (courseId: string) {
    try {
        const res = await api.get<any, AxiosResponse<ApiResponse<Webinar>>>(`/webinar/${courseId}`);
        const data = res.data.data;
        return data;
    } catch (error) {
        console.log("Error: getWebinar: ", error);
        throw new Error("Error in getting Webinar. Please try again")
    }
}
export async function getWebinarBySlug (slug: string) {
    try {
        const res = await api.get<any, AxiosResponse<ApiResponse<Webinar>>>(`/webinar/${slug}`);
        const data = res.data.data;
        return data;
    } catch (error) {
        console.log("Error: getWebinarBySlug: ", error);
        throw new Error("Error in getting Webinar. Please try again")
    }
}



