
import React from 'react';
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

const SectionNavItem: React.FC<SectionNavItemProps> = ({
  section,
  isActive,
  sectionProgress,
  onClick,
  showProgress = false,
  size = 'compact'
}) => {
  const isCompact = size === 'compact';
  
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center space-x-3 rounded-lg text-sm font-medium transition-all duration-200 min-w-0 flex-shrink-0",
        "focus:outline-none",
        isCompact 
          ? "px-4 py-3" 
          : "p-3",
        isActive 
          ? "bg-motortrend-dark text-white shadow-md hover:text-motortrend-dark" 
          : "text-gray-700 hover:text-motortrend-red hover:bg-gray-100"
      )}
    >
      {section.thumbnail && (
        <div className={cn(
          "rounded overflow-hidden flex-shrink-0",
          isCompact ? "w-10 h-10" : "w-12 h-12"
        )}>
          <img 
            src={section.thumbnail} 
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="flex flex-col items-start min-w-0 flex-1">
        <span 
          className={cn(
            "text-left font-semibold leading-tight",
            isCompact ? "w-48" : "w-64",
            isActive ? "text-white" : ""
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
};

export default SectionNavItem;
