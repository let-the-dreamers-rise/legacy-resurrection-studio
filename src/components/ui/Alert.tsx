import { HTMLAttributes, forwardRef, ReactNode } from 'react';
import { clsx } from 'clsx';
import { AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';

interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'info' | 'success' | 'warning' | 'danger';
  title?: string;
  icon?: ReactNode;
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ variant = 'info', title, icon, className, children, ...props }, ref) => {
    const baseStyles = 'rounded-lg p-4 flex items-start gap-3 animate-fade-in';
    
    const variantStyles = {
      info: 'bg-info-blue/10 border border-info-blue/30',
      success: 'bg-success-green/10 border border-success-green/30',
      warning: 'bg-warning-amber/10 border border-warning-amber/30',
      danger: 'bg-danger-red/10 border border-danger-red/30',
    };

    const iconColorStyles = {
      info: 'text-info-blue',
      success: 'text-success-green',
      warning: 'text-warning-amber',
      danger: 'text-danger-red',
    };

    const titleColorStyles = {
      info: 'text-info-blue',
      success: 'text-success-green',
      warning: 'text-warning-amber',
      danger: 'text-danger-red',
    };

    const defaultIcons = {
      info: <Info className="w-5 h-5" />,
      success: <CheckCircle className="w-5 h-5" />,
      warning: <AlertTriangle className="w-5 h-5" />,
      danger: <AlertCircle className="w-5 h-5" />,
    };

    const displayIcon = icon || defaultIcons[variant];

    return (
      <div
        ref={ref}
        className={clsx(baseStyles, variantStyles[variant], className)}
        {...props}
      >
        <div className={clsx('flex-shrink-0 mt-0.5', iconColorStyles[variant])}>
          {displayIcon}
        </div>
        <div className="flex-1">
          {title && (
            <h4 className={clsx('font-semibold mb-1', titleColorStyles[variant])}>
              {title}
            </h4>
          )}
          <div className="text-spirit-gray text-sm">
            {children}
          </div>
        </div>
      </div>
    );
  }
);

Alert.displayName = 'Alert';
