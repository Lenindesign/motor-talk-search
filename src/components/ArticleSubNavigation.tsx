
import React from 'react';
import { useSectionNavigation } from '@/hooks/useSectionNavigation';
import SectionNavItem from '@/components/article/SectionNavItem';

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
      {/* Navigation Bar */}
      <div className="px-4 py-3 bg-white">
        <div className="flex items-center space-x-4 overflow-x-auto scrollbar-none">
          {sections.map((section) => (
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
      </div>
    </div>
  );
};

export default ArticleSubNavigation;
