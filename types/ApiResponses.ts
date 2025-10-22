
export type ApiResponse<T=any> = {
    status: number,
    message: string,
    data: T
}

// New standard API response format from backend team
export type StandardApiResponse<T=any> = {
    success: boolean,
    data: T,
    message?: string
}

export type ListResponse<T = any> = {
    docs: T[],
    limit: number,
    offset: number,
    total: number,
    nextPage?: number|null,
    prevPage?: number|null,
    hasNext: boolean,
    currentPage: number,
    totalPages?: number | null
}

// Pagination response format from backend team
export type PaginatedResponse<T = any> = {
    docs: T[],
    totalDocs: number,
    limit: number,
    page: number,
    totalPages: number,
    hasNextPage: boolean,
    hasPrevPage: boolean,
    nextPage?: number,
    prevPage?: number
}


export type FileUploadResponse = {
    _id: string,
    fileName: string,
    filePath: string,
    mimeType: string,
    uploadDate: string
}
