/**
 * Permission Hooks
 * 
 * Provides React hooks for checking user permissions throughout the application.
 * These hooks integrate with the AuthContext to provide real-time permission checks.
 */

import { useAuth } from '@/context/AuthContext'
import { PermissionCode } from '@/constants/permissions'

/**
 * Check if user has a single permission
 * @param permission - The permission code to check
 * @returns boolean indicating if user has the permission
 */
export function usePermission(permission: PermissionCode): boolean {
  const { hasPerm, loaded } = useAuth()
  
  if (!loaded) return false
  
  return hasPerm(permission)
}

/**
 * Check if user has ANY of the provided permissions
 * @param permissions - Array of permission codes
 * @returns boolean indicating if user has at least one permission
 */
export function useHasAnyPermission(permissions: PermissionCode[]): boolean {
  const { hasAny, loaded } = useAuth()
  
  if (!loaded) return false
  
  return hasAny(permissions)
}

/**
 * Check if user has ALL of the provided permissions
 * @param permissions - Array of permission codes
 * @returns boolean indicating if user has all permissions
 */
export function useHasAllPermissions(permissions: PermissionCode[]): boolean {
  const { hasAll, loaded } = useAuth()
  
  if (!loaded) return false
  
  return hasAll(permissions)
}

/**
 * Get all user permissions as an array
 * @returns Array of permission codes the user has
 */
export function useUserPermissions(): string[] {
  const { permissions } = useAuth()
  return Array.from(permissions)
}

/**
 * Check if user has a specific role
 * @param roleName - The role name to check
 * @returns boolean indicating if user has the role
 */
export function useHasRole(roleName: string): boolean {
  const { roles } = useAuth()
  return roles.includes(roleName)
}

/**
 * Get all user roles
 * @returns Array of role names
 */
export function useUserRoles(): string[] {
  const { roles } = useAuth()
  return roles
}

/**
 * Check if permissions are loaded
 * @returns boolean indicating if permission data is loaded
 */
export function usePermissionsLoaded(): boolean {
  const { loaded } = useAuth()
  return loaded
}

/**
 * Get permission checking utilities
 * @returns Object with permission checking methods
 */
export function usePermissionUtils() {
  const { hasPerm, hasAny, hasAll, loaded, permissions, roles } = useAuth()
  
  return {
    has: (permission: PermissionCode) => loaded && hasPerm(permission),
    hasAny: (permissionList: PermissionCode[]) => loaded && hasAny(permissionList),
    hasAll: (permissionList: PermissionCode[]) => loaded && hasAll(permissionList),
    hasRole: (roleName: string) => roles.includes(roleName),
    isSuperAdmin: roles.includes('SUPER_ADMIN'),
    isLoaded: loaded,
    allPermissions: Array.from(permissions),
    allRoles: roles,
  }
}
