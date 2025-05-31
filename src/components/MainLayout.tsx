import React from "react";
import GlobalHeader from "@/components/GlobalHeader";
import MobileStickySearch from "@/components/MobileStickySearch";
interface MainLayoutProps {
  children: React.ReactNode;
  onSearch?: (query: string) => void;
  isLoading?: boolean;
}
const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  onSearch,
  isLoading = false
}) => {
  return <div className="flex flex-col min-h-screen bg-color-neutral-8">
      {/* Fixed nav bar */}
      <GlobalHeader onSearch={onSearch} isLoading={isLoading} />
      <MobileStickySearch onSearch={onSearch} isLoading={isLoading} />
      
      {/* Spacer for fixed header + search bar on mobile */}
      <div style={{
      height: 80
    }} className="sm:hidden py-[24px]" />
      
      {/* Main content */}
      <main className="flex-1">
        {children}
      </main>
    </div>;
};
export default MainLayout;