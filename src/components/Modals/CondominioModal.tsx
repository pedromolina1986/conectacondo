import React, { useState, useEffect } from 'react';
import BaseModal from './BaseModal';
import { Condominio, CreateCondominioRequest, condominiosService } from '../../services/condominiosService';

interface CondominioModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'view' | 'edit' | 'create';
  condominio?: Condominio;
  onSave?: () => void;
}

const CondominioModal: React.FC<CondominioModalProps> = ({
  isOpen,
  onClose,
  mode,
  condominio,
  onSave
}) => {
  const [formData, setFormData] = useState<CreateCondominioRequest>({
    nome: '',
    endereco: '',
    cidade: '',
    estado: '',
    cep: '',
    grupoWhatsApp: '',
    portariaRemota: false,
    mercadoAutonomo: false,
    valorMedio: 0,
    unidades: 0
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (condominio && (mode === 'edit' || mode === 'view')) {
        setFormData({
          nome: condominio.nome,
          endereco: condominio.endereco,
          cidade: condominio.cidade,
          estado: condominio.estado,
          cep: condominio.cep,
          grupoWhatsApp: condominio.grupoWhatsApp,
          portariaRemota: condominio.portariaRemota,
          mercadoAutonomo: condominio.mercadoAutonomo,
          valorMedio: condominio.valorMedio,
          unidades: condominio.unidades
        });
      } else {
        setFormData({
          nome: '',
          endereco: '',
          cidade: '',
          estado: '',
          cep: '',
          grupoWhatsApp: '',
          portariaRemota: false,
          mercadoAutonomo: false,
          valorMedio: 0,
          unidades: 0
        });
      }
    }
  }, [isOpen, condominio, mode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (mode === 'create') {
        await condominiosService.create(formData);
      } else if (mode === 'edit' && condominio) {
        await condominiosService.update(condominio.id, formData);
      }
      onSave?.();
      onClose();
    } catch (error: any) {
      setError(error.response?.data?.message || 'Erro ao salvar condomínio');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : 
              type === 'number' ? parseFloat(value) || 0 : value
    });
  };

  const getTitle = () => {
    switch (mode) {
      case 'view': return 'Visualizar Condomínio';
      case 'edit': return 'Editar Condomínio';
      case 'create': return 'Novo Condomínio';
      default: return 'Condomínio';
    }
  };

  const isReadOnly = mode === 'view';

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title={getTitle()} size="xl">
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nome do Condomínio
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

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Endereço
            </label>
            <input
              type="text"
              name="endereco"
              value={formData.endereco}
              onChange={handleInputChange}
              disabled={isReadOnly}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cidade
            </label>
            <input
              type="text"
              name="cidade"
              value={formData.cidade}
              onChange={handleInputChange}
              disabled={isReadOnly}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Estado
            </label>
            <input
              type="text"
              name="estado"
              value={formData.estado}
              onChange={handleInputChange}
              disabled={isReadOnly}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CEP
            </label>
            <input
              type="text"
              name="cep"
              value={formData.cep}
              onChange={handleInputChange}
              disabled={isReadOnly}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Número de Unidades
            </label>
            <input
              type="number"
              name="unidades"
              value={formData.unidades}
              onChange={handleInputChange}
              disabled={isReadOnly}
              required
              min="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Valor Médio (R$)
            </label>
            <input
              type="number"
              name="valorMedio"
              value={formData.valorMedio}
              onChange={handleInputChange}
              disabled={isReadOnly}
              step="0.01"
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Grupo WhatsApp
            </label>
            <input
              type="text"
              name="grupoWhatsApp"
              value={formData.grupoWhatsApp}
              onChange={handleInputChange}
              disabled={isReadOnly}              
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100"
            />
          </div>

          <div className="md:col-span-2">
            <div className="flex space-x-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="portariaRemota"
                  checked={formData.portariaRemota}
                  onChange={handleInputChange}
                  disabled={isReadOnly}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Portaria Remota</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="mercadoAutonomo"
                  checked={formData.mercadoAutonomo}
                  onChange={handleInputChange}
                  disabled={isReadOnly}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Mercado Autônomo</span>
              </label>
            </div>
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

export default CondominioModal;