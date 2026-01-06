
import React from 'react';

const MissionStatement: React.FC = () => {
  return (
    <section id="whoweare" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-24 scroll-reveal">
          <span className="text-red-500 font-black text-xs uppercase tracking-[0.5em] mb-4 block">The Operational Gap</span>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-tight">
            WHY TRADITIONAL <br /> <span className="text-slate-400">OFFSHORE FAILS</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto mt-6 text-lg font-medium">
            Most businesses view outsourcing as a cost-saving measure. We view it as a high-performance offensive strategy. Here is why the old models are broken.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* US/CA Fail */}
          <div className="stagger-reveal stagger-1 bg-slate-50 p-12 rounded-[4rem] border border-slate-100 relative group overflow-hidden transition-all duration-500 hover:bg-red-50/20 hover:border-red-100 hover:shadow-[0_40px_80px_rgba(239,68,68,0.08)]">
             <div className="absolute top-0 right-0 p-8 opacity-[0.05] group-hover:opacity-10 group-hover:rotate-12 transition-all duration-700">
                <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
             </div>
             <h4 className="text-xl font-black text-slate-900 mb-6 leading-tight group-hover:text-red-600 transition-colors">
               Domestic Inefficiency (US/CA)
             </h4>
             <p className="text-slate-600 font-medium leading-relaxed">
               High payroll, employer taxes, and benefit burdens create a 40% premium on staff. Domestic setters often lack the specialized focus required for high-volume follow-up.
             </p>
             <div className="mt-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Inefficient Spend Ratio</div>
          </div>

          {/* PH/INDIA Fail */}
          <div className="stagger-reveal stagger-2 bg-slate-50 p-12 rounded-[4rem] border border-slate-100 relative group overflow-hidden transition-all duration-500 hover:bg-red-50/20 hover:border-red-100 hover:shadow-[0_40px_80px_rgba(239,68,68,0.08)]">
             <div className="absolute top-0 right-0 p-8 opacity-[0.05] group-hover:opacity-10 group-hover:-rotate-12 transition-all duration-700">
                <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6h-6z"/></svg>
             </div>
             <h4 className="text-xl font-black text-slate-900 mb-6 leading-tight group-hover:text-red-600 transition-colors">
               Saturated Markets (PH/India)
             </h4>
             <p className="text-slate-600 font-medium leading-relaxed">
               Traditional hubs suffer from massive turnover and diluted talent pools. You end up with "order takers" instead of proactive appointment hunters who understand your vision.
             </p>
             <div className="mt-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Quality Decay Factor</div>
          </div>

          {/* QA Fail */}
          <div className="stagger-reveal stagger-3 bg-slate-50 p-12 rounded-[4rem] border border-slate-100 relative group overflow-hidden transition-all duration-500 hover:bg-red-50/20 hover:border-red-100 hover:shadow-[0_40px_80px_rgba(239,68,68,0.08)]">
             <div className="absolute top-0 right-0 p-8 opacity-[0.05] group-hover:opacity-10 transition-all duration-700">
                <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
             </div>
             <h4 className="text-xl font-black text-slate-900 mb-6 leading-tight group-hover:text-red-600 transition-colors">
               The "Black Box" Problem
             </h4>
             <p className="text-slate-600 font-medium leading-relaxed">
               Most agencies lack transparent QA. You don't hear the calls, you don't see the CRM updates, and you eventually lose high-intent leads to poor communication habits.
             </p>
             <div className="mt-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Zero Transparency Loss</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionStatement;
