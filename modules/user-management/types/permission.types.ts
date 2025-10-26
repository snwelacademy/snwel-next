import { AdminPanelPermissions } from "@/data/permissions-list";

export type PermissionModule = 'USER_MANAGEMENT' | 'ROLE_MANAGEMENT';

export interface Permission {
  name: string;
  code: PermissionCode;
  module: PermissionModule;
}

// key of all permissions code 
import { PermissionCode as UnifiedPermissionCode } from "@/constants/permissions";
export type PermissionCode = UnifiedPermissionCode;

export interface UserRole {
  _id: string;
  name: string;
  permissions: Permission[];
}