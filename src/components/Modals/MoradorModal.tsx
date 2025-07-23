import React, { useState, useEffect } from 'react';
import BaseModal from './BaseModal';
import { Morador, CreateMoradorRequest, moradoresService } from '../../services/moradoresService';
import { condominiosService, Condominio } from '../../services/condominiosService';
import { condominiosService, Condominio } from '../../services/condominiosService';

interface MoradorModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'view' | 'edit' | 'create';
  morador?: Morador;
  onSave?: () => void;
}

const MoradorModal: React.FC<MoradorModalProps> = ({
  isOpen,
  onClose,
  mode,
  morador,
  onSave
}) => {
  const [formData, setFormData] = useState<CreateMoradorRequest>({
    nome: '',
    email: '',
    telefone: '',
    condominioId: '',
    unidade: ''
  });
  const [condominios, setCondominios] = useState<Condominio[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [condominios, setCondominios] = useState<Condominio[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      loadCondominios();
      loadCondominios();
      if (morador && (mode === 'edit' || mode === 'view')) {
        setFormData({
          nome: morador.nome,
          email: morador.email,
          telefone: morador.telefone,
          condominioId: morador.condominioId,
          unidade: morador.unidade
        });
      } else {
        setFormData({
          nome: '',
          email: '',
          telefone: '',
          condominioId: '',
          unidade: ''
        });
      }
    }
  }, [isOpen, morador, mode]);

  const loadCondominios = async () => {
    try {
      const response = await condominiosService.getAll(1, 100);
      setCondominios(response.data || []);
    } catch (error) {
      console.error('Erro ao carregar condomínios:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (mode === 'create') {
        await moradoresService.create(formData);
      } else if (mode === 'edit' && morador) {
        await moradoresService.update(morador.id, formData);
      }
      onSave?.();
      onClose();
    } catch (error: any) {
      setError(error.response?.data?.message || 'Erro ao salvar morador');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const getTitle = () => {
    switch (mode) {
      case 'view': return 'Visualizar Morador';
      case 'edit': return 'Editar Morador';
      case 'create': return 'Novo Morador';
      default: return 'Morador';
    }
  };

  const isReadOnly = mode === 'view';
  const loadCondominios = async () => {
    try {
      const response = await condominiosService.getAll(1, 100);
      setCondominios(response.data || []);
    } catch (error) {
      console.error('Erro ao carregar condomínios:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (mode === 'create') {
        await moradoresService.create(formData);
      } else if (mode === 'edit' && morador) {
        await moradoresService.update(morador.id, formData);
      }
      onSave?.();
      onClose();
    } catch (error: any) {
      setError(error.response?.data?.message || 'Erro ao salvar morador');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const getTitle = () => {
    switch (mode) {
      case 'view': return 'Visualizar Morador';
      case 'edit': return 'Editar Morador';
      case 'create': return 'Novo Morador';
      default: return 'Morador';
    }
  };

  const isReadOnly = mode === 'view';

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title={getTitle()} size="lg">
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nome Completo
            </label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleInputChange}
              disabled={isReadOnly}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              E-mail
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              disabled={isReadOnly}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Telefone
            </label>
            <input
              type="tel"
              name="telefone"
              value={formData.telefone}
              onChange={handleInputChange}
              disabled={isReadOnly}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Condomínio
            </label>
            <select
              name="condominioId"
              value={formData.condominioId}
              onChange={handleInputChange}
              disabled={isReadOnly}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100"
            >
              <option value="">Selecione um condomínio</option>
              {condominios.map((condominio) => (
                <option key={condominio.id} value={condominio.id}>
                  {condominio.nome}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Unidade
            </label>
            <input
              type="text"
              name="unidade"
              value={formData.unidade}
              onChange={handleInputChange}
              disabled={isReadOnly}
              required
              placeholder="Ex: Bloco A - Apt 101"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100"
            />
          </div>
        </div>

        {!isReadOnly && (
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors disabled:opacity-50"
            >
              {loading ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        )}
      </form>
    </BaseModal>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nome Completo
            </label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleInputChange}
              disabled={isReadOnly}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              E-mail
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              disabled={isReadOnly}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Telefone
            </label>
            <input
              type="tel"
              name="telefone"
              value={formData.telefone}
              onChange={handleInputChange}
              disabled={isReadOnly}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Condomínio
            </label>
            <select
              name="condominioId"
              value={formData.condominioId}
              onChange={handleInputChange}
              disabled={isReadOnly}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100"
            >
              <option value="">Selecione um condomínio</option>
              {condominios.map((condominio) => (
                <option key={condominio.id} value={condominio.id}>
                  {condominio.nome}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Unidade
            </label>
            <input
              type="text"
              name="unidade"
              value={formData.unidade}
              onChange={handleInputChange}
              disabled={isReadOnly}
              required
              placeholder="Ex: Bloco A - Apt 101"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100"
            />
          </div>
        </div>

        {!isReadOnly && (
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors disabled:opacity-50"
            >
              {loading ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        )}
      </form>
    </BaseModal>
  );
};

export default MoradorModal;