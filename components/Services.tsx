
import React from 'react';
import { CORE_SERVICES } from '../constants';
// Added missing PopButton import
import PopButton from './PopButton';

const Services: React.FC = () => {
  return (
    <section 
      id="services" 
      className="py-24 md:py-40 bg-slate-950 overflow-hidden relative"
    >
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:80px_80px] opacity-[0.15] pointer-events-none"></div>
        <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 -right-20 w-[600px] h-[600px] bg-[#003c95]/10 rounded-full blur-[120px] pointer-events-none"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-3xl mb-20 md:mb-32 scroll-reveal">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-500/5 border border-blue-500/10 text-blue-400 text-[10px] font-black uppercase tracking-[0.4em] mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
            Operational Infrastructure // v4.0
          </div>
          <h2 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-[0.9] uppercase">
            High-Performance <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-700">Architecture.</span>
          </h2>
          <p className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed max-w-xl">
            We don't just provide staff. We deploy specialized <span className="text-white">Revenue Modules</span> that integrate directly into your existing tech stack.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CORE_SERVICES.map((service, idx) => {
            return (
              <div 
                key={idx} 
                className={`stagger-reveal stagger-${(idx % 3) + 1} group relative p-10 bg-white/[0.02] border border-white/5 rounded-[3rem] hover:bg-white/[0.05] transition-all duration-700 interactive-card flex flex-col h-full`}
              >
                {/* Tech Accents */}
                <div className="absolute top-8 right-8 flex gap-1.5 opacity-20 group-hover:opacity-100 transition-opacity">
                   <div className="w-1 h-1 rounded-full bg-blue-500"></div>
                   <div className="w-1 h-1 rounded-full bg-blue-500"></div>
                   <div className="w-1 h-1 rounded-full bg-blue-500"></div>
                </div>

                <div className="relative z-10 flex flex-col h-full">
                  {/* Icon Container */}
                  <div className="relative w-16 h-16 mb-10">
                    <div className="absolute inset-0 bg-blue-600 blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-700"></div>
                    <div className="relative w-full h-full bg-slate-900 border border-white/10 rounded-2xl flex items-center justify-center text-white group-hover:border-blue-500/50 group-hover:-translate-y-2 transition-all duration-500 shadow-2xl">
                      {service.icon === 'calendar' && <svg className="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v12a2 2 0 002 2z"/></svg>}
                      {service.icon === 'phone' && <svg className="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>}
                      {service.icon === 'users' && <svg className="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>}
                      {service.icon === 'briefcase' && <svg className="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>}
                      {service.icon === 'target' && <svg className="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"/></svg>}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-black text-white mb-5 leading-tight tracking-tight group-hover:text-blue-400 transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-slate-400 font-medium leading-relaxed mb-10 text-base flex-grow">
                    {service.desc}
                  </p>
                  
                  {/* Card Spec Footer */}
                  <div className="pt-8 border-t border-white/5 flex flex-col gap-6">
                    <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-[0.2em] text-slate-600">
                      <span>Deployment Latency</span>
                      <span className="text-blue-500">Low // 48H</span>
                    </div>
                    <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                       <div className="h-full bg-blue-600/30 group-hover:bg-blue-600 w-full transition-all duration-1000 origin-left"></div>
                    </div>
                    <div className="flex items-center gap-3 text-white/40 group-hover:text-white font-black uppercase tracking-[0.2em] text-[10px] transition-all">
                      Integrate Module
                      <svg className="w-4 h-4 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Technical Banner */}
        <div className="mt-20 p-1 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-[3rem] scroll-reveal">
           <div className="bg-[#020617] rounded-[2.9rem] py-12 px-8 text-center border border-white/5">
              <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-24">
                 <div className="text-left">
                    <p className="text-blue-500 text-[10px] font-black uppercase tracking-[0.4em] mb-2">System Uptime</p>
                    <p className="text-white text-3xl font-black tracking-tighter uppercase">99.9% Operational</p>
                 </div>
                 <div className="h-12 w-px bg-white/10 hidden md:block"></div>
                 <div className="text-left">
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em] mb-2">Accountability</p>
                    <p className="text-white text-3xl font-black tracking-tighter uppercase">Full QA Oversight</p>
                 </div>
                 <div className="h-12 w-px bg-white/10 hidden md:block"></div>
                 <PopButton 
                   onClick={() => window.location.hash = '#/booking'}
                   className="bg-white text-slate-950 px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-105 shadow-2xl transition-all"
                 >
                    Configure Architecture
                 </PopButton>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
