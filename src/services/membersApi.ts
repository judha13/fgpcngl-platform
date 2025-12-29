import api from '@/lib/api';

export interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  join_date: string;
  status: 'active' | 'inactive';
  created_at?: string;
  updated_at?: string;
}

export interface CreateMemberData {
  name: string;
  email: string;
  phone?: string;
  role: string;
}

export interface UpdateMemberData extends CreateMemberData {
  status?: 'active' | 'inactive';
}

export const membersApi = {
  // Get all members
  getMembers: async (): Promise<Member[]> => {
    const response = await api.get('/api/members');
    return response.data.data;
  },

  // Get member by ID
  getMember: async (id: string): Promise<Member> => {
    const response = await api.get(`/api/members/${id}`);
    return response.data.data;
  },

  // Create new member
  createMember: async (memberData: CreateMemberData): Promise<Member> => {
    const response = await api.post('/api/members', memberData);
    return response.data.data;
  },

  // Update member
  updateMember: async (id: string, memberData: UpdateMemberData): Promise<Member> => {
    const response = await api.put(`/api/members/${id}`, memberData);
    return response.data.data;
  },

  // Delete member
  deleteMember: async (id: string): Promise<void> => {
    await api.delete(`/api/members/${id}`);
  },
};