import api from './api';
import { Contrato } from './contratosService';
import { Fornecedor } from './fornecedoresService';
import { Condominio } from './condominiosService';

export interface Publicacao {
id: string;
contratoId: number;
fornecedorId: number;
condominioId: number;
dataPostagem: string;
horaPostagem: string;
descricaoPostagem: string;
imagem: string;
preco: number;
dataLimitePedido: string;
horaLimitePedido: string;
dataEntrega: string;
horaEntrega: string;
linkPagamento: string;
status: number;
contrato: Contrato;
fornecedor: Fornecedor;
condominio: Condominio;
wpResp: string;
}

export interface CreatePublicacaoRequest {
  contratoId: number;
  fornecedorId: number;
  condominioId: number;
  dataPostagem: string;
  horaPostagem: string;
  descricaoPostagem: string;
  imagem: string;
  preco: number;
  dataLimitePedido: string;
  horaLimitePedido: string;
  dataEntrega: string;
  horaEntrega: string;
  linkPagamento: string;
  status: number;
}

export const publicacoesService = {
  async getAll(page = 1, limit = 10, filtro = '', emailFornecedor = localStorage.getItem('user')?.toString()): Promise<{ data: Publicacao[]; total: number }> {    
    const response = await api.get('/envio', {
      params: { filtro, emailFornecedor }
    });
    return response.data;
  },

  async getById(id: string): Promise<Publicacao> {
    const response = await api.get(`/envio/${id}`);
    return response.data;
  },

  async create(publicacao: CreatePublicacaoRequest): Promise<Publicacao> {
    const response = await api.post('/envio', publicacao);
    return response.data;
  },

  async update(id: string, publicacao: Partial<CreatePublicacaoRequest>): Promise<Publicacao> {
    const response = await api.put(`/envio/${id}`, publicacao);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/envio/${id}`);
  },

  async updateStatus(id: string, status: 'active' | 'expired' | 'draft'): Promise<Publicacao> {
    const response = await api.patch(`/envio/${id}/status`, { status });
    return response.data;
  }
};