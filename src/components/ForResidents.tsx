import React from 'react';
import { MessageCircle, Eye, ShoppingCart, Package } from 'lucide-react';

const ForResidents = () => {
  const steps = [
    {
      icon: MessageCircle,
      title: "Entre no Grupo do WhatsApp",
      description: "Clique no link para acessar as ofertas exclusivas.",
      bgColor: "bg-green-100",
      iconColor: "text-green-600"
    },
    {
      icon: Eye,
      title: "Veja as Postagens",
      description: "Cada fornecedor publica promoções, prazos e condições.",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    {
      icon: ShoppingCart,
      title: "Faça Seu Pedido",
      description: "Responda ao post para confirmar. No primeiro pedido, cadastre suas informações básicas de entrega. Pague antecipado via PIX ou na entrega.",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600"
    },
    {
      icon: Package,
      title: "Receba no Condomínio",
      description: "Aguarde sua entrega no dia combinado. Você será avisado pela portaria ou interfone.",
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600"
    }
  ];

  return (
    <section id="moradores" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Para Moradores</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            O Conecta Condo conecta você a fornecedores de confiança, com ofertas exclusivas para seu condomínio.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className={`${step.bgColor} rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center`}>
                <step.icon className={`h-8 w-8 ${step.iconColor}`} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-orange-50 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Pronto para começar?</h3>
          <p className="text-gray-700 mb-6">
            Entre no grupo do seu condomínio e descubra as ofertas exclusivas disponíveis.
          </p>
          <a
            href="https://wa.me/5541999576868?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20o%20Conecta%20Condo"
            target="_blank"
            rel="noopener noreferrer"            
          >
            <button className="bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-secondary transition-colors duration-200">
              Quero Participar
            </button>
          </a>
          
        </div>
      </div>
    </section>
  );
};

export default ForResidents;