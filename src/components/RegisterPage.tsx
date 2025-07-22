import React, { useState } from 'react';
import { MessageCircle, Eye, EyeOff, ArrowLeft, User, Building, Truck } from 'lucide-react';
import { authService } from '../services/authService';

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userType, setUserType] = useState('morador');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    // Campos específicos para cada tipo
    apartment: '', // Para moradores
    condominiumName: '', // Para condomínios e moradores
    businessName: '', // Para fornecedores
    businessType: '' // Para fornecedores
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('As senhas não coincidem');
      return;
    }
    
    // Integração com API real
    const registerData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      userType: userType as 'morador' | 'condominio' | 'fornecedor',
      condominiumName: formData.condominiumName,
      apartment: formData.apartment,
      businessName: formData.businessName,
      businessType: formData.businessType
    };

    authService.register(registerData)
    .then(() => {
      alert('Cadastro realizado com sucesso! Faça login para continuar.');
      window.location.href = '/login';
    })
    .catch((error) => {
      alert(error.response?.data?.message || 'Erro ao realizar cadastro. Tente novamente.');
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const userTypes = [
    { value: 'morador', label: 'Morador', icon: User, color: 'green' },
    { value: 'condominio', label: 'Condomínio', icon: Building, color: 'blue' },
    { value: 'fornecedor', label: 'Fornecedor', icon: Truck, color: 'orange' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-primary py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center text-primary hover:text-secondary mb-6"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Voltar
          </button>
          
          <div className="flex items-center justify-center mb-6">
            <MessageCircle className="h-12 w-12 text-primary" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Conecta Condo
          </h2>
          <p className="text-gray-600">
            Crie sua conta e faça parte da nossa comunidade
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Seleção do tipo de usuário */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Tipo de Conta
              </label>
              <div className="grid grid-cols-3 gap-4">
                {userTypes.map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => setUserType(type.value)}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                      userType === type.value
                        ? `border-${type.color}-500 bg-${type.color}-50`
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <type.icon className={`h-8 w-8 mx-auto mb-2 ${
                      userType === type.value ? `text-${type.color}-600` : 'text-gray-400'
                    }`} />
                    <span className={`text-sm font-medium ${
                      userType === type.value ? `text-${type.color}-700` : 'text-gray-600'
                    }`}>
                      {type.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Campos básicos */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Nome Completo
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                  placeholder="Seu nome completo"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  WhatsApp
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                  placeholder="(11) 99999-9999"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                E-mail
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                placeholder="seu@email.com"
              />
            </div>

            {/* Campos específicos por tipo */}
            {userType === 'morador' && (
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="condominiumName" className="block text-sm font-medium text-gray-700 mb-2">
                    Nome do Condomínio
                  </label>
                  <input
                    id="condominiumName"
                    name="condominiumName"
                    type="text"
                    required
                    value={formData.condominiumName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    placeholder="Nome do seu condomínio"
                  />
                </div>
                <div>
                  <label htmlFor="apartment" className="block text-sm font-medium text-gray-700 mb-2">
                    Apartamento
                  </label>
                  <input
                    id="apartment"
                    name="apartment"
                    type="text"
                    required
                    value={formData.apartment}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    placeholder="Ex: Bloco A - Apt 101"
                  />
                </div>
              </div>
            )}

            {userType === 'condominio' && (
              <div>
                <label htmlFor="condominiumName" className="block text-sm font-medium text-gray-700 mb-2">
                  Nome do Condomínio
                </label>
                <input
                  id="condominiumName"
                  name="condominiumName"
                  type="text"
                  required
                  value={formData.condominiumName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                  placeholder="Nome do condomínio"
                />
              </div>
            )}

            {userType === 'fornecedor' && (
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-2">
                    Nome da Empresa
                  </label>
                  <input
                    id="businessName"
                    name="businessName"
                    type="text"
                    required
                    value={formData.businessName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    placeholder="Nome da sua empresa"
                  />
                </div>
                <div>
                  <label htmlFor="businessType" className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Negócio
                  </label>
                  <select
                    id="businessType"
                    name="businessType"
                    required
                    value={formData.businessType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                  >
                    <option value="">Selecione</option>
                    <option value="alimentacao">Alimentação</option>
                    <option value="limpeza">Limpeza</option>
                    <option value="beleza">Beleza e Estética</option>
                    <option value="manutencao">Manutenção</option>
                    <option value="delivery">Delivery</option>
                    <option value="outros">Outros</option>
                  </select>
                </div>
              </div>
            )}

            {/* Senhas */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Senha
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors pr-12"
                    placeholder="Sua senha"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirmar Senha
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors pr-12"
                    placeholder="Confirme sua senha"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                Concordo com os{' '}
                <a href="#" className="text-primary hover:text-secondary">
                  Termos de Uso
                </a>{' '}
                e{' '}
                <a href="#" className="text-primary hover:text-secondary">
                  Política de Privacidade
                </a>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white py-3 px-4 rounded-lg font-semibold hover:bg-secondary transition-colors duration-200 transform hover:scale-105"
            >
              Criar Conta
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Já tem uma conta?{' '}
              <button
                onClick={() => window.location.href = '/login'}
                className="text-primary hover:text-secondary font-semibold"
              >
                Faça login aqui
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;