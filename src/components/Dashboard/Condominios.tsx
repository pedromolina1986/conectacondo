import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, Eye, Users } from 'lucide-react';

const Condominios = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const condominios = [
    {
      id: 1,
      nome: 'Residencial Vista Verde',
      endereco: 'Rua das Flores, 123 - São Paulo/SP',
      totalMoradores: 45,
      moradoresAtivos: 38,
      sindico: 'Carlos Mendes',
      telefone: '(11) 99999-9999',
      status: 'Ativo'
    },
    {
      id: 2,
      nome: 'Condomínio Jardim das Flores',
      endereco: 'Av. Principal, 456 - São Paulo/SP',
      totalMoradores: 62,
      moradoresAtivos: 55,
      sindico: 'Ana Paula',
      telefone: '(11) 88888-8888',
      status: 'Ativo'
    },
    {
      id: 3,
      nome: 'Residencial Parque das Árvores',
      endereco: 'Rua Verde, 789 - São Paulo/SP',
      totalMoradores: 28,
      moradoresAtivos: 20,
      sindico: 'Roberto Silva',
      telefone: '(11) 77777-7777',
      status: 'Pendente'
    }
  ];

  const filteredCondominios = condominios.filter(condominio =>
    condominio.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    condominio.endereco.toLowerCase().includes(searchTerm.toLowerCase()) ||
    condominio.sindico.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Condomínios</h1>
        <p className="text-gray-600">Gerencie os condomínios cadastrados na plataforma</p>
      </div>

      {/* Search and Add Button */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Buscar condomínios..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center space-x-2">
          <Plus className="h-5 w-5" />
          <span>Adicionar Condomínio</span>
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCondominios.map((condominio) => (
          <div key={condominio.id} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-bold text-gray-900">{condominio.nome}</h3>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                condominio.status === 'Ativo' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {condominio.status}
              </span>
            </div>

            <div className="space-y-3 mb-6">
              <p className="text-gray-600 text-sm">{condominio.endereco}</p>
              
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">
                  {condominio.moradoresAtivos}/{condominio.totalMoradores} moradores ativos
                </span>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm font-medium text-gray-700">Síndico</p>
                <p className="text-sm text-gray-600">{condominio.sindico}</p>
                <p className="text-sm text-gray-600">{condominio.telefone}</p>
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
              
              <div className="w-full max-w-24 bg-gray-200 rounded-full h-2 ml-4">
                <div 
                  className="bg-green-600 h-2 rounded-full" 
                  style={{ width: `${(condominio.moradoresAtivos / condominio.totalMoradores) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Condominios;