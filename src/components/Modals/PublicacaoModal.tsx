import React, { useState, useEffect } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
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
    status: 0
  });
  const [contratos, setContratos] = useState<Contrato[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      loadContratos();
      
      if (publicacao && (mode === 'edit' || mode === 'view')) {
        
        const loadImageAsFile = async () => {
          if (publicacao.imagem) {
            
            const imageUrl = `https://api.oconectacondo.com.br/uploads/${publicacao.imagem}`;
            try {
              const response = await fetch(imageUrl);
              const blob = await response.blob();

              // Create File object (you can use original name or a custom one)
              const file = new File([blob], publicacao.imagem, { type: blob.type });

              // Set form data with File instead of just the name
              setFormData({
                contratoId: publicacao.contratoId,
                fornecedorId: publicacao.fornecedorId,
                condominioId: publicacao.condominioId,
                dataPostagem: publicacao.dataPostagem,
                horaPostagem: publicacao.horaPostagem,
                descricaoPostagem: publicacao.descricaoPostagem,
                imagem: file, // 👈 File object here
                preco: publicacao.preco,
                dataLimitePedido: publicacao.dataLimitePedido,
                horaLimitePedido: publicacao.horaLimitePedido,
                dataEntrega: publicacao.dataEntrega.split('T')[0],
                horaEntrega: publicacao.horaEntrega,
                linkPagamento: publicacao.linkPagamento,
                status: publicacao.status
              });

              // Set preview URL
              setPreviewUrl(imageUrl);
            } catch (error) {
              console.error("Failed to fetch image from URL", error);
            }
          }
        };

        loadImageAsFile();
      } else {
        // Set default values for new publication
        const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
        const currentTime = new Date().toTimeString().slice(0, 5);
        
        setFormData({
          contratoId: 0,
          fornecedorId: 0,
          condominioId: 0,
          dataPostagem: tomorrow,
          horaPostagem: currentTime,
          descricaoPostagem: '',
          imagem: '',
          preco: 0,
          dataLimitePedido: tomorrow,
          horaLimitePedido: currentTime,
          dataEntrega: tomorrow,
          horaEntrega: currentTime,
          linkPagamento: '',
          status: 0
        });
      }
      setSelectedFile(null);
      setPreviewUrl("");
    }
  }, [isOpen, publicacao, mode]);

  const loadContratos = async () => {
    try {
      const response = await contratosService.getAllAbertos();         
      setContratos(response || []);
    } catch (error) {
      console.error('Erro ao carregar contratos:', error);
    }
  };

  const handleContratoChange = (contratoId: number) => {
    const contrato = contratos.find(c => c.id === contratoId);
    if (contrato) {
      setFormData({
        ...formData,
        contratoId: contratoId,
        fornecedorId: contrato.fornecedorId,
        condominioId: contrato.condominioId
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setFormData({
        ...formData,
        imagem: file
      });
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedFile(null);
    setPreviewUrl('');
    setFormData({
      ...formData,
      imagem: ''
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // TODO: Implementar upload da imagem para o servidor
      // if (selectedFile) {
      //   const uploadFormData = new FormData();
      //   uploadFormData.append('image', selectedFile);
      //   const uploadResponse = await api.post('/upload', uploadFormData);
      //   formData.imagem = uploadResponse.data.filename;
      // }      
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
  
  const getStatusOptions = () => {
    return(
      <select
        name="status"
        value={formData.status}
        onChange={handleInputChange}
        disabled={isReadOnly || localStorage.getItem('user_role') === 'FORNECEDOR'}
        required
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100"
      >
          <option className='bg-red-100 text-red-800' value={0}>Aguardando Aprovacao</option>
          <option className='bg-yellow-100 text-yellow-800' value={1}>Aprovado</option>
          <option className='bg-gray-100 text-gray-800' value={2}>Reprovado</option>
          <option className='bg-green-100 text-green-800' value={3}>Enviado</option>          
        </select>        
    );    
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0]; // format: "YYYY-MM-DD"
  };

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
              min={getTomorrowDate()}
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
              className="w-full px-3 py-2 border border-gray-300 rounded-g focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100"
              min={getTomorrowDate()}
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
              min={getTomorrowDate()}
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
            {getStatusOptions()}
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

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Imagem
            </label>
            
            {!isReadOnly && (
              <div className="mb-4">
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-4 text-gray-500" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Clique para fazer upload</span> ou arraste e solte
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG ou JPEG (MAX. 5MB)</p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
              </div>
            )}

            {/* Preview da imagem */}
            {previewUrl && (
              <div className="relative mb-4">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg border"
                />
                {!isReadOnly && (
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}

            {/* Campo de texto para nome do arquivo (backup) */}
            <div className="flex items-center space-x-2">
              <ImageIcon className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="imagem"
                value={formData.imagem.name}
                onChange={handleInputChange}
                disabled={isReadOnly}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100"
                placeholder="Nome do arquivo da imagem"
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Link de Pagamento
            </label>
            <input
              type="text"
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