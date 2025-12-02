import React from 'react';

type Variant = 'primary' | 'ghost' | 'danger';

interface RitualButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: React.ReactNode;
}

const variantStyles: Record<Variant, string> = {
  primary: 'bg-pink-600 text-zinc-50 border border-pink-400/50 hover:bg-pink-500',
  ghost: 'bg-transparent border border-zinc-600 text-zinc-200 hover:bg-zinc-900/70',
  danger: 'bg-red-700 text-zinc-50 border border-red-400/50 hover:bg-red-600',
};

export function RitualButton({ 
  variant = 'primary', 
  children, 
  className = '',
  ...props 
}: RitualButtonProps) {
  return (
    <button
      className={`
        inline-flex items-center justify-center 
        rounded-full px-4 py-2 text-sm font-medium tracking-wide
        transition-colors 
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 
        focus-visible:ring-offset-2 focus-visible:ring-offset-black
        disabled:opacity-60 disabled:cursor-not-allowed
        ${variantStyles[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
