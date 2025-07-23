import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, Eye } from 'lucide-react';
import { moradoresService, Morador } from '../../services/moradoresService';
import MoradorModal from '../Modals/MoradorModal';

const Moradores = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [moradores, setMoradores] = useState<Morador[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'view' | 'edit' | 'create'>('view');
  const [selectedMorador, setSelectedMorador] = useState<Morador | undefined>();
    
  React.useEffect(() => {
    loadMoradores();
  }, []);

  const loadMoradores = async () => {
    try {
      setLoading(true);
      const response = await moradoresService.getAll(1, 100, searchTerm);    
      console.log('Moradores carregados:', response);  
      setMoradores(response || []);
    } catch (error) {
      console.error('Erro ao carregar moradores:', error);
      setError('Erro ao carregar dados. Usando dados de demonstração.');
      // Dados de demonstração em caso de erro
      setMoradores([
        {
          id: '1',
          nome: 'João Silva',
          email: 'joao@email.com',
          telefone: '(11) 99999-9999',
          condominioId: '1',
          condominio: { id: '1', nome: 'Residencial Jardim', endereco: 'Rua das Flores, 123', cidade: 'São Paulo', estado: 'SP', cep: '01234-567', grupoWhatsApp: '', portariaRemota: true, mercadoAutonomo: false, valorMedio: 500000, unidades: 120 },
          unidade: 'Bloco A - Apt 101'
        },
        {
          id: '2',
          nome: 'Maria Santos',
          email: 'maria@email.com',
          telefone: '(11) 88888-8888',
          condominioId: '2',
          condominio: { id: '2', nome: 'Condomínio Vista Verde', endereco: 'Av. Central, 456', cidade: 'São Paulo', estado: 'SP', cep: '01234-567', grupoWhatsApp: '', portariaRemota: false, mercadoAutonomo: true, valorMedio: 750000, unidades: 80 },
          unidade: 'Torre B - Apt 205'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filteredMoradores = moradores.filter(morador =>    
    morador.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    morador.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    morador.condominio.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    // Recarregar dados com novo termo de busca após um delay
    setTimeout(() => {
      if (value !== searchTerm) return; // Evita busca duplicada
      loadMoradores();
    }, 500);
  };

  const handleView = (morador: Morador) => {
    setSelectedMorador(morador);
    setModalMode('view');
    setModalOpen(true);
  };

  const handleEdit = (morador: Morador) => {
    setSelectedMorador(morador);
    setModalMode('edit');
    setModalOpen(true);
  };

  const handleCreate = () => {
    setSelectedMorador(undefined);
    setModalMode('create');
    setModalOpen(true);
  };

  const handleDelete = async (morador: Morador) => {
    if (window.confirm(`Tem certeza que deseja excluir o morador ${morador.nome}?`)) {
      try {
        await moradoresService.delete(morador.telefone);
        loadMoradores();
      } catch (error) {
        console.error('Erro ao excluir morador:', error);
        alert('Erro ao excluir morador');
      }
    }
  };

  const handleModalSave = () => {
    loadMoradores();
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Moradores</h1>
        <p className="text-gray-600">Gerencie os moradores cadastrados na plataforma</p>
      </div>

      {/* Search and Add Button */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Buscar moradores..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        <button 
          onClick={handleCreate}
          className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-secondary transition-colors duration-200 flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Adicionar Morador</span>
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-lg">
          {error}
        </div>
      )}

      {/* Table */}
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nome
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contato
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Condomínio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Unidade
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                    Carregando...
                  </td>
                </tr>
              ) : (
              filteredMoradores.map((morador) => (
                <tr key={morador.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{morador.nome}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{morador.email}</div>
                    <div className="text-sm text-gray-500">{morador.telefone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{morador.condominio.nome}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{morador.unidade}</div>
                  </td>                 
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleView(morador)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleEdit(morador)}
                        className="text-green-600 hover:text-green-900"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(morador)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <MoradorModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        mode={modalMode}
        morador={selectedMorador}
        onSave={handleModalSave}
      />
    </div>
  );
};

export default Moradores;