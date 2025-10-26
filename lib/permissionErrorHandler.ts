/**
 * Permission Error Handler
 * 
 * Utilities for handling permission-related API errors.
 * Provides consistent error handling across the application.
 */

import { toast } from 'sonner'

// Error codes from backend
export const ERROR_CODES = {
  PERMISSION_DENIED: 'PERMISSION_DENIED',
  UNAUTHORIZED: 'UNAUTHORIZED',
  USER_NOT_FOUND: 'USER_NOT_FOUND',
  PERMISSION_CHECK_ERROR: 'PERMISSION_CHECK_ERROR',
} as const

export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES]

// Permission error response structure from backend
export interface PermissionErrorResponse {
  success: false
  code: ErrorCode
  message: string
  requiredPermission?: string
}

// Check if error is a permission error
export function isPermissionError(error: any): error is { response: { status: number; data: PermissionErrorResponse } } {
  return (
    error?.response?.status === 403 &&
    error?.response?.data?.code === ERROR_CODES.PERMISSION_DENIED
  )
}

// Check if error is unauthorized
export function isUnauthorizedError(error: any): boolean {
  return (
    error?.response?.status === 401 ||
    error?.response?.data?.code === ERROR_CODES.UNAUTHORIZED
  )
}

// Handle permission error with toast notification
export function handlePermissionError(error: any, customMessage?: string): void {
  if (isPermissionError(error)) {
    const requiredPermission = error.response.data.requiredPermission
    const message = customMessage || 
      (requiredPermission 
        ? `You need ${requiredPermission} permission to perform this action`
        : 'You do not have permission to perform this action')
    
    toast.error('Permission Denied', {
      description: message,
      duration: 5000,
    })
  } else if (isUnauthorizedError(error)) {
    toast.error('Unauthorized', {
      description: 'Please log in to continue',
      duration: 5000,
    })
  } else {
    // Generic error
    toast.error('Error', {
      description: error?.response?.data?.message || 'An error occurred',
      duration: 5000,
    })
  }
}

// Get user-friendly error message
export function getErrorMessage(error: any): string {
  if (isPermissionError(error)) {
    const requiredPermission = error.response.data.requiredPermission
    return requiredPermission
      ? `You need ${requiredPermission} permission to perform this action`
      : 'You do not have permission to perform this action'
  }
  
  if (isUnauthorizedError(error)) {
    return 'Please log in to continue'
  }
  
  return error?.response?.data?.message || error?.message || 'An error occurred'
}

// Extract required permission from error
export function getRequiredPermission(error: any): string | null {
  if (isPermissionError(error)) {
    return error.response.data.requiredPermission || null
  }
  return null
}

// Log permission errors for debugging
export function logPermissionError(error: any, context?: string): void {
  if (isPermissionError(error)) {
    console.error('[Permission Error]', {
      context,
      requiredPermission: error.response.data.requiredPermission,
      message: error.response.data.message,
      timestamp: new Date().toISOString(),
    })
  }
}

// Axios interceptor for permission errors
export function createPermissionErrorInterceptor() {
  return {
    onError: (error: any) => {
      if (isPermissionError(error)) {
        handlePermissionError(error)
        logPermissionError(error, 'API Call')
      }
      return Promise.reject(error)
    },
  }
}

// React Query error handler
export function handleQueryError(error: any, customMessage?: string): void {
  handlePermissionError(error, customMessage)
}
