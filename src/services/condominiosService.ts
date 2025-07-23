import api from './api';

export interface Condominio {
  id: string;
  nome: string;
  endereco: string;
  cidade: string;
  estado: string;
  cep: string;
  grupoWhatsApp: string;
  portariaRemota: boolean
  mercadoAutonomo: boolean;
  valorMedio: number;
  unidades: number;
}

export interface CreateCondominioRequest {
  nome: string;
  endereco: string;
  cidade: string;
  estado: string;
  cep: string;
  grupoWhatsApp: string;
  portariaRemota: boolean
  mercadoAutonomo: boolean;
  valorMedio: number;
  unidades: number;
}

export const condominiosService = {
  async getAll(page = 1, limit = 10, filtro = ''): Promise<{ data: Condominio[]; total: number }> {
    const response = await api.get('/condominio', {
      params: { filtro }
    });
    return response;
  },

  async getById(id: string): Promise<Condominio> {
    const response = await api.get(`/condominio/${id}`);
    return response.data;
  },

  async create(condominio: CreateCondominioRequest): Promise<Condominio> {
    const response = await api.post('/condominio', condominio);
    return response.data;
  },

  async update(id: string, condominio: Partial<CreateCondominioRequest>): Promise<Condominio> {
    condominio.Id = id; //TIRAR NO BACK ESSA VERIFICACAO
    const response = await api.put(`/condominio/${id}`, condominio);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/condominio/${id}`);
  },

  async updateStatus(id: string, status: 'active' | 'pending' | 'inactive'): Promise<Condominio> {
    const response = await api.patch(`/condominio/${id}/status`, { status });
    return response.data;
  }
};