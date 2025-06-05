
import React from 'react';
import ArticleSubNavigation from '@/components/ArticleSubNavigation';
import ScrollToTopButton from '@/components/article/ScrollToTopButton';

interface ArticleDetailLayoutProps {
  children: React.ReactNode;
  currentArticle: any;
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

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-100 z-50">
        <div 
          className="h-full bg-motortrend-red transition-all duration-200"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

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
