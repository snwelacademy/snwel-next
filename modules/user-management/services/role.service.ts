import { ApiResponse, ListResponse } from '@/types/ApiResponses';
import { Role, RoleFormData } from '../types/role.types';
import { getSession } from 'next-auth/react';

const BASE_URL = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/roles`;

export const roleService = {
  getRoles: async (): Promise<ApiResponse<ListResponse<Role>>> => {
    const session = await getSession();
    const response = await fetch(BASE_URL, {
      headers: {
        'Authorization': `Bearer ${session?.user.jwt}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch roles');
    }
    
    return response.json();
  },

  createRole: async (roleData: RoleFormData): Promise<ApiResponse<Role>> => {
    const session = await getSession();
    delete roleData._id;
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${session?.user.jwt}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(roleData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create role');
    }

    return response.json();
  },

  updateRole: async (roleId: string, roleData: Partial<RoleFormData>): Promise<ApiResponse<Role>> => {
    const session = await getSession();
    const response = await fetch(`${BASE_URL}/${roleId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${session?.user.jwt}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(roleData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update role');
    }

    return response.json();
  },

  deleteRole: async (roleId: string): Promise<void> => {
    const session = await getSession();
    const response = await fetch(`${BASE_URL}/${roleId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${session?.user.jwt}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to delete role');
    }
  },
}; 