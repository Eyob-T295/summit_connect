
import React from 'react';

interface LogoProps {
  isScrolled?: boolean;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ isScrolled, className = "" }) => {
  return (
    <div className={`relative flex items-center group cursor-pointer ${className}`}>
      {/* 
        High-Contrast White Logo:
        Ensuring zero blurring or glow effects to maintain 100% clarity.
      */}
      <div className="relative h-9 sm:h-11 md:h-12 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-105 overflow-hidden">
        <img 
          src="l.png" 
          alt="Summit Connect Logo" 
          className="h-full w-auto object-contain transition-all duration-700 ease-in-out block"
          loading="eager"
        />
        
        {/* Subtle Shine Accent */}
        <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-logo-shine"></div>
        </div>
      </div>

      <style>{`
        @keyframes logo-shine {
          0% { transform: translateX(-150%) skewX(-15deg); }
          20%, 100% { transform: translateX(250%) skewX(-15deg); }
        }
        .animate-logo-shine {
          animation: logo-shine 8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default Logo;
