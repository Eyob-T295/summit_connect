
import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import MissionStatement from './components/MissionStatement';
import OperationalFramework from './components/OperationalFramework';
import IdentityCapability from './components/IdentityCapability';
import TeamShowcase from './components/TeamShowcase';
import Services from './components/Services';
import PartnershipValue from './components/PartnershipValue';
import Booking from './components/Booking';
import Footer from './components/Footer';
import InternalDashboard from './components/InternalDashboard';

const App: React.FC = () => {
  const getNormalizedPath = () => {
    const hash = window.location.hash;
    if (!hash || hash === '#' || !hash.startsWith('#/')) return '#/';
    return hash;
  };

  const [currentPath, setCurrentPath] = useState(getNormalizedPath());

  useEffect(() => {
    const handleHashChange = () => {
      const newPath = getNormalizedPath();
      setCurrentPath(newPath);

      // Scroll to section if hash is an anchor on the main page
      const hash = window.location.hash;
      if (hash.startsWith('#') && !hash.startsWith('#/')) {
        const targetId = hash.replace('#', '');
        // Small timeout to allow the main page components to potentially mount if coming from sub-page
        setTimeout(() => {
          const element = document.getElementById(targetId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else if (newPath === '#/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    const scrollElements = document.querySelectorAll('.scroll-reveal, .stagger-reveal');
    scrollElements.forEach(el => observer.observe(el));

    window.addEventListener('hashchange', handleHashChange);
    
    // Check initial hash on mount
    handleHashChange();

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      observer.disconnect();
    };
  }, []);

  const renderContent = () => {
    if (currentPath === '#/booking') {
      return (
        <div className="pt-24 min-h-[80vh] animate-reveal">
          <div className="max-w-7xl mx-auto px-6 py-12">
             <button 
              onClick={() => window.location.hash = '#/'}
              className="flex items-center gap-2 text-slate-500 hover:text-[#003c95] font-bold transition-colors mb-8 group"
            >
              <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
              </svg>
              Return Home
            </button>
            <Booking />
          </div>
        </div>
      );
    }

    if (currentPath === '#/internal') {
      return <InternalDashboard />;
    }

    // Default: Main Landing Page
    return (
      <main className="bg-white">
        <Hero />
        <IdentityCapability />
        <TeamShowcase />
        <MissionStatement />
        <OperationalFramework />
        <Services />
        <PartnershipValue />
        
        <section id="contact" className="py-24 bg-[#003c95] text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="max-w-7xl mx-auto px-6 text-center relative z-10 scroll-reveal">
            <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter">Let's Fix Your Pipeline.</h2>
            <p className="text-xl md:text-2xl font-medium text-white/70 mb-12 max-w-2xl mx-auto">
              Deployment takes 10 days. The results last for the life of your business.
            </p>
            <button 
              onClick={() => window.location.hash = '#/booking'}
              className="bg-white text-[#003c95] font-black px-12 py-6 rounded-2xl hover:scale-105 transition-all shadow-[0_20px_60px_rgba(0,0,0,0.2)] uppercase tracking-widest text-lg"
            >
              Get Your Strategy
            </button>
          </div>
        </section>
      </main>
    );
  };

  return (
    <div className={`min-h-screen ${currentPath === '#/internal' ? 'bg-[#001e4d]' : 'bg-white'}`}>
      {currentPath !== '#/internal' && <Header />}
      {renderContent()}
      {currentPath !== '#/internal' && <Footer />}
    </div>
  );
};

export default App;
