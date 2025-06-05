import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Share, Bookmark, MessageSquare, Clock, ChevronUp } from 'lucide-react';
import { useSavedItems } from '../contexts/SavedItemsContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { mockArticles, mockComments } from '@/services/mockData';
import { CommentsSection } from '@/components/CommentsSection';
import { BuyersGuideCard } from '@/components/BuyersGuideCard';
import ArticleSubNav from '@/components/ArticleSubNav';
import ArticleContent from '@/components/ArticleContent';
import '@/styles/progress-bar.css';

export default function ArticleDetail(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { savedItems, addSavedItem, removeSavedItem, isSaved } = useSavedItems();
  const [readingProgress, setReadingProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Find current article
  const article = mockArticles.find((a) => a.id === id) || mockArticles[0];
  
  // Get related articles from the same category
  const articlesInSeries = mockArticles
    .filter((a) => a.category === article.category && a.id !== article.id)
    .slice(0, 4); // Get 4 related articles
  
  // Add current article to the beginning of the series
  const allArticles = [article, ...articlesInSeries];
  const currentArticleIndex = 0; // Current article is always first
  const isArticleSaved = isSaved(id || '', 'article');

  const handleSave = () => {
    if (isArticleSaved) {
      removeSavedItem(id || '', 'article');
    } else {
      addSavedItem({
        id: id || '',
        type: 'article',
        title: article.title,
        imageUrl: article.imageUrl,
        savedAt: new Date().toISOString(),
        metadata: {
          category: article.category,
          date: article.date
        }
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const progress = (currentScroll / totalScroll) * 100;
      setReadingProgress(progress);
      setShowScrollTop(currentScroll > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!article) {
    return (
      <div className="min-h-screen bg-white">
        <ArticleSubNav
          currentArticleIndex={currentArticleIndex}
          articles={allArticles}
          readingProgress={readingProgress}
        />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h1>
            <Link to="/" className="text-motortrend-red hover:underline">
              Return to Home
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const mockContent = {
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

  return (
    <div className="min-h-screen bg-white">
      <ArticleSubNav
        currentArticleIndex={currentArticleIndex}
        articles={allArticles}
        readingProgress={readingProgress}
      />

      <main className="max-w-[720px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Show all articles */}
        {allArticles.map((articleItem, index) => (
          <ArticleContent
            key={articleItem.id}
            article={articleItem}
            isFirst={index === 0}
          />
        ))}

        {/* Comments section */}
        <section id="comments" className="mt-8 sm:mt-12 pb-8 sm:pb-12">
          <CommentsSection 
            articleId={id || ''}
            comments={mockComments}
          />
        </section>
      </main>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 p-2 sm:p-3 bg-neutral-900/90 backdrop-blur-sm text-white rounded-full shadow-lg hover:bg-neutral-800 transition-colors z-50"
        >
          <ChevronUp size={20} className="sm:w-6 sm:h-6" />
        </button>
      )}
    </div>
  );
}
