
import React from 'react';

const OperationalFramework: React.FC = () => {
  const steps = [
    {
      id: 'linguistic',
      title: 'Linguistic Excellence',
      desc: 'Our specialists possess a neutral, trust-building English accent that integrates seamlessly with US, UK, and EU markets.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: 'retention',
      title: 'Market Dynamics',
      desc: 'Operating in a less saturated talent market leads to significantly higher retention rates and long-term consistency for your brand.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    },
    {
      id: 'efficiency',
      title: 'Capital Efficiency',
      desc: 'Achieve highly competitive operational costs without sacrificing the elite quality required for high-ticket sales environments.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: 'qa',
      title: 'Rigorous Oversight',
      desc: 'Every unit is backed by strong QA and live performance tracking, ensuring total transparency and consistent execution.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    }
  ];

  return (
    <section id="failure-analysis" className="py-24 md:py-32 bg-white relative overflow-hidden">
      {/* Subtle architectural background line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-slate-100 hidden lg:block pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-20 scroll-reveal">
          <span className="text-[#003c95] font-black uppercase text-[10px] tracking-[0.4em] mb-5 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100/50">
            The Competitive Edge
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-tight uppercase">
            WHY OUR <span className="text-[#003c95]">BPO WORKS</span>
          </h2>
          <div className="w-20 h-1.5 bg-[#003c95] mt-8 rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {steps.map((step, idx) => (
            <div 
              key={step.id} 
              className="stagger-reveal group relative p-8 lg:p-10 bg-white border border-slate-100 rounded-[2.5rem] hover:border-blue-500/20 hover:shadow-[0_30px_60px_-15px_rgba(0,60,149,0.08)] transition-all duration-500 flex flex-col items-start text-left h-full"
              style={{ transitionDelay: `${idx * 150}ms` }}
            >
              {/* Icon Container */}
              <div className="w-14 h-14 rounded-2xl bg-slate-50 text-[#003c95] flex items-center justify-center mb-8 group-hover:bg-[#003c95] group-hover:text-white group-hover:scale-110 transition-all duration-500 shadow-sm">
                {step.icon}
              </div>
              
              <h3 className="text-xl font-extrabold text-slate-900 mb-4 group-hover:text-[#003c95] transition-colors leading-tight">
                {step.title}
              </h3>
              <p className="text-slate-500 font-medium leading-relaxed text-sm lg:text-base">
                {step.desc}
              </p>

              {/* Interactive bottom bar */}
              <div className="mt-auto pt-6 w-0 group-hover:w-full h-0.5 bg-blue-500/30 transition-all duration-700"></div>
            </div>
          ))}
        </div>

        <div className="mt-20 flex flex-col md:flex-row items-center justify-center text-center md:text-left gap-8 md:gap-16 scroll-reveal">
           <div className="max-w-md">
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Our Operating Philosophy</p>
              <p className="text-slate-700 font-medium italic text-lg leading-relaxed">
                "We don't just supply seats; we deploy high-performance infrastructure built on execution, consistency, and total accountability."
              </p>
           </div>
           
           <div className="h-12 w-px bg-slate-200 hidden md:block"></div>

           <button 
            onClick={() => window.location.hash = '#/booking'}
            className="group px-10 py-5 bg-[#003c95] text-white font-black rounded-2xl text-xs uppercase tracking-widest hover:bg-[#00265e] hover:scale-105 active:scale-95 transition-all shadow-xl shadow-blue-900/10 flex items-center gap-4"
           >
             Initialize Partnership
             <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" />
             </svg>
           </button>
        </div>
      </div>
    </section>
  );
};

export default OperationalFramework;
