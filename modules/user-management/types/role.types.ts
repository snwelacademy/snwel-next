import {Permission as PermissionType, PermissionCode} from './permission.types'

export interface Role {
  _id: string;
  name: string;
  permissions: PermissionType[];
  description: string;
  isSystem: boolean;
  status: 'active' | 'inactive';
}

export type RoleForm = {
  _id?: string,
  name: string,
  description: string,
    permissions: PermissionCode[]
}

export type RoleFormData = Omit<RoleForm, 'id'>; 