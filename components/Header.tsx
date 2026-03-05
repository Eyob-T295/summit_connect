
import { useState, useEffect } from 'react';
import PopButton from './PopButton';
import Logo from './Logo';

interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
}

interface HeaderProps {
  onApplyClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onApplyClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems: NavItem[] = [
    { 
      name: 'Home', 
      href: '#/',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
        </svg>
      )
    },
    { 
      name: 'Who We Are', 
      href: '#whoweare',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    },
    { 
      name: 'Framework', 
      href: '#failure-analysis',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      )
    },
    { 
      name: 'Services', 
      href: '#guarantees',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    { 
      name: 'Careers', 
      href: '#careers',
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        onApplyClick();
      },
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      )
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      const sections = ['home', 'whoweare', 'failure-analysis', 'guarantees'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent, item: NavItem) => {
    if (item.onClick) {
      item.onClick(e);
      setIsMenuOpen(false);
      return;
    }

    const href = item.href;
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
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isScrolled 
          ? 'bg-[#0B1F3A]/95 backdrop-blur-xl border-b border-white/5 shadow-2xl py-3' 
          : 'bg-[#0B1F3A] py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <a 
          href="#/" 
          onClick={(e) => handleNavClick(e, { name: 'Home', href: '#/', icon: null })} 
          className="transition-all duration-500 hover:scale-105 active:scale-95 z-[110]"
        >
          <Logo className="scale-75 md:scale-90 origin-left" />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-10">
          {navItems.map((item, idx) => {
            const targetId = item.href.startsWith('#') && !item.href.startsWith('#/') ? item.href.replace('#', '') : null;
            const isActive = activeSection === targetId || (activeSection === 'home' && item.href === '#/');
            
            return (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item)}
                className={`flex items-center gap-2.5 text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 relative py-2 group ${
                  isActive ? 'text-white' : 'text-white/50 hover:text-white'
                }`}
                style={{ transitionDelay: `${idx * 50}ms` }}
              >
                <span className={`transition-transform duration-500 ${isActive ? 'scale-110 text-blue-500' : 'group-hover:text-blue-400 group-hover:scale-110'}`}>
                  {item.icon}
                </span>
                {item.name}
                <span className={`absolute bottom-0 left-0 h-[2.5px] bg-blue-500 transition-all duration-500 ease-out ${
                  isActive ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'
                }`}></span>
              </a>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <PopButton
            onClick={() => window.location.hash = '#/booking'}
            className="px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all bg-[#003c95] text-white hover:bg-blue-600 hover:shadow-[0_0_40px_rgba(0,60,149,0.4)] border border-white/10"
          >
            Get Your Strategy call <span className="ml-2 text-xs opacity-70"></span>
          </PopButton>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden relative z-[110] p-2 text-white group"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className="w-6 h-5 flex flex-col justify-between items-end">
            <span className={`h-[2.5px] bg-current transition-all duration-500 rounded-full ${isMenuOpen ? 'w-6 -rotate-45 translate-y-[9px]' : 'w-6'}`}></span>
            <span className={`h-[2.5px] bg-current transition-all duration-500 rounded-full ${isMenuOpen ? 'opacity-0 translate-x-4' : 'w-4'}`}></span>
            <span className={`h-[2.5px] bg-current transition-all duration-500 rounded-full ${isMenuOpen ? 'w-6 rotate-45 -translate-y-[9px]' : 'w-5 group-hover:w-6'}`}></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`lg:hidden fixed inset-0 bg-[#0B1F3A]/98 backdrop-blur-2xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] z-[100] ${
          isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full px-8 gap-10">
          {navItems.map((item, i) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => handleNavClick(e, item)}
              className={`flex items-center gap-4 text-3xl font-black text-white uppercase tracking-tighter transition-all duration-500 transform ${
                isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <span className="text-blue-500 scale-125">{item.icon}</span>
              {item.name}
            </a>
          ))}
          
          <div className={`w-full max-w-xs transition-all duration-700 delay-500 ${isMenuOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
            <PopButton
              onClick={() => { window.location.hash = '#/booking'; setIsMenuOpen(false); }}
              className="mt-6 px-8 py-5 bg-white text-[#0B1F3A] rounded-2xl text-lg font-black uppercase tracking-widest w-full shadow-2xl"
            >
              Book A call <span className="ml-2">→</span>
            </PopButton>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
