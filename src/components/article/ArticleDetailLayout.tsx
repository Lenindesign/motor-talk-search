
import React from 'react';
import ArticleSubNavigation from '@/components/ArticleSubNavigation';
import ScrollToTopButton from '@/components/article/ScrollToTopButton';
import { ArticleData } from '@/types/article';

interface ArticleDetailLayoutProps {
  children: React.ReactNode;
  currentArticle: ArticleData;
  readingProgress: number;
  showScrollTop: boolean;
  scrollToTop: () => void;
}

const ArticleDetailLayout: React.FC<ArticleDetailLayoutProps> = ({
  children,
  currentArticle,
  readingProgress,
  showScrollTop,
  scrollToTop
}) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Sub Navigation Bar */}
      {currentArticle && (
        <ArticleSubNavigation
          articleId={currentArticle.id}
          imageUrl={currentArticle.imageUrl}
          readingProgress={readingProgress}
        />
      )}

      {/* Main Content */}
      <main className="pt-4 pb-20">
        {children}
      </main>

      {/* Scroll to Top Button */}
      <ScrollToTopButton
        showScrollTop={showScrollTop}
        scrollToTop={scrollToTop}
      />
    </div>
  );
};

export default ArticleDetailLayout;
