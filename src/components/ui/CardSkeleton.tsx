
import React from 'react';
import { cn } from '@/lib/utils';

interface CardSkeletonProps {
  className?: string;
  variant?: 'default' | 'compact' | 'detailed';
}

const CardSkeleton: React.FC<CardSkeletonProps> = ({ 
  className, 
  variant = 'default' 
}) => {
  return (
    <div className={cn(
      'bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden animate-pulse',
      className
    )}>
      <div className="aspect-[16/9] bg-gray-200" />
      <div className="p-4 space-y-3">
        <div className="space-y-2">
          <div className="h-5 bg-gray-200 rounded w-3/4" />
          {variant === 'detailed' && <div className="h-4 bg-gray-200 rounded w-1/2" />}
        </div>
        <div className="flex justify-between items-center">
          <div className="h-4 bg-gray-200 rounded w-1/4" />
          <div className="h-4 bg-gray-200 rounded w-1/6" />
        </div>
        {variant === 'detailed' && (
          <div className="space-y-2 pt-2 border-t border-gray-100">
            <div className="h-3 bg-gray-200 rounded w-full" />
            <div className="h-3 bg-gray-200 rounded w-2/3" />
          </div>
        )}
      </div>
    </div>
  );
};

export default CardSkeleton;
