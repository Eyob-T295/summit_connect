
import React from 'react';

interface LogoProps {
  isScrolled?: boolean;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ isScrolled, className = "" }) => {
  return (
    <div className={`relative flex items-center group cursor-pointer ${className}`}>
      {/* Background Glow Effect */}
      <div className="absolute -inset-6 bg-blue-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

      <div className="relative h-8 sm:h-10 md:h-12 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-105 overflow-hidden rounded-lg">
        {/* Dynamic Image Selection */}
        <img 
          src={isScrolled ? "Twhitelog.png" : "Tdarklog.png"} 
          alt="Summit Connect Logo" 
          className="h-full w-auto object-contain transition-opacity duration-500 ease-in-out"
          loading="eager"
        />
        
        {/* Animated Shine Overlay */}
        <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full animate-logo-shine"></div>
        </div>
      </div>

      <style>{`
        @keyframes logo-shine {
          0% { transform: translateX(-100%) skewX(-15deg); }
          25%, 100% { transform: translateX(200%) skewX(-15deg); }
        }
        .animate-logo-shine {
          animation: logo-shine 4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default Logo;
