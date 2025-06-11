import React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'solid-light' | 'outline-black' | 'ghost-black' | 'solid-red' | 'solid-red-light' | 'outline-red' | 'ghost-red' | 'solid-primary' | 'solid-primary-light' | 'outline-primary' | 'ghost-primary' | 'minimal' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'solid-primary',
  size = 'md',
  className,
  children,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';
  
  const variantClasses = {
    'solid': 'bg-neutral-900 text-white hover:bg-neutral-700',
    'solid-light': 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200',
    'outline-black': 'border border-neutral-900 text-neutral-900 hover:bg-neutral-100',
    'ghost-black': 'text-neutral-900 hover:bg-neutral-100',
    'solid-red': 'bg-red-600 text-white hover:bg-red-500',
    'solid-red-light': 'bg-red-100 text-red-600 hover:bg-red-200',
    'outline-red': 'border border-red-600 text-red-600 hover:bg-red-50',
    'ghost-red': 'text-red-600 hover:bg-red-50',
    'solid-primary': 'bg-primary text-white hover:bg-primary-dark',
    'solid-primary-light': 'bg-primary-light text-primary hover:bg-primary-light/80',
    'outline-primary': 'border border-primary text-primary hover:bg-primary-light',
    'ghost-primary': 'text-primary hover:bg-primary-light',
    'minimal': 'hover:bg-neutral-100',
    'ghost': 'hover:bg-neutral-100',
    'link': 'text-primary underline-offset-4 hover:underline'
  };

  const sizeClasses = {
    'sm': 'h-9 px-3 text-sm',
    'md': 'h-10 px-4',
    'lg': 'h-11 px-8'
  };

  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
