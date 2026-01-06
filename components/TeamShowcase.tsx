
import React from 'react';

const TeamShowcase: React.FC = () => {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="scroll-reveal relative group">
          {/* Main Cinematic Photo Container */}
          <div className="relative rounded-[3rem] md:rounded-[4.5rem] overflow-hidden bg-slate-100 aspect-[16/9] md:aspect-[21/9] shadow-2xl border-4 border-slate-50">
            <img 
              src="team.jpg" 
              alt="The Summit Connect Team"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms] ease-out opacity-90"
            />
            
            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#001e4d]/60 via-transparent to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#001e4d]/30 via-transparent to-transparent"></div>

            {/* Floating Talent Badges */}
            <div className="absolute bottom-8 left-8 md:bottom-16 md:left-16 flex flex-col md:flex-row gap-4 md:gap-6">
              <div className="bg-white/10 backdrop-blur-2xl p-6 rounded-[2rem] border border-white/20 shadow-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#003c95] flex items-center justify-center text-white">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-black text-xl leading-none">Elite Network</p>
                    <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest mt-1">Tier-1 Sales Talent</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-2xl p-6 rounded-[2rem] border border-white/20 shadow-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center text-white">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-black text-xl leading-none">Global Reach</p>
                    <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest mt-1">Neutral Accent Hubs</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Corner Element */}
            <div className="absolute top-0 right-0 p-12 opacity-40 group-hover:opacity-100 transition-opacity duration-1000">
               <div className="w-32 h-32 border-t-2 border-r-2 border-white/20 rounded-tr-[3rem]"></div>
            </div>
          </div>
          
          {/* Caption */}
          <div className="mt-8 flex flex-col md:flex-row justify-between items-end gap-6">
             <div className="max-w-xl">
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em] mb-3">Unit Deployment Synergy</p>
                <p className="text-slate-900 text-2xl font-bold tracking-tight leading-snug italic">
                  "Every partner gets a dedicated squad, trained specifically on their offer and brand voice. We are not a call center; we are your <span className="text-[#003c95] font-black">Performance Extension.</span>"
                </p>
             </div>
             <div className="flex items-center gap-4 px-6 py-3 bg-slate-50 rounded-full border border-slate-100 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Active Ops: Addis Ababa & Lagos Hubs</span>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamShowcase;
