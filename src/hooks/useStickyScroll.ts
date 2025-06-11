import { useState, useEffect, RefObject } from 'react';

interface StickyScrollOptions {
  startOffset?: number;
  endOffset?: number;
  stickyUntilEnd?: boolean;
  order?: number; // Order of the component in the sequence
  previousHeight?: number; // Height of the previous component
}

/**
 * Custom hook for advanced sticky scroll behavior with sequential components
 * @param ref - Reference to the element that will be sticky
 * @param scrollRange - How many pixels to stay sticky before scrolling away
 * @param options - Additional options for sticky behavior
 */
export const useStickyScroll = (
  ref: RefObject<HTMLElement>,
  scrollRange: number = 0,
  options: StickyScrollOptions = {}
) => {
  const [isSticky, setIsSticky] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [styles, setStyles] = useState<React.CSSProperties>({});
  
  const { 
    startOffset = 0, 
    endOffset = 0, 
    stickyUntilEnd = false,
    order = 0,
    previousHeight = 0
  } = options;

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    const elementHeight = element.offsetHeight;
    
    // Calculate the original position of the element
    const calculateOriginalTop = () => {
      return element.getBoundingClientRect().top + window.scrollY;
    };
    
    // Initial position
    let originalTop = calculateOriginalTop();
    
    // Recalculate on resize
    const handleResize = () => {
      originalTop = calculateOriginalTop();
    };
    
    const handleScroll = () => {
      if (!element) return;
      
      const scrollPosition = window.scrollY;
      
      // Calculate the start position based on the scroll range of previous components
      const startPosition = originalTop - startOffset + (order > 0 ? previousHeight : 0);
      const endPosition = startPosition + scrollRange;
      
      // Before this component should be sticky
      if (scrollPosition < startPosition) {
        setIsSticky(false);
        setIsActive(false);
        setStyles({});
        return;
      }
      
      // When this component should be sticky
      if (scrollPosition >= startPosition && (stickyUntilEnd || scrollPosition < endPosition)) {
        setIsSticky(true);
        setIsActive(true);
        
        // Calculate top position based on order and previous component heights
        const topPosition = startOffset + (order > 0 ? 0 : 0);
        
        setStyles({
          position: 'sticky',
          top: `${topPosition}px`,
          width: '100%',
          zIndex: 10 - order, // Higher order = lower z-index
          marginBottom: order === 0 ? '0' : '1rem'
        });
        return;
      }
      
      // After the sticky range, element should scroll away
      if (!stickyUntilEnd && scrollPosition >= endPosition) {
        setIsSticky(false);
        setIsActive(false);
        
        // Let it continue scrolling normally
        setStyles({});
        return;
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    // Initial check
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [ref, scrollRange, startOffset, endOffset, stickyUntilEnd, order, previousHeight]);

  return { isSticky, isActive, styles };
};

export default useStickyScroll;
