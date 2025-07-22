import React from 'react';
import { Users, Building, Truck, FileText, Megaphone, Home } from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange }) => {
  const menuItems = [
    { id: 'overview', label: 'Visão Geral', icon: Home },
    { id: 'moradores', label: 'Moradores', icon: Users },
    { id: 'condominios', label: 'Condomínios', icon: Building },
    { id: 'fornecedores', label: 'Fornecedores', icon: Truck },
    { id: 'contratos', label: 'Contratos', icon: FileText },
    { id: 'publicacoes', label: 'Publicações', icon: Megaphone }
  ];

  return (
    <div className="bg-secondary text-white w-64 min-h-screen p-4">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-primary">Conecta Condo</h2>
        <p className="text-gray-400 text-sm">Painel Administrativo</p>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSectionChange(item.id)}
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
  );
};

export default Sidebar;