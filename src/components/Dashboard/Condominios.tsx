import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, Eye, Users, HomeIcon } from 'lucide-react';
import { condominiosService, Condominio } from '../../services/condominiosService';

const Condominios = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [condominios, setCondominio] = useState<Condominio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  React.useEffect(() => {
      loadCondominios();
    }, []);
  
  const loadCondominios = async () => {
      try {
        setLoading(true);
        const response = await condominiosService.getAll(1, 100, searchTerm);      
        setCondominio(response);
      } catch (error) {
        console.error('Erro ao carregar condominios:', error);      
      } finally {
        setLoading(false);
      }
    };

  const filteredCondominios = condominios.filter(condominio =>
    condominio.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    condominio.endereco.toLowerCase().includes(searchTerm.toLowerCase()) ||
    condominio.cidade.toLowerCase().includes(searchTerm.toLowerCase())
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
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-secondary transition-colors duration-200 flex items-center space-x-2">
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
              
            </div>

            <div className="space-y-3 mb-6">
              <p className="text-gray-600 text-sm">{condominio.endereco}</p>                            
              <div className="flex items-center space-x-2">
                <HomeIcon className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">
                  <b>{condominio.unidades}</b> unidades ativas
                </span>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">                
                <p className="text-sm text-gray-600">{condominio.cidade}/{condominio.estado}</p>                
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Condominios;