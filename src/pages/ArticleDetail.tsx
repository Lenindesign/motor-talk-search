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
import '@/styles/progress-bar.css';

export default function ArticleDetail(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { savedItems, addSavedItem, removeSavedItem, isSaved } = useSavedItems();
  const [readingProgress, setReadingProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Article stacking logic
  const initialIndex = id ? mockArticles.findIndex(a => a.id === id) : 0;
  const [loadedIndexes, setLoadedIndexes] = useState<number[]>([initialIndex >= 0 ? initialIndex : 0]);
  const maxArticles = 4;
  const observerRef = React.useRef<HTMLDivElement | null>(null);

  // Load next article when bottom is reached
  useEffect(() => {
    if (loadedIndexes.length >= maxArticles) return;
    const observer = new window.IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setLoadedIndexes((prev) => {
            const nextIndex = prev[prev.length - 1] + 1;
            if (nextIndex < mockArticles.length && prev.length < maxArticles) {
              return [...prev, nextIndex];
            }
            return prev;
          });
        }
      },
      { threshold: 0.2 }
    );
    if (observerRef.current) {
      observer.observe(observerRef.current);
    }
    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [loadedIndexes]);

  // Render a single article (preserve template)
  const renderArticle = (article: typeof mockArticles[0], idx: number) => {
    const isArticleSaved = isSaved(article.id, 'article');
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
            category: article.category,
            date: article.date
          }
        });
      }
    };
    return (
      <div key={article.id} className="mb-12" ref={idx === loadedIndexes.length - 1 ? observerRef : undefined}>
        {/* Existing article template below - only show scroll-to-top button for first article */}
        {/* ...copy/paste the article template JSX here, replacing all article references with the 'article' variable ... */}
      </div>
    );
  };

  // Only show up to maxArticles
  const articlesToShow = loadedIndexes.map(i => mockArticles[i]).filter(Boolean);

  // Hide scroll-to-top for subsequent articles (only on first)
  // ...

  // Remove single-article logic below and instead render articlesToShow

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

  if (!articlesToShow.length) {
    return (
      <div className="min-h-screen bg-gray-50">
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="fixed top-0 left-0 right-0 z-50 progress-indicator-red">
        <Progress 
          value={readingProgress} 
          className="h-3 rounded-none bg-gray-200" 
        />
      </div>

      {/* Stack articles for infinite scroll */}
      {articlesToShow.map((article, idx) => {
        const isArticleSaved = isSaved(article.id, 'article');
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
                category: article.category,
                date: article.date
              }
            });
          }
        };
        // Use article.content if available, else fallback to mockContent
        const content = article.content || mockContent;
        return (
          <main
            key={article.id}
            className="max-w-[720px] mx-auto px-4 sm:px-6 py-6 sm:py-8"
            ref={idx === articlesToShow.length - 1 ? observerRef : undefined}
          >
            <header className="mb-6 sm:mb-8">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                {article.title}
              </h1>
              <p className="text-base sm:text-lg text-gray-600 mb-6 leading-relaxed">
                {content.subtitle}
              </p>
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-gray-500 border-b border-gray-200 pb-6">
                <div className="flex items-center">
                  <User size={16} className="mr-2" />
                  <span className="font-medium">{content.author}</span>
                  <span className="mx-2">•</span>
                  <span>{content.authorTitle}</span>
                </div>
                <div className="flex items-center">
                  <Calendar size={16} className="mr-2" />
                  <span>{article.date}</span>
                </div>
                <a href="#comments" className="flex items-center hover:text-motortrend-red transition-colors">
                  <MessageSquare size={16} className="mr-2" />
                  <span>{mockComments.reduce((count, comment) => count + 1 + (comment.replies?.length || 0), 0)} comments</span>
                </a>
              </div>
            </header>
            <div className="mb-8 sm:mb-12">
              <div className="relative overflow-hidden rounded-xl shadow-lg">
                <img 
                  src={article.imageUrl} 
                  alt={article.title} 
                  className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover"
                  loading="eager" 
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 sm:p-6">
                  <p className="text-sm sm:text-base text-white opacity-90">
                    Mercedes EQS SUV showcases the future of electric luxury with industry-leading range capabilities.
                  </p>
                </div>
              </div>
            </div>
            <section className="prose prose-lg max-w-none mb-8 sm:mb-12">
              {/* BuyersGuideCard for Honda Accord articles */}
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
              {/* Article content sections */}
              {content.sections && content.sections.map((section, index) => (
                <React.Fragment key={index}>
                  {section.type === 'paragraph' && (
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6">
                      {section.content}
                    </p>
                  )}
                  {section.type === 'heading' && (
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-8 sm:mt-12 mb-6">
                      {section.content}
                    </h2>
                  )}
                  {section.type === 'specs' && (
                    <div className="bg-gray-50 rounded-xl p-4 sm:p-6 my-6 sm:my-8">
                      <h3 className="text-lg sm:text-xl font-semibold mb-4">{section.title}</h3>
                      <div className="space-y-3">
                        {section.data.map((item, i) => (
                          <div key={i} className="flex justify-between text-base sm:text-lg text-gray-700">
                            <span>{item.label}</span>
                            <span className="font-semibold">{item.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {section.type === 'quote' && (
                    <blockquote className="border-l-4 border-motortrend-red pl-4 italic my-6 sm:my-8">
                      <p className="text-base sm:text-lg text-gray-600">{section.content}</p>
                      {section.author && (
                        <footer className="text-sm text-gray-500 mt-2">— {section.author}</footer>
                      )}
                    </blockquote>
                  )}
                </React.Fragment>
              ))}
            </section>
            <section id="comments" className="mt-8 sm:mt-12 pb-8 sm:pb-12">
              <CommentsSection 
                articleId={article.id}
                comments={mockComments}
              />
            </section>
            {/* Only show scroll-to-top button for the first article */}
            {idx === 0 && showScrollTop && (
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 p-2 sm:p-3 bg-neutral-900/90 backdrop-blur-sm text-white rounded-full shadow-lg hover:bg-neutral-800 transition-colors z-50"
              >
                <ChevronUp size={20} className="sm:w-6 sm:h-6" />
              </button>
            )}
          </main>
        );
      })}
    </div>
  );
}

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
    <div className="min-h-screen bg-gray-50">
      <div className="fixed top-0 left-0 right-0 z-50 progress-indicator-red">
        <Progress 
          value={readingProgress} 
          className="h-3 rounded-none bg-gray-200" 
        />
      </div>

      <main className="max-w-[720px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <header className="mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            {article.title}
          </h1>

          <p className="text-base sm:text-lg text-gray-600 mb-6 leading-relaxed">
            {mockContent.subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-gray-500 border-b border-gray-200 pb-6">
            <div className="flex items-center">
              <User size={16} className="mr-2" />
              <span className="font-medium">{mockContent.author}</span>
              <span className="mx-2">•</span>
              <span>{mockContent.authorTitle}</span>
            </div>
            <div className="flex items-center">
              <Calendar size={16} className="mr-2" />
              <span>{article.date}</span>
            </div>

            <a href="#comments" className="flex items-center hover:text-motortrend-red transition-colors">
              <MessageSquare size={16} className="mr-2" />
              <span>{mockComments.reduce((count, comment) => count + 1 + (comment.replies?.length || 0), 0)} comments</span>
            </a>
          </div>
        </header>

        <div className="mb-8 sm:mb-12">
          <div className="relative overflow-hidden rounded-xl shadow-lg">
            <img 
              src={article.imageUrl} 
              alt={article.title} 
              className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover"
              loading="eager" 
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 sm:p-6">
              <p className="text-sm sm:text-base text-white opacity-90">
                Mercedes EQS SUV showcases the future of electric luxury with industry-leading range capabilities.
              </p>
            </div>
          </div>
        </div>

        <section className="prose prose-lg max-w-none mb-8 sm:mb-12">
          {/* First show the BuyersGuideCard */}
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

          {/* Then show the article content */}
          {mockContent.sections.map((section, index) => {
            
            return (
              <React.Fragment key={index}>
                {section.type === 'paragraph' && (
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6">
                    {section.content}
                  </p>
                )}
                

                
                {section.type === 'heading' && (
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-8 sm:mt-12 mb-6">
                    {section.content}
                  </h2>
                )}
                
                {section.type === 'specs' && (
                  <div className="bg-gray-50 rounded-xl p-4 sm:p-6 my-6 sm:my-8">
                    <h3 className="text-lg sm:text-xl font-semibold mb-4">{section.title}</h3>
                    <div className="space-y-3">
                      {section.data.map((item, i) => (
                        <div key={i} className="flex justify-between items-center">
                          <span className="text-sm sm:text-base text-gray-600">{item.label}</span>
                          <span className="text-sm sm:text-base font-medium">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {section.type === 'quote' && (
                  <blockquote className="border-l-4 border-motortrend-red pl-4 italic my-6 sm:my-8">
                    <p className="text-base sm:text-lg text-gray-600">{section.content}</p>
                    {section.author && (
                      <footer className="text-sm text-gray-500 mt-2">— {section.author}</footer>
                    )}
                  </blockquote>
                )}
              </React.Fragment>
            );

            return null;
          })}
        </section>

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
