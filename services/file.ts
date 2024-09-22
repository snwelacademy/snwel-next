

import { createAxiosInstance, protectedApi } from "@/lib/api";
import { ApiResponse, FileUploadResponse, ListResponse } from "@/types/ApiResponses";
import { DEFAULT_LIST_OPTIONS, ListOptions } from "@/types/ListOptions";
import { AxiosResponse } from "axios";



const defaultAllowedMimeType = ['image/jpeg', 'image/png', 'application/pdf', 'application/msword'];
// Function to upload file
export const uploadFile = async (file: File, allowedMimeType=defaultAllowedMimeType ) => {
    try {
        // Validate MIME type
        if (!allowedMimeType.includes(file.type)) {
            throw new Error(`File type ${file.type} is not allowed. Allowed types: ${allowedMimeType.join(', ')}`);
        }

        // Create form data
        const formData = new FormData();
        formData.append('file', file);
        // Send form data to /upload route
        const response = await protectedApi<ApiResponse<FileUploadResponse>>({
            method: 'post',
            url:"/file/upload",
            headers: {
                'Content-Type': 'form-data'
            },
            data: formData
        });
        // const response = await protectedApi.post<ApiResponse<FileUploadResponse>>('/file/upload', formData);

        console.log('File uploaded successfully.');
        return response.data.data;

    } catch (error: any) {
        console.error('Error uploading file:', error.message);
    }
};

export const uploadMultipleFile = async (files:  File[]) => {
    try {
        const formData = new FormData();

   
            files.forEach((file) => formData.append('files', file)); // For multiple files, append each
      

        // Send form data to /upload route
        const response = await protectedApi<ApiResponse<FileUploadResponse[]>>({
            method: 'post',
            url: "/file/upload-multi",
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: formData
        });

        console.log('Files uploaded successfully.');
        return response.data.data;

    } catch (error: any) {
        console.error('Error uploading files:', error.message);
        throw error;
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
