import { GalleryAsset } from '@/types/GalleryAsset';
import { DEFAULT_LIST_OPTIONS } from './../../types/ListOptions';
import { api, protectedApi } from "@/lib/api";
import { ApiResponse, ListResponse } from '@/types/ApiResponses';
import { ListOptions } from "@/types/ListOptions";
import { AxiosResponse } from 'axios';
import { objectToQueryString } from '@/lib/utils';

// Function to get all gallery assets with pagination
export async function getAllGalleryAssets(options?: ListOptions) {
    try {
        options = { ...DEFAULT_LIST_OPTIONS, ...options };
        const res = await api.get<any, AxiosResponse<ApiResponse<ListResponse<GalleryAsset>>>>(`/gallery?${objectToQueryString(options)}`);
        return res.data.data;
    } catch (error) {
        console.error("Error: getAllGalleryAssets: ", error);
        throw new Error("Error in fetching gallery assets. Please try again.");
    }
}

// Function to create a new gallery asset
export async function createGalleryAsset(assetData: GalleryAsset) {
    try {
        const res = await protectedApi.post<any, AxiosResponse<ApiResponse<GalleryAsset>>>('/gallery', assetData);
        return res.data.data;
    } catch (error) {
        console.error("Error: createGalleryAsset: ", error);
        throw new Error("Error in creating gallery asset. Please try again.");
    }
}
export async function bulkUpsertGalleryAsset(assetData: Partial<GalleryAsset>[]) {
    try {
        assetData = assetData.map(dt => ({...dt, timestamp: dt.timestamp ? new Date(dt.timestamp) : new Date()}))
        const res = await protectedApi.post<any, AxiosResponse<ApiResponse<GalleryAsset>>>('/gallery/bulk-upsert', assetData);
        return res.data.data;
    } catch (error) {
        console.error("Error: createGalleryAsset: ", error);
        throw new Error("Error in creating gallery asset. Please try again.");
    }
}

// Function to update a gallery asset by ID
export async function updateGalleryAsset(assetId: string, assetData: Partial<GalleryAsset>) {
    try {
        const res = await protectedApi.put<any, AxiosResponse<ApiResponse<GalleryAsset>>>(`/gallery/${assetId}`, assetData);
        return res.data.data;
    } catch (error) {
        console.error("Error: updateGalleryAsset: ", error);
        throw new Error("Error in updating gallery asset. Please try again.");
    }
}

// Function to delete a gallery asset by ID
export async function deleteGalleryAsset(assetId: string) {
    try {
        await protectedApi.delete<any, AxiosResponse<ApiResponse<GalleryAsset>>>(`/gallery/${assetId}`);
    } catch (error) {
        console.error("Error: deleteGalleryAsset: ", error);
        throw new Error("Error in deleting gallery asset. Please try again.");
    }
}

// Function to get a gallery asset by ID
export async function getGalleryAssetById(assetId: string) {
    try {
        const res = await api.get<any, AxiosResponse<ApiResponse<GalleryAsset>>>(`/gallery/${assetId}`);
        return res.data.data;
    } catch (error) {
        console.error("Error: getGalleryAssetById: ", error);
        throw new Error("Error in fetching gallery asset. Please try again.");
    }
}
