import api from './api';
import { Condominio } from './condominiosService';

export interface Morador {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  condominioId: string;
  condominio: Condominio;
  unidade: string;
}

export interface CreateMoradorRequest {
  nome: string;
  email: string;
  telefone: string;
  condominioId: string;
  unidade: string;
}

export const moradoresService = {
  async getAll(page = 1, limit = 10, filtro = ''): Promise<{ data: Morador[]; total: number }> {
    const response = await api.get('/morador', {
      params: { filtro }
    });
    return response.data;
  },

  async getById(id: string): Promise<Morador> {
    const response = await api.get(`/morador/${id}`);
    return response.data;
  },

  async create(morador: CreateMoradorRequest): Promise<Morador> {
    const response = await api.post('/morador', morador);
    return response.data;
  },

  async update(id: string, morador: Partial<CreateMoradorRequest>): Promise<Morador> {
    const response = await api.put(`/morador/${id}`, morador);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/morador/${id}`);
  },

  async updateStatus(id: string, status: 'active' | 'inactive'): Promise<Morador> {
    const response = await api.patch(`/morador/${id}/status`, { status });
    return response.data;
  }
};