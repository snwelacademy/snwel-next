'use client'

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Permission, RoleFormData } from '../types/role.types';
import { usePermissions } from '../hooks/usePermission';

interface RoleFormProps {
  submitting?: boolean;
  onSave: (roleData: RoleFormData) => void;
  initialData?: RoleFormData;
}

export function RoleForm({ onSave, initialData, submitting }: RoleFormProps) {
  const [formData, setFormData] = useState<RoleFormData>({
    name: initialData?.name || '',
    description: initialData?.description || '',
    permissions: initialData?.permissions || [],
  });


  const handlePermissionChange = (permission: Permission) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name) {
      onSave(formData);
      setFormData({ name: '', permissions: [], description: '' });
    }
  };

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-medium">Add New Role</h3>

      <div className="flex space-x-4">
        <div className="flex-grow space-y-4">
          <div>
            <Label htmlFor="roleName">Role Name</Label>
            <Input
              id="roleName"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter role name"
              required
            />
          </div>

          <div>
            <Label htmlFor="roleDescription">Role Description</Label>
            <Input
              id="roleDescription"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Enter role description"
            />
          </div>
        </div>
        <div className="flex items-end">
          <Button type="submit">Add Role</Button>
        </div>
      </div>

      <div>
        <Label>Permissions</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {(Object.values(Permission) as Permission[]).map(permission => (
            <div key={permission} className="flex items-center space-x-2">
              <Checkbox
                id={`permission-${permission}`}
                checked={formData.permissions.includes(permission)}
                onCheckedChange={() => handlePermissionChange(permission)}
              />
              <label htmlFor={`permission-${permission}`}>{permission}</label>
            </div>
          ))}
        </div>
      </div>
    </form>
  );
} 