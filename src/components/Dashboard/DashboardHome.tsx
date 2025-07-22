import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Overview from './Overview';
import Moradores from './Moradores';
import Condominios from './Condominios';
import Fornecedores from './Fornecedores';
import Contratos from './Contratos';
import Publicacoes from './Publicacoes';

const DashboardHome = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const renderContent = () => {
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
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <div className="flex-1">
        {renderContent()}
      </div>
    </div>
  );
};

export default DashboardHome;