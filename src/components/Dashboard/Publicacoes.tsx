import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, Eye, Calendar, MessageCircle } from 'lucide-react';

const Publicacoes = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const publicacoes = [
    {
      id: 1,
      titulo: 'Promoção Pães Frescos - 20% OFF',
      fornecedor: 'Padaria do João',
      condominio: 'Residencial Vista Verde',
      dataPublicacao: '15/01/2024',
      dataExpiracao: '22/01/2024',
      visualizacoes: 45,
      pedidos: 12,
      status: 'Ativa'
    },
    {
      id: 2,
      titulo: 'Limpeza Completa de Apartamentos',
      fornecedor: 'Limpeza Total',
      condominio: 'Condomínio Jardim das Flores',
      dataPublicacao: '18/01/2024',
      dataExpiracao: '25/01/2024',
      visualizacoes: 32,
      pedidos: 8,
      status: 'Ativa'
    },
    {
      id: 3,
      titulo: 'Corte + Escova por R$ 50',
      fornecedor: 'Beleza & Estilo',
      condominio: 'Residencial Parque das Árvores',
      dataPublicacao: '10/01/2024',
      dataExpiracao: '17/01/2024',
      visualizacoes: 28,
      pedidos: 15,
      status: 'Expirada'
    }
  ];

  const filteredPublicacoes = publicacoes.filter(publicacao =>
    publicacao.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    publicacao.fornecedor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    publicacao.condominio.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Publicações</h1>
        <p className="text-gray-600">Gerencie as publicações dos fornecedores nos grupos</p>
      </div>

      {/* Search and Add Button */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Buscar publicações..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center space-x-2">
          <Plus className="h-5 w-5" />
          <span>Nova Publicação</span>
        </button>
      </div>

      {/* Publications List */}
      <div className="space-y-4">
        {filteredPublicacoes.map((publicacao) => (
          <div key={publicacao.id} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-4">
                  <h3 className="text-lg font-bold text-gray-900">{publicacao.titulo}</h3>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    publicacao.status === 'Ativa' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {publicacao.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Fornecedor</p>
                    <p className="text-sm text-gray-600">{publicacao.fornecedor}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Condomínio</p>
                    <p className="text-sm text-gray-600">{publicacao.condominio}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Período</p>
                    <p className="text-sm text-gray-600">
                      {publicacao.dataPublicacao} - {publicacao.dataExpiracao}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <Eye className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{publicacao.visualizacoes} visualizações</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MessageCircle className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{publicacao.pedidos} pedidos</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Expira em {publicacao.dataExpiracao}</span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-2 mt-4 lg:mt-0">
                <button className="text-blue-600 hover:text-blue-900 p-2">
                  <Eye className="h-4 w-4" />
                </button>
                <button className="text-green-600 hover:text-green-900 p-2">
                  <Edit className="h-4 w-4" />
                </button>
                <button className="text-red-600 hover:text-red-900 p-2">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Performance Bar */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Taxa de Conversão</span>
                <span className="text-sm text-gray-600">
                  {((publicacao.pedidos / publicacao.visualizacoes) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full" 
                  style={{ width: `${(publicacao.pedidos / publicacao.visualizacoes) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Publicacoes;