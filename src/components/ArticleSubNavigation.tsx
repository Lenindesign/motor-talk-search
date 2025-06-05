
import React, { useState } from 'react';
import { useSectionNavigation } from '@/hooks/useSectionNavigation';
import NavigationProgressBar from '@/components/article/NavigationProgressBar';
import SectionNavItem from '@/components/article/SectionNavItem';
import ExpandableSectionsMenu from '@/components/article/ExpandableSectionsMenu';

interface ArticleSubNavigationProps {
  articleId: string;
  imageUrl: string;
  readingProgress: number;
  onSectionClick?: (sectionId: string) => void;
}

const ArticleSubNavigation: React.FC<ArticleSubNavigationProps> = ({
  articleId,
  imageUrl,
  readingProgress,
  onSectionClick
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const {
    sections,
    activeSectionId,
    sectionProgress,
    handleSectionClick
  } = useSectionNavigation(articleId, imageUrl);

  const onSectionItemClick = (sectionId: string) => {
    handleSectionClick(sectionId, onSectionClick);
  };

  if (sections.length === 0) return null;

  return (
    <div className="sticky top-16 z-40 bg-white border-b border-gray-200 shadow-sm">
      {/* Progress Bar */}
      <NavigationProgressBar readingProgress={readingProgress} />

      {/* Navigation Bar */}
      <div className="relative">
        <div className="flex items-center justify-between px-4 py-3 bg-white">
          <div className="flex items-center space-x-4 overflow-x-auto scrollbar-none">
            {sections.slice(0, isExpanded ? sections.length : 4).map((section) => (
              <SectionNavItem
                key={section.id}
                section={section}
                isActive={activeSectionId === section.id}
                sectionProgress={sectionProgress[section.id] || 0}
                onClick={() => onSectionItemClick(section.id)}
                showProgress={true}
                size="compact"
              />
            ))}
          </div>

          <ExpandableSectionsMenu
            sections={sections}
            activeSectionId={activeSectionId}
            sectionProgress={sectionProgress}
            onSectionClick={onSectionItemClick}
            isExpanded={isExpanded}
            onToggleExpanded={() => setIsExpanded(!isExpanded)}
          />
        </div>
      </div>
    </div>
  );
};

export default ArticleSubNavigation;
