import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { membersApi, type Member, type CreateMemberData, type UpdateMemberData } from '@/services/membersApi';
import { toast } from 'sonner';

// Query keys
export const memberKeys = {
  all: ['members'] as const,
  lists: () => [...memberKeys.all, 'list'] as const,
  list: (filters: string) => [...memberKeys.lists(), { filters }] as const,
  details: () => [...memberKeys.all, 'detail'] as const,
  detail: (id: string) => [...memberKeys.details(), id] as const,
};

// Get all members
export function useMembers() {
  return useQuery({
    queryKey: memberKeys.lists(),
    queryFn: membersApi.getMembers,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Get single member
export function useMember(id: string) {
  return useQuery({
    queryKey: memberKeys.detail(id),
    queryFn: () => membersApi.getMember(id),
    enabled: !!id,
  });
}

// Create member mutation
export function useCreateMember() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: membersApi.createMember,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: memberKeys.lists() });
      toast.success('Member added successfully!');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to add member';
      toast.error(message);
    },
  });
}

// Update member mutation
export function useUpdateMember() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateMemberData }) =>
      membersApi.updateMember(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: memberKeys.lists() });
      queryClient.invalidateQueries({ queryKey: memberKeys.detail(variables.id) });
      toast.success('Member updated successfully!');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to update member';
      toast.error(message);
    },
  });
}

// Delete member mutation
export function useDeleteMember() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: membersApi.deleteMember,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: memberKeys.lists() });
      toast.success('Member removed from directory.');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to delete member';
      toast.error(message);
    },
  });
}