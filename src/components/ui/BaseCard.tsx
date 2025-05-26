import React, { forwardRef, ForwardedRef, HTMLAttributes } from 'react';
import { CardType } from '@/styles/cardStyles';
import { CARD_STYLES } from '@/styles/cardStyles';
import { cn } from '@/lib/utils';
import { Bookmark, Play } from 'lucide-react';
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
    return <button className={cn(cardStyles.actionButton, type === 'photo' ? 'p-2.5 rounded-full bg-white/90 hover:bg-gray-50 shadow-md transform hover:scale-110 z-50' : '', type === 'video' ? 'p-2.5 rounded-full bg-white/90 hover:bg-gray-50 shadow-md transform hover:scale-110 z-50' : '', type === 'car' ? 'p-2.5 rounded-full bg-white/90 hover:bg-gray-50 shadow-md transform hover:scale-110 z-50' : '', type === 'newCar' ? 'p-2.5 rounded-full bg-white/90 hover:bg-gray-50 shadow-md transform hover:scale-110 z-50' : '', type === 'usedCar' ? 'p-2.5 rounded-full bg-white/90 hover:bg-gray-50 shadow-md transform hover:scale-110 z-50' : '')} onClick={e => {
      e.stopPropagation();
      onToggleSave();
    }}>
          <Bookmark className={cn(type === 'photo' ? 'w-5 h-5' : 'w-5 h-5', type === 'video' ? 'w-5 h-5' : 'w-5 h-5', type === 'car' ? 'w-5 h-5' : 'w-5 h-5', type === 'newCar' ? 'w-5 h-5' : 'w-5 h-5', type === 'usedCar' ? 'w-5 h-5' : 'w-5 h-5', isSaved ? 'text-blue-500 fill-current' : 'text-gray-400 stroke-current', 'transition-colors duration-300')} />
        </button>;
  };
  const renderVideoOverlay = () => {
    // Only render overlay if it's not already provided by the child component
    if (type !== 'video') return null;

    // Check if children already contain a play icon
    const hasPlayIcon = React.Children.toArray(children).some(child => {
      if (React.isValidElement(child)) {
        const className = child.props.className || '';
        return className.includes('bg-motortrend-red') && className.includes('rounded-full');
      }
      return false;
    });
    if (hasPlayIcon) return null;
    return <div className="">
          <div className="bg-motortrend-red/90 group-hover:bg-motortrend-red rounded-full p-3 transition-colors">
            <Play className="text-white ml-0.5" />
          </div>
        </div>;
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
  return <div ref={ref} className={cn(CARD_STYLES.base, cardStyles.base, type === 'photo' ? 'overflow-hidden hover:shadow-xl transition-shadow duration-300' : '', type === 'video' ? 'group relative hover:shadow-xl transition-shadow duration-300 cursor-pointer' : '', type === 'car' ? 'flex flex-col w-full h-full bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200' : '', type === 'newCar' ? 'flex flex-col w-full h-full bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200' : '', type === 'usedCar' ? 'flex flex-col w-full h-full bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200' : '', className)} {...props}>
        {type === 'video' ? <div className="relative w-full aspect-[16/9] overflow-hidden">
            {renderSaveButton()}
            {children}
            {renderVideoOverlay()}
          </div> : <>
            {renderSaveButton()}
            {children}
          </>}
        {metadata}
      </div>;
});
BaseCard.displayName = 'BaseCard';
export default BaseCard;