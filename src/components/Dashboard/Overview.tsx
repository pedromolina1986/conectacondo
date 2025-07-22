import React from 'react';
import { Users, Building, Truck, FileText, TrendingUp, MessageCircle } from 'lucide-react';

const Overview = () => {
  const stats = [
    { label: 'Moradores Ativos', value: '1,234', icon: Users, color: 'bg-blue-500' },
    { label: 'Condomínios', value: '45', icon: Building, color: 'bg-green-500' },
    { label: 'Fornecedores', value: '89', icon: Truck, color: 'bg-orange-500' },
    { label: 'Contratos Ativos', value: '156', icon: FileText, color: 'bg-purple-500' }
  ];

  const recentActivity = [
    { action: 'Novo morador cadastrado', time: '2 min atrás', type: 'user' },
    { action: 'Publicação enviada - Padaria do João', time: '15 min atrás', type: 'post' },
    { action: 'Contrato renovado - Condomínio Vista Verde', time: '1 hora atrás', type: 'contract' },
    { action: 'Novo fornecedor aprovado', time: '2 horas atrás', type: 'supplier' }
  ];

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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Atividade Recente</h3>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="bg-green-100 p-2 rounded-full">
                  <MessageCircle className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-900 font-medium">{activity.action}</p>
                  <p className="text-gray-500 text-sm">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Chart Placeholder */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Crescimento Mensal</h3>
          <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
            <div className="text-center">
              <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Gráfico de crescimento</p>
              <p className="text-sm text-gray-400">Em desenvolvimento</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;