// components/guards/PermissionGuard.tsx
'use client'

import { useAuth } from '@/context/AuthContext'
import { PermissionCode } from '@/modules/user-management/types/permission.types'
import { ReactNode } from 'react'

interface PermissionGuardProps {
  permission: PermissionCode
  children: ReactNode
  fallback?: ReactNode
}

export function PermissionGaurd({ permission, children, fallback }: PermissionGuardProps) {
  const { hasPerm, loaded } = useAuth()
  const hasPermission = hasPerm(permission as unknown as string)

  if (!loaded) {
    return fallback || (
      <div className="flex items-center justify-center min-h-[120px]">
        <p className="text-muted-foreground text-sm">Loading permissions...</p>
      </div>
    )
  }

  if (!hasPermission) {
    return fallback || (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">You don't have permission to access this resource.</p>
      </div>
    )
  }

  return <>{children}</>
}

// Optional alias with corrected spelling for new imports
export const PermissionGuard = PermissionGaurd