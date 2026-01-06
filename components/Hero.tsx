
import React, { useState, useEffect } from 'react';
import PopButton from './PopButton';

const useCountUp = (end: number, duration: number = 2000, start: boolean = false) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration, start]);

  return count;
};

interface BadgeProps {
  value: string;
  label: string;
  icon: React.ReactNode;
  position: string;
  scrollFactor: number;
  scrollY: number;
  className?: string;
}

const HeroBadge: React.FC<BadgeProps> = ({ value, label, icon, position, scrollFactor, scrollY, className = "" }) => (
  <div 
    className={`absolute z-30 transition-all duration-1000 ${position} ${className}`}
    style={{ transform: `translateY(${scrollY * scrollFactor}px)` }}
  >
    <div className="relative p-[1px] rounded-2xl overflow-hidden bg-gradient-to-br from-white/20 to-transparent shadow-2xl">
      <div className="relative bg-[#001e4d]/80 backdrop-blur-2xl px-5 py-4 rounded-2xl border border-white/5 flex items-center gap-4 w-52 md:w-56">
        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-[#003c95] to-blue-600 rounded-xl flex items-center justify-center shadow-lg border border-white/10">
          {icon}
        </div>
        <div>
          <p className="text-lg font-black text-white leading-none tracking-tighter uppercase">{value}</p>
          <p className="text-[8px] font-bold text-white/50 uppercase tracking-[0.2em] mt-1 whitespace-nowrap">{label}</p>
        </div>
      </div>
    </div>
  </div>
);

const Hero: React.FC = () => {
  const [hasStarted, setHasStarted] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const efficiencyCount = useCountUp(98, 2000, hasStarted);

  useEffect(() => {
    const timer = setTimeout(() => setHasStarted(true), 100);
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToServices = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('services');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden bg-white">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[800px] h-[800px] bg-blue-50/40 rounded-full filter blur-3xl opacity-60"></div>
        
        {/* SHINE VERTICAL LINE Background Decor */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-100 hidden lg:block overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-transparent via-[#003c95] to-transparent animate-vertical-shine"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          <div className="relative z-20">
            {/* THE PRIMARY BRANDING LOCKUP - SCALED TO SMALL/REFINED */}
            <div className="mb-10 flex items-center gap-6 md:gap-8 animate-reveal">
               {/* THE ICON CONTAINER - SCALED DOWN */}
               <div className="relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center flex-shrink-0">
                  <div className="absolute inset-0 bg-blue-50/80 rounded-full shadow-[0_15px_40px_rgba(0,60,149,0.08)]"></div>
                  <div className="absolute inset-2 bg-gradient-to-b from-white to-blue-50/50 rounded-full shadow-inner"></div>
                  
                  {/* The Arrow Icon */}
                  <div className="relative w-10 h-10 md:w-14 md:h-14 text-[#003c95] z-10">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full drop-shadow-lg">
                      <path d="M12,2L4.5,20.29L5.21,21L12,18L18.79,21L19.5,20.29L12,2Z" />
                    </svg>
                  </div>
               </div>

               {/* THICK VERTICAL SEPARATOR LINE */}
               <div className="relative w-1.5 md:w-2 h-20 md:h-28 bg-[#003c95] rounded-full flex-shrink-0 shadow-[0_0_20px_rgba(0,60,149,0.1)] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white to-transparent -translate-y-full animate-hero-line-shine"></div>
               </div>

               {/* Branding Text Block - SCALED DOWN */}
               <div className="flex flex-col">
                 <div className="flex flex-col items-start leading-[0.75]">
                   {/* SUMMIT: CINZEL FONT */}
                   <span className="text-5xl md:text-[64px] font-black tracking-tighter text-[#003c95] uppercase" style={{ fontFamily: "'Cinzel', serif" }}>SUMMIT</span>
                   
                   {/* connect: MONTSERRAT FONT */}
                   <div className="relative overflow-hidden inline-block px-1">
                     <span className="text-3xl md:text-4xl font-black tracking-tighter text-slate-900 lowercase md:mt-1 block" style={{ fontFamily: "'Montserrat', sans-serif" }}>connect</span>
                     {/* Looping White Shine Glow for Connect Text */}
                     <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full animate-hero-text-shine pointer-events-none"></div>
                   </div>
                 </div>
                 
               </div>
            </div>

            <div className="animate-reveal stagger-1">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 leading-[1.1] tracking-tighter">
                High Payroll and <br/>
                <span className="text-[#003c95]">Operational Gaps</span> <br/>
                Are Holding You Back.
              </h2>

              <div className="space-y-3 mb-8">
                {[
                  "Missed follow-ups that cost deals",
                  "Inconsistent execution across setters",
                  "Untrained teams draining payroll"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-md bg-blue-50 flex items-center justify-center text-[#003c95] border border-blue-100 shadow-sm">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <p className="text-base font-bold text-slate-700 tracking-tight">{item}</p>
                  </div>
                ))}
              </div>
                  {/* Value Proposition Box - ADDED HERE */}
              <div className="relative p-1 bg-slate-100/50 rounded-3xl max-w-lg shadow-sm border border-slate-200/50 mb-10">
                <div className="bg-white p-6 rounded-[1.4rem] flex items-center gap-5 shadow-sm">
                 
                  <p className="text-base font-bold text-slate-900 leading-snug">
                    We manage appointment-setting end to end so sales only closes <span className="text-[#003c95]">qualified prospects.</span>
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-stretch mb-8">
                <PopButton
                  onClick={() => window.location.hash = '#/booking'}
                  className="inline-flex items-center justify-center px-10 py-5 text-sm font-black text-white bg-[#003c95] rounded-2xl hover:bg-[#00265e] shadow-xl active:scale-95 group transition-all"
                >
                  Book a Strategy Call
                </PopButton>
                <button
                  onClick={scrollToServices}
                  className="inline-flex items-center justify-center px-10 py-5 text-xs font-black text-slate-900 bg-white border border-slate-200 rounded-2xl hover:border-[#003c95] transition-all shadow-sm active:scale-95"
                >
                  Our Framework
                </button>
              </div>
            </div>
          </div>

          {/* Image Side with Unified Badges */}
          <div className="relative animate-reveal stagger-2 group/image mt-8 lg:mt-0">
            <div className="relative bg-[#001e4d] rounded-[3rem] p-3 shadow-2xl overflow-hidden">
              <div className="rounded-[2.4rem] w-full h-[400px] lg:h-[550px] overflow-hidden bg-slate-100 relative">
                <img
                  src="person.jpg"
                  className="w-full h-full object-cover opacity-90 group-hover/image:scale-105 transition-transform duration-[3s] ease-out"
                  alt="Operations Room"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#001e4d]/60 via-transparent to-[#001e4d]/10"></div>
              </div>

              {/* Badges */}
              <HeroBadge 
                value="10-DAY" 
                label="Deployment Protocol"
                position="bottom-8 left-8"
                scrollFactor={-0.03}
                scrollY={scrollY}
                icon={<svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>}
              />
              <HeroBadge 
                value="24/7" 
                label="Live Coverage"
                position="bottom-8 right-8"
                scrollFactor={-0.05}
                scrollY={scrollY}
                icon={<svg className="w-5 h-5 text-white animate-spin-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>}
              />
              <HeroBadge 
                value={`${efficiencyCount}%`} 
                label="QA Accuracy"
                position="top-10 right-10"
                scrollFactor={-0.02}
                scrollY={scrollY}
                className="animate-float-slow"
                icon={<svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 12l2 2 4-4"/></svg>}
              />
            </div>
          </div>

        </div>
      </div>
      <style>{`
        @keyframes hero-line-shine {
          0% { transform: translateY(-100%); }
          30%, 100% { transform: translateY(100%); }
        }
        .animate-hero-line-shine {
          animation: hero-line-shine 3.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        @keyframes hero-text-shine {
          0% { transform: translateX(-100%); }
          45%, 100% { transform: translateX(100%); }
        }
        .animate-hero-text-shine {
          animation: hero-text-shine 5s ease-in-out infinite;
        }
        @keyframes vertical-shine {
          0% { transform: translateY(-100%); }
          50% { transform: translateY(100vh); }
          100% { transform: translateY(100vh); }
        }
        .animate-vertical-shine {
          animation: vertical-shine 6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float-slow {
          animation: float-slow 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;
