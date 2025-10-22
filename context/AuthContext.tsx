'use client'

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useSession } from 'next-auth/react'
import { getMe } from '@/services/auth-service'

export type AuthUser = {
  id: string
  email: string
  name: string
  picture?: string | null
}

type AuthContextValue = {
  user?: AuthUser
  roles: string[]
  permissions: Set<string>
  loaded: boolean
  hasPerm: (p: string) => boolean
  hasAny: (arr: string[]) => boolean
  hasAll: (arr: string[]) => boolean
  refresh: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession()
  const [user, setUser] = useState<AuthUser | undefined>(undefined)
  const [roles, setRoles] = useState<string[]>([])
  const [permSet, setPermSet] = useState<Set<string>>(new Set())
  const [loaded, setLoaded] = useState<boolean>(false)

  const isSuperAdmin = roles.includes('SUPER_ADMIN')

  const hasPerm = (p: string) => isSuperAdmin || permSet.has(p)
  const hasAny = (arr: string[]) => isSuperAdmin || arr.some((p) => permSet.has(p))
  const hasAll = (arr: string[]) => isSuperAdmin || arr.every((p) => permSet.has(p))

  const refresh = async () => {
    try {
      // If no session token yet, mark loaded to avoid blocking UI
      if (!session?.user?.jwt) { setLoaded(true); return }
      const me = await getMe()
      if (!me) return
      console.log(me.permissions)
      const mappedRoles: string[] = Array.isArray(me.roles)
        ? me.roles.map((r: any) => (typeof r === 'string' ? r : r?.name)).filter(Boolean)
        : []
      const permissions: string[] = Array.isArray(me.permissions) ? me.permissions : []
      setUser({ id: me.id, email: me.email, name: me.name, picture: me.picture ?? null })
      setRoles(mappedRoles)
      setPermSet(new Set(permissions))
    } catch (e) {
      // leave as is on failure
    } finally { setLoaded(true) }
  }

  useEffect(() => {
    void refresh()
  }, [session?.user?.jwt])

  const value = useMemo<AuthContextValue>(
    () => ({ user, roles, permissions: permSet, loaded, hasPerm, hasAny, hasAll, refresh }),
    [user, roles, permSet, loaded]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
