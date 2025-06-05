
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import SectionNavItem from './SectionNavItem';
import { useAutoScroll } from '@/hooks/useAutoScroll';

interface ArticleSection {
  id: string;
  title: string;
  type: 'heading' | 'paragraph' | 'quote' | 'specs';
  thumbnail?: string;
  element?: HTMLElement;
}

interface SectionNavigationProps {
  sections: ArticleSection[];
  activeSection: string;
  onSectionClick: (sectionId: string) => void;
  className?: string;
}

const SectionNavigation: React.FC<SectionNavigationProps> = ({
  sections,
  activeSection,
  onSectionClick,
  className = ''
}) => {
  const activeSectionIndex = sections.findIndex(section => section.id === activeSection);
  
  const { containerRef, setItemRef } = useAutoScroll({
    activeIndex: activeSectionIndex,
    itemsLength: sections.length
  });

  return (
    <div className={className}>
      <ScrollArea className="w-full">
        <div 
          ref={containerRef}
          className="flex space-x-2 overflow-x-auto scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {sections.map((section, index) => (
            <SectionNavItem
              key={section.id}
              ref={setItemRef(index)}
              section={section}
              isActive={section.id === activeSection}
              sectionProgress={0}
              onClick={() => onSectionClick(section.id)}
              showProgress={true}
              size="compact"
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default SectionNavigation;
