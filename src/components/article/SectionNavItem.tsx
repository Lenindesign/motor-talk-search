
import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ArticleSection {
  id: string;
  title: string;
  type: 'heading' | 'paragraph' | 'quote' | 'specs';
  thumbnail?: string;
  element?: HTMLElement;
}

interface SectionNavItemProps {
  section: ArticleSection;
  isActive: boolean;
  sectionProgress: number;
  onClick: () => void;
  showProgress?: boolean;
  size?: 'compact' | 'large';
}

const SectionNavItem = forwardRef<HTMLButtonElement, SectionNavItemProps>(({
  section,
  isActive,
  sectionProgress,
  onClick,
  showProgress = false,
  size = 'compact'
}, ref) => {
  const isCompact = size === 'compact';
  
  return (
    <button
      ref={ref}
      onClick={onClick}
      className={cn(
        "flex items-center space-x-3 rounded-lg typography-caption-bold min-w-0 flex-shrink-0",
        "focus:outline-none focus:ring-2 focus:ring-motortrend-red/20",
        "transition-all duration-200 ease-out",
        isCompact 
          ? "px-4 py-3" 
          : "p-3",
        isActive 
          ? "bg-motortrend-dark text-white shadow-lg scale-[1.02] border border-motortrend-red/20" 
          : "text-neutral-2 hover:bg-neutral-7 hover:shadow-md hover:scale-[1.01]"
      )}
    >
      {section.thumbnail && (
        <div className={cn(
          "rounded overflow-hidden flex-shrink-0 transition-all duration-300",
          isCompact ? "w-10 h-10" : "w-12 h-12"
        )}>
          <img 
            src={section.thumbnail} 
            alt=""
            className="w-full h-full object-cover transition-transform duration-300"
          />
        </div>
      )}
      
      <div className="flex flex-col items-start min-w-0 flex-1">
        <span 
          className={cn(
            "text-left typography-caption-bold leading-tight transition-colors duration-300",
            isCompact ? "w-48" : "w-64",
            isActive ? "text-white" : "text-neutral-2"
          )}
          style={{ 
            fontSize: '12px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            lineHeight: '1.3'
          }}
        >
          {section.title}
        </span>
      </div>
    </button>
  );
});

SectionNavItem.displayName = 'SectionNavItem';

export default SectionNavItem;
