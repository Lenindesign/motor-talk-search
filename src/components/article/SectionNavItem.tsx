
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
        "flex items-center space-x-3 rounded-lg text-sm font-medium min-w-0 flex-shrink-0",
        "focus:outline-none focus:ring-0",
        "transition-all duration-300 ease-in-out",
        isCompact 
          ? "px-4 py-3" 
          : "p-3",
        isActive 
          ? "bg-motortrend-dark text-white shadow-lg" 
          : "text-gray-700 hover:bg-gray-100 hover:shadow-md"
      )}
    >
      {section.thumbnail && (
        <div className={cn(
          "rounded overflow-hidden flex-shrink-0 transition-all duration-300",
          isCompact ? "w-10 h-10" : "w-12 h-12",
          isActive ? "ring-2 ring-white ring-opacity-50" : ""
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
            "text-left font-semibold leading-tight transition-colors duration-300",
            isCompact ? "w-48" : "w-64",
            isActive ? "text-white" : "text-gray-700"
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
