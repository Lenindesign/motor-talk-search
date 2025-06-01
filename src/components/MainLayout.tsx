
import React from "react";
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
  return (
    <div className="flex flex-col min-h-screen bg-color-neutral-8">
      {/* Fixed nav bar (hide for garage page) */}
      {!isGaragePage && (
        <>
          <GlobalHeader onSearch={onSearch} isLoading={isLoading} />
          <MobileStickySearch onSearch={onSearch} isLoading={isLoading} />
        </>
      )}
      {/* Conditional spacer - smaller for garage page */}
      <div 
        style={{ height: isGaragePage ? 0 : 80 }} 
        className="sm:hidden py-[12px]" 
      />
      
      {/* Main content */}
      <main className="flex-1">
        <Container>
          {children}
        </Container>
      </main>
    </div>
  );
};

export default MainLayout;
