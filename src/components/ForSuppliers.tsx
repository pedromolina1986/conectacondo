import React from 'react';
import { Send, Calendar, Users, Truck, FileText, Target, MessageCircle, DollarSign, TrendingUp } from 'lucide-react';

const ForSuppliers = () => {
  const howItWorks = [
    {
      icon: Send,
      title: "Divulgue",
      description: "Envie arte, descrição, preço e datas para o administrador."
    },
    {
      icon: Calendar,
      title: "Postagem",
      description: "A Conecta Condo publica nos grupos no dia e horário combinados."
    },
    {
      icon: Users,
      title: "Moradores Pedem",
      description: "Os pedidos são organizados por seleção de opções, sem ruído no grupo."
    },
    {
      icon: Truck,
      title: "Entregue",
      description: "Faça a entrega conforme combinado — portaria, ponto de coleta ou diretamente aos moradores."
    },
    {
      icon: FileText,
      title: "Receba",
      description: "Controle de pedidos via planilha compartilhada."
    }
  ];

  const benefits = [
    {
      icon: Target,
      title: "Público segmentado com alto potencial de compra"
    },
    {
      icon: MessageCircle,
      title: "Divulgação direta em canal que as pessoas realmente usam"
    },
    {
      icon: DollarSign,
      title: "Custo reduzido comparado a outras formas de publicidade"
    },
    {
      icon: TrendingUp,
      title: "Acompanhamento com pesquisas e reuniões para melhorar resultados"
    }
  ];

  return (
    <section id="fornecedores" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Para Fornecedores</h2>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto">
            Conecte seu negócio a um público segmentado e fiel, sem custos com plataforma ou impulsionamento. 
            Você só paga para estar presente, as vendas são 100% suas!
          </p>
        </div>

        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">Como Funciona</h3>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {howItWorks.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-orange-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <step.icon className="h-8 w-8 text-orange-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h4>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">Por Que Participar?</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start space-x-4 p-6 bg-orange-50 rounded-xl">
                <div className="bg-orange-100 rounded-full p-3 flex items-center justify-center flex-shrink-0">
                  <benefit.icon className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-gray-900 font-medium text-lg">{benefit.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-orange-600 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Pronto para expandir seu negócio?</h3>
          <p className="mb-6 text-orange-100">
            Conecte-se a milhares de moradores em condomínios da sua região.
          </p>
          <a
            href="https://wa.me/5541999576868?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20o%20Conecta%20Condo"
            target="_blank"
            rel="noopener noreferrer"            
          >
            <button className="bg-white text-orange-600 px-8 py-3 rounded-full font-semibold hover:bg-orange-50 transition-colors duration-200">
              Ser Fornecedor
            </button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ForSuppliers;