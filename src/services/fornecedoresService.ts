import api from './api';

export interface Fornecedor {
  id: string;
  name: string;
  category: string;
  contactName: string;
  email: string;
  phone: string;
  rating: number;
  totalOrders: number;
  status: 'active' | 'pending' | 'inactive';
  createdAt: string;
}

export interface CreateFornecedorRequest {
  name: string;
  category: string;
  contactName: string;
  email: string;
  phone: string;
  description?: string;
}

export const fornecedoresService = {
  async getAll(page = 1, limit = 10, search = ''): Promise<{ data: Fornecedor[]; total: number }> {
    const response = await api.get('/fornecedores', {
      params: { page, limit, search }
    });
    return response.data;
  },

  async getById(id: string): Promise<Fornecedor> {
    const response = await api.get(`/fornecedores/${id}`);
    return response.data;
  },

  async create(fornecedor: CreateFornecedorRequest): Promise<Fornecedor> {
    const response = await api.post('/fornecedores', fornecedor);
    return response.data;
  },

  async update(id: string, fornecedor: Partial<CreateFornecedorRequest>): Promise<Fornecedor> {
    const response = await api.put(`/fornecedores/${id}`, fornecedor);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/fornecedores/${id}`);
  },

  async updateStatus(id: string, status: 'active' | 'pending' | 'inactive'): Promise<Fornecedor> {
    const response = await api.patch(`/fornecedores/${id}/status`, { status });
    return response.data;
  }
};