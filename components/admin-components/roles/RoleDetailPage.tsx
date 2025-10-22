'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, Save, Shield, Key, Users, CheckCircle2 } from 'lucide-react'
import { AdminPanelPermissions } from '@/data/permissions-list'
import { PermissionCode } from '@/modules/user-management/types/permission.types'
import { RoleFormData } from '@/modules/user-management/types/role.types'
import { useRoles } from '@/modules/user-management/hooks/useRoles'
import ModernLoader from '@/components/ModernLoader'
import { toast } from 'sonner'

interface RoleDetailPageProps {
  roleId?: string
}

// Group permissions by category
const permissionCategories = {
  'Content Management': [
    'COURSE_VIEW', 'COURSE_CREATE', 'COURSE_UPDATE', 'COURSE_DELETE',
    'BLOG_VIEW', 'BLOG_CREATE', 'BLOG_UPDATE', 'BLOG_DELETE',
    'BLOG_CATEGORY_VIEW', 'BLOG_CATEGORY_CREATE', 'BLOG_CATEGORY_UPDATE', 'BLOG_CATEGORY_DELETE',
    'WEBINAR_VIEW', 'WEBINAR_CREATE', 'WEBINAR_UPDATE', 'WEBINAR_DELETE',
    'WIDGET_VIEW', 'WIDGET_CREATE', 'WIDGET_UPDATE', 'WIDGET_DELETE',
    'CATEGORY_MANAGE',
  ],
  'User & Access': [
    'VIEW_USERS', 'CREATE_USERS', 'EDIT_USERS', 'DELETE_USERS',
    'ROLE_VIEW', 'ROLE_CREATE', 'ROLE_UPDATE', 'ROLE_DELETE',
  ],
  'Enrollments & Enquiries': [
    'ENROLLMENT_VIEW', 'ENROLLMENT_CREATE', 'ENROLLMENT_UPDATE', 'ENROLLMENT_DELETE',
    'ENQUIRY_VIEW', 'ENQUIRY_CREATE', 'ENQUIRY_UPDATE', 'ENQUIRY_DELETE',
    'SNWEL_ENQUIRY_VIEW',
  ],
  'Jobs & Recruitment': [
    'JOB_VIEW', 'JOB_CREATE', 'JOB_UPDATE', 'JOB_DELETE',
  ],
  'System & Settings': [
    'GALLERY_VIEW', 'GALLERY_CREATE', 'GALLERY_UPDATE', 'GALLERY_DELETE',
    'SETTINGS_VIEW', 'SETTINGS_UPDATE',
    'INTEGRATION_VIEW', 'ANALYTICS_VIEW',
  ],
}

