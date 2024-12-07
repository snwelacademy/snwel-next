import { useSession } from 'next-auth/react';
import { PermissionCode, UserRole } from '../types/permission.types';

export function usePermission(requiredPermission: PermissionCode): boolean {
  const { data: session } = useSession();
  
  if (!session?.user?.roles) {
    return false;
  }

  // Check if any role has the required permission
  return session.user.roles.some(role => 
    role.permissions.some(permission => permission.code === requiredPermission)
  );
}

// Helper hook to check multiple permissions
export function usePermissions(requiredPermissions: PermissionCode[]): boolean {
  const { data: session } = useSession();
  
  if (!session?.user?.roles) {
    return false;
  }

  // Check if user has all required permissions
  return requiredPermissions.every(requiredPermission => 
    session.user.roles.some(role => 
      role.permissions.some(permission => permission.code === requiredPermission)
    )
  );
}

// Helper hook to get all user permissions
export function useUserPermissions(): PermissionCode[] {
  const { data: session } = useSession();
  
  if (!session?.user?.roles) {
    return [];
  }

  // Get unique permissions from all roles
  const permissions = new Set<PermissionCode>();
  
  session.user.roles.forEach(role => {
    role.permissions.forEach(permission => {
      permissions.add(permission.code);
    });
  });

  return Array.from(permissions);
}

// Helper hook to check if user has specific role
export function useHasRole(roleName: string): boolean {
  const { data: session } = useSession();
  return session?.user?.roles?.some(role => role.name === roleName) || false;
}

// Helper hook to get user roles
export function useUserRoles(): UserRole[] {
  const { data: session } = useSession();
  return session?.user?.roles || [];
} 