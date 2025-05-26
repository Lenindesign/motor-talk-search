import React from 'react';
import { CARD_STYLES } from '@/styles/cardStyles';

interface CardSkeletonProps {
  className?: string;
}

const CardSkeleton: React.FC<CardSkeletonProps> = ({ className = '' }) => {
  return (
    <div className={`${CARD_STYLES.base} ${className}`}>
      <div className="relative">
        <div className="h-48 w-full bg-gray-200 animate-pulse rounded-lg"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-3 animate-pulse">
          <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
        </div>
      </div>
      <div className={CARD_STYLES.padding}>
        <div className="space-y-2">
          <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-16 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-3 w-16 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;
