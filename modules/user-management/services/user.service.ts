import { ApiResponse, ListResponse } from '@/types/ApiResponses';
import { User, UserFormData, PaginatedResponse } from '../types/user.types';
import { getSession } from 'next-auth/react';

const BASE_URL = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/admin/users`;

export const userService = {
  getUsers: async (options?: { page?: number; limit?: number }): Promise<ApiResponse<ListResponse<User>>> => {
    const session = await getSession();
    const queryParams = new URLSearchParams({
      page: (options?.page || 1).toString(),
      limit: (options?.limit || 10).toString(),
    });

    const response = await fetch(`${BASE_URL}?${queryParams}`, {
      headers: {
        'Authorization': `Bearer ${session?.user.jwt}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    
    return response.json();
  },

  createUser: async (userData: UserFormData): Promise<ApiResponse<User>> => {
    const session = await getSession();
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${session?.user.jwt}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create user');
    }

    return response.json();
  },

  updateUser: async (userId: string, userData: Partial<UserFormData>): Promise<ApiResponse<User>> => {
    const session = await getSession();
    const response = await fetch(`${BASE_URL}/${userId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${session?.user.jwt}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update user');
    }

    return response.json();
  },

  deleteUser: async (userId: string): Promise<void> => {
    const session = await getSession();
    await fetch(`${BASE_URL}/${userId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${session?.user.jwt}`,
        'Content-Type': 'application/json',
      },
    });
  },

  toggleStatus: async (userId: string): Promise<ApiResponse<User>> => {
    const session = await getSession();
    const response = await fetch(`${BASE_URL}/${userId}/status`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${session?.user.jwt}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update user status');
    }

    return response.json();
  },

  assignRoles: async (userId: string, roleIds: string[]): Promise<ApiResponse<User>> => {
    const session = await getSession();
    const response = await fetch(`${BASE_URL}/${userId}/roles`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${session?.user.jwt}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ roleIds }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to assign roles');
    }

    return response.json();
  }
}; 