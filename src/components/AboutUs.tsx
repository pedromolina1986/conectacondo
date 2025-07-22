import React from 'react';
import { Users, Target, Shield } from 'lucide-react';

const AboutUs = () => {
  return (
    <section id="quem-somos" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Quem Somos</h2>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Somos uma plataforma digital que conecta fornecedores de qualidade a moradores de condomínios 
            de forma prática, segura e organizada. Nossa missão é facilitar o dia a dia dos moradores, 
            gerar oportunidades para fornecedores locais e oferecer conveniência para síndicos e administradoras, 
            usando o WhatsApp como principal canal de interação.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-8 bg-gray-50 rounded-2xl hover:shadow-lg transition-shadow duration-300">
            <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-6 flex items-center justify-center">
              <Users className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Para Moradores</h3>
            <p className="text-gray-600">
              Facilitar o dia a dia com acesso a produtos e serviços de qualidade, 
              com a praticidade do WhatsApp e entrega no condomínio.
            </p>
          </div>

          <div className="text-center p-8 bg-gray-50 rounded-2xl hover:shadow-lg transition-shadow duration-300">
            <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-6 flex items-center justify-center">
              <Target className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Para Fornecedores</h3>
            <p className="text-gray-600">
              Gerar oportunidades de negócio conectando fornecedores locais 
              a um público segmentado e com alto potencial de compra.
            </p>
          </div>

          <div className="text-center p-8 bg-gray-50 rounded-2xl hover:shadow-lg transition-shadow duration-300">
            <div className="bg-orange-100 rounded-full p-4 w-16 h-16 mx-auto mb-6 flex items-center justify-center">
              <Shield className="h-8 w-8 text-orange-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Para Condomínios</h3>
            <p className="text-gray-600">
              Oferecer conveniência para síndicos e administradoras, 
              valorizando o empreendimento sem nenhum custo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;