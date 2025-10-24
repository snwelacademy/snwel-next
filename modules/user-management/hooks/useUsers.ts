import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '../services/user.service';
import { User, UserFormData } from '../types/user.types';
import { useSession } from 'next-auth/react';
import { useToast } from '@/components/ui/use-toast';
import { ApiResponse, ListResponse } from '@/types/ApiResponses';

export function useUsers(options = { page: 1, limit: 10 }) {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Query for fetching users with pagination
  const query = useQuery<ApiResponse<ListResponse<User>>>({
    queryKey: ['users', options],
    queryFn: () => userService.getUsers(options),
    enabled: !!session?.user,
    staleTime: 1000 * 60 * 5,
  });

  // Create user mutation
  const createMutation = useMutation({
    mutationFn: (userData: UserFormData) => userService.createUser(userData),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast({
        title: "Success",
        description: data.message || "User created successfully",
        variant: "success",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create user",
        variant: "destructive",
      });
    },
  });

  // Update user mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<UserFormData> }) => 
      userService.updateUser(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast({
        title: "Success",
        description: "User updated successfully",
        variant: "success",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update user",
        variant: "destructive",
      });
    },
  });

  // Delete user mutation
  const deleteMutation = useMutation({
    mutationFn: (userId: string) => userService.deleteUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast({
        title: "Success",
        description: "User deleted successfully",
        variant: "success",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete user",
        variant: "destructive",
      });
    },
  });

  // Toggle user status mutation
  const toggleStatusMutation = useMutation({
    mutationFn: (userId: string) => userService.toggleStatus(userId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast({
        title: "Success",
        description: "User status updated successfully",
        variant: "success",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update user status",
        variant: "destructive",
      });
    },
  });

  return {
    users: query.data?.data.docs || [],
    pagination: query.data ? {
      total: Number(query.data.data.total),
      page: Number((query.data.data as any).page ?? (query.data.data as any).currentPage ?? 1),
      limit: Number(query.data.data.limit),
      totalPages: Math.ceil(Number(query.data.data.total) / Number(query.data.data.limit)),
    } : undefined,
    isLoading: query.isLoading,
    error: query.error,
    addUser: createMutation.mutateAsync,
    updateUser: updateMutation.mutateAsync,
    deleteUser: deleteMutation.mutateAsync,
    toggleUserStatus: toggleStatusMutation.mutateAsync,
    isModifying: createMutation.isPending || 
                 updateMutation.isPending || 
                 deleteMutation.isPending || 
                 toggleStatusMutation.isPending
  };
} 