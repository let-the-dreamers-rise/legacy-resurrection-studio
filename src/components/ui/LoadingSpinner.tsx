import { clsx } from 'clsx';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
  className?: string;
}

export function LoadingSpinner({ size = 'md', message, className }: LoadingSpinnerProps) {
  const sizeStyles = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className={clsx('flex flex-col items-center justify-center gap-3', className)}>
      <div className="relative">
        <div className={clsx('animate-spin rounded-full border-4 border-fog-gray border-t-necro-purple', sizeStyles[size])} />
        <div className={clsx('absolute inset-0 rounded-full animate-pulse-glow', sizeStyles[size])} />
      </div>
      {message && (
        <p className="text-sm text-spirit-gray animate-pulse">
          {message}
        </p>
      )}
    </div>
  );
}
