import React, { forwardRef, ForwardedRef, HTMLAttributes } from 'react';
import { CardType } from '@/styles/cardStyles';
import { CARD_STYLES } from '@/styles/cardStyles';
import { cn } from '@/lib/utils';
import { Bookmark } from 'lucide-react';

export interface BaseCardProps extends HTMLAttributes<HTMLDivElement> {
  type: CardType;
  className?: string;
  isLoading?: boolean;
  isSaved?: boolean;
  onToggleSave?: () => void;
  metadata?: Record<string, string>;
}

const BaseCard = forwardRef<HTMLDivElement, BaseCardProps>(({
  type,
  className,
  isLoading,
  isSaved,
  onToggleSave,
  metadata,
  children,
  ...props
}, ref) => {
  const cardStyles = CARD_STYLES[type] as {
    base: string;
    image: string;
    metadata: string;
    actionButton: string;
  };

  const renderSaveButton = () => {
    if (!onToggleSave) return null;
    return (
      <button
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          onToggleSave();
        }}
        className={cn(
          "absolute z-20 p-1.5 bg-black/60 hover:bg-black/80 rounded-full text-white transition-colors",
          "top-3 left-3"
        )}
        aria-label={isSaved ? "Unsave item" : "Save item"}
      >
        <Bookmark size={18} fill={isSaved ? "currentColor" : "none"} />
      </button>
    );
  };

  if (isLoading) {
    return <div ref={ref} className={cn(CARD_STYLES.base, CARD_STYLES.skeleton, className)} {...props}>
          <div className="h-48 bg-gray-200 animate-pulse" />
          <div className="p-4">
            <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse mb-2" />
            <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse" />
          </div>
        </div>;
  }

  return <div ref={ref} className={cn("relative z-0", CARD_STYLES.base, cardStyles.base, type === 'photo' ? 'overflow-hidden hover:shadow-xl transition-shadow duration-300' : '', type === 'car' || type === 'newCar' || type === 'usedCar' ? 'flex flex-col w-full h-full bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200' : '', className)} {...props}>
        {renderSaveButton()}
        {children}
        {metadata && <div className={cn(CARD_STYLES.padding, cardStyles.metadata, type === 'photo' ? 'text-sm text-gray-600' : '', type === 'video' ? 'text-sm text-gray-500' : '', type === 'car' || type === 'newCar' || type === 'usedCar' ? 'text-sm text-gray-500' : '')}>
            {Object.entries(metadata).map(([key, value]) => <div key={key} className="flex items-center space-x-2">
                <span className={cn(CARD_STYLES.metadata, type === 'photo' ? 'font-medium' : '', type === 'video' ? 'text-sm' : '', type === 'car' || type === 'newCar' || type === 'usedCar' ? 'text-sm' : '')}>{value}</span>
              </div>)}
          </div>}
      </div>;
});

BaseCard.displayName = 'BaseCard';
export default BaseCard;