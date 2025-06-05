
import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import SectionNavItem from './SectionNavItem';

interface ArticleSection {
  id: string;
  title: string;
  type: 'heading' | 'paragraph' | 'quote' | 'specs';
  thumbnail?: string;
  element?: HTMLElement;
}

interface ExpandableSectionsMenuProps {
  sections: ArticleSection[];
  activeSectionId: string;
  sectionProgress: Record<string, number>;
  onSectionClick: (sectionId: string) => void;
  isExpanded: boolean;
  onToggleExpanded: () => void;
}

const ExpandableSectionsMenu: React.FC<ExpandableSectionsMenuProps> = ({
  sections,
  activeSectionId,
  sectionProgress,
  onSectionClick,
  isExpanded,
  onToggleExpanded
}) => {
  if (sections.length <= 4) return null;

  return (
    <>
      {/* Expand/Collapse Button */}
      <button
        onClick={onToggleExpanded}
        className="flex items-center space-x-1 px-3 py-2 text-gray-600 hover:text-motortrend-red transition-colors duration-200"
      >
        <span className="text-sm font-medium">
          {isExpanded ? 'Less' : 'More'}
        </span>
        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {/* Expanded Sections */}
      {isExpanded && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg animate-fade-in">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 p-4">
            {sections.slice(4).map((section) => (
              <SectionNavItem
                key={section.id}
                section={section}
                isActive={activeSectionId === section.id}
                sectionProgress={sectionProgress[section.id] || 0}
                onClick={() => onSectionClick(section.id)}
                size="large"
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ExpandableSectionsMenu;
