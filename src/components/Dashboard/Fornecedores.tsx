import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, Eye, Star } from 'lucide-react';
import { fornecedoresService, Fornecedor } from '../../services/fornecedoresService';
import FornecedorModal from '../Modals/FornecedorModal';

const Fornecedores = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'view' | 'edit' | 'create'>('view');
  const [selectedFornecedor, setSelectedFornecedor] = useState<Fornecedor | undefined>();

  
  React.useEffect(() => {
      loadFornecedores();
    }, []);
  
    const loadFornecedores = async () => {
      try {
        setLoading(true);
        const response = await fornecedoresService.getAll(1, 100, searchTerm);      
        setFornecedores(response);
      } catch (error) {
        console.error('Erro ao carregar condominios:', error);      
      } finally {
        setLoading(false);
      }
    };

  const filteredFornecedores = fornecedores.filter(fornecedor =>
    fornecedor.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fornecedor.cidade.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fornecedor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fornecedor.contato.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fornecedor.nomeContato.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fornecedor.cnpjCpf.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fornecedor.estado.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fornecedor.cep.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fornecedor.estado.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleView = (fornecedor: Fornecedor) => {
    setSelectedFornecedor(fornecedor);
    setModalMode('view');
    setModalOpen(true);
  };

  const handleEdit = (fornecedor: Fornecedor) => {
    setSelectedFornecedor(fornecedor);
    setModalMode('edit');
    setModalOpen(true);
  };

  const handleCreate = () => {
    setSelectedFornecedor(undefined);
    setModalMode('create');
    setModalOpen(true);
  };

  const handleDelete = async (fornecedor: Fornecedor) => {
    if (window.confirm(`Tem certeza que deseja excluir o fornecedor ${fornecedor.nome}?`)) {
      try {
        await fornecedoresService.delete(fornecedor.id);
        loadFornecedores();
      } catch (error) {
        console.error('Erro ao excluir fornecedor:', error);
        alert('Erro ao excluir fornecedor');
      }
    }
  };

  const handleModalSave = () => {
    loadFornecedores();
  };

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
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        <button 
          onClick={handleCreate}
          className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-secondary transition-colors duration-200 flex items-center space-x-2"
        >
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
                <p className="text-sm text-gray-600">{fornecedor.tipo.toUpperCase()}</p>
              </div>              
            </div>

            <div className="space-y-3 mb-6">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm font-medium text-gray-700">Contato</p>
                <p className="text-sm text-gray-600">{fornecedor.nomeContato}</p>
                <p className="text-sm text-gray-600">{fornecedor.email}</p>
                <p className="text-sm text-gray-600">{fornecedor.contato}</p>
                <p className="text-sm text-gray-600">{fornecedor.cnpjCpf}</p>
                <p className="text-sm text-gray-600">{fornecedor.cidade}/{fornecedor.estado}</p>
              </div>              
            </div>

            <div className="flex justify-between items-center">
              <div className="flex space-x-2">
                <button 
                  onClick={() => handleView(fornecedor)}
                  className="text-blue-600 hover:text-blue-900 p-1"
                >
                  <Eye className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => handleEdit(fornecedor)}
                  className="text-green-600 hover:text-green-900 p-1"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => handleDelete(fornecedor)}
                  className="text-red-600 hover:text-red-900 p-1"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>                            
            </div>
          </div>
        ))}
      </div>

      <FornecedorModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        mode={modalMode}
        fornecedor={selectedFornecedor}
        onSave={handleModalSave}
      />
    </div>
  );
};

export default Fornecedores;