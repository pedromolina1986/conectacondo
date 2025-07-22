import api from './api';

export interface Contrato {
  id: string;
  number: string;
  condominiumId: string;
  condominiumName: string;
  supplierId: string;
  supplierName: string;
  type: 'monthly' | 'quarterly' | 'annual';
  value: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'pending' | 'expired' | 'cancelled';
  createdAt: string;
}

export interface CreateContratoRequest {
  condominiumId: string;
  supplierId: string;
  type: 'monthly' | 'quarterly' | 'annual';
  value: number;
  startDate: string;
  endDate: string;
}

export const contratosService = {
  async getAll(page = 1, limit = 10, search = ''): Promise<{ data: Contrato[]; total: number }> {
    const response = await api.get('/contratos', {
      params: { page, limit, search }
    });
    return response.data;
  },

  async getById(id: string): Promise<Contrato> {
    const response = await api.get(`/contratos/${id}`);
    return response.data;
  },

  async create(contrato: CreateContratoRequest): Promise<Contrato> {
    const response = await api.post('/contratos', contrato);
    return response.data;
  },

  async update(id: string, contrato: Partial<CreateContratoRequest>): Promise<Contrato> {
    const response = await api.put(`/contratos/${id}`, contrato);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/contratos/${id}`);
  },

  async updateStatus(id: string, status: 'active' | 'pending' | 'expired' | 'cancelled'): Promise<Contrato> {
    const response = await api.patch(`/contratos/${id}/status`, { status });
    return response.data;
  }
};