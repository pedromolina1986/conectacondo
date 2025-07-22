import React from 'react';
import { MessageCircle, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <MessageCircle className="h-8 w-8 text-green-600" />
              <span className="text-2xl font-bold">Conecta Condo</span>
            </div>
            <p className="text-gray-300 mb-4">
              Conectando fornecedores de qualidade a moradores de condomínios através do WhatsApp.
            </p>
            <div className="flex items-center text-sm text-gray-400">
              <span>Feito com</span>
              <Heart className="h-4 w-4 mx-1 text-red-500" />
              <span>para facilitar seu dia a dia</span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <button
                  onClick={() => {
                    const element = document.getElementById('quem-somos');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-green-400 transition-colors"
                >
                  Quem Somos
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const element = document.getElementById('moradores');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-green-400 transition-colors"
                >
                  Para Moradores
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const element = document.getElementById('condominios');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-green-400 transition-colors"
                >
                  Para Condomínios
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const element = document.getElementById('fornecedores');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-green-400 transition-colors"
                >
                  Para Fornecedores
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <p className="text-gray-300 mb-4">
              Entre em contato conosco pelo WhatsApp para mais informações sobre o Conecta Condo.
            </p>
            <a
              href="https://wa.me/5511999999999?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20o%20Conecta%20Condo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-colors duration-200"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              WhatsApp
            </a>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Conecta Condo. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;