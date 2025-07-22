import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, Eye, Calendar, DollarSign } from 'lucide-react';

const Contratos = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const contratos = [
    {
      id: 1,
      numero: 'CT-2024-001',
      condominio: 'Residencial Vista Verde',
      fornecedor: 'Padaria do João',
      tipo: 'Mensal',
      valor: 'R$ 2.500,00',
      dataInicio: '01/01/2024',
      dataFim: '31/12/2024',
      status: 'Ativo'
    },
    {
      id: 2,
      numero: 'CT-2024-002',
      condominio: 'Condomínio Jardim das Flores',
      fornecedor: 'Limpeza Total',
      tipo: 'Trimestral',
      valor: 'R$ 1.800,00',
      dataInicio: '15/02/2024',
      dataFim: '15/05/2024',
      status: 'Ativo'
    },
    {
      id: 3,
      numero: 'CT-2024-003',
      condominio: 'Residencial Parque das Árvores',
      fornecedor: 'Beleza & Estilo',
      tipo: 'Anual',
      valor: 'R$ 5.000,00',
      dataInicio: '01/03/2024',
      dataFim: '01/03/2025',
      status: 'Pendente'
    }
  ];

  const filteredContratos = contratos.filter(contrato =>
    contrato.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contrato.condominio.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contrato.fornecedor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Contratos</h1>
        <p className="text-gray-600">Gerencie os contratos entre condomínios e fornecedores</p>
      </div>

      {/* Search and Add Button */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Buscar contratos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center space-x-2">
          <Plus className="h-5 w-5" />
          <span>Novo Contrato</span>
        </button>
      </div>

      {/* Contracts List */}
      <div className="space-y-4">
        {filteredContratos.map((contrato) => (
          <div key={contrato.id} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-4">
                  <h3 className="text-lg font-bold text-gray-900">{contrato.numero}</h3>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    contrato.status === 'Ativo' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {contrato.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Condomínio</p>
                    <p className="text-sm text-gray-600">{contrato.condominio}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Fornecedor</p>
                    <p className="text-sm text-gray-600">{contrato.fornecedor}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Tipo</p>
                    <p className="text-sm text-gray-600">{contrato.tipo}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Valor</p>
                    <p className="text-sm text-gray-600 font-semibold">{contrato.valor}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-6 mt-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {contrato.dataInicio} - {contrato.dataFim}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{contrato.valor}</span>
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contratos;