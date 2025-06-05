
import { useRef, useEffect } from 'react';

interface UseAutoScrollProps {
  activeIndex: number;
  itemsLength: number;
}

export const useAutoScroll = ({ activeIndex, itemsLength }: UseAutoScrollProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Set ref for each item
  const setItemRef = (index: number) => (ref: HTMLButtonElement | null) => {
    itemRefs.current[index] = ref;
  };

  useEffect(() => {
    if (!containerRef.current || activeIndex < 0) return;

    const container = containerRef.current;
    const activeItem = itemRefs.current[activeIndex];
    
    if (!activeItem) return;

    const containerRect = container.getBoundingClientRect();
    const itemRect = activeItem.getBoundingClientRect();
    
    // Check if item is fully visible
    const isItemVisible = 
      itemRect.left >= containerRect.left && 
      itemRect.right <= containerRect.right;

    if (!isItemVisible) {
      // Calculate scroll position to center the item
      const containerScrollLeft = container.scrollLeft;
      const itemOffsetLeft = activeItem.offsetLeft;
      const itemWidth = activeItem.offsetWidth;
      const containerWidth = container.offsetWidth;
      
      // Center the item in the container
      const targetScrollLeft = itemOffsetLeft - (containerWidth / 2) + (itemWidth / 2);
      
      container.scrollTo({
        left: Math.max(0, targetScrollLeft),
        behavior: 'smooth'
      });
    }
  }, [activeIndex]);

  return {
    containerRef,
    setItemRef
  };
};
