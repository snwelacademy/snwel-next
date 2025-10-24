'use client'

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, UserFormData } from '../types/user.types';
import { Role } from '../types/role.types';
import { Badge } from "@/components/ui/badge";
import { X } from 'lucide-react'

interface UserFormProps {
  user?: User;
  roles: Role[];
  onSave: (userData: UserFormData) => void;
  onCancel: () => void;
}

export function UserForm({ user, roles, onSave, onCancel }: UserFormProps) {
  const [formData, setFormData] = useState<UserFormData>({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
    roles: user?.roles?.map(role => role._id) || [],
    isActive: user?.isActive || true,
    phone: user?.phone || '',
    location: user?.location || {
      addr: '',
      state: '',
      city: '',
      country: ''
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (roleId: string) => {
    setFormData(prev => ({
      ...prev,
      roles: prev.roles.includes(roleId)
        ? prev.roles.filter(r => r !== roleId)
        : [...prev.roles, roleId]
    }));
  };

  const handleAddRole = (roleId: string) => {
    if (!roleId) return;
    setFormData(prev => (
      prev.roles.includes(roleId)
        ? prev
        : { ...prev, roles: [...prev.roles, roleId] }
    ));
  }

  const handleRemoveRole = (roleId: string) => {
    setFormData(prev => ({ ...prev, roles: prev.roles.filter(r => r !== roleId) }));
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-h-[75vh] overflow-y-auto p-1">
      <h2 className="text-xl font-semibold mb-4">
        {user?._id ? 'Edit User' : 'Add New User'}
      </h2>
      
      <div>
        <Label htmlFor="name">Name</Label>
        <Input 
          id="name" 
          name="name" 
          value={formData.name} 
          onChange={handleInputChange} 
          required 
        />
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input 
          id="email" 
          name="email" 
          type="email" 
          value={formData.email} 
          onChange={handleInputChange} 
          required 
        />
      </div>

      {!user?._id && (
        <div>
          <Label htmlFor="password">Password</Label>
          <Input 
            id="password" 
            name="password" 
            type="password" 
            value={formData.password} 
            onChange={handleInputChange} 
            required 
          />
        </div>
      )}

      <div>
        <Label>Roles</Label>
        <div className="flex flex-col gap-2">
          <Select onValueChange={(value) => handleAddRole(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              {roles.map(role => (
                <SelectItem key={role._id} value={role._id}>{role.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex flex-wrap gap-2">
            {formData.roles.map((roleId) => {
              const r = roles.find(rr => rr._id === roleId);
              return (
                <Badge key={roleId} variant="secondary" className="flex items-center gap-1">
                  {r?.name || roleId}
                  <button type="button" onClick={() => handleRemoveRole(roleId)} className="ml-1 opacity-70 hover:opacity-100">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )
            })}
          </div>
        </div>
      </div>

      <div>
        <Label htmlFor="status">Status</Label>
        <Select 
          value={formData.isActive ? 'active' : 'inactive'} 
          onValueChange={(value: 'active' | 'inactive') => 
            setFormData(prev => ({ ...prev, isActive: value === 'active' }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex space-x-2">
        <Button type="submit">Save User</Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
} 