import { AdminPanelPermissions } from "@/data/permissions-list";

export type PermissionModule = 'USER_MANAGEMENT' | 'ROLE_MANAGEMENT';

export interface Permission {
  name: string;
  code: PermissionCode;
  module: PermissionModule;
}

// key of all permissions code 
export type PermissionCode = keyof typeof AdminPanelPermissions;

export interface UserRole {
  _id: string;
  name: string;
  permissions: Permission[];
} 