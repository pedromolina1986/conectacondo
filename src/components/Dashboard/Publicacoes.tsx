import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, Eye, Calendar } from 'lucide-react';
import { publicacoesService, Publicacao } from '../../services/publicacoesService';

const Publicacoes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [publicacoes, setPublicacoes] = useState<Publicacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  React.useEffect(() => {
    loadPublicacoes();
  }, []);

  const loadPublicacoes = async () => {
    try {
      setLoading(true);
      const response = await publicacoesService.getAll(1, 100, searchTerm);
      setPublicacoes(response);
    } catch (error) {
      console.error('Erro ao carregar publicações:', error);
      setError('Erro ao carregar dados. Usando dados de demonstração.');
    } finally {
      setLoading(false);
    }
  };

  const filteredPublicacoes = publicacoes.filter(publicacao =>
    publicacao.contrato.numeroContrato.toLowerCase().includes(searchTerm.toLowerCase()) ||
    publicacao.fornecedor.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    publicacao.condominio.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    publicacao.dataPostagem.toLowerCase().includes(searchTerm.toLowerCase())    
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
          <div key={publicacao.id} className="bg-white rounded-lg shadow-lg p-6 flex flex-col lg:flex-row">
            {/* Image on the Left */}
            <div className="w-full lg:w-48 h-48 mb-4 lg:mb-0 lg:mr-6 flex-shrink-0">
              <img
                src={`https://api.oconectacondo.com.br/uploads/${publicacao.imagem}`} // ✅ Fixed URL
                alt={publicacao.imagem || 'Imagem da publicação'}
                className="w-full h-full object-cover rounded-md"
              />
            </div>

            {/* Card Content */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-4 mb-4">
                  <h3 className="text-lg font-bold text-gray-900">{publicacao.contrato.numeroContrato}</h3>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    publicacao.status === 1 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {publicacao.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Fornecedor</p>
                    <p className="text-sm text-gray-600">{publicacao.fornecedor.nome}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Condomínio</p>
                    <p className="text-sm text-gray-600">{publicacao.condominio.nome}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Período</p>
                    <p className="text-sm text-gray-600">
                      {publicacao.dataPostagem} {publicacao.horaPostagem} - {publicacao.dataLimitePedido} {publicacao.horaLimitePedido}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <Eye className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{publicacao.condominio.unidades} visualizações</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      Entrega em {new Date(publicacao.dataEntrega).toLocaleDateString()} {publicacao.horaEntrega}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2 mt-4 lg:mt-6">
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

              {/* Performance Bar */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Taxa de Conversão</span>
                  <span className="text-sm text-gray-600">
                    {((10 / publicacao.condominio.unidades) * 100).toFixed(1)}% ({10} / {publicacao.condominio.unidades})
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full" 
                    style={{ width: `${(10 / publicacao.condominio.unidades) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
        {filteredPublicacoes.length === 0 && !loading && (
          <p className="text-center text-gray-500">Nenhuma publicação encontrada.</p>
        )}
        {loading && (
          <p className="text-center text-gray-400">Carregando publicações...</p>
        )}
        {error && (
          <p className="text-center text-red-500">{error}</p>
        )}
      </div>
    </div>
  );
};

export default Publicacoes;
