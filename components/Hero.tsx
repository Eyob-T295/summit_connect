
import React, { useState, useEffect } from 'react';
import PopButton from './PopButton';

const ROTATING_TEXTS = [
  "qualified prospects.",
  "decision ready buyers.",
  "high intent opportunities."
];

const Hero: React.FC = () => {
  const [hasStarted, setHasStarted] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setHasStarted(true), 100);
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setTextIndex((prev) => (prev + 1) % ROTATING_TEXTS.length);
        setFade(true);
      }, 500);
    }, 4000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  const scrollToServices = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('failure-analysis');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative pt-24 pb-16 lg:pt-40 lg:pb-36 overflow-hidden bg-white">
      {/* Background Decor - Deep Premium Gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[1200px] h-[1200px] bg-blue-50/40 rounded-full filter blur-[150px] opacity-70"></div>
        <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/4 w-[600px] h-[600px] bg-slate-50 rounded-full filter blur-[120px] opacity-50"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          
          <div className="relative z-20 order-2 lg:order-1">
            <div className="animate-reveal stagger-1">
              <div className="inline-flex items-center gap-4 px-5 py-2.5 rounded-full bg-slate-900 text-white text-[9px] font-black uppercase tracking-[0.4em] mb-10 shadow-2xl">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                Now Serving Clients Worldwide
              </div>

              <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-10 leading-[0.95] tracking-tighter uppercase">
                Fix Your <br/>
                <span className="text-[#003c95]">Revenue Leak</span> <br/>
                At The Source.
              </h1>

              <div className="space-y-6 mb-12">
                {[
                  { label: "INEFFICIENCY", text: "Missed follow-ups that cost deals" },
                  { label: "VOLATILITY", text: "Inconsistent execution across setters" },
                  { label: "WASTE", text: "Untrained teams draining payroll" }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col gap-1 group">
                    <span className="text-[9px] font-black text-blue-500 tracking-[0.3em] uppercase opacity-60">{item.label}</span>
                    <div className="flex items-center gap-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-200 group-hover:bg-blue-500 transition-colors"></div>
                      <p className="text-xl font-bold text-slate-800 tracking-tight">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="relative p-8 bg-slate-900 text-white rounded-[3rem] max-w-lg shadow-2xl mb-12 border border-white/5">
                <p className="text-lg font-bold leading-relaxed opacity-90">
                  We manage appointment setting end to end so sales only closes <span className={`text-blue-400 transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}>{ROTATING_TEXTS[textIndex]}</span>
                </p>
                {/* Decorative Terminal Accent */}
                <div className="absolute bottom-4 right-8 flex gap-1">
                  <div className="w-1 h-1 bg-white/20 rounded-full"></div>
                  <div className="w-1 h-1 bg-white/20 rounded-full"></div>
                  <div className="w-8 h-1 bg-blue-500 rounded-full"></div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-stretch">
                <PopButton
                  onClick={() => window.location.hash = '#/booking'}
                  className="inline-flex items-center justify-center px-12 py-6 text-[11px] font-black text-white bg-[#003c95] rounded-2xl hover:bg-[#00265e] shadow-[0_30px_60px_rgba(0,60,149,0.3)] active:scale-95 transition-all uppercase tracking-[0.2em]"
                >
                  Book Strategy Session
                </PopButton>
                <button
                  onClick={scrollToServices}
                  className="inline-flex items-center justify-center px-12 py-6 text-[11px] font-black text-slate-900 bg-white border-2 border-slate-100 rounded-2xl hover:border-[#003c95] transition-all shadow-sm active:scale-95 uppercase tracking-[0.2em]"
                >
                  Our Framework
                </button>
              </div>
            </div>
          </div>

          {/* Right side Visual - "Minimalist Sovereign Command Center" */}
          <div className="relative animate-reveal stagger-2 order-1 lg:order-2">
            <div className="relative bg-white rounded-[4.5rem] p-3 shadow-[0_60px_120px_rgba(0,0,0,0.15)] border border-slate-100 overflow-hidden group">
              
              {/* Main Video Frame */}
              <div className="rounded-[4rem] w-full h-[500px] lg:h-[750px] overflow-hidden bg-slate-950 relative shadow-inner">
                <video
                  src="v.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover opacity-80 scale-105 group-hover:scale-100 transition-transform duration-[6s] ease-out"
                ></video>

                {/* MINIMALIST OVERLAY (Removed all text elements) */}
                <div className="absolute inset-0 pointer-events-none z-20">
                  {/* Subtle Corner Accents */}
                  <div className="absolute top-12 left-12 w-8 h-8 border-t border-l border-white/20"></div>
                  <div className="absolute top-12 right-12 w-8 h-8 border-t border-r border-white/20"></div>
                  <div className="absolute bottom-12 left-12 w-8 h-8 border-b border-l border-white/20"></div>
                  <div className="absolute bottom-12 right-12 w-8 h-8 border-b border-r border-white/20"></div>

                  {/* Pure Visual Data Ring (No Text) */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-white/5 rounded-full flex items-center justify-center">
                    <div className="w-40 h-40 border border-white/10 rounded-full animate-[spin_15s_linear_infinite] border-dashed"></div>
                  </div>
                </div>

                {/* Gradient Wash */}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-transparent to-slate-950/40 z-10"></div>
                
                {/* Horizontal Scanning Line */}
                <div className="absolute top-0 left-0 w-full h-px bg-blue-400/20 shadow-[0_0_10px_rgba(96,165,250,0.3)] z-30 animate-scan-horizontal"></div>
              </div>
            </div>
            
            {/* Background Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] aspect-square bg-blue-600/5 rounded-full blur-[120px] -z-10 animate-pulse"></div>
          </div>

        </div>
      </div>
      <style>{`
        @keyframes scan-horizontal {
          0% { transform: translateY(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(500px); opacity: 0; }
        }
        .animate-scan-horizontal {
          animation: scan-horizontal 5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        .animate-reveal {
          animation: reveal 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes reveal {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default Hero;
