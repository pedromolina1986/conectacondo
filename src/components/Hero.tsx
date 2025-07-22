import React from 'react';
import { MessageCircle, ShoppingBag, Home } from 'lucide-react';

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-gradient-to-br from-orange-100 to-blue-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            <span className="text-primary">Conecta Condo:</span>
            <br />
            Peça pelo WhatsApp,
            <br />
            Receba na sua porta!
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
            O jeito mais prático e seguro de receber produtos/serviços de qualidade no seu condomínio.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={() => scrollToSection('moradores')}
              className="bg-primary text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-orange-700 transition-all duration-200 transform hover:scale-105"
            >
              Sou Morador
            </button>
            <button
              onClick={() => scrollToSection('condominios')}
              className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition-all duration-200 transform hover:scale-105"
            >
              Sou Condomínio
            </button>
            <button
              onClick={() => scrollToSection('fornecedores')}
              className="bg-secondary text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-secondary transition-all duration-200 transform hover:scale-105"
            >
              Sou Fornecedor
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <MessageCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">WhatsApp</h3>
              <p className="text-gray-600">Canal principal de comunicação</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <ShoppingBag className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Qualidade</h3>
              <p className="text-gray-600">Fornecedores selecionados</p>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Home className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Conveniência</h3>
              <p className="text-gray-600">Entrega no condomínio</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;