import React, { useState, useEffect } from 'react';
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Calendar,
  Send,
  FileText,
  DollarSignIcon
} from 'lucide-react';
import {
  publicacoesService,
  Publicacao
} from '../../services/publicacoesService';
import RelatorioPedidos from './RelatorioPedidos';
import PublicacaoModal from '../Modals/PublicacaoModal';

const Publicacoes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [publicacoes, setPublicacoes] = useState<Publicacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'view' | 'edit' | 'create'>('view');
  const [selectedPublicacao, setSelectedPublicacao] = useState<Publicacao | undefined>();
  const [relatorioId, setRelatorioId] = useState<number | null>(null);

  useEffect(() => {
    loadPublicacoes();
  }, []);

  const loadPublicacoes = async () => {
    try {
      setLoading(true);
      const response = await publicacoesService.getAll(1, 100, searchTerm);
      setPublicacoes(response.data.dados || []);
    } catch (error) {
      console.error('Erro ao carregar publicações:', error);
      setError('Erro ao carregar dados. Usando dados de demonstração.');
    } finally {
      setLoading(false);
    }
  };

  const filteredPublicacoes = publicacoes.filter((publicacao) =>
    publicacao.contrato.numeroContrato.toLowerCase().includes(searchTerm.toLowerCase()) ||
    publicacao.fornecedor.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    publicacao.condominio.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    publicacao.dataPostagem.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleView = (publicacao: Publicacao) => {
    setSelectedPublicacao(publicacao);
    setModalMode('view');
    setModalOpen(true);
  };

  const handleEdit = (publicacao: Publicacao) => {
    setSelectedPublicacao(publicacao);
    setModalMode('edit');
    setModalOpen(true);
  };

  const handleCreate = () => {
    setSelectedPublicacao(undefined);
    setModalMode('create');
    setModalOpen(true);
  };

  const handleDelete = async (publicacao: Publicacao) => {
    if (window.confirm('Tem certeza que deseja excluir esta publicação?')) {
      try {
        await publicacoesService.delete(publicacao.id);
        loadPublicacoes();
      } catch (error) {
        console.error('Erro ao excluir publicação:', error);
        alert('Erro ao excluir publicação');
      }
    }
  };

  const handleModalSave = () => {
    loadPublicacoes();
  };

  const handleVisualizarAnuncio = (publicacao: Publicacao) => {
    const descricaoFormatada = publicacao.descricaoPostagem || "";

    const htmlContent = `
      <html>
        <head>
          <title>Anúncio - ${publicacao.contrato.numeroContrato}</title>
          <style>
            body {
              margin: 0;
              padding: 0;
              background-color: #e5ddd5;
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              display: flex;
              justify-content: center;
              align-items: flex-start;
              min-height: 100vh;
            }
            .phone {
              background-color: #fff;
              width: 360px;
              height: auto;
              border-radius: 10px;
              box-shadow: 0 0 10px rgba(0,0,0,0.3);
              margin: 2rem 0;
              overflow: hidden;
            }
            .header {
              background-color: #075e54;
              color: white;
              padding: 10px 15px;
              font-weight: bold;
            }
            .chat {
              background-color: #e5ddd5;
              padding: 10px;
            }
            .bubble {
              background-color: #dcf8c6;
              border-radius: 8px;
              padding: 10px 15px;
              margin: 10px 0;
              max-width: 80%;
       
              font-size: 14px;
              line-height: 1.5;
            }        
            .bubble img {
              max-width: 100%;
              border-radius: 6px;
              margin-top: 10px;
            }
            .bubble span {
              word-wrap: break-word;
              white-space: pre-wrap;
            }              
            .meta {
              font-size: 11px;
              text-align: right;
              margin-top: 5px;
              color: #999;
            }
          </style>
        </head>
        <body>
          <div class="phone">            
            <div class="chat">              
              <div class="bubble">              
                ${publicacao.imagem ? `<img src="https://api.oconectacondo.com.br/uploads/${publicacao.imagem}" alt="Imagem" />` : ''}
                <br>
                <br>
                Fornecedor: ${publicacao.fornecedor.nome.trimStart()}
                <br>
                Preço: R$${publicacao.preco}
                <br>
                <br>
                <span class="description">           
                ${descricaoFormatada
                  .split('\n')
                  .map(linha => linha.trimStart())
                  .join('\n')
                  .replace(/</g, '&lt;')
                  .replace(/>/g, '&gt;')}
                </span>
                ${publicacao.linkPagamento ? `<br>Foram de pagamento: ${publicacao.linkPagamento}` : ''}                
                ${publicacao.fornecedor.tipo == "produto" ? 
                  `
                    <br><br>Data/Hora limite para pedido: ${new Date(publicacao.dataLimitePedido + "T" + publicacao.horaLimitePedido).toLocaleDateString()}
                    <br>Data/Hora de entrega: ${new Date(publicacao.dataEntrega + "T" + publicacao.horaEntrega).toLocaleDateString()}
                    <br>IMPORTANTE: Fiquem atentos a data/hora de entrega. É responsabilidade do morador receber o produto e respeitar os horários.
                  `
                  :
                  ''
                }
                <div class="meta">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
              </div>
            </div>
          </div>
        </body>
      </html>
      `;


    const newWindow = window.open();
    if (newWindow) {
      newWindow.document.write(htmlContent);
      newWindow.document.close();
    } else {
      alert('Popup bloqueado! Permita popups para visualizar o anúncio.');
    }
  };

  const handleEnviar = async (id: number) => {
    try {
      await publicacoesService.enviar(id);
      alert('Mensagem enviada com sucesso');
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
    }
  };

  const handleAbrirRelatorio = (envioId: number) => {
    setRelatorioId(envioId);
  };

  const getStatusBadge = (status: number) => {
    let statusText = '';
    let className = 'inline-flex px-2 py-1 text-xs font-semibold rounded-full ';

    switch (status) {
      case 0:
        statusText = 'Aguardando Aprovação';
        className += 'bg-red-100 text-red-800';
        break;
      case 1:
        statusText = 'Aprovado';
        className += 'bg-yellow-100 text-yellow-800';
        break;
      case 2:
        statusText = 'Reprovado';
        className += 'bg-gray-100 text-gray-800';
        break;
      case 3:
        statusText = 'Enviado';
        className += 'bg-green-100 text-green-800';
        break;
      default:
        statusText = 'Desconhecido';
        break;
    }

    return <span className={className}>{statusText}</span>;
  };

  // Se estiver no modo relatório, renderiza só o relatório com botão de voltar
  if (relatorioId !== null) {
    return (
      <div className="p-6">
        <button
          onClick={() => setRelatorioId(null)}
          className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          &lt; Voltar às Publicações
        </button>
        <RelatorioPedidos envioId={relatorioId} />
      </div>
    );
  }

  // Senão renderiza lista normal das publicações
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Publicações</h1>
        <p className="text-gray-600">Gerencie as publicações dos fornecedores nos grupos</p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Buscar publicações..."
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
          <span>Nova Publicação</span>
        </button>
      </div>

      <div className="space-y-4">
        {filteredPublicacoes.map((publicacao) => (
          <div key={publicacao.id} className="bg-white rounded-lg shadow-lg p-6 flex flex-col lg:flex-row">
            <div className="w-full lg:w-48 h-48 mb-4 lg:mb-0 lg:mr-6 flex-shrink-0">
              <img
                src={`https://api.oconectacondo.com.br/uploads/${publicacao.imagem}`}
                alt={publicacao.imagem || 'Imagem da publicação'}
                className="w-full h-full object-cover rounded-md"
              />
            </div>

            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-4 mb-4">
                  <h3 className="text-lg font-bold text-gray-900">{publicacao.contrato.numeroContrato}</h3>
                  {getStatusBadge(publicacao.status)}
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
                      {new Date(publicacao.dataPostagem + 'T00:00:00').toLocaleDateString()} {publicacao.horaPostagem} - {new Date(publicacao.dataLimitePedido + 'T00:00:00').toLocaleDateString()} {publicacao.horaLimitePedido}
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
                      Anunciar em {new Date(publicacao.dataPostagem + 'T00:00:00').toLocaleDateString()} {publicacao.horaEntrega}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      Entrega em {new Date(publicacao.dataEntrega + 'T00:00:00').toLocaleDateString()} {publicacao.horaEntrega}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-2 mt-4 lg:mt-6">
                <button onClick={() => handleVisualizarAnuncio(publicacao)} className="text-blue-600 hover:text-blue-900 p-2" title="Visualizar Anúncio">
                  <Eye className="h-4 w-4" />
                </button>
                {(publicacao.status === 0 && localStorage.getItem('user_role') !== 'ADMIN') ||
                  localStorage.getItem('user_role') === 'ADMIN' ? (
                  <>
                    <button onClick={() => handleEdit(publicacao)} className="text-green-600 hover:text-green-900 p-2" title="Editar Publicação">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button onClick={() => handleDelete(publicacao)} className="text-red-600 hover:text-red-900 p-2" title="Excluir Publicação">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </>
                ) : null}
                {localStorage.getItem('user_role') === 'ADMIN' ? (
                  <button onClick={() => handleEnviar(parseInt(publicacao.id))} className="text-orange-600 hover:text-orange-900 p-2" title="Enviar Mensagem">
                    <Send className="h-4 w-4" />
                  </button>
                ) : null}
                <button
                  onClick={() => handleAbrirRelatorio(parseInt(publicacao.id))}
                  className="text-purple-600 hover:text-purple-900 p-2"
                  title="Ver Relatório de Pedidos"
                >
                  <FileText className="h-4 w-4" />
                </button>
              </div>
              {/* Performance Bar*/}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Taxa de Conversão</span>
                  <span className="text-sm text-gray-600">
                    {((publicacao.contadorPedidos / publicacao.condominio.unidades) * 100).toFixed(1)}% ({publicacao.contadorPedidos} / {publicacao.condominio.unidades})
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: `${(publicacao.contadorPedidos / publicacao.condominio.unidades) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
        {filteredPublicacoes.length === 0 && !loading && (
          <p className="text-center text-gray-500">Nenhuma publicação encontrada.</p>
        )}
        {loading && <p className="text-center text-gray-400">Carregando publicações...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
      </div>

      <PublicacaoModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        mode={modalMode}
        publicacao={selectedPublicacao}
        onSave={handleModalSave}
      />
    </div>
  );
};

export default Publicacoes;
