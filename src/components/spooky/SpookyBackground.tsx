'use client';

export function SpookyBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Floating spooky emojis */}
      <div className="absolute top-[10%] left-[5%] text-6xl opacity-20 animate-float-rotate" style={{ animationDelay: '0s' }}>
        💀
      </div>
      <div className="absolute top-[20%] right-[10%] text-5xl opacity-15 animate-float-rotate" style={{ animationDelay: '2s' }}>
        👻
      </div>
      <div className="absolute bottom-[15%] left-[15%] text-4xl opacity-20 animate-float-rotate" style={{ animationDelay: '4s' }}>
        🕷️
      </div>
      <div className="absolute top-[40%] right-[20%] text-5xl opacity-15 animate-float-rotate" style={{ animationDelay: '1s' }}>
        🦇
      </div>
      <div className="absolute bottom-[25%] right-[8%] text-6xl opacity-20 animate-float-rotate" style={{ animationDelay: '3s' }}>
        ⚰️
      </div>
      <div className="absolute top-[60%] left-[25%] text-4xl opacity-15 animate-float-rotate" style={{ animationDelay: '5s' }}>
        🕸️
      </div>
      <div className="absolute bottom-[40%] right-[30%] text-5xl opacity-20 animate-float-rotate" style={{ animationDelay: '2.5s' }}>
        🧟
      </div>
      <div className="absolute top-[80%] left-[40%] text-4xl opacity-15 animate-float-rotate" style={{ animationDelay: '4.5s' }}>
        🎃
      </div>
      
      {/* Additional smaller ones for mobile */}
      <div className="absolute top-[30%] left-[50%] text-3xl opacity-10 animate-float-rotate hidden md:block" style={{ animationDelay: '1.5s' }}>
        💀
      </div>
      <div className="absolute bottom-[50%] left-[70%] text-3xl opacity-10 animate-float-rotate hidden md:block" style={{ animationDelay: '3.5s' }}>
        👻
      </div>
    </div>
  );
}
