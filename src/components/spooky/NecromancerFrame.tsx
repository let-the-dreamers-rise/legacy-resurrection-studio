import React from 'react';

interface NecromancerFrameProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export function NecromancerFrame({ title, subtitle, children, className = '' }: NecromancerFrameProps) {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#020617] via-[#020016] to-black overflow-hidden">
      {/* Animated fog layers */}
      <div className="fog-layer absolute inset-0 opacity-40 pointer-events-none" />
      <div className="fog-layer absolute inset-0 opacity-30 pointer-events-none" style={{ animationDelay: '10s', animationDuration: '50s' }} />
      
      {/* Content wrapper */}
      <div className={`relative z-10 max-w-6xl mx-auto px-4 md:px-8 py-8 flex flex-col min-h-screen ${className}`}>
        {(title || subtitle) && (
          <header className="mb-8 text-center">
            {title && (
              <h1 className="text-4xl md:text-5xl font-bold text-zinc-50 mb-3 animate-[float-soft_6s_ease-in-out_infinite]">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="text-lg md:text-xl text-zinc-300 max-w-3xl mx-auto">
                {subtitle}
              </p>
            )}
          </header>
        )}
        
        <div className="flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}
