import React from 'react';
import { MessageCircle, Lock, Users, Calendar, CheckCircle, DollarSign, HeadphonesIcon } from 'lucide-react';

const ForCondominiums = () => {
  const howItWorks = [
    {
      icon: MessageCircle,
      title: "Grupo de WhatsApp Exclusivo",
      description: "Um grupo é criado para cada condomínio, administrado pela Conecta Condo."
    },
    {
      icon: Lock,
      title: "Grupo Fechado",
      description: "Só administradores podem postar, evitando spam e mantendo a organização."
    },
    {
      icon: Users,
      title: "Fornecedores Selecionados",
      description: "Fornecedores são selecionados com critérios de qualidade e confiança."
    },
    {
      icon: Calendar,
      title: "Cronograma Organizado",
      description: "Postagens organizadas e planejadas previamente para melhor experiência."
    }
  ];

  const benefits = [
    {
      icon: CheckCircle,
      title: "Conveniência e promoções exclusivas para moradores"
    },
    {
      icon: DollarSign,
      title: "Nenhum custo para o condomínio"
    },
    {
      icon: HeadphonesIcon,
      title: "Acompanhamento e suporte da Conecta Condo"
    }
  ];

  return (
    <section id="condominios" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Para Condomínios</h2>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto">
            Mais comodidade para os moradores, valorização do empreendimento e apoio ao comércio local — 
            sem nenhum custo para o condomínio.
          </p>
        </div>

        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">Como Funciona</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {howItWorks.map((item, index) => (
              <div key={index} className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-lg">
                <div className="bg-blue-100 rounded-full p-3 flex items-center justify-center flex-shrink-0">
                  <item.icon className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h4>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">Benefícios</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-xl shadow-lg">
                <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <benefit.icon className="h-8 w-8 text-green-600" />
                </div>
                <p className="text-gray-900 font-medium text-lg">{benefit.title}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-blue-600 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Interessado em cadastrar seu condomínio?</h3>
          <p className="mb-6 text-blue-100">
            Entre em contato conosco e descubra como o Conecta Condo pode beneficiar seus moradores.
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors duration-200">
            Cadastrar Condomínio
          </button>
        </div>
      </div>
    </section>
  );
};

export default ForCondominiums;