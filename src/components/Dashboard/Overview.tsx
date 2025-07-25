import React, { useState, useEffect } from 'react';
import {
  Users,
  Building,
  Truck,
  FileText,
  TrendingUp,
  MessageCircle
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { Dashboard, dashboardService } from '../../services/dashboardService';

const Overview = () => {
  const [dashboard, setDashboard] = useState<Dashboard[]>([]);
  const [loading, setLoading] = useState(true);
  const [crescimentoMensal, setCrescimentoMensal] = useState([]);
  const [recentActivity, setRecentactivity] = useState([]);

  const [stats, setStats] = useState([
    { label: 'Moradores Ativos', value: '—', icon: Users, color: 'bg-blue-500' },
    { label: 'Condomínios', value: '—', icon: Building, color: 'bg-green-500' },
    { label: 'Fornecedores', value: '—', icon: Truck, color: 'bg-orange-500' },
    { label: 'Contratos Ativos', value: '—', icon: FileText, color: 'bg-purple-500' }
  ]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      const response = await dashboardService.getAll();
      setDashboard(response.data || []);

      setStats([
        { label: 'Moradores Ativos', value: response.moradoresTotal?.toString() || '0', icon: Users, color: 'bg-blue-500' },
        { label: 'Condomínios', value: response.condominiosTotal?.toString() || '0', icon: Building, color: 'bg-green-500' },
        { label: 'Fornecedores', value: response.fornecedoresTotal?.toString() || '0', icon: Truck, color: 'bg-orange-500' },
        { label: 'Contratos Ativos', value: response.contratosAtivos?.toString() || '0', icon: FileText, color: 'bg-purple-500' }
      ]);

      let recent = [];

      if (response.proximosEnvios) {
        recent = response.proximosEnvios.map((item: any) => ({
          action: `Próximo envio de ${item.fornecedor?.nome} para ${item.condominio?.nome}`,
          time: new Date(item.dataPostagem + "T" + item.horaPostagem + ":00").toLocaleString()
        }));
      }

      if (response.ultimosEnvios) {
        recent = [
          ...recent,
          ...response.ultimosEnvios.map((item: any) => ({
            action: `Enviado ${item.fornecedor?.nome} para ${item.condominio?.nome}`,
            time: new Date(item.dataPostagem + "T" + item.horaPostagem + ":00").toLocaleString()
          }))
        ];
      }

      setRecentactivity(recent);

      if (response.crescimentoMensal) {
        const chartData = response.crescimentoMensal.map((item: any) => ({
          dia: `${item.dia}/${item.mes}`,
          TotalEnvios: item.totalEnvios,
          TotalPedidos: item.totalPedidos,
          TotalValorAnuncios: item.totalValorAnuncios
        }));
        setCrescimentoMensal(chartData.reverse());
      }

    } catch (error) {
      console.error('Erro ao carregar dados do dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const ChartCard = ({ title, dataKey, color, formatter }: { title: string; dataKey: string; color: string; formatter?: (value: number) => string }) => (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={crescimentoMensal} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="dia" />
            <YAxis tickFormatter={formatter} />
            <Tooltip formatter={formatter} />
            <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2} name={title} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Visão Geral</h1>
        <p className="text-gray-600">Acompanhe as principais métricas da plataforma</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-full`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Gráfico de Total de Envios */}        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <ChartCard title="Total de Envios" dataKey="TotalEnvios" color="#3b82f6" />
        <ChartCard title="Total de Pedidos" dataKey="TotalPedidos" color="#10b981" />
        <ChartCard
          title="Total Valor de Anúncios (R$)"
          dataKey="TotalValorAnuncios"
          color="#f59e0b"
          formatter={(value) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Atividade Recente</h3>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="bg-orange-100 p-2 rounded-full">
                  <MessageCircle className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-900 font-medium">{activity.action}</p>
                  <p className="text-gray-500 text-sm">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>        
      </div>            
    </div>
  );
};

export default Overview;
