import React, { useState, useEffect } from 'react';
import BaseModal from './BaseModal';
import { Fornecedor, CreateFornecedorRequest, fornecedoresService } from '../../services/fornecedoresService';

interface FornecedorModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'view' | 'edit' | 'create';
  fornecedor?: Fornecedor;
  onSave?: () => void;
}

const FornecedorModal: React.FC<FornecedorModalProps> = ({
  isOpen,
  onClose,
  mode,
  fornecedor,
  onSave
}) => {
  const [formData, setFormData] = useState<CreateFornecedorRequest>({
    nome: '',
    endereco: '',
    cidade: '',
    estado: '',
    cep: '',
    cnpjCpf: '',
    nomeContato: '',
    contato: '',
    email: '',
    senha: '',
    tipo: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (fornecedor && (mode === 'edit' || mode === 'view')) {
        setFormData({
          nome: fornecedor.nome,
          endereco: fornecedor.endereco,
          cidade: fornecedor.cidade,
          estado: fornecedor.estado,
          cep: fornecedor.cep,
          cnpjCpf: fornecedor.cnpjCpf,
          nomeContato: fornecedor.nomeContato,
          contato: fornecedor.contato,
          email: fornecedor.email,
          senha: '', // Não mostrar senha existente
          tipo: fornecedor.tipo
        });
      } else {
        setFormData({
          nome: '',
          endereco: '',
          cidade: '',
          estado: '',
          cep: '',
          cnpjCpf: '',
          nomeContato: '',
          contato: '',
          email: '',
          senha: '',
          tipo: ''
        });
      }
    }
  }, [isOpen, fornecedor, mode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (mode === 'create') {
        await fornecedoresService.create(formData);
      } else if (mode === 'edit' && fornecedor) {
        // Não enviar senha vazia na edição
        const updateData = { ...formData };
        if (!updateData.senha) {
          delete updateData.senha;
        }
        await fornecedoresService.update(fornecedor.id, updateData);
      }
      onSave?.();
      onClose();
    } catch (error: any) {
      setError(error.response?.data?.message || 'Erro ao salvar fornecedor');
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
      case 'view': return 'Visualizar Fornecedor';
      case 'edit': return 'Editar Fornecedor';
      case 'create': return 'Novo Fornecedor';
      default: return 'Fornecedor';
    }
  };

  const isReadOnly = mode === 'view';

  const tiposNegocio = [
    { value: 'alimentacao', label: 'Alimentação' },
    { value: 'limpeza', label: 'Limpeza' },
    { value: 'beleza', label: 'Beleza e Estética' },
    { value: 'manutencao', label: 'Manutenção' },
    { value: 'delivery', label: 'Delivery' },
    { value: 'outros', label: 'Outros' }
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
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nome da Empresa
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
              CNPJ/CPF
            </label>
            <input
              type="text"
              name="cnpjCpf"
              value={formData.cnpjCpf}
              onChange={handleInputChange}
              disabled={isReadOnly}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Negócio
            </label>
            <select
              name="tipo"
              value={formData.tipo}
              onChange={handleInputChange}
              disabled={isReadOnly}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100"
            >
              <option value="">Selecione o tipo</option>
              {tiposNegocio.map((tipo) => (
                <option key={tipo.value} value={tipo.value}>
                  {tipo.label}
                </option>
              ))}
            </select>
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
              maxLength={2}
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
              Nome do Contato
            </label>
            <input
              type="text"
              name="nomeContato"
              value={formData.nomeContato}
              onChange={handleInputChange}
              disabled={isReadOnly}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Telefone/WhatsApp
            </label>
            <input
              type="tel"
              name="contato"
              value={formData.contato}
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

          {!isReadOnly && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {mode === 'edit' ? 'Nova Senha (deixe vazio para manter)' : 'Senha'}
              </label>
              <input
                type="password"
                name="senha"
                value={formData.senha}
                onChange={handleInputChange}
                required={mode === 'create'}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          )}
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

export default FornecedorModal;