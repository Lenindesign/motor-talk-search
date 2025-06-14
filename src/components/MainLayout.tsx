
import React from "react";
import { useLocation } from "react-router-dom";
import GlobalHeader from "@/components/GlobalHeader";
import MobileStickySearch from "@/components/MobileStickySearch";
import Container from "@/components/Container";

interface MainLayoutProps {
  children: React.ReactNode;
  onSearch?: (query: string) => void;
  isLoading?: boolean;
  isGaragePage?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  onSearch,
  isLoading = false,
  isGaragePage = false
}) => {
  const location = useLocation();
  
  // Hide navigation for shorts pages and garage page
  const shouldHideNavigation = isGaragePage || location.pathname.startsWith('/shorts');
  
  // Don't use container for shorts pages (they need full screen)
  const isFullScreen = location.pathname.startsWith('/shorts');

  return (
    <div className="w-full">
      {/* Fixed nav bar (hide for garage page and shorts pages) */}
      {!shouldHideNavigation && (
        <>
          <GlobalHeader onSearch={onSearch} isLoading={isLoading} />
          <MobileStickySearch onSearch={onSearch} isLoading={isLoading} />
        </>
      )}
      
      {/* Conditional spacer - smaller for garage page and no spacer for shorts */}
      <div 
        style={{
          height: shouldHideNavigation ? 0 : 80
        }} 
        className="sm:hidden py-[12px]" 
      />
      
      {/* Main content */}
      {isFullScreen ? (
        // Full screen layout for shorts
        <main>
          {children}
        </main>
      ) : (
        // Regular layout with container and tablet margins
        <main className="bg-gray-50 md:mx-6 lg:mx-8">
          <Container>
            {children}
          </Container>
        </main>
      )}
    </div>
  );
};

export default MainLayout;
