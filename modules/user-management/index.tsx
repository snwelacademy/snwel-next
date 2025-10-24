'use client'

import { useState } from 'react'
import { usePermission } from './hooks/usePermission'
import { UserTable } from './components/UserTable'
import { UserForm } from './components/UserForm'
import { RoleTable } from './components/RoleTable'
import { RoleForm } from './components/RoleForm'
import { useUsers } from './hooks/useUsers'
import { useRoles } from './hooks/useRoles'
import { Role, User, UserFormData } from './types/user.types'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RoleFormData } from './types/role.types'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminPanelPermissions } from '@/data/permissions-list';
import { Loader2, Plus, Search, Users, Shield, UserPlus } from 'lucide-react'
import Link from 'next/link'

export default function UserManagement() {
  const [activeTab, setActiveTab] = useState('users')
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [editingRole, setEditingRole] = useState<RoleFormData | null>(null)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [roleToDelete, setRoleToDelete] = useState<string | null>(null)
  const [isRoleSheetOpen, setIsRoleSheetOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [roleSearchQuery, setRoleSearchQuery] = useState('')
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  
  const canViewUsers = usePermission(AdminPanelPermissions.VIEW_USERS)
  const canCreateUser = usePermission(AdminPanelPermissions.CREATE_USERS)
  const canUpdateUser = usePermission(AdminPanelPermissions.EDIT_USERS)
  const canDeleteUser = usePermission(AdminPanelPermissions.DELETE_USERS)
  const canAssignRoles = usePermission(AdminPanelPermissions.EDIT_USERS)

  const { 
    pagination,
    users, 
    isLoading: usersLoading, 
    error: usersError,
    addUser, 
    updateUser, 
    deleteUser, 
    toggleUserStatus,
    isModifying: isModifyingUser 
  } = useUsers({ page, limit })

  const {
    roles,
    isLoading: rolesLoading,
    error: rolesError,
    addRole,
    updateRole,
    deleteRole,
    isModifying: isModifyingRole
  } = useRoles()

  if (!canViewUsers) {
    return <div className="flex items-center justify-center h-screen">You don't have permission to view this page.</div>
  }

  if (usersLoading || rolesLoading) {
    return <div className="flex items-center justify-center h-screen"><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading...</div>
  }

  if (usersError || rolesError) {
    return <div className="flex items-center justify-center h-screen text-red-500">Error: {usersError?.message || rolesError?.message}</div>
  }

  const filteredUsers = users?.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  ) ?? []

  const filteredRoles = roles?.data?.docs?.filter(role =>
    role.name.toLowerCase().includes(roleSearchQuery.toLowerCase())
  ) ?? []

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-primary/10">
            <Users className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
            <p className="text-muted-foreground">Manage users, roles, and permissions across your platform</p>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-2 h-11">
          <TabsTrigger value="users" className="gap-2">
            <Users className="h-4 w-4" />
            Users
          </TabsTrigger>
          {canAssignRoles && (
            <TabsTrigger value="roles" className="gap-2">
              <Shield className="h-4 w-4" />
              Roles & Permissions
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader className="pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle>All Users</CardTitle>
                  <CardDescription>Manage your team members and their access</CardDescription>
                </div>
                <Button onClick={() => {setEditingUser(null); setIsSheetOpen(true)}} disabled={!canCreateUser} className="gap-2">
                  <UserPlus className="h-4 w-4" />
                  Add New User
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users by name or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <UserTable
                  users={filteredUsers}
                  pagination={pagination}
                  isLoading={usersLoading}
                  onEdit={canUpdateUser ? (user: User) => {setEditingUser(user); setIsSheetOpen(true)} : () => {}}
                  onDelete={canDeleteUser ? (userId: string) => deleteUser(userId) : () => {}}
                  onToggleStatus={canUpdateUser ? (userId: string) => toggleUserStatus(userId) : () => {}}
                  onPageChange={(p) => setPage(p)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {canAssignRoles && (
          <TabsContent value="roles" className="space-y-4">
            <Card>
              <CardHeader className="pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle>Roles & Permissions</CardTitle>
                    <CardDescription>Define roles and assign granular permissions</CardDescription>
                  </div>
                  <Button asChild disabled={!canAssignRoles} className="gap-2">
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
                      value={roleSearchQuery}
                      onChange={(e) => setRoleSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <RoleTable 
                    roles={filteredRoles} 
                    handleDelete={(id: string) => canAssignRoles ? setRoleToDelete(id) : undefined}
                    handleEdit={(id: string, data: RoleFormData) => {
                      if (!canAssignRoles) return;
                      const role: RoleFormData = {
                        _id: id,
                        ...data,
                      }
                      setEditingRole(role)
                      setIsRoleSheetOpen(true)
                    }}
                  />
                </div>
              </CardContent>
            </Card>

            <Sheet open={isRoleSheetOpen} onOpenChange={setIsRoleSheetOpen}>
              <SheetContent className='sm:max-w-full max-w-6xl'>
                <SheetHeader>
                  <SheetTitle>{editingRole ? 'Edit Role' : 'Add New Role'}</SheetTitle>
                  <SheetDescription>Make changes to role information here. Click save when you're done.</SheetDescription>
                </SheetHeader>
              
                <RoleForm 
                  onSave={editingRole ? updateRole : addRole} 
                  initialData={editingRole ?? undefined}
                  submitting={isModifyingRole}
                />
              </SheetContent>
            </Sheet>
          </TabsContent>
        )}
      </Tabs>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>{editingUser ? 'Edit User' : 'Add New User'}</SheetTitle>
            <SheetDescription>Make changes to user information here. Click save when you're done.</SheetDescription>
          </SheetHeader>
          <UserForm
            user={editingUser ?? undefined}
            roles={roles?.data?.docs ?? []}
            onSave={(userData: UserFormData) => {
              if (editingUser) {
                updateUser({ id: editingUser._id, data: userData })
              } else {
                addUser(userData)
              }
              setEditingUser(null)
              setIsSheetOpen(false)
            }}
            onCancel={() => {
              setEditingUser(null)
              setIsSheetOpen(false)
            }}
          />
        </SheetContent>
      </Sheet>

      <AlertDialog open={!!roleToDelete} onOpenChange={() => setRoleToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
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