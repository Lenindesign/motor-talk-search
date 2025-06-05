
import { useState, useEffect, useRef, useCallback } from 'react';

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

  // Extract articles from the page
  const extractSections = useCallback(() => {
    const extractAndSetSections = () => {
      const articleElements = document.querySelectorAll('article[data-article-id]');
      const extractedSections: ArticleSection[] = [];

      console.log(`Found ${articleElements.length} article elements on page`);

      articleElements.forEach((articleElement, index) => {
        const articleId = articleElement.getAttribute('data-article-id');
        const titleElement = articleElement.querySelector('h1');
        const imageElement = articleElement.querySelector('img');
        
        console.log(`Processing article ${index + 1}:`, {
          articleId,
          title: titleElement?.textContent,
          hasImage: !!imageElement
        });
        
        if (articleId && titleElement) {
          extractedSections.push({
            id: articleId,
            title: titleElement.textContent || 'Untitled Article',
            type: 'heading',
            thumbnail: imageElement?.src || imageUrl,
            element: articleElement as HTMLElement
          });
        }
      });

      console.log('Final extracted sections:', extractedSections);
      setSections(extractedSections);
      
      // Set the first article as active if none is set
      if (extractedSections.length > 0 && !activeSectionId) {
        setActiveSectionId(extractedSections[0].id);
      }
    };

    // Try multiple times with increasing delays to ensure all articles are loaded
    setTimeout(extractAndSetSections, 100);
    setTimeout(extractAndSetSections, 500);
    setTimeout(extractAndSetSections, 1000);
    setTimeout(extractAndSetSections, 2000);
  }, [imageUrl, activeSectionId]);

  // Set up intersection observer for article tracking
  useEffect(() => {
    extractSections();

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

    // Observe all article elements with multiple attempts
    const observeArticles = () => {
      const articleElements = document.querySelectorAll('article[data-article-id]');
      console.log(`Observing ${articleElements.length} article elements`);
      articleElements.forEach(article => {
        observer.observe(article);
      });
    };

    // Try observing at different intervals to catch dynamically loaded content
    setTimeout(observeArticles, 200);
    setTimeout(observeArticles, 600);
    setTimeout(observeArticles, 1200);

    // Re-extract sections when the page loads and on scroll
    const handleLoad = () => {
      setTimeout(extractSections, 500);
    };

    const handleScroll = () => {
      // Re-extract sections periodically when scrolling to catch any new articles
      setTimeout(extractSections, 100);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    // Also listen for scroll events to detect new articles
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('load', handleLoad);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [extractSections]);

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
    }
  };

  return {
    sections,
    activeSectionId,
    sectionProgress,
    handleSectionClick
  };
};
