
export type ListOptions<F=any> = {
    page?: number,
    limit?: number,
    search?: string,
    filter?: F,
    sort?: Record<string, string>,
    startDate?: Date|string,
    endDate?: Date | string
}

export const DEFAULT_LIST_OPTIONS: ListOptions = {
    page: 1,
    limit: 10
}