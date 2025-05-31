
import React from "react";
import MobileStickySearch from "@/components/MobileStickySearch";

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
      {/* Mobile sticky search only */}
      <MobileStickySearch onSearch={onSearch} isLoading={isLoading} />
      
      {/* Main content */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
