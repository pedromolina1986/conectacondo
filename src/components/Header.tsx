import React, { useState } from 'react';
import { Menu, X, MessageCircle } from 'lucide-react';
import logo from '../images/ConectaCondo - Logo-01.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <img src={logo} alt="Logo" className="h-20 w-30" />
          </div>

          <nav className="hidden md:flex space-x-8">
            <button
              onClick={() => scrollToSection('quem-somos')}
              className="text-gray-700 hover:text-primary transition-colors duration-200"
            >
              Quem Somos
            </button>
            <button
              onClick={() => scrollToSection('como-funciona')}
              className="text-gray-700 hover:text-primary transition-colors duration-200"
            >
              Como Funciona
            </button>
            <button
              onClick={() => scrollToSection('moradores')}
              className="text-gray-700 hover:text-primary transition-colors duration-200"
            >
              Para Moradores
            </button>
            <button
              onClick={() => scrollToSection('condominios')}
              className="text-gray-700 hover:text-primary transition-colors duration-200"
            >
              Para Condomínios
            </button>
            <button
              onClick={() => scrollToSection('fornecedores')}
              className="text-gray-700 hover:text-primary transition-colors duration-200"
            >
              Para Fornecedores
            </button>
          </nav>          

          <div className="hidden md:flex items-center space-x-4 ml-4">
            <button
              onClick={() => window.location.href = '/login'}
              className="text-gray-700 hover:text-primary transition-colors duration-200 px-4 py-2 rounded-lg border border-gray-300 hover:border-primary"
            >
              Login
            </button>
            {/*<button
              onClick={() => window.location.href = '/register'}
              className="bg-primary text-white px-6 py-2 rounded-full hover:bg-secondary transition-colors duration-200"
            >
              Registrar
            </button>*/}
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-2">
              <button
                onClick={() => scrollToSection('quem-somos')}
                className="text-left text-primary hover:text-secondary py-2"
              >
                Quem Somos
              </button>
              <button
                onClick={() => scrollToSection('como-funciona')}
                className="text-left text-primary hover:text-secondary py-2"
              >
                Como Funciona
              </button>
              <button
                onClick={() => scrollToSection('moradores')}
                className="text-left text-primary hover:text-secondary py-2"
              >
                Para Moradores
              </button>
              <button
                onClick={() => scrollToSection('condominios')}
                className="text-left text-primary hover:text-secondary py-2"
              >
                Para Condomínios
              </button>
              <button
                onClick={() => scrollToSection('fornecedores')}
                className="text-left text-primary hover:text-secondary py-2"
              >
                Para Fornecedores
              </button>
              <button
                onClick={() => scrollToSection('contato')}
                className="text-left bg-primary text-white px-4 py-2 rounded-full hover:bg-secondary mt-2"
              >
                Entre em Contato
              </button>
              <div className="flex flex-col space-y-2 mt-4 pt-4 border-t">
                <button
                  onClick={() => window.location.href = '/login'}
                  className="text-left text-gray-700 hover:text-primary py-2 px-4 border border-gray-300 rounded-lg"
                >
                  Login
                </button>
                <button
                  onClick={() => window.location.href = '/register'}
                  className="text-left bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700"
                >
                  Registrar
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;