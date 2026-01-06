
import React from 'react';

const IdentityCapability: React.FC = () => {
  const capabilities = [
    {
      title: "Performance-Driven BPO",
      desc: "Built for revenue-critical operations where every touchpoint impacts your bottom line.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    },
    {
      title: "System Specialists",
      desc: "We build and manage appointment-setting systems that turn leads into qualified meetings.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    },
    {
      title: "Pipeline Operators",
      desc: "Hands-on operators who build, run, and optimize your sales pipeline daily for maximum output.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      )
    },
    {
      title: "Total Accountability",
      desc: "We take full ownership of execution and outcomes, letting you focus on closing deals.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    }
  ];

  return (
    <section id="whoweare" className="py-24 md:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20 scroll-reveal">
          <span className="text-[#003c95] font-black uppercase text-[10px] tracking-[0.4em] mb-4 block">Our Identity</span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase mb-6">
            WHO WE ARE
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
            We are the standard in elite BPO operations. We align our success with your revenue, acting as a direct extension of your core sales unit.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {capabilities.map((item, idx) => (
            <div 
              key={idx} 
              className="stagger-reveal group p-8 rounded-[2rem] border border-slate-100 bg-slate-50 hover:bg-white hover:border-[#003c95]/20 hover:shadow-xl transition-all duration-500"
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#003c95] shadow-sm group-hover:bg-[#003c95] group-hover:text-white transition-all mb-6">
                {item.icon}
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#003c95] transition-colors">{item.title}</h4>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="scroll-reveal text-center">
          <p className="text-2xl md:text-4xl font-black text-slate-900 tracking-tighter leading-tight max-w-3xl mx-auto">
            "WE DON’T PROVIDE PEOPLE. <br className="hidden md:block" /> 
            WE PROVIDE <span className="text-[#003c95]">PREDICTABLE EXECUTION."</span>
          </p>
          <div className="h-1 w-20 bg-[#003c95] mx-auto mt-10 rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default IdentityCapability;
