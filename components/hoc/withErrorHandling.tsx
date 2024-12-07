// components/hoc/withErrorHandling.tsx
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'

export function withErrorHandling<T extends object>(
  WrappedComponent: React.ComponentType<T>
) {
  return function WithErrorHandlingComponent(props: T) {
    const { toast } = useToast()
    const router = useRouter()

    useEffect(() => {
      const handleError = (error: any) => {
        if (error?.response?.status === 403) {
          toast({
            title: "Access Denied",
            description: "You don't have permission to access this resource",
            variant: "destructive"
          })
          router.push('/admin/dashboard')
        }
      }

      window.addEventListener('unhandledrejection', handleError)
      return () => window.removeEventListener('unhandledrejection', handleError)
    }, [router, toast])

    return <WrappedComponent {...props} />
  }
}