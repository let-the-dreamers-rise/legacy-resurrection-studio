import { HTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'glass';
  glow?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'default', glow = false, className, children, ...props }, ref) => {
    const baseStyles = 'rounded-lg transition-all duration-300';
    
    const variantStyles = {
      default: 'bg-shadow-gray border border-fog-gray',
      elevated: 'bg-mist-gray border border-fog-gray shadow-xl',
      glass: 'bg-shadow-gray/50 backdrop-blur border border-fog-gray/50',
    };
    
    const glowStyles = glow ? 'hover:border-necro-purple hover:shadow-glow' : '';

    return (
      <div
        ref={ref}
        className={clsx(baseStyles, variantStyles[variant], glowStyles, className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
