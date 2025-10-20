'use client'

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, UserFormData } from '../types/user.types';
import { Role } from '../types/role.types';

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

  const handleRoleChange = (roleName: string) => {
    setFormData(prev => ({
      ...prev,
      roles: prev.roles.includes(roleName)
        ? prev.roles.filter(r => r !== roleName)
        : [...prev.roles, roleName]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
        <div className="flex space-x-4">
          {roles.map(role => (
            <div key={role._id} className="flex items-center space-x-2">
              <Checkbox
                id={`role-${role._id}`}
                checked={formData.roles.includes(role._id)}
                onCheckedChange={() => handleRoleChange(role._id)}
              />
              <label htmlFor={`role-${role._id}`}>{role.name}</label>
            </div>
          ))}
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