
import React, { useEffect, useRef } from 'react';

const PartnershipValue: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    const elements = containerRef.current?.querySelectorAll('.scroll-item');
    elements?.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const deliverables = [
    { label: "DEPLOYMENT", value: "SDRs active within 10 days" },
    { label: "INTEGRATION", value: "Full CRM & Script synchronization" },
    { label: "QUALITY CONTROL", value: "Daily QA & continuous monitoring" },
    { label: "REPORTING", value: "Live KPI dashboard access" },
    { label: "PROTECTION", value: "30-day replacement guarantee" }
  ];

  return (
    <section id="guarantees" className="py-24 md:py-40 bg-[#020617] text-white overflow-hidden relative" ref={containerRef}>
      {/* High-Tech Background Elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,#003c95_0%,transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:80px_80px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 md:gap-24 items-center">
          
          <div className="scroll-item scroll-reveal">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-[#003c95] text-[10px] font-black uppercase tracking-[0.4em] mb-10">
              <span className="w-2 h-2 rounded-full bg-[#003c95] animate-pulse"></span>
              Service Protocol
            </div>
            
            <h2 className="text-5xl md:text-8xl font-black mb-12 tracking-tighter leading-[0.85] uppercase">
              GUARANTEED <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-600">DELIVERABLES</span>
            </h2>
            
            <div className="space-y-4">
              {deliverables.map((item, i) => (
                <div key={i} className="group relative">
                  <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/5 transition-all duration-500 -inset-x-4 rounded-xl"></div>
                  <div className="relative flex flex-col md:flex-row md:items-center justify-between py-6 border-b border-white/5">
                    <div className="flex items-center gap-6">
                      <div className="text-[10px] font-black text-[#003c95] tracking-[0.3em] w-24">
                        STATUS // 0{i+1}
                      </div>
                      <h4 className="text-lg md:text-2xl font-bold text-slate-100 tracking-tight group-hover:text-blue-400 transition-colors">
                        {item.value}
                      </h4>
                    </div>
                    <div className="mt-2 md:mt-0 px-3 py-1 rounded bg-slate-900 border border-slate-800 text-[8px] font-black uppercase tracking-widest text-slate-500 group-hover:border-[#003c95] group-hover:text-white transition-all">
                      {item.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="scroll-item scroll-reveal stagger-2 relative">
             {/* Enhanced Zero-Risk Promise Card */}
             <div className="relative p-[1px] rounded-[3rem] md:rounded-[4rem] overflow-hidden group">
                {/* Animated Border Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#003c95] via-slate-800 to-[#003c95] animate-spin-slow opacity-50"></div>
                
                <div className="relative bg-[#020617] p-10 md:p-16 rounded-[3rem] md:rounded-[3.9rem] text-center">
                  {/* Performance Seal Icon */}
                  <div className="relative w-28 h-28 mx-auto mb-12">
                    <div className="absolute inset-0 bg-[#003c95] rounded-full opacity-20 blur-2xl animate-pulse"></div>
                    <div className="relative w-full h-full bg-gradient-to-br from-[#003c95] to-[#001e4d] rounded-full flex items-center justify-center shadow-2xl border border-white/10 group-hover:scale-110 transition-transform duration-700">
                      <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                      </svg>
                    </div>
                  </div>
                  
                  <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#003c95] mb-6 block">Bonded Agreement</span>
                  
                  <h3 className="text-3xl md:text-5xl font-black mb-8 leading-[1.1] tracking-tighter uppercase italic">
                    THE SUMMIT <br/>
                    <span className="text-white">ZERO-RISK PROMISE</span>
                  </h3>
                  
                  <p className="text-lg md:text-xl font-medium text-slate-400 leading-relaxed mb-12 max-w-sm mx-auto">
                    We guarantee <span className="text-white font-bold">showed, qualified appointments</span> or we work for free until your monthly targets are secured.
                  </p>
                  
                  <button 
                    onClick={() => window.location.hash = '#/booking'}
                    className="w-full bg-white text-[#001e4d] font-black py-6 rounded-2xl text-sm uppercase tracking-[0.3em] hover:bg-[#003c95] hover:text-white transition-all duration-500 shadow-2xl group-hover:-translate-y-1"
                  >
                    Activate Strategy
                  </button>
                  
                  <div className="mt-8 flex items-center justify-center gap-4 text-[9px] font-black uppercase tracking-widest text-slate-500">
                    <span className="w-1 h-1 rounded-full bg-green-500"></span>
                    Legally Binding Performance Clause
                  </div>
                </div>
             </div>
             
             {/* Floating Certification Badge */}
             <div className="absolute -bottom-8 -right-4 bg-white text-[#001e4d] px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-2xl rotate-3 border border-[#001e4d]/5">
                100% Performance Bound
             </div>
          </div>

        </div>
      </div>
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default PartnershipValue;
