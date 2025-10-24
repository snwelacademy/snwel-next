import { ApiResponse, ListResponse } from '@/types/ApiResponses';
import { Role, RoleFormData } from '../types/role.types';
import { protectedApi } from '@/lib/api';

const BASE_URL = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/roles`;

export const roleService = {
  getRoles: async (): Promise<ApiResponse<ListResponse<Role>>> => {
    const res = await protectedApi.get<ApiResponse<ListResponse<Role>>>(BASE_URL);
    return res.data;
  },

  createRole: async (roleData: RoleFormData): Promise<ApiResponse<Role>> => {
    delete roleData._id;
    const res = await protectedApi.post<ApiResponse<Role>>(BASE_URL, roleData);
    return res.data;
  },

  updateRole: async (roleId: string, roleData: Partial<RoleFormData>): Promise<ApiResponse<Role>> => {
    const res = await protectedApi.put<ApiResponse<Role>>(`${BASE_URL}/${roleId}`, roleData);
    return res.data;
  },

  deleteRole: async (roleId: string): Promise<void> => {
    const res = await protectedApi.delete(`${BASE_URL}/${roleId}`);
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Failed to delete role');
    }
  },
}; 