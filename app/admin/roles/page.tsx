'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Shield, Plus, Search } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { RoleTable } from '@/modules/user-management/components/RoleTable'
import { RoleFormData } from '@/modules/user-management/types/role.types'
import { useRoles } from '@/modules/user-management/hooks/useRoles'
import ModernLoader from '@/components/ModernLoader'

export default function RolesPage() {
  const [search, setSearch] = useState('')
  const [roleToDelete, setRoleToDelete] = useState<string | null>(null)
  const { roles, isLoading, error, deleteRole } = useRoles()

  const filteredRoles = roles?.data?.docs?.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase())
  ) ?? []

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <ModernLoader variant="skeleton" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-red-500">
        {error.message}
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-lg bg-primary/10">
          <Shield className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Roles & Permissions</h1>
          <p className="text-muted-foreground">Define roles and assign granular permissions</p>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>All Roles</CardTitle>
              <CardDescription>Manage your roles and associated permissions</CardDescription>
            </div>
            <Button asChild className="gap-2">
              <Link href="/admin/roles/new">
                <Plus className="h-4 w-4" />
                Add New Role
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search roles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <RoleTable
              roles={filteredRoles}
              handleEdit={() => { /* navigation handled inside table links */ }}
              handleDelete={(id: string) => setRoleToDelete(id)}
            />
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={!!roleToDelete} onOpenChange={() => setRoleToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete role?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the role.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => {
              if (roleToDelete) {
                deleteRole(roleToDelete)
                setRoleToDelete(null)
              }
            }}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
