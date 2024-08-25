

import { protectedApi } from "@/lib/api";
import { ApiResponse, FileUploadResponse, ListResponse } from "@/types/ApiResponses";
import { DEFAULT_LIST_OPTIONS, ListOptions } from "@/types/ListOptions";
import { AxiosResponse } from "axios";

// Function to upload file
export const uploadFile = async (file: File) => {
    try {
        // Validate MIME type
        if (!file.type.startsWith('image/')) {
            throw new Error('Only image files are allowed.');
        }

        // Create form data
        const formData = new FormData();
        formData.append('file', file);

        // Send form data to /upload route
        const response = await protectedApi.post<ApiResponse<FileUploadResponse>>('/file/upload', formData);

        return response.data.data;

        console.log('File uploaded successfully.');
    } catch (error: any) {
        console.error('Error uploading file:', error.message);
    }
};


export const getFiles = async (options?: ListOptions) => {
    try {
        options = {...DEFAULT_LIST_OPTIONS, ...options}
        const res = await protectedApi.get<any, AxiosResponse<ApiResponse<ListResponse<FileUploadResponse>>>>(`/file/files?page=${options.page}&limit=${options.limit}${options.search ? '&search='+options.search : ''}`);
        const data = res.data.data;
        return data;
    } catch (error) {
        console.log("Error: getFiles: ", error);
        throw new Error("Error in fetching files list. Please try again")
    }
}
