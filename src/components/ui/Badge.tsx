import { HTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'info' | 'success' | 'warning' | 'danger' | 'neutral';
  size?: 'sm' | 'md';
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'neutral', size = 'md', className, children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center font-medium rounded-full border';
    
    const variantStyles = {
      info: 'bg-info-blue/20 text-info-blue border-info-blue/30',
      success: 'bg-success-green/20 text-success-green border-success-green/30',
      warning: 'bg-warning-amber/20 text-warning-amber border-warning-amber/30',
      danger: 'bg-danger-red/20 text-danger-red border-danger-red/30',
      neutral: 'bg-fog-gray/20 text-spirit-gray border-fog-gray/30',
    };
    
    const sizeStyles = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-3 py-1 text-sm',
    };

    return (
      <span
        ref={ref}
        className={clsx(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
