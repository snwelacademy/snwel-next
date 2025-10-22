import { api } from "@/lib/api"
import { DEFAULT_LIST_OPTIONS } from "@/types/ListOptions"
import type { ListOptions } from "@/types/ListOptions"
import type { ApiResponse, ListResponse } from "@/types/ApiResponses"
import type { AxiosResponse } from "axios"
import type { CourseCategory } from "@/types"

export async function getPublicCourseCategories(options?: ListOptions) {
  options = { ...DEFAULT_LIST_OPTIONS, ...options }
  const fallback: ListResponse<CourseCategory> = {
    docs: [],
    limit: (options?.limit ?? DEFAULT_LIST_OPTIONS.limit) as number,
    offset: 0,
    total: 0,
    nextPage: null,
    prevPage: null,
    hasNext: false,
    currentPage: (options?.page ?? DEFAULT_LIST_OPTIONS.page) as number,
    totalPages: 0,
  }

  try {
    const params = new URLSearchParams()
    if (options.page) params.set("page", String(options.page))
    if (options.limit) params.set("limit", String(options.limit))
    if (options.search) params.set("search", options.search)

    const res = await api.get<any, AxiosResponse<ApiResponse<ListResponse<CourseCategory>>>>(
      `/course-category?${params.toString()}`
    )
    return res.data?.data ?? fallback
  } catch {
    return fallback
  }
}
