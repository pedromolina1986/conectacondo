import api from './api';

export interface Condominio {
  id: string;
  name: string;
  address: string;
  totalResidents: number;
  activeResidents: number;
  adminName: string;
  adminPhone: string;
  status: 'active' | 'pending' | 'inactive';
  createdAt: string;
}

export interface CreateCondominioRequest {
  name: string;
  address: string;
  adminName: string;
  adminPhone: string;
  adminEmail: string;
}

export const condominiosService = {
  async getAll(page = 1, limit = 10, search = ''): Promise<{ data: Condominio[]; total: number }> {
    const response = await api.get('/condominios', {
      params: { page, limit, search }
    });
    return response.data;
  },

  async getById(id: string): Promise<Condominio> {
    const response = await api.get(`/condominios/${id}`);
    return response.data;
  },

  async create(condominio: CreateCondominioRequest): Promise<Condominio> {
    const response = await api.post('/condominios', condominio);
    return response.data;
  },

  async update(id: string, condominio: Partial<CreateCondominioRequest>): Promise<Condominio> {
    const response = await api.put(`/condominios/${id}`, condominio);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/condominios/${id}`);
  },

  async updateStatus(id: string, status: 'active' | 'pending' | 'inactive'): Promise<Condominio> {
    const response = await api.patch(`/condominios/${id}/status`, { status });
    return response.data;
  }
};