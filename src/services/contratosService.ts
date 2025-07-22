import api from './api';
import { Fornecedor } from './fornecedoresService';
import { Condominio } from './condominiosService';

export interface Contrato {
  id: string,
  numeroContrato: string;
  fornecedorId: number;
  fornecedor: Fornecedor;
  condominioId: number;
  condominio: Condominio;
  dataInicio: string;
  dataFim: string;
  status: string;
  valor: number;
}

export interface CreateContratoRequest {  
  numeroContrato: string;
  fornecedorId: number;
  condominioId: number;  
  dataInicio: string;
  dataFim: string;
  status: string;
  valor: number;
}

export const contratosService = {
  async getAll(page = 1, limit = 10, filtro = ''): Promise<{ data: Contrato[]; total: number }> {
    const response = await api.get('/contrato', {
      params: { filtro }
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