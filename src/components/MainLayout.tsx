console.log("MobileStickySearch is rendering");
console.log("MainLayout is rendering");
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
  return <div className="flex flex-col min-h-screen bg-neutral-8">
      {/* Fixed nav bar */}
      <GlobalHeader onSearch={onSearch} isLoading={isLoading} />
      <MobileStickySearch onSearch={onSearch} isLoading={isLoading} />
      {/* Spacer for fixed header + search bar on mobile */}
      <div style={{
      height: 80
    }} className="sm:hidden py-4" />
      {/* Main content */}
      <main className="">
        {children}
      </main>
    </div>;
};
export default MainLayout;