import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, Eye, Star } from 'lucide-react';

const Fornecedores = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const fornecedores = [
    {
      id: 1,
      nome: 'Padaria do João',
      categoria: 'Alimentação',
      contato: 'João Silva',
      email: 'joao@padaria.com',
      telefone: '(11) 99999-9999',
      avaliacao: 4.8,
      totalPedidos: 156,
      status: 'Ativo'
    },
    {
      id: 2,
      nome: 'Limpeza Total',
      categoria: 'Limpeza',
      contato: 'Maria Santos',
      email: 'maria@limpeza.com',
      telefone: '(11) 88888-8888',
      avaliacao: 4.6,
      totalPedidos: 89,
      status: 'Ativo'
    },
    {
      id: 3,
      nome: 'Beleza & Estilo',
      categoria: 'Beleza',
      contato: 'Ana Costa',
      email: 'ana@beleza.com',
      telefone: '(11) 77777-7777',
      avaliacao: 4.9,
      totalPedidos: 234,
      status: 'Pendente'
    }
  ];

  const filteredFornecedores = fornecedores.filter(fornecedor =>
    fornecedor.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fornecedor.categoria.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fornecedor.contato.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Fornecedores</h1>
        <p className="text-gray-600">Gerencie os fornecedores cadastrados na plataforma</p>
      </div>

      {/* Search and Add Button */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Buscar fornecedores..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center space-x-2">
          <Plus className="h-5 w-5" />
          <span>Adicionar Fornecedor</span>
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredFornecedores.map((fornecedor) => (
          <div key={fornecedor.id} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">{fornecedor.nome}</h3>
                <p className="text-sm text-gray-600">{fornecedor.categoria}</p>
              </div>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                fornecedor.status === 'Ativo' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {fornecedor.status}
              </span>
            </div>

            <div className="space-y-3 mb-6">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm font-medium text-gray-700">Contato</p>
                <p className="text-sm text-gray-600">{fornecedor.contato}</p>
                <p className="text-sm text-gray-600">{fornecedor.email}</p>
                <p className="text-sm text-gray-600">{fornecedor.telefone}</p>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium text-gray-700">{fornecedor.avaliacao}</span>
                </div>
                <span className="text-sm text-gray-600">{fornecedor.totalPedidos} pedidos</span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex space-x-2">
                <button className="text-blue-600 hover:text-blue-900 p-1">
                  <Eye className="h-4 w-4" />
                </button>
                <button className="text-green-600 hover:text-green-900 p-1">
                  <Edit className="h-4 w-4" />
                </button>
                <button className="text-red-600 hover:text-red-900 p-1">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              
              <button className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-medium hover:bg-orange-200 transition-colors">
                Ver Produtos
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Fornecedores;