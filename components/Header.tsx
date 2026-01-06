
import React, { useState, useEffect } from 'react';
import PopButton from './PopButton';
import Logo from './Logo';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { 
      name: 'Home', 
      href: '#/', 
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg> 
    },
    { 
      name: 'Who We Are', 
      href: '#whoweare', 
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg> 
    },
    { 
      name: 'Framework', 
      href: '#failure-analysis', 
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg> 
    },
    { 
      name: 'Services', 
      href: '#services', 
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg> 
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const sections = ['home', 'whoweare', 'failure-analysis', 'services'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    if (href.startsWith('#/')) {
      if (href === '#/') {
        e.preventDefault();
        window.location.hash = '#/';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }
    
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      e.preventDefault();
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    } else {
      window.location.hash = href;
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ease-in-out ${
        isScrolled 
          ? 'py-3 bg-[#001e4d]/80 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.3)]' 
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#/" onClick={(e) => handleNavClick(e, '#/')} className="relative z-10 transition-transform hover:scale-105 active:scale-95">
          <Logo isScrolled={isScrolled} className="scale-90" />
        </a>

        {/* Desktop Nav - Scaled to Small */}
        <nav className="hidden lg:flex items-center gap-3">
          {navItems.map((item, idx) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className={`px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.25em] flex items-center gap-3 transition-all relative overflow-hidden animate-nav-item-arrival ${
                activeSection === item.href.replace('#', '') || (activeSection === 'home' && item.href === '#/')
                  ? 'bg-white text-[#003c95] shadow-xl'
                  : isScrolled ? 'text-white/70 hover:text-white hover:bg-white/10' : 'text-slate-900 hover:bg-slate-900/5'
              }`}
              style={{ animationDelay: `${idx * 150}ms` }}
            >
              <span className={`transition-all duration-1000 animate-nav-icon-loop ${activeSection === item.href.replace('#', '') ? 'text-[#003c95]' : ''}`}>
                {item.icon}
              </span>
              <span className="relative z-10">{item.name}</span>
            </a>
          ))}
          <div className="ml-4 flex items-center gap-4 animate-nav-item-arrival" style={{ animationDelay: '600ms' }}>
             <PopButton
              onClick={() => window.location.hash = '#/booking'}
              className={`px-7 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl ${
                isScrolled 
                  ? 'bg-white text-[#001e4d] hover:bg-slate-100' 
                  : 'bg-[#003c95] text-white hover:bg-[#00265e]'
              }`}
            >
              Get Strategy
            </PopButton>
          </div>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className={`lg:hidden relative z-10 p-2 rounded-xl transition-colors ${isScrolled ? 'text-white' : 'text-slate-900'}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className="w-6 h-5 relative flex flex-col justify-between overflow-hidden">
            <span className={`w-full h-0.5 bg-current transition-all duration-500 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-full h-0.5 bg-current transition-all duration-500 ${isMenuOpen ? 'translate-x-full opacity-0' : ''}`}></span>
            <span className={`w-full h-0.5 bg-current transition-all duration-500 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </div>
        </button>

        {/* Mobile Menu */}
        <div className={`fixed inset-0 bg-[#001e4d]/95 backdrop-blur-3xl lg:hidden transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          <div className="flex flex-col items-center justify-center h-full gap-8 px-8">
            {navItems.map((item, i) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="flex items-center gap-6 text-3xl font-black text-white tracking-tighter uppercase hover:text-blue-400 transition-colors"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="text-blue-400 scale-[1.5]">{item.icon}</div>
                {item.name}
              </a>
            ))}
            <PopButton
              onClick={() => { window.location.hash = '#/booking'; setIsMenuOpen(false); }}
              className="mt-10 px-12 py-6 bg-white text-[#001e4d] rounded-2xl text-xl font-black uppercase tracking-widest w-full shadow-2xl"
            >
              Book Strategy
            </PopButton>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes nav-item-arrival {
          0% { transform: translateY(40px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .animate-nav-item-arrival {
          animation: nav-item-arrival 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
        @keyframes nav-icon-loop {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .animate-nav-icon-loop {
          animation: nav-icon-loop 5s ease-in-out infinite;
        }
      `}</style>
    </header>
  );
};

export default Header;
