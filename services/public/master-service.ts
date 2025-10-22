import { api } from '@/lib/api'
import { constants } from '@/config/constants'
import type { ListOptions } from '@/types/ListOptions'
import { DEFAULT_LIST_OPTIONS } from '@/types/ListOptions'
import type { ApiResponse, ListResponse } from '@/types/ApiResponses'
import type { AxiosResponse } from 'axios'
import type { Master } from '@/types/master'

// Public: List masters with optional list options
export async function getPublicMasters(options?: ListOptions) {
  options = { ...DEFAULT_LIST_OPTIONS, ...options }

  const fallback: ListResponse<Master> = {
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

    const res = await api.get<any, AxiosResponse<ApiResponse<ListResponse<Master>>>>(`/master?${query.toString()}`)
    return res.data?.data ?? fallback
  } catch {
    return fallback
  }
}

// Public: Get a single master by ID
export async function getPublicMasterById(masterId: string): Promise<Master | null> {
  try {
    const res = await fetch(`${constants.apiBaseUrl}/master/${encodeURIComponent(masterId)}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    })
    if (!res.ok) return null
    const data = (await res.json()) as ApiResponse<Master>
    return data?.data ?? null
  } catch {
    return null
  }
}
