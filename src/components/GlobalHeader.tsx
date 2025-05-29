
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import MainNavigation from "./MainNavigation";
import MobileMenu from "./MobileMenu";
import UserMenu from "./UserMenu";
import { useAuth } from "@/contexts/AuthContext";

const GlobalHeader = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const { loading } = useAuth();

  return (
    <header className="bg-motortrend-dark text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <MobileMenu />
          </div>

          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img
                src="/lovable-uploads/6f8fd40c-6013-4f96-89f0-8406d6febb7c.png"
                alt="MotorTrend Logo"
                className="h-8 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block flex-1 max-w-3xl mx-8">
            <MainNavigation />
          </div>

          {/* Search and User Menu */}
          <div className="flex items-center space-x-4">
            {/* Search Button */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-md text-white hover:bg-white/10 transition-colors"
              aria-label="Search"
            >
              <Search size={20} />
            </button>

            {/* User Menu */}
            {!loading && <UserMenu />}
          </div>
        </div>

        {/* Search Bar (Mobile/Desktop) */}
        {searchOpen && (
          <div className="pb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search cars, articles, videos..."
                className="w-full px-4 py-2 pl-10 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-motortrend-red focus:border-transparent"
                autoFocus
              />
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default GlobalHeader;
