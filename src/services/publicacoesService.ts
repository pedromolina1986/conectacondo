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
      params: { filtro, emailFornecedor, page, limit }
    });    
    return response;
  },

  async getById(id: string): Promise<Publicacao> {
    const response = await api.get(`/envio/${id}`);
    return response.data;
  },

  async create(publicacao: CreatePublicacaoRequest): Promise<Publicacao> {
    const formData = new FormData();
    
    //verify if the image is a File object
    if (publicacao.imagem instanceof File) {

      // Loop through the fields in publicacao
      for (const key in publicacao) {
        const value = publicacao[key as keyof CreatePublicacaoRequest];

        // If the field is a File, append it directly
        if (value instanceof File) {
          formData.append(key, value);
        } 
        // If the field is not null or undefined, append it as a string
        else if (value !== null && value !== undefined) {
          formData.append(key, value.toString());
        }
      }
    }
    console.log('Creating publication with data:', publicacao);    
    const response = await api.post(`/envio/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async update(id: string, publicacao: Partial<CreatePublicacaoRequest>): Promise<Publicacao> {
    console.log('Updating publication with ID:', id, 'and data:', publicacao);
    const formData = new FormData();

    //verify if the image is a File object
    if (publicacao.imagem instanceof File) {

      // Loop through the fields in publicacao
      for (const key in publicacao) {
        const value = publicacao[key as keyof CreatePublicacaoRequest];

        // If the field is a File, append it directly
        if (value instanceof File) {
          formData.append(key, value);
        } 
        // If the field is not null or undefined, append it as a string
        else if (value !== null && value !== undefined) {
          formData.append(key, value.toString());
        }
      }
    }

    const response = await api.put(`/envio/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/envio/${id}`);
  },

  async updateStatus(id: string, status: 'active' | 'expired' | 'draft'): Promise<Publicacao> {
    const response = await api.patch(`/envio/${id}/status`, { status });
    return response.data;
  },

  async enviar(id: number): Promise<void> {
    try {
      const token = localStorage.getItem('authToken');
      await api.post(`whatsapp/send/?envioId=${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });      
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
    }
  }
}