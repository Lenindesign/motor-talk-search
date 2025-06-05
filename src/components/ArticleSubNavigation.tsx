
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ArticleSection {
  id: string;
  title: string;
  type: 'heading' | 'paragraph' | 'quote' | 'specs';
  thumbnail?: string;
  element?: HTMLElement;
}

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
  const [sections, setSections] = useState<ArticleSection[]>([]);
  const [activeSectionId, setActiveSectionId] = useState<string>('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [sectionProgress, setSectionProgress] = useState<Record<string, number>>({});
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Extract sections from the article content
  const extractSections = useCallback(() => {
    const articleElement = document.querySelector(`article[data-article-id="${articleId}"]`) || 
                          document.querySelector('article');
    
    if (!articleElement) return;

    const headings = articleElement.querySelectorAll('h1, h2, h3');
    const extractedSections: ArticleSection[] = [];

    // Add introduction section
    extractedSections.push({
      id: 'introduction',
      title: 'Introduction',
      type: 'paragraph',
      thumbnail: imageUrl
    });

    headings.forEach((heading, index) => {
      const id = `section-${index}`;
      heading.id = id;
      
      extractedSections.push({
        id,
        title: heading.textContent || `Section ${index + 1}`,
        type: 'heading',
        thumbnail: imageUrl,
        element: heading as HTMLElement
      });
    });

    setSections(extractedSections);
  }, [articleId, imageUrl]);

  // Set up intersection observer for section tracking
  useEffect(() => {
    extractSections();

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter(entry => entry.isIntersecting)
          .map(entry => entry.target.id);

        if (visibleSections.length > 0) {
          setActiveSectionId(visibleSections[0]);
        }

        // Calculate section-specific progress
        entries.forEach(entry => {
          if (entry.target.id) {
            const rect = entry.boundingClientRect;
            const progress = Math.max(0, Math.min(100, 
              ((window.innerHeight - rect.top) / (window.innerHeight + rect.height)) * 100
            ));
            
            setSectionProgress(prev => ({
              ...prev,
              [entry.target.id]: progress
            }));
          }
        });
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1],
        rootMargin: '-20% 0px -70% 0px'
      }
    );

    observerRef.current = observer;

    // Observe all sections
    setTimeout(() => {
      sections.forEach(section => {
        const element = document.getElementById(section.id);
        if (element) {
          observer.observe(element);
        }
      });
    }, 100);

    return () => {
      observer.disconnect();
    };
  }, [extractSections, sections]);

  const handleSectionClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 120; // Account for sticky headers
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      setActiveSectionId(sectionId);
      onSectionClick?.(sectionId);
    }
  };

  if (sections.length === 0) return null;

  return (
    <div className="sticky top-16 z-40 bg-white border-b border-gray-200 shadow-sm">
      {/* Progress Bar */}
      <div className="h-1 bg-gray-100">
        <div 
          className="h-full bg-motortrend-red transition-all duration-300 ease-out"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Navigation Bar */}
      <div className="relative">
        <div className="flex items-center justify-between px-4 py-3 bg-white">
          <div className="flex items-center space-x-4 overflow-x-auto scrollbar-none">
            {sections.slice(0, isExpanded ? sections.length : 4).map((section, index) => (
              <button
                key={section.id}
                onClick={() => handleSectionClick(section.id)}
                className={cn(
                  "flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap",
                  "hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-motortrend-red focus:ring-offset-1",
                  activeSectionId === section.id 
                    ? "bg-motortrend-red text-white shadow-md" 
                    : "text-gray-700 hover:text-motortrend-red"
                )}
              >
                {section.thumbnail && (
                  <div className="w-8 h-8 rounded overflow-hidden flex-shrink-0">
                    <img 
                      src={section.thumbnail} 
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <span className="truncate max-w-32">{section.title}</span>
                
                {/* Section Progress Indicator */}
                {activeSectionId === section.id && sectionProgress[section.id] > 0 && (
                  <div className="w-12 h-1 bg-white/30 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-white transition-all duration-200"
                      style={{ width: `${sectionProgress[section.id]}%` }}
                    />
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Expand/Collapse Button */}
          {sections.length > 4 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center space-x-1 px-3 py-2 text-gray-600 hover:text-motortrend-red transition-colors duration-200"
            >
              <span className="text-sm font-medium">
                {isExpanded ? 'Less' : 'More'}
              </span>
              {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          )}
        </div>

        {/* Expanded Sections */}
        {isExpanded && sections.length > 4 && (
          <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg animate-fade-in">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 p-4">
              {sections.slice(4).map((section) => (
                <button
                  key={section.id}
                  onClick={() => handleSectionClick(section.id)}
                  className={cn(
                    "flex items-center space-x-2 p-3 rounded-lg text-sm transition-all duration-200",
                    "hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-motortrend-red",
                    activeSectionId === section.id 
                      ? "bg-motortrend-red text-white" 
                      : "text-gray-700 hover:text-motortrend-red"
                  )}
                >
                  {section.thumbnail && (
                    <div className="w-10 h-10 rounded overflow-hidden flex-shrink-0">
                      <img 
                        src={section.thumbnail} 
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <span className="truncate">{section.title}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleSubNavigation;
