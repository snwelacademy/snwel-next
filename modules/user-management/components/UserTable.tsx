'use client'

import { User } from '../types/user.types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useUsers } from '../hooks/useUsers';

interface UserTableProps {
  onEdit: (user: User) => void;
  onDelete: (userId: string) => void;
  onToggleStatus: (userId: string) => void;
  users: User[];
  pagination: any;
  isLoading: boolean;
}

export function UserTable({ onEdit, onDelete, onToggleStatus, users, pagination, isLoading }: UserTableProps) {
  const [page, setPage] = useState(1);


  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Roles</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user: User) => (
            <TableRow key={user._id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.roles?.map(role => role.name).join(', ') || ''}</TableCell>
              <TableCell>
                <Switch
                  checked={user.isActive} 
                  onCheckedChange={() => onToggleStatus(user._id)}
                />
              </TableCell>
              <TableCell>
                <Button variant="ghost" size="icon" onClick={() => onEdit(user)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => onDelete(user._id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {pagination && (
        <div className="flex items-center justify-between">
          <Button 
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Previous
          </Button>
          <span>
            Page {pagination.page} of {pagination.totalPages}
          </span>
          <Button 
            onClick={() => setPage(p => p + 1)}
            disabled={page >= pagination.totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
} 