import React from 'react';
import { useParams } from 'react-router-dom';
import { mockArticles } from '@/services/mockData';
import ArticleDetailLayout from '@/components/article/ArticleDetailLayout';
import ArticleRenderer from '@/components/article/ArticleRenderer';
import ArticleLazyLoader from '@/components/article/ArticleLazyLoader';
import { useArticleProgress } from '@/hooks/useArticleProgress';
import { ArticleData } from '@/types';

const NewsDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { readingProgress, showScrollTop, scrollToTop } = useArticleProgress();
  const [loadedIndexes, setLoadedIndexes] = React.useState<number[]>([]);
  const maxArticles = 4;

  // Initialize loadedIndexes with the current article
  React.useEffect(() => {
    if (id) {
      // First try to find by detailUrl slug
      const initialIndex = mockArticles.findIndex(a => a.detailUrl?.endsWith(id));
      if (initialIndex >= 0) {
        setLoadedIndexes([initialIndex]);
      } else {
        // Fallback to finding by ID
        const idIndex = mockArticles.findIndex(a => a.id === id);
        if (idIndex >= 0) {
          setLoadedIndexes([idIndex]);
        }
      }
    }
  }, [id]);

  const handleLoadMore = () => {
    setLoadedIndexes((prev) => {
      const nextIndex = prev[prev.length - 1] + 1;
      if (nextIndex < mockArticles.length && prev.length < maxArticles) {
        return [...prev, nextIndex];
      }
      return prev;
    });
  };

  // Find article by detailUrl slug or fallback to ID
  const currentArticle = mockArticles.find(a => 
    (a.detailUrl && a.detailUrl.endsWith(id)) || a.id === id
  );

  if (!currentArticle) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">Article Not Found</h1>
          <p className="text-gray-600">The article you're looking for doesn't exist or has been moved.</p>
        </div>
      </div>
    );
  }

  return (
    <ArticleDetailLayout
      currentArticle={currentArticle}
      readingProgress={readingProgress}
      showScrollTop={showScrollTop}
      scrollToTop={scrollToTop}
    >
      {/* Render current article */}
      <ArticleRenderer 
        article={currentArticle} 
        mockContent={{
          subtitle: currentArticle.excerpt || '',
          author: currentArticle.author || 'MotorTrend Staff',
          authorTitle: 'Contributing Editor',
          readTime: currentArticle.readTime || '5 min read',
          sections: currentArticle.content?.sections || []
        }}
      />

      {/* Lazy load additional articles */}
      <ArticleLazyLoader
        loadedIndexes={loadedIndexes}
        maxArticles={maxArticles}
        totalArticles={mockArticles.length}
        onLoadMore={handleLoadMore}
      />
    </ArticleDetailLayout>
  );
};

export default NewsDetail;
