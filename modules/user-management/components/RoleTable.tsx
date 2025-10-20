'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Role, RoleFormData } from '../types/role.types';
import { Button } from "@/components/ui/button";
import { EditIcon, TrashIcon } from "lucide-react";

interface RoleTableProps {
  roles: Role[];
  handleEdit: (id: string, data: RoleFormData) => void;
  handleDelete: (id: string) => void;
}

export function RoleTable({ roles, handleEdit, handleDelete }: RoleTableProps) {

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Role</TableHead>
          <TableHead>Permissions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {roles.map(role => (
          <TableRow key={role._id}>
            <TableCell>{role.name}</TableCell>
            <TableCell>{role.permissions?.map(permission => permission.name).join(', ') || ''}</TableCell>
            <TableCell>
              <Button variant="ghost" size="icon" onClick={() => handleEdit(role._id, {name: role.name, description: role.description, permissions: role.permissions.map(permission => permission.code)})}>
                <EditIcon />
              </Button>
            </TableCell>
            <TableCell>
              <Button variant="ghost" size="icon" onClick={() => handleDelete(role._id)}>
                <TrashIcon />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
} 