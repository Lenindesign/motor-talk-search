import { useState, useEffect, useRef } from 'react';

interface Section {
  id: string;
  element?: HTMLElement;
}

/**
 * Hook to track which section is currently active based on scroll position
 * @param sections Array of section objects with id and optional element reference
 * @param offset Offset from the top of the viewport to consider a section in view (in pixels)
 * @returns The ID of the currently active section
 */
export const useActiveSection = (sections: Section[], offset = 100) => {
  const [activeSection, setActiveSection] = useState<string>('');
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());

  // Register a section element
  const registerSection = (id: string, element: HTMLElement | null) => {
    if (element) {
      sectionRefs.current.set(id, element);
    }
  };

  useEffect(() => {
    // Initialize with sections that already have elements
    sections.forEach(section => {
      if (section.element) {
        sectionRefs.current.set(section.id, section.element);
      }
    });

    const handleScroll = () => {
      // Get current scroll position with offset
      const scrollPosition = window.scrollY + offset;
      
      // Find the section that is currently in view
      let currentSection = '';
      let minDistance = Number.MAX_VALUE;

      sectionRefs.current.forEach((element, id) => {
        const { top, bottom } = element.getBoundingClientRect();
        const distance = Math.abs(top);
        
        // Section is in view if its top is above the offset and bottom is below
        if (top <= offset && bottom > offset) {
          if (distance < minDistance) {
            currentSection = id;
            minDistance = distance;
          }
        }
      });

      // If no section is directly at the offset point, find the closest one
      if (!currentSection && sectionRefs.current.size > 0) {
        sectionRefs.current.forEach((element, id) => {
          const { top } = element.getBoundingClientRect();
          const distance = Math.abs(top - offset);
          
          if (distance < minDistance) {
            currentSection = id;
            minDistance = distance;
          }
        });
      }

      if (currentSection && currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };

    // Initial check
    handleScroll();

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sections, offset, activeSection]);

  return {
    activeSection,
    registerSection
  };
};
