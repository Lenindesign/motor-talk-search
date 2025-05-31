
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, ChevronDown, Home, Car, PlayCircle, User } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const HamburgerMenu = () => {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  
  const toggleExpand = (label: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  // Main menu items
  const menuItems = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'News', path: '/news', icon: null },
    { label: 'Cars', path: '/buyers-guide', icon: Car },
    { label: 'Videos', path: '/videos', icon: PlayCircle },
    { label: 'Profile', path: '/profile', icon: User }, 
    { label: 'My Garage', path: '/garage', icon: null }
  ];
  
  // Submenu categories
  const newsSubmenu = [
    { label: 'SUV News', path: '/suv-news' },
    { label: 'Truck News', path: '/truck-news' },
    { label: 'Sedan News', path: '/sedan-news' },
    { label: 'Electric Car News', path: '/electric-car-news' },
    { label: 'Hybrid Car News', path: '/hybrid-car-news' }
  ];
  
  const videosSubmenu = [
    { label: 'Latest Videos', path: '/videos/latest' },
    { label: 'First Looks', path: '/videos/first-looks' },
    { label: 'First Drives', path: '/videos/first-drives' },
    { label: 'Comparison Tests', path: '/videos/comparison-tests' },
    { label: 'First Test', path: '/videos/first-test' },
    { label: 'Walkarounds', path: '/videos/walkarounds' },
    { label: 'InEvitable', path: '/videos/inevitable' },
    { label: 'HOT ROD', path: '/videos/hot-rod' }
  ];
  
  const carsSubmenu = [
    { label: 'Car Finder', path: '/car-finder' },
    { label: 'Compare Cars', path: '/compare-cars' },
    { label: 'Ultimate Car Rankings', path: '/rankings' },
    { label: 'Best Sedans', path: '/best-sedans' },
    { label: 'Best SUVs', path: '/best-suvs' },
    { label: 'Best Trucks', path: '/best-trucks' },
    { label: 'Cars for Sale', path: '/cars-for-sale' },
    { label: 'Sell Your Car', path: '/sell-your-car' },
    { label: 'MotorTrend Certified', path: '/certified' },
    { label: 'IntelliChoice Awards', path: '/intellichoice' },
    { label: 'Gear Shopping', path: '/gear' },
    { label: 'Shopping Tools', path: '/shopping-tools' }
  ];

  return (
    <Sheet>
      <Tooltip>
        <TooltipTrigger asChild>
          <SheetTrigger asChild>
            <button className="text-white p-2 focus:outline-none hover:bg-motortrend-dark/50 rounded-md transition-colors mr-2" aria-label="Menu">
              <Menu size={24} />
            </button>
          </SheetTrigger>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Menu</p>
        </TooltipContent>
      </Tooltip>
      <SheetContent side="left" className="bg-motortrend-dark border-r border-gray-800 p-0 w-[280px]">
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-gray-800">
            <Link to="/">
              <img
                src="/lovable-uploads/6f8fd40c-6013-4f96-89f0-8406d6febb7c.png"
                alt="MotorTrend Logo"
                className="h-6"
              />
            </Link>
          </div>
          <div className="flex-1 overflow-y-auto py-4">
            {menuItems.map((item) => {
              const isActiveMobile = item.path === '/' ? location.pathname === item.path : location.pathname.startsWith(item.path);
              const isNews = item.label === 'News';
              const isCars = item.label === 'Cars';
              
              return (
                <div key={item.path} className="mb-1">
                  <button 
                    onClick={() => {
                      // For categories with submenu, toggle expand
                      if (item.label === 'News' || item.label === 'Cars' || item.label === 'Videos') {
                        toggleExpand(item.label);
                      } else {
                        // For other items, navigate
                        window.location.href = item.path;
                      }
                    }}
                    className={`flex items-center justify-between w-full px-6 py-3 text-base font-medium transition-colors
                      ${isActiveMobile ? 'text-motortrend-red bg-white/5' : 'text-white hover:bg-white/5'}`}
                  >
                    <div className="flex items-center gap-3">
                      {item.label === 'My Garage' ? (
                        <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 -960 960 960" width="18" fill="currentColor" className="inline"><path d="M160-120v-480l320-240 320 240v480h-80v-440L480-740 240-560v440h-80Zm200-80h240v-80H360v80Zm0-160h240v-80H360v80Zm-80 240v-400h400v400H280Z"/></svg>
                      ) : (
                        item.icon && <item.icon size={18} />
                      )}
                      {item.label}
                    </div>
                    {(item.label === 'News' || item.label === 'Cars' || item.label === 'Videos') && (
                      <ChevronDown 
                        size={16} 
                        className={`transition-transform duration-300 ${expandedItems[item.label] ? 'rotate-180' : ''}`} 
                      />
                    )}
                  </button>
                  
                  {/* News Submenu */}
                  {isNews && expandedItems['News'] && (
                    <div className="pl-6 border-l border-gray-800 ml-8 mt-1">
                      {newsSubmenu.map(subItem => (
                        <Link
                          key={subItem.path}
                          to={subItem.path}
                          className="flex items-center gap-3 px-6 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                  
                  {/* Videos Submenu */}
                  {item.label === 'Videos' && expandedItems['Videos'] && (
                    <div className="pl-6 border-l border-gray-800 ml-8 mt-1">
                      {videosSubmenu.map(subItem => (
                        <Link
                          key={subItem.path}
                          to={subItem.path}
                          className="flex items-center gap-3 px-6 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                  
                  {/* Cars Submenu */}
                  {isCars && expandedItems['Cars'] && (
                    <div className="pl-6 border-l border-gray-800 ml-8 mt-1">
                      {carsSubmenu.map(subItem => (
                        <Link
                          key={subItem.path}
                          to={subItem.path}
                          className="flex items-center gap-3 px-6 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default HamburgerMenu;
