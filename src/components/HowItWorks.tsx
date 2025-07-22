import React from 'react';
import { Link, MessageCircle, Truck } from 'lucide-react';

const HowItWorks = () => {
  return (
    <section id="como-funciona" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Como Funciona</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Conectamos moradores, fornecedores and condomínios usando o WhatsApp como ferramenta principal.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-green-600 rounded-full p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <Link className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">1. Conexão</h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              Fornecedores locais de qualidade conectados a grupos exclusivos de moradores.
            </p>
          </div>

          <div className="text-center">
            <div className="bg-blue-600 rounded-full p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <MessageCircle className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">2. Comunicação</h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              Ofertas publicadas semanalmente em grupos organizados. Sem spam, sem bagunça.
            </p>
          </div>

          <div className="text-center">
            <div className="bg-orange-600 rounded-full p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <Truck className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">3. Entrega</h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              Moradores fazem pedidos com 1 toque e recebem tudo na porta do condomínio.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;