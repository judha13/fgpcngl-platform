import api from '@/lib/api';

export interface Event {
  id: string;
  title: string;
  description?: string;
  event_date: string;
  event_time?: string;
  location?: string;
  status: 'upcoming' | 'past' | 'cancelled';
  attendees: number;
  created_at?: string;
  updated_at?: string;
}

export interface CreateEventData {
  title: string;
  description?: string;
  event_date: string;
  event_time?: string;
  location?: string;
}

export interface UpdateEventData extends CreateEventData {
  status?: 'upcoming' | 'past' | 'cancelled';
  attendees?: number;
}

export const eventsApi = {
  // Get all events
  getEvents: async (): Promise<Event[]> => {
    const response = await api.get('/api/events');
    return response.data.data;
  },

  // Get event by ID
  getEvent: async (id: string): Promise<Event> => {
    const response = await api.get(`/api/events/${id}`);
    return response.data.data;
  },

  // Create new event
  createEvent: async (eventData: CreateEventData): Promise<Event> => {
    const response = await api.post('/api/events', eventData);
    return response.data.data;
  },

  // Update event
  updateEvent: async (id: string, eventData: UpdateEventData): Promise<Event> => {
    const response = await api.put(`/api/events/${id}`, eventData);
    return response.data.data;
  },

  // Delete event
  deleteEvent: async (id: string): Promise<void> => {
    await api.delete(`/api/events/${id}`);
  },
};