export default function RoleDetailPage({ roleId }: RoleDetailPageProps) {
  const router = useRouter()
  const { roles, addRole, updateRole, isModifying } = useRoles()
  const isEditMode = roleId && roleId !== 'new'
  
  const [formData, setFormData] = useState<RoleFormData>({
    name: '',
    description: '',
    permissions: [],
  })

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  useEffect(() => {
    if (isEditMode && roles?.data?.docs) {
      const role = roles.data.docs.find(r => r._id === roleId)
      if (role) {
        setFormData({
          name: role.name,
          description: role.description || '',
          permissions: role.permissions.map(p => p.code),
        })
      }
    }
  }, [isEditMode, roleId, roles])

  const handlePermissionToggle = (permission: PermissionCode) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission]
    }))
  }

  const handleSelectAllInCategory = (category: string) => {
    const categoryPerms = permissionCategories[category as keyof typeof permissionCategories]
    const allSelected = categoryPerms.every(p => formData.permissions.includes(p as PermissionCode))
    
    if (allSelected) {
      setFormData(prev => ({
        ...prev,
        permissions: prev.permissions.filter(p => !categoryPerms.includes(p))
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        permissions: Array.from(new Set([...prev.permissions, ...categoryPerms as PermissionCode[]]))
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name.trim()) {
      toast.error('Role name is required')
      return
    }

    if (formData.permissions.length === 0) {
      toast.error('Please select at least one permission')
      return
    }

    try {
      if (isEditMode) {
        await updateRole({ id: roleId, data: formData })
        toast.success('Role updated successfully')
      } else {
        await addRole(formData)
        toast.success('Role created successfully')
      }
      router.push('/admin/users?tab=roles')
    } catch (error) {
      toast.error('Failed to save role')
    }
  }

  const getCategoryStats = (category: string) => {
    const categoryPerms = permissionCategories[category as keyof typeof permissionCategories]
    const selected = categoryPerms.filter(p => formData.permissions.includes(p as PermissionCode)).length
    return { total: categoryPerms.length, selected }
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">
            {isEditMode ? 'Edit Role' : 'Create New Role'}
          </h1>
          <p className="text-muted-foreground">
            {isEditMode ? 'Update role details and permissions' : 'Define a new role with specific permissions'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Basic Info */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Role Information
              </CardTitle>
              <CardDescription>Basic details about this role</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Role Name *</Label>
                <Input
                  id="name"
                  placeholder="e.g., Content Manager"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the role's responsibilities..."
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                />
              </div>

              <Separator />

              <div className="space-y-3">
                <Label className="text-sm font-medium">Summary</Label>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Total Permissions:</span>
                    <Badge variant="secondary">{formData.permissions.length}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Categories:</span>
                    <Badge variant="secondary">
                      {Object.keys(permissionCategories).filter(cat => 
                        getCategoryStats(cat).selected > 0
                      ).length}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Right Column - Permissions */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                Permissions
              </CardTitle>
              <CardDescription>
                Select permissions for this role. Users with this role will have access to these features.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(permissionCategories).map(([category, permissions]) => {
                  const stats = getCategoryStats(category)
                  const allSelected = stats.selected === stats.total
                  const someSelected = stats.selected > 0 && stats.selected < stats.total

                  return (
                    <div key={category} className="space-y-3">
                      <div 
                        className="flex items-center justify-between p-3 rounded-lg bg-muted/50 cursor-pointer hover:bg-muted transition-colors"
                        onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                      >
                        <div className="flex items-center gap-3">
                          <Checkbox
                            checked={allSelected}
                            ref={(el) => el && (el.indeterminate = someSelected)}
                            onCheckedChange={() => handleSelectAllInCategory(category)}
                            onClick={(e) => e.stopPropagation()}
                          />
                          <div>
                            <h4 className="font-semibold">{category}</h4>
                            <p className="text-xs text-muted-foreground">
                              {stats.selected} of {stats.total} selected
                            </p>
                          </div>
                        </div>
                        <Badge variant={allSelected ? "default" : someSelected ? "secondary" : "outline"}>
                          {stats.selected}/{stats.total}
                        </Badge>
                      </div>

                      {selectedCategory === category && (
                        <div className="grid grid-cols-2 gap-2 ml-6 p-3 border rounded-lg">
                          {permissions.map((permission) => (
                            <div key={permission} className="flex items-center gap-2">
                              <Checkbox
                                id={`perm-${permission}`}
                                checked={formData.permissions.includes(permission as PermissionCode)}
                                onCheckedChange={() => handlePermissionToggle(permission as PermissionCode)}
                              />
                              <Label 
                                htmlFor={`perm-${permission}`}
                                className="text-sm cursor-pointer flex items-center gap-1"
                              >
                                {permission}
                                {formData.permissions.includes(permission as PermissionCode) && (
                                  <CheckCircle2 className="h-3 w-3 text-primary" />
                                )}
                              </Label>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between border-t pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isModifying} className="gap-2">
            {isModifying ? (
              <>
                <ModernLoader variant="dots" size="sm" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                {isEditMode ? 'Update Role' : 'Create Role'}
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
