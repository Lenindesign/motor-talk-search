import React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive' | 'outline' | 'link';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  loading = false,
  icon,
  iconPosition = 'left',
  disabled,
  ...props
}) => {
  const baseClasses = [
    // Apple-style base button
    'inline-flex items-center justify-center',
    'font-button font-medium',
    'border border-transparent',
    'transition-all duration-fast ease-apple',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'active:scale-98',
    '-webkit-tap-highlight-color: transparent',
    // Apple's minimum touch target
    'min-h-touch',
  ].join(' ');

  const variantClasses = {
    primary: [
      'bg-primary-2 text-white',
      'hover:bg-primary-1 hover:shadow-modern',
      'focus-visible:ring-primary-2',
      'active:bg-primary-1',
    ].join(' '),
    
    secondary: [
      'bg-neutral-6 text-neutral-1 border-neutral-5',
      'hover:bg-neutral-7 hover:border-neutral-4',
      'focus-visible:ring-neutral-4',
      'active:bg-neutral-7',
    ].join(' '),
    
    ghost: [
      'bg-transparent text-neutral-2',
      'hover:bg-neutral-6 hover:text-neutral-1',
      'focus-visible:ring-neutral-4',
      'active:bg-neutral-6',
    ].join(' '),
    
    destructive: [
      'bg-error-2 text-white',
      'hover:bg-error-1 hover:shadow-modern',
      'focus-visible:ring-error-2',
      'active:bg-error-1',
    ].join(' '),
    
    outline: [
      'bg-transparent text-neutral-1 border-neutral-5',
      'hover:bg-neutral-6 hover:border-neutral-4',
      'focus-visible:ring-neutral-4',
      'active:bg-neutral-6',
    ].join(' '),
    
    link: [
      'bg-transparent text-primary-2 border-none',
      'hover:text-primary-1 hover:underline',
      'focus-visible:ring-primary-2',
      'active:text-primary-1',
      'min-h-auto p-0',
    ].join(' '),
  };

  const sizeClasses = {
    sm: 'h-9 px-3 text-sm rounded-md gap-1.5',
    md: 'h-11 px-4 text-base rounded-md gap-2',
    lg: 'h-12 px-6 text-lg rounded-lg gap-2',
    xl: 'h-14 px-8 text-xl rounded-lg gap-3',
  };

  const iconSizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-5 h-5',
    xl: 'w-6 h-6',
  };

  const LoadingSpinner = () => (
    <svg
      className={cn('animate-spin', iconSizeClasses[size])}
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  const renderIcon = () => {
    if (loading) return <LoadingSpinner />;
    if (!icon) return null;
    
    return React.cloneElement(icon as React.ReactElement, {
      className: cn(iconSizeClasses[size], (icon as React.ReactElement).props?.className),
    });
  };

  const content = (
    <>
      {iconPosition === 'left' && renderIcon()}
      {loading ? 'Loading...' : children}
      {iconPosition === 'right' && !loading && renderIcon()}
    </>
  );

  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        variant !== 'link' && sizeClasses[size],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {content}
    </button>
  );
};
