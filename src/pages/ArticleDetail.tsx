
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { mockArticles } from '@/services/mockData';
import ArticleDetailLayout from '@/components/article/ArticleDetailLayout';
import ArticleDetailHeader from '@/components/article/ArticleDetailHeader';
import ArticleRenderer from '@/components/article/ArticleRenderer';
import ArticleLazyLoader from '@/components/article/ArticleLazyLoader';
import { useArticleProgress } from '@/hooks/useArticleProgress';

interface ContentSection {
  type: 'paragraph' | 'heading' | 'quote' | 'specs';
  content?: string;
  author?: string;
  title?: string;
  data?: Array<{ label: string; value: string }>;
}

interface ArticleContent {
  subtitle: string;
  author: string;
  authorTitle: string;
  readTime: string;
  sections: ContentSection[];
}

const ArticleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { readingProgress, showScrollTop, scrollToTop } = useArticleProgress();
  const [loadedIndexes, setLoadedIndexes] = useState<number[]>([]);
  const maxArticles = 4;

  // Fallback mockContent for articles missing content
  const mockContent: ArticleContent = {
    subtitle: "Revolutionary electric SUVs are pushing the boundaries of range and efficiency, with some models now exceeding 400 miles on a single charge.",
    author: "Sarah Rodriguez",
    authorTitle: "Senior Automotive Editor",
    readTime: "8 min read",
    sections: [
      {
        type: 'paragraph',
        content: "The electric SUV landscape has transformed dramatically in 2025, with manufacturers achieving unprecedented range figures that were once thought impossible. These aren't just incremental improvements—they represent quantum leaps in battery technology and aerodynamic efficiency."
      },
      {
        type: 'paragraph',
        content: "After extensive testing across varied terrain and weather conditions, we've identified the electric SUVs that truly deliver on their range promises. Here's what sets the leaders apart from the pack."
      },
      {
        type: 'heading',
        content: "Performance That Defies Physics"
      },
      {
        type: 'paragraph',
        content: "The 2025 Mercedes EQS SUV leads our range test with an EPA-estimated 450 miles, but real-world testing revealed even more impressive results. During our highway efficiency test, we achieved 470 miles on a single charge."
      },
      {
        type: 'specs',
        title: "Range Leaders: 2025 Models",
        content: "",
        data: [
          { label: "Mercedes EQS SUV", value: "450 miles EPA" },
          { label: "Lucid Air Dream Range", value: "425 miles EPA" },
          { label: "BMW iX xDrive50", value: "410 miles EPA" },
          { label: "Tesla Model S", value: "405 miles EPA" },
          { label: "Cadillac Celestiq", value: "400 miles EPA" }
        ]
      },
      {
        type: 'quote',
        content: "The transition from 300 to 400+ mile range isn't just evolutionary—it's revolutionary. It fundamentally changes how we think about electric vehicle ownership.",
        author: "Dr. Elena Vasquez, Battery Technology Institute"
      }
    ]
  };

  // Initialize loadedIndexes with the current article
  useEffect(() => {
    if (id) {
      const initialIndex = mockArticles.findIndex(a => a.id === id);
      if (initialIndex >= 0) {
        setLoadedIndexes([initialIndex]);
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

  const currentArticle = mockArticles.find(a => a.id === id);

  if (!currentArticle) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
          <p className="text-gray-600">The article you're looking for doesn't exist.</p>
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
      <ArticleDetailHeader car={currentArticle} />
      
      {loadedIndexes.map((index) => {
        const article = mockArticles[index];
        return article ? (
          <ArticleRenderer
            key={article.id}
            article={article}
            mockContent={mockContent}
          />
        ) : null;
      })}
      
      <ArticleLazyLoader
        loadedIndexes={loadedIndexes}
        maxArticles={maxArticles}
        totalArticles={mockArticles.length}
        onLoadMore={handleLoadMore}
      />
    </ArticleDetailLayout>
  );
};

export default ArticleDetail;
