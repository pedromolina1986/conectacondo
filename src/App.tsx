import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import HowItWorks from './components/HowItWorks';
import ForResidents from './components/ForResidents';
import ForCondominiums from './components/ForCondominiums';
import ForSuppliers from './components/ForSuppliers';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import DashboardHome from './components/Dashboard/DashboardHome';

const HomePage = () => (
  <>
    <Header />
    <main>
      <Hero />
      <AboutUs />
      <HowItWorks />
      <ForResidents />
      <ForCondominiums />
      <ForSuppliers />
      <Contact />
    </main>
    <Footer />
  </>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardHome />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;