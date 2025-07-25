import React from 'react';
import {
  Users,
  Building,
  Truck,
  FileText,
  Megaphone,
  Home,
} from 'lucide-react';
import logo from '../../images/ConectaCondo - Logo-02.png';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange }) => {
  const generealMenuItems = [
    { id: 'overview', label: 'Visão Geral', icon: Home, role: ['ADMIN'] },
    { id: 'moradores', label: 'Moradores', icon: Users, role: ['ADMIN'] },
    { id: 'condominios', label: 'Condomínios', icon: Building, role: ['ADMIN'] },
    { id: 'fornecedores', label: 'Fornecedores', icon: Truck, role: ['ADMIN'] },
    { id: 'contratos', label: 'Contratos', icon: FileText, role: ['ADMIN'] },
    { id: 'publicacoes', label: 'Publicações', icon: Megaphone, role: ['ADMIN', 'FORNECEDOR'] },
  ];

  const menuItems = generealMenuItems.filter(item => {
    const userRole = localStorage.getItem('user_role');
    return item.role.includes(userRole || '');
  });

  return (
    <div className="hidden md:flex flex-col w-64 min-h-screen bg-secondary text-white p-4">
      <div className="mb-8">
        <img src={logo} alt="Logo" className="h-20 w-auto" />
        <hr className="my-4 border-white-600" />
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
