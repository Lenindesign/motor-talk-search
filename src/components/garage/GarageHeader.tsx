import React from "react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { CardTitle, CardDescription } from "@/components/ui/card";
import MainNavigation from "../MainNavigation";
import SearchBar from "../SearchBar";
import { useIsMobile } from "../../hooks/use-mobile";

const GarageHeader = () => {
  const isMobile = useIsMobile();
  
  return (
    <header className="sticky top-0 z-20 bg-motortrend-dark px-6 py-4 shadow-md">
      <div className="flex items-center justify-between max-w-[980px] mx-auto w-full">
        <div className="flex items-center">
          {isMobile && <MainNavigation />}
          <Link to="/" className="flex-shrink-0">
            <img src="/lovable-uploads/6f8fd40c-6013-4f96-89f0-8406d6febb7c.png" alt="MotorTrend Logo" className="h-7 w-auto hover:opacity-80 transition-opacity" />
          </Link>
          <div className="hidden sm:flex ml-6">
            <MainNavigation />
          </div>
        </div>
        <div className="hidden sm:block ml-4">
          <SearchBar onSearch={query => console.log(query)} isLoading={false} variant="header" />
        </div>
      </div>
    </header>
  );
};

export default GarageHeader;
