import React, { useState, useEffect } from 'react';
import BaseModal from './BaseModal';
import { Publicacao, CreatePublicacaoRequest, publicacoesService } from '../../services/publicacoesService';
import { contratosService, Contrato } from '../../services/contratosService';

interface PublicacaoModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'view' | 'edit' | 'create';
  publicacao?: Publicacao;
  onSave?: () => void;
}

const PublicacaoModal: React.FC<PublicacaoModalProps> = ({
  isOpen,
  onClose,
  mode,
  publicacao,
  onSave
}) => {
  const [formData, setFormData] = useState<CreatePublicacaoRequest>({
    contratoId: 0,
    fornecedorId: 0,
    condominioId: 0,
    dataPostagem: '',
    horaPostagem: '',
    descricaoPostagem: '',
    imagem: '',
    preco: 0,
    dataLimitePedido: '',
    horaLimitePedido: '',
    dataEntrega: '',
    horaEntrega: '',
    linkPagamento: '',
    status: 1
  });
  const [contratos, setContratos] = useState<Contrato[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      loadContratos();
      
      if (publicacao && (mode === 'edit' || mode === 'view')) {
        setFormData({
          contratoId: publicacao.contratoId,
          fornecedorId: publicacao.fornecedorId,
          condominioId: publicacao.condominioId,
          dataPostagem: publicacao.dataPostagem,
          horaPostagem: publicacao.horaPostagem,
          descricaoPostagem: publicacao.descricaoPostagem,
          imagem: publicacao.imagem,
          preco: publicacao.preco,
          dataLimitePedido: publicacao.dataLimitePedido,
          horaLimitePedido: publicacao.horaLimitePedido,
          dataEntrega: publicacao.dataEntrega.split('T')[0], // Format for input date
          horaEntrega: publicacao.horaEntrega,
          linkPagamento: publicacao.linkPagamento,
          status: publicacao.status
        });
      } else {
        // Set default values for new publication
        const today = new Date().toISOString().split('T')[0];
        const currentTime = new Date().toTimeString().slice(0, 5);
        
        setFormData({
          contratoId: 0,
          fornecedorId: 0,
          condominioId: 0,
          dataPostagem: today,
          horaPostagem: currentTime,
          descricaoPostagem: '',
          imagem: '',
          preco: 0,
          dataLimitePedido: today,
          horaLimitePedido: currentTime,
          dataEntrega: today,
          horaEntrega: currentTime,
          linkPagamento: '',
          status: 1
        });
      }
    }
  }, [isOpen, publicacao, mode]);

  const loadContratos = async () => {
    try {
      const response = await contratosService.getAll(1, 100);
      setContratos(response.data || []);
    } catch (error) {
      console.error('Erro ao carregar contratos:', error);
    }
  };

  const handleContratoChange = (contratoId: number) => {
    const contrato = contratos.find(c => c.id === contratoId.toString());
    if (contrato) {
      setFormData({
        ...formData,
        contratoId: contratoId,
        fornecedorId: contrato.fornecedorId,
        condominioId: contrato.condominioId
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (mode === 'create') {
        await publicacoesService.create(formData);
      } else if (mode === 'edit' && publicacao) {
        await publicacoesService.update(publicacao.id, formData);
      }
      onSave?.();
      onClose();
    } catch (error: any) {
      setError(error.response?.data?.message || 'Erro ao salvar publicação');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (name === 'contratoId') {
      handleContratoChange(parseInt(value));
    } else {
      setFormData({
        ...formData,
        [name]: type === 'number' ? parseFloat(value) || 0 : value
      });
    }
  };

  const getTitle = () => {
    switch (mode) {
      case 'view': return 'Visualizar Publicação';
      case 'edit': return 'Editar Publicação';
      case 'create': return 'Nova Publicação';
      default: return 'Publicação';
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
              Contrato
            </label>
            <select
              name="contratoId"
              value={formData.contratoId}
              onChange={handleInputChange}
              disabled={isReadOnly}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100"
            >
              <option value={0}>Selecione um contrato</option>
              {contratos.map((contrato) => (
                <option key={contrato.id} value={contrato.id}>
                  {contrato.numeroContrato} - {contrato.fornecedor?.nome} / {contrato.condominio?.nome}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Data da Postagem
            </label>
            <input
              type="date"
              name="dataPostagem"
              value={formData.dataPostagem}
              onChange={handleInputChange}
              disabled={isReadOnly}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hora da Postagem
            </label>
            <input
              type="time"
              name="horaPostagem"
              value={formData.horaPostagem}
              onChange={handleInputChange}
              disabled={isReadOnly}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Data Limite do Pedido
            </label>
            <input
              type="date"
              name="dataLimitePedido"
              value={formData.dataLimitePedido}
              onChange={handleInputChange}
              disabled={isReadOnly}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hora Limite do Pedido
            </label>
            <input
              type="time"
              name="horaLimitePedido"
              value={formData.horaLimitePedido}
              onChange={handleInputChange}
              disabled={isReadOnly}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Data da Entrega
            </label>
            <input
              type="date"
              name="dataEntrega"
              value={formData.dataEntrega}
              onChange={handleInputChange}
              disabled={isReadOnly}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hora da Entrega
            </label>
            <input
              type="time"
              name="horaEntrega"
              value={formData.horaEntrega}
              onChange={handleInputChange}
              disabled={isReadOnly}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preço (R$)
            </label>
            <input
              type="number"
              name="preco"
              value={formData.preco}
              onChange={handleInputChange}
              disabled={isReadOnly}
              required
              step="0.01"
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100"
            />
          </div>

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
              <option value={1}>Ativo</option>
              <option value={0}>Inativo</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descrição da Publicação
            </label>
            <textarea
              name="descricaoPostagem"
              value={formData.descricaoPostagem}
              onChange={handleInputChange}
              disabled={isReadOnly}
              required
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100"
              placeholder="Descreva os produtos/serviços oferecidos..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Imagem (nome do arquivo)
            </label>
            <input
              type="text"
              name="imagem"
              value={formData.imagem}
              onChange={handleInputChange}
              disabled={isReadOnly}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100"
              placeholder="exemplo.jpg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Link de Pagamento
            </label>
            <input
              type="url"
              name="linkPagamento"
              value={formData.linkPagamento}
              onChange={handleInputChange}
              disabled={isReadOnly}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100"
              placeholder="https://..."
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

export default PublicacaoModal;