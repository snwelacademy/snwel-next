
// authService.js

import { api, protectedApi } from '@/lib/api';
import { CurrentUser } from '@/types/User';

export type MeResponse = {
  id: string
  email: string
  name: string
  roles?: Array<string | { _id?: string; name: string }>
  permissions?: string[]
  picture?: string | null
  profilePic?: string | null
}

export async function login(credentials: {email: string, password: string}) {
  try {     
    const response = await api.post('/auth/login', credentials);
    return response.data.token as string; // Assuming the server returns a JWT token
  } catch (error) {
    throw new Error('Login failed');
  }
}

export async function getMe(token?: string): Promise<{
  id: string
  email: string
  name: string
  roles: string[]
  permissions: string[]
  picture: string | null
} | null> {
  try {
    const response = await protectedApi.get('/auth/me', token ? {headers: {Authorization: `Bearer ${token}`}} : {});
    const raw = (response.data?.data ?? response.data) as MeResponse
    if (!raw) return null
    // Normalize
    const roles = Array.isArray(raw.roles) ? raw.roles.map(r => (typeof r === 'string' ? r : r?.name)).filter(Boolean) : []
    const permissions = Array.isArray(raw.permissions) ? raw.permissions : []
    return {
      id: raw.id,
      email: raw.email,
      name: raw.name,
      roles,
      permissions,
      picture: raw.picture ?? raw.profilePic ?? null,
    }
  } catch (error: any) {
    return null;
  }
}
