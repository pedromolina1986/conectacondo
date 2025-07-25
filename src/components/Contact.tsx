import React from 'react';
import { MessageCircle, Phone, Mail } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contato" className="py-20 bg-gradient-to-br from-orange-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">Entre em Contato</h2>
        <p className="text-xl text-gray-700 mb-12">
          Quer cadastrar seu condomínio ou ser fornecedor? Fale direto com a gente pelo WhatsApp.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <MessageCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">WhatsApp</h3>
            <p className="text-gray-600">Atendimento rápido e direto</p>
          </div>

          <div className="text-center">
            <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Phone className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Telefone</h3>
            <p className="text-gray-600">Suporte personalizado</p>
          </div>

          <div className="text-center">
            <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Mail className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">E-mail</h3>
            <p className="text-gray-600">Informações detalhadas</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Fale no WhatsApp</h3>
          <p className="text-gray-700 mb-8">
            Clique no botão abaixo para iniciar uma conversa conosco no WhatsApp. 
            Nossa equipe está pronta para ajudar você!
          </p>
          
          <a
            href="https://wa.me/5541999576868?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20o%20Conecta%20Condo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-primary text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-secondary transition-all duration-200 transform hover:scale-105"
          >
            <MessageCircle className="h-6 w-6 mr-2" />
            Falar no WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;