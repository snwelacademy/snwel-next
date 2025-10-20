// components/guards/PermissionGuard.tsx
'use client'

import { usePermission } from '@/modules/user-management/hooks/usePermission'
import { PermissionCode } from '@/modules/user-management/types/permission.types'
import { ReactNode } from 'react'

interface PermissionGuardProps {
  permission: PermissionCode
  children: ReactNode
  fallback?: ReactNode
}

export function PermissionGuard({ permission, children, fallback }: PermissionGuardProps) {
  const hasPermission = usePermission(permission)

  if (!hasPermission) {
    return fallback || (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">You don't have permission to access this resource.</p>
      </div>
    )
  }

  return <>{children}</>
}