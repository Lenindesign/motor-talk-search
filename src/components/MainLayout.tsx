import React from "react";
import { Outlet } from "react-router-dom";
import GlobalHeader from "@/components/GlobalHeader";
import MobileStickySearch from "@/components/MobileStickySearch";
interface MainLayoutProps {
  children: React.ReactNode;
}
const MainLayout: React.FC<MainLayoutProps> = ({
  children
}) => {
  console.log("MainLayout is rendering");
  return <div className="flex flex-col min-h-screen bg-neutral-8 mx-0">
      {/* Fixed nav bar */}
      <GlobalHeader />
      <MobileStickySearch />
      
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