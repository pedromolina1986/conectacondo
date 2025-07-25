import React, { useEffect, useState } from 'react';
import { pedidoService, PedidoRelatorioDto } from '../../services/pedidoService';

type RelatorioPedidosProps = {
  envioId: number | string;
  onVoltar?: () => void;
};

const RelatorioPedidos: React.FC<RelatorioPedidosProps> = ({ envioId, onVoltar }) => {
  const [relatorio, setRelatorio] = useState<PedidoRelatorioDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    const fetchRelatorio = async () => {
      setLoading(true);
      setErro(null);
      try {
        const data = await pedidoService.listarRelatorio(Number(envioId));
        setRelatorio(data);
      } catch (error) {
        console.error('Erro ao buscar relatório de pedidos:', error);
        setErro('Não foi possível carregar o relatório de pedidos.');
      } finally {
        setLoading(false);
      }
    };

    fetchRelatorio();
  }, [envioId]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Relatório de Pedidos</h2>
        {onVoltar && (
          <button
            onClick={onVoltar}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
          >
            Voltar
          </button>
        )}
      </div>

      {loading ? (
        <p className="text-gray-600">Carregando...</p>
      ) : erro ? (
        <p className="text-red-500">{erro}</p>
      ) : relatorio.length === 0 ? (
        <p className="text-gray-600">Nenhum pedido encontrado para essa publicação.</p>
      ) : (
        <div className="overflow-auto">
          <table className="min-w-full table-auto border border-gray-300 text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="border px-4 py-2 text-left">Morador</th>
                <th className="border px-4 py-2 text-left">Unidade</th>
                <th className="border px-4 py-2 text-left">Condomínio</th>
                <th className="border px-4 py-2 text-left">Endereço</th>
                <th className="border px-4 py-2 text-left">Resposta</th>
              </tr>
            </thead>
            <tbody>
              {relatorio.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{item.morador ?? ''}</td>
                  <td className="border px-4 py-2">{item.unidade ?? ''}</td>
                  <td className="border px-4 py-2">{item.condominio ?? ''}</td>
                  <td className="border px-4 py-2">{item.endereco ?? ''}</td>
                  <td className="border px-4 py-2">{item.resposta ?? ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RelatorioPedidos;
