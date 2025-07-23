import React, { useState, useEffect } from 'react';
import BaseModal from './BaseModal';
import { Contrato, CreateContratoRequest, contratosService } from '../../services/contratosService';
import { fornecedoresService, Fornecedor } from '../../services/fornecedoresService';
import { condominiosService, Condominio } from '../../services/condominiosService';

interface ContratoModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'view' | 'edit' | 'create';
  contrato?: Contrato;
  onSave?: () => void;
}

const ContratoModal: React.FC<ContratoModalProps> = ({
  isOpen,
  onClose,
  mode,
  contrato,
  onSave
}) => {
  const [formData, setFormData] = useState<CreateContratoRequest>({
    numeroContrato: '',
    fornecedorId: 0,
    condominioId: 0,
    dataInicio: '',
    dataFim: '',
    status: 'Ativo',
    valor: 0
  });
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
  const [condominios, setCondominios] = useState<Condominio[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      loadFornecedores();
      loadCondominios();
      
      if (contrato && (mode === 'edit' || mode === 'view')) {
        setFormData({
          numeroContrato: contrato.numeroContrato,
          fornecedorId: contrato.fornecedorId,
          condominioId: contrato.condominioId,
          dataInicio: contrato.dataInicio.split('T')[0], // Format for input date
          dataFim: contrato.dataFim.split('T')[0],
          status: contrato.status,
          valor: contrato.valor
        });
      } else {
        // Generate contract number for new contracts
        const contractNumber = `CT${Date.now()}`;
        setFormData({
          numeroContrato: contractNumber,
          fornecedorId: 0,
          condominioId: 0,
          dataInicio: '',
          dataFim: '',
          status: 'Ativo',
          valor: 0
        });
      }
    }
  }, [isOpen, contrato, mode]);

  const loadFornecedores = async () => {
    try {
      const response = await fornecedoresService.getAll(1, 100);
      setFornecedores(response.data || []);
    } catch (error) {
      console.error('Erro ao carregar fornecedores:', error);
    }
  };

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
        await contratosService.create(formData);
      } else if (mode === 'edit' && contrato) {
        await contratosService.update(contrato.id, formData);
      }
      onSave?.();
      onClose();
    } catch (error: any) {
      setError(error.response?.data?.message || 'Erro ao salvar contrato');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'number' ? parseFloat(value) || 0 : value
    });
  };

  const getTitle = () => {
    switch (mode) {
      case 'view': return 'Visualizar Contrato';
      case 'edit': return 'Editar Contrato';
      case 'create': return 'Novo Contrato';
      default: return 'Contrato';
    }
  };

  const isReadOnly = mode === 'view';

  const statusOptions = [
    { value: 'Ativo', label: 'Ativo' },
    { value: 'Pendente', label: 'Pendente' },
    { value: 'Expirado', label: 'Expirado' },
    { value: 'Cancelado', label: 'Cancelado' }
  ];

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title={getTitle()} size="xl">
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              disabled={isReadOnly}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100"
            >
              {statusOptions.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fornecedor
            </label>
            <select
              name="fornecedorId"
              value={formData.fornecedorId}
              onChange={handleInputChange}
              disabled={isReadOnly}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100"
            >
              <option value={0}>Selecione um fornecedor</option>
              {fornecedores.map((fornecedor) => (
                <option key={fornecedor.id} value={fornecedor.id}>
                  {fornecedor.nome}
                </option>
              ))}
            </select>
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
              <option value={0}>Selecione um condomínio</option>
              {condominios.map((condominio) => (
                <option key={condominio.id} value={condominio.id}>
                  {condominio.nome}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Data de Início
            </label>
            <input
              type="date"
              name="dataInicio"
              value={formData.dataInicio}
              onChange={handleInputChange}
              disabled={isReadOnly}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Data de Fim
            </label>
            <input
              type="date"
              name="dataFim"
              value={formData.dataFim}
              onChange={handleInputChange}
              disabled={isReadOnly}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Valor do Contrato (R$)
            </label>
            <input
              type="number"
              name="valor"
              value={formData.valor}
              onChange={handleInputChange}
              disabled={isReadOnly}
              required
              step="0.01"
              min="0"
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

export default ContratoModal;