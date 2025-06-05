
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

  const handleSectionClick = (sectionId: string, onSectionClick?: (sectionId: string) => void) => {
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

  return {
    sections,
    activeSectionId,
    sectionProgress,
    handleSectionClick
  };
};
