import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'destructive' | 'outline' | 'secondary' | 'default';
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  className,
  children,
  ...props
}) => {
  const variantClasses = {
    'default': 'bg-primary text-primary-foreground hover:bg-primary/80',
    'destructive': 'bg-destructive text-destructive-foreground hover:bg-destructive/80',
    'outline': 'border border-input hover:bg-accent hover:text-accent-foreground',
    'secondary': 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
  };

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
