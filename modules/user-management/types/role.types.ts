import {Permission as PermissionType} from './permission.types'

export enum Permission {
  USER_CREATE = 'USER_CREATE',
  USER_VIEW = 'USER_VIEW',
  USER_UPDATE = 'USER_UPDATE',
  USER_DELETE = 'USER_DELETE',
  ROLE_ASSIGN = 'ROLE_ASSIGN',
  JOB_VIEW = 'JOB_VIEW',
  JOB_CREATE = 'JOB_CREATE',
  JOB_UPDATE = 'JOB_UPDATE',
  JOB_DELETE = 'JOB_DELETE',
  JOB_PUBLISH = 'JOB_PUBLISH',
  JOB_UNPUBLISH = 'JOB_UNPUBLISH',
}

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
  permissions: Permission[]
}

export type RoleFormData = Omit<RoleForm, 'id'>; 