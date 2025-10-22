import { constants } from '@/config/constants'
import { api } from '@/lib/api'
import { ListOptions, DEFAULT_LIST_OPTIONS } from '@/types/ListOptions'
import { ApiResponse, ListResponse } from '@/types/ApiResponses'
import { Course } from '@/types'
import type { AxiosResponse } from 'axios'

export async function getPublicCourses(options?: ListOptions) {
  options = { ...DEFAULT_LIST_OPTIONS, ...options }
  const fallback: ListResponse<Course> = {
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
    const query = new URLSearchParams()
    if (options.page) query.set('page', String(options.page))
    if (options.limit) query.set('limit', String(options.limit))
    if (options.search) query.set('search', options.search)
    if (options.sort) Object.entries(options.sort).forEach(([k, v]) => query.append(`sort[${k}]`, v))
    if (options.filter) Object.entries(options.filter as Record<string, any>).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') query.append(`filter[${k}]`, String(v))
    })

    const res = await api.get<any, AxiosResponse<ApiResponse<ListResponse<Course>>>>(`/course?${query.toString()}`)
    return res.data?.data ?? fallback
  } catch (err) {
    return fallback
  }
}

export async function getPublicCourseBySlug(slug: string): Promise<Course | null> {
  try {
    const res = await fetch(`${constants.apiBaseUrl}/course/${encodeURIComponent(slug)}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    })
    if (!res.ok) return null
    const data = (await res.json()) as ApiResponse<Course>
    return data?.data ?? null
  } catch {
    return null
  }
}
