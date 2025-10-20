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
import { AdminPanelPermissions } from '@/data/permissions-list';
import { Loader2 } from 'lucide-react'

export default function UserManagement() {
  const [activeTab, setActiveTab] = useState('users')
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [editingRole, setEditingRole] = useState<RoleFormData | null>(null)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [roleToDelete, setRoleToDelete] = useState<string | null>(null)
  const [isRoleSheetOpen, setIsRoleSheetOpen] = useState(false)
  
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
  } = useUsers()

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

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <h1 className="text-3xl font-bold mb-6">User Management</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="users">Users</TabsTrigger>
          {canAssignRoles && (
            <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
          )}
        </TabsList>
        <TabsContent value="users" className="space-y-4">
          <Button onClick={() => {setEditingUser(null); setIsSheetOpen(true)}} disabled={!canCreateUser}>
            Add New User
          </Button>
          <UserTable
            users={users ?? []}
            pagination={pagination}
            isLoading={usersLoading}
            onEdit={canUpdateUser ? (user: User) => {setEditingUser(user); setIsSheetOpen(true)} : () => {}}
            onDelete={canDeleteUser ? (userId: string) => deleteUser(userId) : () => {}}
            onToggleStatus={canUpdateUser ? (userId: string) => toggleUserStatus(userId) : () => {}}
          />
        </TabsContent>

        {canAssignRoles && (
          <TabsContent value="roles" className="space-y-6">


            <Sheet open={isRoleSheetOpen} onOpenChange={setIsRoleSheetOpen}>
              <SheetContent className=' sm:max-w-full max-w-6xl'>
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

            <Button onClick={() => {setEditingRole(null); setIsRoleSheetOpen(true)}} disabled={!canAssignRoles}>
              Add New Role
              </Button>

            <RoleTable 
              roles={roles?.data?.docs ?? []} 
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