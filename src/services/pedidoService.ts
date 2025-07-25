import api from './api';

// Define o DTO de acordo com o Swagger
export interface PedidoRelatorioDto {
  condominio?: string | null;
  endereco?: string | null;
  morador?: string | null;
  unidade?: string | null;
  resposta?: string | null;
}

// Serviço de pedidos
export const pedidoService = {
  /**
   * Busca o relatório de pedidos por envioId
   * @param envioId ID do envio (obrigatório)
   * @returns Lista de objetos PedidoRelatorioDto
   */
  async listarRelatorio(envioId: number): Promise<PedidoRelatorioDto[]> {
    const response = await api.get<PedidoRelatorioDto[]>(`/Pedido/relatorio/${envioId}`);    
    return response.data;
  },
};
