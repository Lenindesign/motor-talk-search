
import { useState, useEffect, useRef, useCallback } from 'react';
import { mockArticles } from '@/services/mockData';

interface ArticleSection {
  id: string;
  title: string;
  type: 'heading' | 'paragraph' | 'quote' | 'specs';
  thumbnail?: string;
  element?: HTMLElement;
}

export const useSectionNavigation = (articleId: string, imageUrl: string) => {
  const [sections, setSections] = useState<ArticleSection[]>([]);
  const [activeSectionId, setActiveSectionId] = useState<string>('');
  const [sectionProgress, setSectionProgress] = useState<Record<string, number>>({});
  const observerRef = useRef<IntersectionObserver | null>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const lastActiveRef = useRef<string>('');

  // Debounced function to update active section
  const updateActiveSection = useCallback((newActiveId: string) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    
    debounceRef.current = setTimeout(() => {
      if (newActiveId !== lastActiveRef.current) {
        setActiveSectionId(newActiveId);
        lastActiveRef.current = newActiveId;
      }
    }, 100); // 100ms debounce
  }, []);

  // Create sections from all articles that will be loaded (up to 4 starting from current)
  const createSectionsFromMockData = useCallback(() => {
    const currentIndex = mockArticles.findIndex(a => a.id === articleId);
    if (currentIndex === -1) return [];

    const maxArticles = 4;
    const sectionsToShow = mockArticles.slice(currentIndex, currentIndex + maxArticles);
    
    return sectionsToShow.map(article => ({
      id: article.id,
      title: article.title,
      type: 'heading' as const,
      thumbnail: article.imageUrl || imageUrl,
      element: undefined // Will be set when article is rendered
    }));
  }, [articleId, imageUrl]);

  // Update section elements when articles are rendered
  const updateSectionElements = useCallback(() => {
    const articleElements = document.querySelectorAll('article[data-article-id]');

    setSections(prevSections => 
      prevSections.map(section => {
        const element = document.querySelector(`article[data-article-id="${section.id}"]`) as HTMLElement;
        return {
          ...section,
          element: element || section.element
        };
      })
    );
  }, []);

  const handleSectionClick = useCallback((sectionId: string, onSectionClick?: (sectionId: string) => void) => {
    const element = document.querySelector(`article[data-article-id="${sectionId}"]`);
    if (element) {
      const headerOffset = 120; // Account for sticky headers
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      // Immediately update active section for smooth feedback
      setActiveSectionId(sectionId);
      lastActiveRef.current = sectionId;
      onSectionClick?.(sectionId);
    } else {
      // If article isn't rendered yet, scroll to trigger lazy loading
      setActiveSectionId(sectionId);
      lastActiveRef.current = sectionId;
      onSectionClick?.(sectionId);
    }
  }, []);

  // Initialize sections from mock data on mount
  useEffect(() => {
    const initialSections = createSectionsFromMockData();
    setSections(initialSections);
    
    // Set the first article as active
    if (initialSections.length > 0) {
      setActiveSectionId(initialSections[0].id);
      lastActiveRef.current = initialSections[0].id;
    }
  }, [createSectionsFromMockData]);

  // Set up intersection observer for article tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Create a map of articles and their visibility scores
        const visibilityMap = new Map<string, number>();
        
        entries.forEach(entry => {
          const articleId = entry.target.getAttribute('data-article-id');
          if (articleId) {
            const rect = entry.boundingClientRect;
            const windowHeight = window.innerHeight;
            
            // Calculate visibility score based on how much of the article is visible
            let visibilityScore = 0;
            
            if (entry.isIntersecting) {
              // Calculate visible height and viewport coverage
              const visibleTop = Math.max(0, rect.top);
              const visibleBottom = Math.min(rect.bottom, windowHeight);
              const visibleHeight = visibleBottom - visibleTop;
              const totalHeight = rect.height;
              
              // Base visibility score on visible portion
              visibilityScore = Math.max(0, visibleHeight / totalHeight);
              
              // Enhanced scoring for elements near the top of the viewport
              if (rect.top >= -50 && rect.top < windowHeight * 0.3) {
                // Stronger bonus for elements at the top of the viewport
                visibilityScore += 0.6;
              }
              
              // Additional bonus for viewport coverage
              const viewportBonus = visibleHeight / windowHeight;
              visibilityScore += viewportBonus * 0.4; // 40% bonus for viewport coverage
            }
            
            visibilityMap.set(articleId, visibilityScore);

            // Calculate progress for each article
            let progress = 0;
            if (rect.top < 0) {
              // Article is partially above viewport
              progress = Math.min(100, Math.max(0, 
                ((windowHeight + rect.top) / rect.height) * 100
              ));
            } else if (rect.top < windowHeight) {
              // Article is partially or fully in viewport
              progress = Math.min(100, Math.max(0,
                ((windowHeight - rect.top) / rect.height) * 100
              ));
            }
            
            setSectionProgress(prev => ({
              ...prev,
              [articleId]: progress
            }));
          }
        });

        // Find the article with the highest visibility score
        let bestArticle = '';
        let highestScore = 0;
        
        visibilityMap.forEach((score, articleId) => {
          if (score > highestScore) {
            highestScore = score;
            bestArticle = articleId;
          }
        });

        // Update if we have a visible article with sufficient visibility
        if (bestArticle && highestScore > 0.1) {
          updateActiveSection(bestArticle);
        }
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1], // More granular thresholds
        rootMargin: '-40px 0px -40px 0px' // Smaller margins for more precise detection
      }
    );

    observerRef.current = observer;

    // Observe article elements as they appear
    const observeArticles = () => {
      const articleElements = document.querySelectorAll('article[data-article-id]');
      articleElements.forEach(article => {
        observer.observe(article);
      });
      updateSectionElements();
    };

    // Initial observation with delays to catch lazy-loaded content
    setTimeout(observeArticles, 100);
    setTimeout(observeArticles, 500);
    setTimeout(observeArticles, 1000);
    // Additional observation for slower-loading content (especially for v1 route)
    setTimeout(observeArticles, 2000);

    // Listen for new articles being added to the DOM
    const mutationObserver = new MutationObserver(() => {
      setTimeout(observeArticles, 100);
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [updateSectionElements, updateActiveSection]);

  return {
    sections,
    activeSectionId,
    sectionProgress,
    handleSectionClick
  };
};
