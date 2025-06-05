import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronUp, User, Calendar, MessageSquare, Share, Bookmark } from 'lucide-react';
import { useSavedItems } from '../contexts/SavedItemsContext';
import { Progress } from '@/components/ui/progress';
import { mockArticles, mockComments } from '@/services/mockData';
import { BuyersGuideCard } from '@/components/BuyersGuideCard';
import { CommentsSection } from '@/components/CommentsSection';

interface Comment {
  id: string;
  author: string;
  content: string;
  date: string;
  avatar?: string;
}

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
  const navigate = useNavigate();
  const { addSavedItem, removeSavedItem, isSaved } = useSavedItems();
  const [readingProgress, setReadingProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
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

  // Track scroll progress and show/hide scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setReadingProgress(Math.min(100, Math.max(0, progress)));
      setShowScrollTop(scrollTop > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  // Handle scroll to top
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

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

    const renderContentSection = (section: ContentSection, index: number) => {
      switch (section.type) {
        case 'heading':
          return (
            <h2 key={index} className="text-2xl font-bold mt-8 mb-4">
              {section.content}
            </h2>
          );
        case 'quote':
          return (
            <blockquote key={index} className="border-l-4 border-motortrend-red pl-4 my-6 italic">
              <p className="text-lg">"{section.content}"</p>
              {section.author && (
                <footer className="text-right mt-2 text-gray-600">— {section.author}</footer>
              )}
            </blockquote>
          );
        case 'specs':
          return (
            <div key={index} className="bg-gray-50 p-6 rounded-lg my-6">
              {section.title && (
                <h3 className="text-xl font-semibold mb-4">{section.title}</h3>
              )}
              <div className="grid gap-4">
                {section.data?.map((item, i) => (
                  <div key={i} className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="font-medium">{item.label}</span>
                    <span className="text-gray-700">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        default:
          return (
            <p key={index} className="my-4 leading-relaxed">
              {section.content}
            </p>
          );
      }
    };
    
    return (
      <article key={article.id} className="max-w-3xl mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
          <div className="flex items-center text-gray-600 text-sm mb-6">
            <User size={16} className="mr-1" />
            <span>{content.author}</span>
            <span className="mx-2">•</span>
            <Calendar size={16} className="mr-1" />
            <span>{article.date}</span>
            <span className="mx-2">•</span>
            <MessageSquare size={16} className="mr-1" />
            <span>{mockComments.length} comments</span>
          </div>
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-64 md:h-96 object-cover rounded-lg mb-6"
          />
          
          {article.title.toLowerCase().includes('honda accord') && (
            <div className="mb-6">
              <BuyersGuideCard
                make="Honda"
                model="Accord"
                year="2025"
                score={9.2}
                ranking="#1 in Midsize Cars"
                price="$28,990"
                mpg="48/38 City/Hwy"
                ownerRating={4.8}
                ownerCount={256}
              />
            </div>
          )}

          <div className="prose max-w-none">
            <p className="text-xl text-gray-700 mb-6">{content.subtitle}</p>
            {content.sections.map((section, index) => renderContentSection(section, index))}
          </div>

          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleSave}
                className="flex items-center text-gray-600 hover:text-motortrend-red transition-colors"
                aria-label={isArticleSaved ? 'Remove from saved' : 'Save article'}
              >
                <Bookmark
                  size={20}
                  className={`mr-1 ${isArticleSaved ? 'fill-current text-motortrend-red' : ''}`}
                />
                {isArticleSaved ? 'Saved' : 'Save'}
              </button>
              <button className="flex items-center text-gray-600 hover:text-motortrend-red transition-colors">
                <Share size={20} className="mr-1" />
                Share
              </button>
            </div>
            <div className="text-sm text-gray-500">
              {content.readTime}
            </div>
          </div>
        </header>

        <CommentsSection comments={mockComments} articleId={article.id} />
      </article>
    );
  };

  // Main render
  return (
    <div className="min-h-screen bg-white">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-100 z-50">
        <div 
          className="h-full bg-motortrend-red transition-all duration-200"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Main Content */}
      <main className="pt-12 pb-20">
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
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-motortrend-red text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition-colors z-40"
          aria-label="Scroll to top"
        >
          <ChevronUp size={24} />
        </button>
      )}
    </div>
  );
};

export default ArticleDetail;
