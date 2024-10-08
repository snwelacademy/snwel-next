
export type ApiResponse<T=any> = {
    status: number,
    message: string,
    data: T
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


export type FileUploadResponse = {
    _id: string,
    fileName: string,
    filePath: string,
    mimeType: string,
    uploadDate: string
}
