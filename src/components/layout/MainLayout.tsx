import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalHeader from '@/components/GlobalHeader';
import SubNavBar from '@/components/SubNavBar';
import GlobalFooter from '@/components/GlobalFooter';
import MobileStickySearch from '@/components/MobileStickySearch';

interface MainLayoutProps {
  children: ReactNode;
  isLoading?: boolean; 
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, isLoading = false }) => {
  const navigate = useNavigate();
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const measureHeaderHeight = () => {
      if (headerRef.current) {
        const currentHeaderHeight = headerRef.current.offsetHeight;
        console.log('[MainLayout] Measuring header:', {
          current: currentHeaderHeight,
          previous: headerHeight,
          ref: headerRef.current
        });
        
        if (currentHeaderHeight > 0) {
          setHeaderHeight(currentHeaderHeight);
        }
      }
    };

    // Measure immediately
    measureHeaderHeight();

    // Re-measure after layout effects (images, fonts loaded)
    const rafId = requestAnimationFrame(() => {
      measureHeaderHeight();
    });

    // Re-measure after a delay for any dynamic content
    const timeoutId = setTimeout(measureHeaderHeight, 500);

    // Re-measure on window resize
    window.addEventListener('resize', measureHeaderHeight);

    // Cleanup
    return () => {
      window.removeEventListener('resize', measureHeaderHeight);
      clearTimeout(timeoutId);
      cancelAnimationFrame(rafId);
    };
  }, []); // Remove headerHeight dependency to avoid re-running effect

  const handleSearch = (query: string) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  }

  return (
    <div className="flex flex-col min-h-screen bg-motortrend-gray">
      <div ref={headerRef} className="relative w-full" style={{ zIndex: 9999, position: 'relative' }}>
        <GlobalHeader onSearch={handleSearch} isLoading={isLoading} />
      </div>

      {/* Subnavigation bar wrapper - ensure lower z-index than dropdown */}
      <div className="w-full" style={{ position: 'relative', zIndex: 9998 }}>
        <SubNavBar />
      </div>

      {/* Add a spacer div to push content below fixed header */}
      <div style={{ height: `${headerHeight}px` }} />

      {/* MobileStickySearch will only render on mobile, and only if headerHeight is measured */}
      {headerHeight > 0 && (
        <MobileStickySearch 
          onSearch={handleSearch} 
          isLoading={isLoading} 
        />
      )}

      <main className="flex-grow px-2 sm:px-4 py-4" style={{ border: '2px solid red' }}>
        {/* Add top padding on mobile to account for the sticky search */}
        <div className="sm:hidden" style={{ height: '60px' }} />
        <div className="max-w-[980px] mx-auto" style={{ border: '2px solid blue' }}>
          {children}
        </div>
      </main>

    </div>
  );
};

export default MainLayout;