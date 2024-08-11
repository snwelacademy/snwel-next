
// authService.js

import { api, protectedApi } from '@/lib/api';
import { CurrentUser } from '@/types/User';

export async function login(credentials: {email: string, password: string}) {
  try {     
    const response = await api.post('/auth/login', credentials);
    return response.data.token as string; // Assuming the server returns a JWT token
  } catch (error) {
    throw new Error('Login failed');
  }
}

export async function getMe(token?: string){
  try {
    const response = await protectedApi.get('/user/me', token ? {headers: {Authorization: `Bearer ${token}`}} : {});
    return response.data?.data as CurrentUser; // Assuming the server returns a JWT token
  } catch (error: any) {
    return null;
  }
}
