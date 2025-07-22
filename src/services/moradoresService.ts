import api from './api';

export interface Morador {
  id: string;
  name: string;
  email: string;
  phone: string;
  condominiumId: string;
  condominiumName: string;
  apartment: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface CreateMoradorRequest {
  name: string;
  email: string;
  phone: string;
  condominiumId: string;
  apartment: string;
}

export const moradoresService = {
  async getAll(page = 1, limit = 10, search = ''): Promise<{ data: Morador[]; total: number }> {
    const response = await api.get('/moradores', {
      params: { page, limit, search }
    });
    return response.data;
  },

  async getById(id: string): Promise<Morador> {
    const response = await api.get(`/moradores/${id}`);
    return response.data;
  },

  async create(morador: CreateMoradorRequest): Promise<Morador> {
    const response = await api.post('/moradores', morador);
    return response.data;
  },

  async update(id: string, morador: Partial<CreateMoradorRequest>): Promise<Morador> {
    const response = await api.put(`/moradores/${id}`, morador);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/moradores/${id}`);
  },

  async updateStatus(id: string, status: 'active' | 'inactive'): Promise<Morador> {
    const response = await api.patch(`/moradores/${id}/status`, { status });
    return response.data;
  }
};