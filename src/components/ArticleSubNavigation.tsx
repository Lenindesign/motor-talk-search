
import React from 'react';
import { useSectionNavigation } from '@/hooks/useSectionNavigation';
import SectionNavigation from '@/components/article/SectionNavigation';

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
    <div className="sticky top-16 z-40 bg-white border-b border-neutral-6 shadow-sm">
      <SectionNavigation
        sections={sections}
        activeSection={activeSectionId}
        onSectionClick={onSectionItemClick}
        className="px-2 py-3"
      />
    </div>
  );
};

export default ArticleSubNavigation;
