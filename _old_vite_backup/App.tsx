import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import StatsSection from './components/StatsSection';
import FeaturesSection from './components/FeaturesSection';
import ToolsSection from './components/ToolsSection';
import ServicesSection from './components/ServicesSection';
import ProductSection from './components/ProductSection';
import PricingSection from './components/PricingSection';
import LibrarySection from './components/LibrarySection';
import NewsSection from './components/NewsSection';
import TestimonialSection from './components/TestimonialSection';
import ToolsCTA from './components/ToolsCTA';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import AssessmentModal from './components/AssessmentModal';
import ContactModal from './components/ContactModal';
import LoginModal from './components/LoginModal';
import SearchModal from './components/SearchModal';
import LeadCaptureModal from './components/LeadCaptureModal';
import SEO from './components/SEO'; // Import SEO component
import { HelmetProvider } from 'react-helmet-async'; // Import HelmetProvider

interface User {
  name: string;
  email: string;
}

import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard';
import NewsDetail from './components/NewsDetail';
import EDTCorePage from './pages/EDTCorePage';
import { api } from './services/api';
import { useEffect } from 'react';

function Tracker() {
  const location = useLocation();
  useEffect(() => {
    api.trackView(location.pathname).catch(console.error);
  }, [location]);
  return null;
}

// ... imports
import './index.css'; // Add CSS import

function AppContent() {
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLeadCaptureOpen, setIsLeadCaptureOpen] = useState(false);
  const [leadCaptureMode, setLeadCaptureMode] = useState<'download' | 'consultation'>('download');
  const [leadCaptureContext, setLeadCaptureContext] = useState('');

  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState<User | null>(null);

  const [selectedService, setSelectedService] = useState('');

  // ... (existing code)

  // State to trigger chat from other components
  const [chatTrigger, setChatTrigger] = useState<{ message: string; timestamp: number } | null>(null);

  // Scroll Animation Observer
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []); // Run once on mount

  const handleOpenContact = (service: string = '') => {
    setSelectedService(service);
    setIsContactOpen(true);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setIsSearchOpen(true);
  };

  const handleLoginSuccess = (userData: User) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleAskAI = (question: string) => {
    setChatTrigger({ message: question, timestamp: Date.now() });
  };

  const handleOpenLeadCapture = (mode: 'download' | 'consultation', context: string = '') => {
    setLeadCaptureMode(mode);
    setLeadCaptureContext(context);
    setIsLeadCaptureOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <SEO /> {/* Default SEO for Home Page */}
      <Navbar
        onLogin={() => setIsLoginOpen(true)}
        onLogout={handleLogout}
        onContact={() => handleOpenContact('General Inquiry')}
        onSearch={handleSearch}
        user={user}
      />

      <main className="flex-grow">
        <div className="reveal-on-scroll"><HeroSection onStartAssessment={() => setIsAssessmentOpen(true)} /></div>
        <div className="reveal-on-scroll"><ToolsSection
          onStartAssessment={() => setIsAssessmentOpen(true)}
          onAskAI={handleAskAI}
          onDownloadToolkit={() => handleOpenLeadCapture('download', 'Bộ công cụ Chuyển đổi số BIM')}
        /></div>
        <div className="reveal-on-scroll"><ServicesSection onConsultation={(service) => handleOpenLeadCapture('consultation', service)} /></div>
        <div className="reveal-on-scroll"><StatsSection /></div>
        <div className="reveal-on-scroll"><ProductSection onContact={() => handleOpenContact('CIC-PM')} /></div>
        <div className="reveal-on-scroll"><PricingSection onContact={handleOpenContact} /></div>
        <div className="reveal-on-scroll"><LibrarySection onContact={() => handleOpenContact('Library')} /></div>
        <div className="reveal-on-scroll"><FeaturesSection /></div>
        <div className="reveal-on-scroll"><TestimonialSection /></div>
        <div className="reveal-on-scroll"><ToolsCTA /></div>
        <div className="reveal-on-scroll"><NewsSection /></div>
      </main>

      <Footer />
      <ChatWidget externalTrigger={chatTrigger} />

      {/* Modals */}
      <AssessmentModal
        isOpen={isAssessmentOpen}
        onClose={() => setIsAssessmentOpen(false)}
        onComplete={() => {
          setIsAssessmentOpen(false);
          handleOpenContact('Assessment Result');
        }}
      />
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        defaultService={selectedService}
      />
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        initialQuery={searchQuery}
      />
      <LeadCaptureModal
        isOpen={isLeadCaptureOpen}
        onClose={() => setIsLeadCaptureOpen(false)}
        resourceName={leadCaptureMode === 'download' ? leadCaptureContext : 'Tư vấn Dịch vụ'}
        mode={leadCaptureMode}
        defaultContext={leadCaptureContext}
      />
    </div>
  );
}

import ErrorBoundary from './components/ErrorBoundary';
import { ToastProvider } from './components/Toast';

function App() {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <ToastProvider>
          <Router>
            <Tracker />
            <Routes>
              <Route path="/" element={<AppContent />} />
              <Route path="/edt-core" element={<EDTCorePage />} />
              <Route path="/news/:id" element={<NewsDetail />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </Router>
        </ToastProvider>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

export default App;