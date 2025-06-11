import React, { useEffect, useRef, useState } from 'react';

interface StickySidebarProps {
  children: React.ReactNode[];
  threshold?: number; // Threshold in pixels for each component
  topOffset?: number; // Distance from top of viewport
}

const StickySidebar: React.FC<StickySidebarProps> = ({
  children,
  threshold = 800,
  topOffset = 80, // Default top offset to account for header
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const scrollPositionRef = useRef(0);

  // Initialize section refs array based on children count
  useEffect(() => {
    sectionRefs.current = Array(children.length).fill(null);
  }, [children.length]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Track scroll position
    const handleScroll = () => {
      scrollPositionRef.current = window.scrollY;
      
      // Calculate which component should be sticky based on scroll position
      const scrollPosition = window.scrollY;
      const containerTop = container.getBoundingClientRect().top + window.scrollY;
      const relativeScroll = scrollPosition - containerTop;
      
      // Calculate which section should be active based on scroll position
      const newActiveIndex = Math.min(
        Math.floor(relativeScroll / threshold),
        children.length - 1
      );
      
      if (newActiveIndex >= 0 && newActiveIndex !== activeIndex) {
        setActiveIndex(newActiveIndex);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeIndex, children.length, threshold]);

  return (
    <div ref={containerRef} className="relative">
      {children.map((child, index) => {
        const isActive = index === activeIndex;
        
        return (
          <div
            key={index}
            ref={el => sectionRefs.current[index] = el}
            className={`transition-all duration-300 ${
              isActive 
                ? 'sticky opacity-100 translate-y-0' 
                : index < activeIndex 
                  ? 'opacity-0 -translate-y-4' 
                  : 'opacity-100 translate-y-0'
            }`}
            style={{
              top: isActive ? `${topOffset}px` : 'auto',
              zIndex: isActive ? 10 : 'auto',
            }}
          >
            {child}
          </div>
        );
      })}
    </div>
  );
};

export default StickySidebar;
