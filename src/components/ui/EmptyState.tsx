import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: ReactNode;
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center bg-shadow-gray border border-fog-gray rounded-lg">
      <Icon className="w-16 h-16 text-phantom-gray mb-4 animate-float" />
      <h3 className="text-xl font-semibold text-spirit-gray mb-2">
        {title}
      </h3>
      <p className="text-phantom-gray mb-6 max-w-md">
        {description}
      </p>
      {action}
    </div>
  );
}
