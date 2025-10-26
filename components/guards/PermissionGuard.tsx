/**
 * Permission Guard Component
 * 
 * Wraps components to restrict access based on user permissions.
 * Shows loading state while permissions are being fetched.
 * Shows fallback or access denied message if user lacks permission.
 */

'use client'

import { ReactNode } from 'react'
import { usePermission, useHasAnyPermission, useHasAllPermissions, usePermissionsLoaded } from '@/hooks/usePermissions'
import { PermissionCode } from '@/constants/permissions'
import { Lock, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

interface PermissionGuardProps {
  /** Single permission required */
  permission?: PermissionCode
  /** Array of permissions - user needs ANY one */
  anyOf?: PermissionCode[]
  /** Array of permissions - user needs ALL */
  allOf?: PermissionCode[]
  /** Content to show if user has permission */
  children: ReactNode
  /** Custom fallback component */
  fallback?: ReactNode
  /** Show loading state */
  showLoading?: boolean
  /** Custom loading component */
  loadingFallback?: ReactNode
}

export function PermissionGuard({
  permission,
  anyOf,
  allOf,
  children,
  fallback,
  showLoading = true,
  loadingFallback,
}: PermissionGuardProps) {
  const isLoaded = usePermissionsLoaded()
  const hasSinglePerm = usePermission(permission!)
  const hasAnyPerm = useHasAnyPermission(anyOf || [])
  const hasAllPerms = useHasAllPermissions(allOf || [])

  // Determine if user has required permissions
  let hasPermission = false
  if (permission) {
    hasPermission = hasSinglePerm
  } else if (anyOf && anyOf.length > 0) {
    hasPermission = hasAnyPerm
  } else if (allOf && allOf.length > 0) {
    hasPermission = hasAllPerms
  }

  // Show loading state
  if (!isLoaded && showLoading) {
    return loadingFallback || <DefaultLoadingState />
  }

  // Show access denied
  if (!hasPermission) {
    return fallback || <DefaultAccessDenied />
  }

  return <>{children}</>
}

// Default loading state
function DefaultLoadingState() {
  return (
    <div className="flex items-center justify-center min-h-[200px] p-8">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Loading permissions...</p>
      </div>
    </div>
  )
}

// Default access denied state
function DefaultAccessDenied() {
  return (
    <div className="flex items-center justify-center min-h-[400px] p-8">
      <Card className="max-w-md">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-destructive" />
            <CardTitle className="text-lg">Access Denied</CardTitle>
          </div>
          <CardDescription>
            You don't have permission to access this resource.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Please contact your administrator if you believe this is an error.
          </p>
          <Button asChild variant="outline" size="sm">
            <Link href="/admin">Go to Dashboard</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

// Inline permission guard for smaller UI elements
interface InlinePermissionGuardProps {
  permission?: PermissionCode
  anyOf?: PermissionCode[]
  allOf?: PermissionCode[]
  children: ReactNode
  fallback?: ReactNode
}

export function InlinePermissionGuard({
  permission,
  anyOf,
  allOf,
  children,
  fallback = null,
}: InlinePermissionGuardProps) {
  const isLoaded = usePermissionsLoaded()
  const hasSinglePerm = usePermission(permission!)
  const hasAnyPerm = useHasAnyPermission(anyOf || [])
  const hasAllPerms = useHasAllPermissions(allOf || [])

  if (!isLoaded) return null

  let hasPermission = false
  if (permission) {
    hasPermission = hasSinglePerm
  } else if (anyOf && anyOf.length > 0) {
    hasPermission = hasAnyPerm
  } else if (allOf && allOf.length > 0) {
    hasPermission = hasAllPerms
  }

  if (!hasPermission) return <>{fallback}</>

  return <>{children}</>
}

// Export aliases for backward compatibility
export const PermissionGaurd = PermissionGuard
export { PermissionGuard as default }
