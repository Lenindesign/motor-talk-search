import React, { ReactNode, useEffect, useRef, useState } from 'react';

interface StickyRelayProps {
  children: ReactNode[];
  headerOffset?: number;
  stickDistance?: number; // How long each component should stay sticky
  transitionBuffer?: number; // Buffer zone for the transition
  componentOffsets?: number[]; // Custom offset for each component
}

const StickyRelay: React.FC<StickyRelayProps> = ({
  children,
  headerOffset = 120, // Adjust according to your header height
  stickDistance = 1000, // Each component will stay sticky for 1000px of scroll
  transitionBuffer = 100, // Buffer to start transition before components would overlap
  componentOffsets, // Custom offsets for components
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0); // 0-1 transition progress
  const [hasScrolledPastFirst, setHasScrolledPastFirst] = useState(false);

  // Calculate the position where each component should start appearing
  // If componentOffsets is provided, use those values; otherwise use default spacing
  const getComponentOffset = (index: number): number => {
    if (componentOffsets && componentOffsets[index] !== undefined) {
      return componentOffsets[index];
    }
    return index * stickDistance;
  };

  // Calculate the total height needed for the container
  const getTotalHeight = (): number => {
    if (componentOffsets && componentOffsets.length >= children.length) {
      return Math.max(...componentOffsets) + stickDistance;
    }
    return children.length * stickDistance;
  };

  useEffect(() => {
    // Reset refs array on children change
    itemRefs.current = itemRefs.current.slice(0, children.length);
    
    // Create a sentinel for each transition point
    const sentinelElements: HTMLDivElement[] = [];
    
    // Special sentinel for the first component's full display period
    const firstComponentEndPosition = getComponentOffset(1) - transitionBuffer;
    const firstComponentEndSentinel = document.createElement('div');
    firstComponentEndSentinel.style.position = 'absolute';
    firstComponentEndSentinel.style.height = '1px';
    firstComponentEndSentinel.style.width = '100%';
    firstComponentEndSentinel.style.top = `${firstComponentEndPosition}px`;
    firstComponentEndSentinel.style.left = '0';
    firstComponentEndSentinel.style.pointerEvents = 'none';
    firstComponentEndSentinel.setAttribute('data-action', 'first-component-end');
    
    if (containerRef.current) {
      containerRef.current.appendChild(firstComponentEndSentinel);
      sentinelElements.push(firstComponentEndSentinel);
    }
    
    // Create sentinels for transitions
    for (let i = 0; i < children.length; i++) {
      const currentPosition = getComponentOffset(i);
      const nextPosition = getComponentOffset(i + 1);
      
      // Skip early transition for first component (index 0)
      if (i > 0) {
        // Early transition sentinel (starts transition early)
        const earlyTransitionPoint = currentPosition - transitionBuffer;
        if (earlyTransitionPoint >= 0) {
          const earlySentinel = document.createElement('div');
          earlySentinel.style.position = 'absolute';
          earlySentinel.style.height = '1px';
          earlySentinel.style.width = '100%';
          earlySentinel.style.top = `${earlyTransitionPoint}px`;
          earlySentinel.style.left = '0';
          earlySentinel.style.pointerEvents = 'none';
          earlySentinel.setAttribute('data-action', 'start-transition');
          earlySentinel.setAttribute('data-index', i.toString());
          
          if (containerRef.current) {
            containerRef.current.appendChild(earlySentinel);
            sentinelElements.push(earlySentinel);
          }
        }
      }
      
      // Main sentinel (for actual component change)
      const mainSentinel = document.createElement('div');
      mainSentinel.style.position = 'absolute';
      mainSentinel.style.height = '1px';
      mainSentinel.style.width = '100%';
      mainSentinel.style.top = `${currentPosition}px`;
      mainSentinel.style.left = '0';
      mainSentinel.style.pointerEvents = 'none';
      mainSentinel.setAttribute('data-action', 'change-active');
      mainSentinel.setAttribute('data-index', i.toString());
      
      if (containerRef.current) {
        containerRef.current.appendChild(mainSentinel);
        sentinelElements.push(mainSentinel);
      }
    }

    // Handle scroll for progress tracking
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const containerRect = containerRef.current.getBoundingClientRect();
      const currentScrollPos = window.scrollY;
      
      // Calculate current progress for transition
      const currentPosition = getComponentOffset(activeIndex);
      const nextPosition = getComponentOffset(activeIndex + 1);
      
      if (nextPosition && nextPosition > currentPosition) {
        const transitionStartPos = nextPosition - transitionBuffer;
        const progressValue = Math.max(0, Math.min(1, 
          (currentScrollPos - (containerRect.top + transitionStartPos)) / 
          (transitionBuffer)
        ));
        setProgress(progressValue);
      }
    };

    // Create observer for detecting section changes
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const action = entry.target.getAttribute('data-action');
          
          if (action === 'first-component-end') {
            setHasScrolledPastFirst(true);
          } else if (action === 'change-active') {
            const index = parseInt(entry.target.getAttribute('data-index') || '0', 10);
            setActiveIndex(index);
          }
        }
      });
    }, {
      root: null,
      rootMargin: `${-headerOffset}px 0px 0px 0px`,
      threshold: 0.1
    });

    // Observe all sentinels
    sentinelElements.forEach(sentinel => {
      observer.observe(sentinel);
    });

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      // Clean up
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      sentinelElements.forEach(sentinel => {
        sentinel.parentNode?.removeChild(sentinel);
      });
    };
  }, [children.length, headerOffset, stickDistance, transitionBuffer, activeIndex, componentOffsets]);

  return (
    <div 
      ref={containerRef} 
      className="hidden lg:block relative" 
      style={{ 
        // Total height of container needs to accommodate all sticky regions
        minHeight: `${getTotalHeight()}px`,
      }}
    >
      {children.map((child, index) => {
        // Current item styles
        const isActive = index === activeIndex;
        const isBeforeActive = index < activeIndex;
        const isNextActive = index === activeIndex + 1;
        
        // Special handling for first component
        const isFirst = index === 0;
        const shouldTransition = hasScrolledPastFirst || !isFirst;
        
        // For the current active item that's about to be pushed out
        const exitTransform = isActive && progress > 0 && shouldTransition ? 
          `translateY(${-100 * progress}%)` : 
          isBeforeActive ? 'translateY(-100%)' : 'translateY(0)';
          
        // For the next item that's about to become active
        const enterTransform = isNextActive && progress > 0 ?
          `translateY(${(1 - progress) * 100}%)` :
          'translateY(0)';
          
        const transform = isNextActive ? enterTransform : exitTransform;
        
        // Opacity transitions - special handling for first component
        const opacity = isFirst && !hasScrolledPastFirst ? 1 :
                        isBeforeActive ? 0 : 
                        isActive ? 1 - (shouldTransition ? progress : 0) : 
                        isNextActive ? progress : 
                        index > activeIndex + 1 ? 0 : 1;
        
        // Z-index handling to ensure proper stacking during transitions
        const zIndex = isFirst && !hasScrolledPastFirst ? children.length + 2 :
                       isActive ? children.length + 1 : 
                       isNextActive ? children.length : 
                       children.length - index;
        
        return (
          <div
            key={index}
            ref={el => itemRefs.current[index] = el}
            className="sticky-relay-item"
            style={{
              position: 'sticky',
              top: `${headerOffset}px`,
              zIndex,
              opacity,
              transform,
              transition: 'transform 0.2s ease-out, opacity 0.2s ease-out',
              height: 'max-content',
              marginBottom: '16px',
              // Hide items that are not relevant to the current view
              visibility: (isActive || isNextActive || (!isBeforeActive && index === activeIndex - 1) || (isFirst && !hasScrolledPastFirst)) ? 'visible' : 'hidden'
            }}
          >
            {child}
          </div>
        );
      })}
    </div>
  );
};

export default StickyRelay; 