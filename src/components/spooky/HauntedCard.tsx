import React from 'react';

type Accent = 'pink' | 'violet' | 'emerald';

interface HauntedCardProps {
  accent?: Accent;
  children: React.ReactNode;
  className?: string;
}

const accentStyles: Record<Accent, string> = {
  pink: 'border-pink-500/40 shadow-[0_0_35px_rgba(244,63,94,0.35)] hover:shadow-[0_0_45px_rgba(244,63,94,0.45)]',
  violet: 'border-violet-500/40 shadow-[0_0_35px_rgba(139,92,246,0.35)] hover:shadow-[0_0_45px_rgba(139,92,246,0.45)]',
  emerald: 'border-emerald-500/40 shadow-[0_0_35px_rgba(16,185,129,0.35)] hover:shadow-[0_0_45px_rgba(16,185,129,0.45)]',
};

export function HauntedCard({ accent = 'pink', children, className = '' }: HauntedCardProps) {
  return (
    <div
      className={`
        rounded-2xl border bg-zinc-900/70 backdrop-blur-sm 
        px-5 py-4 md:px-6 md:py-5
        transition-transform transition-shadow duration-200 
        hover:-translate-y-1 hover:shadow-2xl
        ${accentStyles[accent]}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
