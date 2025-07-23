import api from './api';

export interface Fornecedor {
  id: string;
  nome: string;
  endereco: string,
  cidade: string,
  estado: string,
  cep: string,
  cnpjCpf: string,
  nomeContato: string,
  contato: string,
  email: string,
  senha: string,
  tipo: string
}

export interface CreateFornecedorRequest {
  nome: string;
  endereco: string,
  cidade: string,
  estado: string,
  cep: string,
  cnpjCpf: string,
  nomeContato: string,
  contato: string,
  email: string,
  senha: string,
  tipo: string

}

export const fornecedoresService = {
  async getAll(page = 1, limit = 10, filtro = ''): Promise<{ data: Fornecedor[]; total: number }> {
    const response = await api.get('/fornecedor', {
      params: { filtro }
    });
    return response;
  },

  async getById(id: string): Promise<Fornecedor> {
    const response = await api.get(`/fornecedor/${id}`);
    return response.data;
  },

  async create(fornecedor: CreateFornecedorRequest): Promise<Fornecedor> {
    const response = await api.post('/fornecedor', fornecedor);
    return response.data;
  },

  async update(id: string, fornecedor: Partial<CreateFornecedorRequest>): Promise<Fornecedor> {
    fornecedor.Id = id; // Ensure ID is included in the update
    const response = await api.put(`/fornecedor/${id}`, fornecedor);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/fornecedor/${id}`);
  },

  async updateStatus(id: string, status: 'active' | 'pending' | 'inactive'): Promise<Fornecedor> {
    const response = await api.patch(`/fornecedor/${id}/status`, { status });
    return response.data;
  }
};