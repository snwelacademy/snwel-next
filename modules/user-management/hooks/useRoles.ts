import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { roleService } from '../services/role.service';
import { Role, RoleFormData } from '../types/role.types';
import { useSession } from 'next-auth/react';
import { useToast } from '@/components/ui/use-toast';

export function useRoles() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Query for fetching roles
  const query = useQuery({
    queryKey: ['roles'],
    queryFn: () => roleService.getRoles(),
    enabled: !!session?.user, // Only fetch if user is authenticated
  });

  // Create role mutation
  const createMutation = useMutation({
    mutationFn: (roleData: RoleFormData) => roleService.createRole(roleData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
      toast({
        title: "Success",
        description: "Role created successfully",
        variant: "success",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create role",
        variant: "destructive",
      });
    },
  });

  // Update role mutation
  const updateMutation = useMutation({
    mutationFn: (data: RoleFormData) => {
      if(data._id) {
        return roleService.updateRole(data._id, data);
      }
      return Promise.reject(new Error("Role ID is required"));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
      toast({
        title: "Success",
        description: "Role updated successfully",
        variant: "success",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update role",
        variant: "destructive",
      });
    },
  });

  // Delete role mutation
  const deleteMutation = useMutation({
    mutationFn: (roleId: string) => roleService.deleteRole(roleId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
      toast({
        title: "Success",
        description: "Role deleted successfully",
        variant: "success",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete role",
        variant: "destructive",
      });
    },
  });

  return {
    roles: query.data,
    isLoading: query.isLoading,
    error: query.error,
    addRole: createMutation.mutateAsync,
    updateRole: updateMutation.mutateAsync,
    deleteRole: deleteMutation.mutateAsync,
    isModifying: createMutation.isPending || 
                 updateMutation.isPending || 
                 deleteMutation.isPending
  };
} 