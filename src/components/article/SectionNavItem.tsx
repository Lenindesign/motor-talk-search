
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
        "flex items-center space-x-2 rounded-lg text-sm font-medium transition-all duration-200",
        "hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-motortrend-red",
        isCompact 
          ? "px-3 py-2 whitespace-nowrap focus:ring-offset-1" 
          : "p-3 focus:ring-offset-2",
        isActive 
          ? "bg-motortrend-red text-white shadow-md" 
          : "text-gray-700 hover:text-motortrend-red"
      )}
    >
      {section.thumbnail && (
        <div className={cn(
          "rounded overflow-hidden flex-shrink-0",
          isCompact ? "w-8 h-8" : "w-10 h-10"
        )}>
          <img 
            src={section.thumbnail} 
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <span className={cn(
        "truncate",
        isCompact ? "max-w-32" : ""
      )}>
        {section.title}
      </span>
      
      {/* Section Progress Indicator */}
      {showProgress && isActive && sectionProgress > 0 && (
        <div className="w-12 h-1 bg-white/30 rounded-full overflow-hidden">
          <div 
            className="h-full bg-white transition-all duration-200"
            style={{ width: `${sectionProgress}%` }}
          />
        </div>
      )}
    </button>
  );
};

export default SectionNavItem;
