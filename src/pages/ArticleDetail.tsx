
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useSavedItems } from '../contexts/SavedItemsContext';
import { mockArticles, mockComments } from '@/services/mockData';
import { CommentsSection } from '@/components/CommentsSection';
import ArticleSubNavigation from '@/components/ArticleSubNavigation';
import ArticleHeader from '@/components/article/ArticleHeader';
import ArticleContent from '@/components/article/ArticleContent';
import ArticleActions from '@/components/article/ArticleActions';
import ScrollToTopButton from '@/components/article/ScrollToTopButton';
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
  const { addSavedItem, removeSavedItem, isSaved } = useSavedItems();
  const { readingProgress, showScrollTop, scrollToTop } = useArticleProgress();
  const [loadedIndexes, setLoadedIndexes] = useState<number[]>([]);
  const observerRef = useRef<HTMLDivElement>(null);
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

  // Load next article when bottom is reached
  useEffect(() => {
    if (loadedIndexes.length >= maxArticles || !observerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setLoadedIndexes((prev) => {
            const nextIndex = prev[prev.length - 1] + 1;
            if (nextIndex < mockArticles.length && prev.length < maxArticles) {
              return [...prev, nextIndex];
            }
            return prev;
          });
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [loadedIndexes, maxArticles]);

  // Render a single article
  const renderArticle = (article: typeof mockArticles[0], idx: number) => {
    const isArticleSaved = isSaved(article.id, 'article');
    const content = (article.content || mockContent) as ArticleContent;
    
    const handleSave = () => {
      if (isArticleSaved) {
        removeSavedItem(article.id, 'article');
      } else {
        addSavedItem({
          id: article.id,
          type: 'article',
          title: article.title,
          imageUrl: article.imageUrl,
          savedAt: new Date().toISOString(),
          metadata: {
            category: article.category || '',
            date: article.date
          }
        });
      }
    };
    
    return (
      <article key={article.id} data-article-id={article.id} className="max-w-3xl mx-auto px-4 py-8">
        <ArticleHeader
          title={article.title}
          author={content.author}
          date={article.date}
          commentsCount={mockComments.length}
          imageUrl={article.imageUrl}
          showBuyersGuide={article.title.toLowerCase().includes('honda accord')}
        />

        <ArticleContent
          subtitle={content.subtitle}
          sections={content.sections}
        />

        <ArticleActions
          isArticleSaved={isArticleSaved}
          readTime={content.readTime}
          onSave={handleSave}
        />

        <CommentsSection comments={mockComments} articleId={article.id} />
      </article>
    );
  };

  const currentArticle = mockArticles.find(a => a.id === id);

  // Main render
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
        {loadedIndexes.map((index) => {
          const article = mockArticles[index];
          return article ? renderArticle(article, index) : null;
        })}
        
        {/* Observer target for lazy loading */}
        {loadedIndexes.length < maxArticles && loadedIndexes.length < mockArticles.length && (
          <div ref={observerRef} className="h-20" />
        )}
      </main>

      {/* Scroll to Top Button */}
      <ScrollToTopButton
        showScrollTop={showScrollTop}
        scrollToTop={scrollToTop}
      />
    </div>
  );
};

export default ArticleDetail;
