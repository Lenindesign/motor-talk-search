
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

  // Initialize sections from mock data on mount
  useEffect(() => {
    const initialSections = createSectionsFromMockData();
    console.log('Setting initial sections from mock data:', initialSections);
    setSections(initialSections);
    
    // Set the first article as active
    if (initialSections.length > 0) {
      setActiveSectionId(initialSections[0].id);
    }
  }, [createSectionsFromMockData]);

  // Update section elements when articles are rendered
  const updateSectionElements = useCallback(() => {
    const articleElements = document.querySelectorAll('article[data-article-id]');
    console.log(`Found ${articleElements.length} rendered article elements`);

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

  // Set up intersection observer for article tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the article with the highest intersection ratio
        let mostVisibleArticle = '';
        let highestRatio = 0;

        entries.forEach(entry => {
          const articleId = entry.target.getAttribute('data-article-id');
          if (articleId && entry.intersectionRatio > highestRatio) {
            highestRatio = entry.intersectionRatio;
            mostVisibleArticle = articleId;
          }

          // Calculate progress for each article
          if (articleId) {
            const rect = entry.boundingClientRect;
            const windowHeight = window.innerHeight;
            
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

        if (mostVisibleArticle && highestRatio > 0.1) {
          setActiveSectionId(mostVisibleArticle);
        }
      },
      {
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
        rootMargin: '-100px 0px -100px 0px'
      }
    );

    observerRef.current = observer;

    // Observe article elements as they appear
    const observeArticles = () => {
      const articleElements = document.querySelectorAll('article[data-article-id]');
      console.log(`Observing ${articleElements.length} article elements`);
      articleElements.forEach(article => {
        observer.observe(article);
      });
      updateSectionElements();
    };

    // Initial observation and multiple retries to catch lazy-loaded content
    setTimeout(observeArticles, 100);
    setTimeout(observeArticles, 500);
    setTimeout(observeArticles, 1000);
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
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [updateSectionElements]);

  const handleSectionClick = (sectionId: string, onSectionClick?: (sectionId: string) => void) => {
    const element = document.querySelector(`article[data-article-id="${sectionId}"]`);
    if (element) {
      const headerOffset = 120; // Account for sticky headers
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      setActiveSectionId(sectionId);
      onSectionClick?.(sectionId);
    } else {
      // If article isn't rendered yet, scroll to trigger lazy loading
      console.log(`Article ${sectionId} not found, may need to scroll to load it`);
      setActiveSectionId(sectionId);
      onSectionClick?.(sectionId);
    }
  };

  return {
    sections,
    activeSectionId,
    sectionProgress,
    handleSectionClick
  };
};
