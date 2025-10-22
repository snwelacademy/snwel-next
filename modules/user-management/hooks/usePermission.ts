import { useAuth } from '@/context/AuthContext';
import { PermissionCode } from '../types/permission.types';

export function usePermission(requiredPermission: PermissionCode): boolean {
  const { hasPerm } = useAuth();
  return hasPerm(requiredPermission as unknown as string);
}

// Helper hook to check multiple permissions
export function usePermissions(requiredPermissions: PermissionCode[]): boolean {
  const { hasAll } = useAuth();
  return hasAll(requiredPermissions as unknown as string[]);
}

// Helper hook to get all user permissions (as flat codes)
export function useUserPermissions(): string[] {
  const { permissions } = useAuth();
  return Array.from(permissions);
}

// Helper hook to check if user has specific role
export function useHasRole(roleName: string): boolean {
  const { roles } = useAuth();
  return roles.includes(roleName);
}

// Helper hook to get user roles
export function useUserRoles(): string[] {
  const { roles } = useAuth();
  return roles;
} 