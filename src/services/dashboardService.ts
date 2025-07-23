import api from './api';

export interface Dashboard {
    moradoresTotal: number;
    condominiosTotal: number;
    fornecedoresTotal: number;
    contratosAtivos: number;
    pedidosTotal: number;
    ultimosEnvios: number;
    proximosEnvios: number;
    crescimentoMensal: number;
}

export const dashboardService = {
  async getAll(): Promise<{ data: Dashboard[]}> {
    const response = await api.get('/dashboard');
    return response.data;
  },

};