
import React, { useState, useEffect } from 'react';
import PopButton from './PopButton';

const ROTATING_TEXTS = [
  "qualified prospects.",
  "decision ready buyers.",
  "high intent opportunities."
];

const Hero: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [showFullscreen, setShowFullscreen] = useState(false);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePos({ x, y });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove);

    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setTextIndex((prev) => (prev + 1) % ROTATING_TEXTS.length);
        setFade(true);
      }, 500);
    }, 4000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 pb-16 lg:pt-32 lg:pb-32 overflow-hidden bg-black">
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          src="Promo Vid Summitconnect.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-80"
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        ></video>
        
        {/* Backdrop Blur Layer - Focused on text side (left) */}
        <div className="absolute inset-y-0 left-0 w-full lg:w-3/4 backdrop-blur-[10px] z-10 [mask-image:linear-gradient(to_right,black_20%,transparent_80%)]"></div>
        
        {/* Sovereign Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent z-20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20 z-20"></div>
      </div>

      <div className="max-w-7xl ml-0 md:ml-auto lg:ml-0 px-6 md:px-12 lg:pl-24 relative z-30 w-full">
        <div 
          className="max-w-4xl transition-transform duration-300 ease-out"
          style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
        >
          <div className="scroll-reveal reveal-left stagger-1 inline-flex items-center gap-4 px-5 py-1.5 rounded-sm bg-blue-600/20 border-l-2 border-blue-500 text-blue-400 text-[10px] font-black uppercase tracking-[0.6em] mb-12 backdrop-blur-md">
            <span className="flex h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse"></span>
            Competitive costs without sacrificing quality
          </div>

          <h1 className="scroll-reveal reveal-left stagger-2 text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight leading-tight animate-float-gentle">
            Fix your <span className="text-blue-500 hover:text-blue-400 transition-colors cursor-default drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">revenue leak</span> <br className="hidden md:block" />
            at the source.
          </h1>

          <div className="space-y-8 mb-16 max-w-2xl">
            <div className="flex flex-col gap-6">
              {[
                { label: "INEFFICIENCY", text: "Missed follow-ups that cost deals" },
                { label: "VOLATILITY", text: "Inconsistent execution across setters" },
                { label: "WASTE", text: "Untrained teams draining payroll" }
              ].map((item, i) => (
                <div key={i} className="scroll-reveal reveal-left flex items-start gap-6 group" style={{ transitionDelay: `${(i + 3) * 150}ms` }}>
                  <div className="mt-1.5 w-1 h-4 bg-blue-500/40 group-hover:bg-blue-500 transition-colors"></div>
                  <div>
                    <span className="text-[9px] font-black text-blue-400/60 tracking-[0.3em] uppercase block mb-1">{item.label}</span>
                    <p className="text-lg font-bold text-white/90 tracking-tight">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="scroll-reveal reveal-left stagger-5 max-w-2xl mb-16">
            <p className="text-xl md:text-2xl font-medium text-white/60 leading-tight tracking-tight border-l border-white/10 pl-8">
              We manage appointment setting end-to-end so your sales team only closes <br/>
              <span className={`text-blue-500 font-black uppercase tracking-widest transition-all duration-700 ${fade ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                {ROTATING_TEXTS[textIndex]}
              </span>
            </p>
          </div>

          <div className="scroll-reveal reveal-left stagger-5 flex flex-col sm:flex-row gap-8 items-center pt-4">
            <PopButton
              onClick={() => window.location.hash = '#/booking'}
              className="w-full sm:w-auto px-14 py-6 text-xs font-black text-white bg-gradient-to-r from-blue-700 to-blue-600 rounded-xl hover:from-blue-600 hover:to-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_40px_rgba(37,99,235,0.6)] hover:-translate-y-1 transition-all duration-300 uppercase tracking-[0.2em] border border-blue-500/30"
            >
              <svg className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" /></svg> Book a call Strategy
            </PopButton>
            <button
              onClick={() => setShowFullscreen(true)}
              className="w-full sm:w-auto px-16 py-7 text-[12px] font-black text-white bg-white/5 backdrop-blur-xl border border-white/10 rounded-sm hover:bg-white/10 transition-all active:scale-95 uppercase tracking-[0.3em] flex items-center justify-center group"
            >
              <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center mr-4 group-hover:border-blue-500 transition-colors">
                <svg className="w-2.5 h-2.5 text-white group-hover:text-blue-500 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              Watch Full Video
            </button>
          </div>
        </div>
      </div>

      {/* Fullscreen Video Modal */}
      {showFullscreen && (
        <div className="fixed inset-0 z-[100] bg-black/98 backdrop-blur-3xl flex items-center justify-center animate-fade-in">
          <button 
            onClick={() => setShowFullscreen(false)}
            className="absolute top-8 right-8 z-[110] text-white/30 hover:text-white transition-colors p-3"
          >
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="w-full h-full max-w-7xl max-h-[90vh] px-6 flex items-center justify-center">
            <video
              src="Promo Vid Summitconnect.mp4"
              autoPlay
              controls
              className="w-full h-full object-contain shadow-[0_0_150px_rgba(0,0,0,0.9)] border border-white/5"
            ></video>
          </div>
        </div>
      )}

      <style>{`
        .scroll-reveal.reveal-left {
          opacity: 0;
          transform: translateX(-40px);
          filter: blur(5px);
          transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .scroll-reveal.reveal-left.active {
          opacity: 1;
          transform: translateX(0);
          filter: blur(0);
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
        @keyframes reveal {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float-gentle {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(0.5deg); }
        }
        .animate-float-gentle {
          animation: float-gentle 6s ease-in-out infinite;
        }
        .animate-reveal {
          animation: reveal 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </section>
  );
};

export default Hero;
