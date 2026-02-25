
import React, { useState, useEffect } from 'react';
import PopButton from './PopButton';
import Skeleton from './Skeleton';

type BusinessStage = 'scaling' | 'optimized' | 'enterprise';

const ClientValueHub: React.FC = () => {
  const [stage, setStage] = useState<BusinessStage>('scaling');
  const [isChanging, setIsChanging] = useState(false);

  const blueprints = {
    scaling: {
      title: "The Rapid-Growth Plug",
      focus: "Speed-to-Lead & Database Mining",
      unit: "2 SDRs + Shared Team Lead",
      setup: "48-Hour Integration",
      components: ["Inbound Response Unit", "Lead Re-activation", "CRM Basic Sync"]
    },
    optimized: {
      title: "The Efficiency Engine",
      focus: "Strict Qualification & Calendar Control",
      unit: "4 SDRs + Dedicated QA Lead",
      setup: "72-Hour Integration",
      components: ["Pre-call Qualification", "No-show Recovery", "Full CRM Logic Sync"]
    },
    enterprise: {
      title: "The Market Dominator",
      focus: "Omnichannel 24/7 Global Presence",
      unit: "8+ SDRs + Operations Director",
      setup: "7-Day Deployment",
      components: ["24/7 Coverage", "Custom API Reporting", "Performance Guarantees"]
    }
  };

  const handleStageChange = (newStage: BusinessStage) => {
    if (newStage === stage) return;
    setIsChanging(true);
    setTimeout(() => {
      setStage(newStage);
      setIsChanging(false);
    }, 600);
  };

  const activeBlueprint = blueprints[stage];

  return (
    <section id="value-hub" className="py-32 bg-slate-950 relative overflow-hidden">
      {/* Blueprint Grid Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#003c95 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#003c9505_1px,transparent_1px),linear-gradient(to_bottom,#003c9505_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <span className="text-[#003c95] font-black uppercase tracking-[0.5em] text-[10px] mb-4 block">Deployment Architecture</span>
          <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">The Revenue <br/><span className="text-[#003c95]">Infrastructure Blueprint.</span></h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg font-medium">
            We don't just provide people; we build pluggable revenue infrastructure. Select your business trajectory to see the technical mapping.
          </p>
        </div>

        {/* Blueprint Interaction */}
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Navigation: Stages */}
          <div className="lg:col-span-4 space-y-4">
            {(['scaling', 'optimized', 'enterprise'] as BusinessStage[]).map((s) => (
              <button
                key={s}
                onClick={() => handleStageChange(s)}
                disabled={isChanging}
                className={`w-full text-left p-8 rounded-[2.5rem] border-2 transition-all duration-500 group relative overflow-hidden ${
                  stage === s ? 'border-[#003c95] bg-[#003c95]/10 text-white' : 'border-white/5 bg-white/5 text-slate-500 hover:border-white/20'
                } ${isChanging ? 'cursor-wait' : ''}`}
              >
                <div className="relative z-10">
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-50 block mb-2">Stage: 0{s === 'scaling' ? 1 : s === 'optimized' ? 2 : 3}</span>
                  <h4 className="text-2xl font-black capitalize tracking-tight">{s}</h4>
                  <p className="text-sm mt-2 opacity-70 group-hover:opacity-100 transition-opacity">
                    {s === 'scaling' ? 'Building the initial pipeline volume.' : s === 'optimized' ? 'Maximizing conversion from existing leads.' : 'Dominating market share at scale.'}
                  </p>
                </div>
                {stage === s && !isChanging && (
                  <div className="absolute top-1/2 right-8 -translate-y-1/2 w-2 h-2 rounded-full bg-[#003c95] animate-ping"></div>
                )}
              </button>
            ))}
          </div>

          {/* Right Visual: The Blueprint Schematic */}
          <div className="lg:col-span-8 bg-slate-900/50 border border-white/10 rounded-[4rem] p-8 md:p-16 relative overflow-hidden backdrop-blur-3xl min-h-[650px] flex flex-col">
            
            <div className={`transition-all duration-500 h-full flex flex-col ${isChanging ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
              {/* Schematic Header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/5 pb-10 mb-12 gap-6">
                <div>
                  <h3 className="text-3xl font-black text-white mb-2 tracking-tight">{activeBlueprint.title}</h3>
                  <p className="text-[#003c95] font-black uppercase text-[10px] tracking-[0.3em]">Operational Priority: {activeBlueprint.focus}</p>
                </div>
                <div className="flex gap-4">
                  <div className="text-right">
                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Allocation</p>
                    <p className="text-white font-black">{activeBlueprint.unit}</p>
                  </div>
                </div>
              </div>

              {/* The Visual Map */}
              <div className="relative flex-grow flex items-center justify-center p-12">
                 {/* Integration Nodes */}
                 <div className="grid grid-cols-3 w-full gap-8 relative z-20">
                    {/* Your Team Node */}
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-20 h-20 rounded-3xl bg-slate-800 border-2 border-slate-700 flex items-center justify-center text-slate-500 group-hover:text-white transition-colors">
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                      </div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Your Closers</p>
                    </div>

                    {/* SDR Unit Node (Center) */}
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-24 h-24 rounded-[2rem] bg-[#003c95] shadow-[0_0_60px_rgba(0,60,149,0.5)] flex items-center justify-center text-white border-4 border-white/10 animate-float-slow">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                      </div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-white">BPO Integration</p>
                    </div>

                    {/* Leads Node */}
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-20 h-20 rounded-3xl bg-slate-800 border-2 border-slate-700 flex items-center justify-center text-slate-500">
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
                      </div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Raw Traffic</p>
                    </div>
                 </div>

                 {/* Connection Lines (Animated) */}
                 <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                    <path d="M 200,250 L 400,250" stroke="#003c95" strokeWidth="2" fill="none" strokeDasharray="8,8" className="animate-dash" />
                    <path d="M 600,250 L 400,250" stroke="#003c95" strokeWidth="2" fill="none" strokeDasharray="8,8" className="animate-dash" />
                 </svg>
              </div>

              {/* Spec Sheet Footer */}
              <div className="mt-auto pt-10 border-t border-white/5 grid md:grid-cols-2 gap-8 items-end">
                <div className="space-y-4">
                  <p className="text-[10px] font-black uppercase text-[#003c95] tracking-[0.4em]">Integrated Components</p>
                  <div className="flex flex-wrap gap-2">
                    {activeBlueprint.components.map((c, i) => (
                      <span key={i} className="px-4 py-2 bg-white/5 rounded-full text-[10px] font-bold text-white/80 border border-white/10 uppercase tracking-widest">{c}</span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <PopButton 
                    onClick={() => window.location.hash = '#/booking'}
                    className="w-full bg-white text-[#003c95] font-black py-6 rounded-2xl uppercase tracking-[0.3em] text-xs hover:scale-105 transition-all shadow-2xl shadow-blue-950/40"
                  >
                    Request Blueprint Deep-Dive
                  </PopButton>
                  <p className="text-center text-[9px] font-bold text-slate-500 uppercase tracking-widest">Typical Setup: {activeBlueprint.setup}</p>
                </div>
              </div>
            </div>

            {/* Skeleton Overlay */}
            {isChanging && (
              <div className="absolute inset-0 p-8 md:p-16 flex flex-col pointer-events-none">
                <div className="flex justify-between items-start mb-12">
                  <div className="space-y-3 w-1/2">
                    <Skeleton className="h-8 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                  <Skeleton className="h-12 w-24" />
                </div>
                <div className="flex-grow flex items-center justify-around">
                  <Skeleton variant="circle" className="w-20 h-20" />
                  <Skeleton variant="circle" className="w-24 h-24" />
                  <Skeleton variant="circle" className="w-20 h-20" />
                </div>
                <div className="mt-auto grid md:grid-cols-2 gap-8 items-end">
                   <div className="space-y-4">
                      <Skeleton className="h-3 w-1/3" />
                      <div className="flex gap-2">
                         <Skeleton className="h-8 w-24 rounded-full" />
                         <Skeleton className="h-8 w-24 rounded-full" />
                         <Skeleton className="h-8 w-24 rounded-full" />
                      </div>
                   </div>
                   <Skeleton className="h-16 w-full rounded-2xl" />
                </div>
              </div>
            )}

            {/* Blueprint Corner Accents */}
            <div className="absolute top-0 right-0 w-24 h-24 border-t-2 border-r-2 border-[#003c95]/30 rounded-tr-[4rem] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 border-b-2 border-l-2 border-[#003c95]/30 rounded-bl-[4rem] pointer-events-none"></div>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -160;
          }
        }
        .animate-dash {
          animation: dash 5s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default ClientValueHub;
