import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { eventsApi, type Event, type CreateEventData, type UpdateEventData } from '@/services/eventsApi';
import { toast } from 'sonner';

// Query keys
export const eventKeys = {
  all: ['events'] as const,
  lists: () => [...eventKeys.all, 'list'] as const,
  list: (filters: string) => [...eventKeys.lists(), { filters }] as const,
  details: () => [...eventKeys.all, 'detail'] as const,
  detail: (id: string) => [...eventKeys.details(), id] as const,
};

// Get all events
export function useEvents() {
  return useQuery({
    queryKey: eventKeys.lists(),
    queryFn: eventsApi.getEvents,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Get single event
export function useEvent(id: string) {
  return useQuery({
    queryKey: eventKeys.detail(id),
    queryFn: () => eventsApi.getEvent(id),
    enabled: !!id,
  });
}

// Create event mutation
export function useCreateEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: eventsApi.createEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: eventKeys.lists() });
      toast.success('Event created successfully!');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to create event';
      toast.error(message);
    },
  });
}

// Update event mutation
export function useUpdateEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateEventData }) =>
      eventsApi.updateEvent(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: eventKeys.lists() });
      queryClient.invalidateQueries({ queryKey: eventKeys.detail(variables.id) });
      toast.success('Event updated successfully!');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to update event';
      toast.error(message);
    },
  });
}

// Delete event mutation
export function useDeleteEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: eventsApi.deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: eventKeys.lists() });
      toast.success('Event deleted successfully.');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to delete event';
      toast.error(message);
    },
  });
}