import api from './api';

export interface Publicacao {
  id: string;
  title: string;
  content: string;
  supplierId: string;
  supplierName: string;
  condominiumId: string;
  condominiumName: string;
  publishDate: string;
  expirationDate: string;
  views: number;
  orders: number;
  status: 'active' | 'expired' | 'draft';
  createdAt: string;
}

export interface CreatePublicacaoRequest {
  title: string;
  content: string;
  supplierId: string;
  condominiumId: string;
  publishDate: string;
  expirationDate: string;
}

export const publicacoesService = {
  async getAll(page = 1, limit = 10, search = ''): Promise<{ data: Publicacao[]; total: number }> {
    const response = await api.get('/publicacoes', {
      params: { page, limit, search }
    });
    return response.data;
  },

  async getById(id: string): Promise<Publicacao> {
    const response = await api.get(`/publicacoes/${id}`);
    return response.data;
  },

  async create(publicacao: CreatePublicacaoRequest): Promise<Publicacao> {
    const response = await api.post('/publicacoes', publicacao);
    return response.data;
  },

  async update(id: string, publicacao: Partial<CreatePublicacaoRequest>): Promise<Publicacao> {
    const response = await api.put(`/publicacoes/${id}`, publicacao);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/publicacoes/${id}`);
  },

  async updateStatus(id: string, status: 'active' | 'expired' | 'draft'): Promise<Publicacao> {
    const response = await api.patch(`/publicacoes/${id}/status`, { status });
    return response.data;
  }
};