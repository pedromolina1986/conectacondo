import React, { useState } from 'react';
import {
  Menu,
  X,
  Users,
  Building,
  Truck,
  FileText,
  Megaphone,
  Home,
} from 'lucide-react';
import Sidebar from './Sidebar';
import Overview from './Overview';
import Moradores from './Moradores';
import Condominios from './Condominios';
import Fornecedores from './Fornecedores';
import Contratos from './Contratos';
import Publicacoes from './Publicacoes';
import logo from '../../images/ConectaCondo - Logo-02.png';

const DashboardHome = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const userRole = localStorage.getItem('user_role');

  const generealMenuItems = [
    { id: 'overview', label: 'Visão Geral', icon: Home, role: ['ADMIN'] },
    { id: 'moradores', label: 'Moradores', icon: Users, role: ['ADMIN'] },
    { id: 'condominios', label: 'Condomínios', icon: Building, role: ['ADMIN'] },
    { id: 'fornecedores', label: 'Fornecedores', icon: Truck, role: ['ADMIN'] },
    { id: 'contratos', label: 'Contratos', icon: FileText, role: ['ADMIN'] },
    { id: 'publicacoes', label: 'Publicações', icon: Megaphone, role: ['ADMIN', 'FORNECEDOR'] },
  ];

  const menuItems = generealMenuItems.filter(item =>
    item.role.includes(userRole || '')
  );

  const renderContent = () => {
    if (localStorage.getItem("user_role") === "FORNECEDOR") {
      return <Publicacoes />;
    }
    
    switch (activeSection) {
      case 'overview':
        return <Overview />;
      case 'moradores':
        return <Moradores />;
      case 'condominios':
        return <Condominios />;
      case 'fornecedores':
        return <Fornecedores />;
      case 'contratos':
        return <Contratos />;
      case 'publicacoes':
        return <Publicacoes />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Top bar for mobile */}
      <div className="flex items-center justify-between p-4 bg-secondary text-white md:hidden">
        <button onClick={() => setMobileMenuOpen(true)}>
          <Menu className="h-6 w-6" />
        </button>
        <img src={logo} alt="Logo" className="h-10" />
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <>
          <div className="fixed inset-0 z-50 bg-secondary text-white w-64 p-4">
            <div className="flex justify-between items-center mb-4">
              <img src={logo} alt="Logo" className="h-10" />
              <button onClick={() => setMobileMenuOpen(false)}>
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                    activeSection === item.id
                      ? 'bg-primary text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
          <div
            className="fixed inset-0 bg-black opacity-40 z-40"
            onClick={() => setMobileMenuOpen(false)}
          />
        </>
      )}

      {/* Sidebar + Main Content */}
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />

      <main className="flex-1 p-4">
        {renderContent()}
      </main>
    </div>
  );
};

export default DashboardHome;
