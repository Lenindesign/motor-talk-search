import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useIsMobile } from "../hooks/use-mobile";
import { Menu, X, User, Home, Car, Wrench, Star, PlayCircle, ChevronDown } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  hasDropdown?: boolean;
  dropdownContent?: React.ReactNode;
}

const NavLink = ({ href, children, className = "", hasDropdown = false, dropdownContent }: NavLinkProps) => {
  const location = useLocation();
  const [isHovered, setIsHovered] = useState(false);
  // Active if current path starts with href, or exact match for home ('/')
  const isActive = href === '/' ? location.pathname === href : location.pathname.startsWith(href);
  
  if (hasDropdown) {
    // Check if this is the Videos link - needs special handling for responsive hiding
    const isVideosLink = href === '/videos';
    
    return (
      <div 
        className={`relative group ${isVideosLink ? 'hidden nav-md:block' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center gap-1">
          <Link
            to={href}
            className={`font-medium transition-colors hover:text-motortrend-red ${isActive ? 'text-motortrend-red' : 'text-white'} ${className}`}
          >
            {children}
          </Link>
          <ChevronDown 
            size={16} 
            className={`transition-transform duration-300 ${isHovered ? 'rotate-180 text-motortrend-red' : 'text-white'}`} 
          />
        </div>
        
        {/* Dropdown Container */}
        <div 
          className={`absolute top-full left-0 w-64 bg-motortrend-dark border border-gray-700 rounded-md shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${isHovered ? 'opacity-100 translate-y-0 max-h-[500px]' : 'opacity-0 -translate-y-2 max-h-0 pointer-events-none'}`}
          style={{ zIndex: 1000 }}
        >
          {dropdownContent}
        </div>
      </div>
    );
  }
  
  return (
    <Link
      to={href}
      className={`font-medium transition-colors hover:text-motortrend-red ${isActive ? 'text-motortrend-red' : 'text-white'} ${className}`}
    >
      {children}
    </Link>
  );
};

const MainNavigation = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  
  // State for tracking expanded menu items in mobile view
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  
  // Toggle expanded state for mobile menu items
  const toggleExpand = (label: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  const navItems = (
    <>
      <NavLink href="/news">News</NavLink>
      <NavLink href="/buyers-guide">Cars</NavLink>
      <NavLink href="/videos">Videos</NavLink>
      <NavLink href="/garage">My Garage</NavLink>
    </>
  );

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

  // Common hamburger menu component for both mobile and desktop
  const HamburgerMenu = () => (
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

  if (isMobile) {
    return (
      <TooltipProvider delayDuration={150}>
        <div className="flex items-center">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link to="/garage" aria-label="My Garage" className="text-white p-2 focus:outline-none hover:bg-motortrend-dark/50 rounded-md transition-colors mr-1">
                <svg xmlns="http://www.w3.org/2000/svg" height="22" viewBox="0 -960 960 960" width="22" fill="currentColor"><path d="M160-120v-480l320-240 320 240v480h-80v-440L480-740 240-560v440h-80Zm200-80h240v-80H360v80Zm0-160h240v-80H360v80Zm-80 240v-400h400v400H280Z"/></svg>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>My Garage</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link to="/profile" aria-label="Profile" className="text-white p-2 focus:outline-none hover:bg-motortrend-dark/50 rounded-md transition-colors mr-1">
                <User size={22} />
              </Link>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Profile</p>
            </TooltipContent>
          </Tooltip>
          <HamburgerMenu />
        </div>
      </TooltipProvider>
    );
  }

  return (
    <TooltipProvider delayDuration={150}>
      <div className="flex items-center justify-between w-full">
        <HamburgerMenu />
        <nav className="hidden sm:flex items-center space-x-6">
          {/* Category Links */}
          <NavLink 
            href="/news" 
            hasDropdown 
            dropdownContent={
            <div className="py-2">
              <Link to="/suv-news" className="block px-4 py-2 text-sm text-white hover:bg-white/10 hover:text-motortrend-red">SUV News</Link>
              <Link to="/truck-news" className="block px-4 py-2 text-sm text-white hover:bg-white/10 hover:text-motortrend-red">Truck News</Link>
              <Link to="/sedan-news" className="block px-4 py-2 text-sm text-white hover:bg-white/10 hover:text-motortrend-red">Sedan News</Link>
              <Link to="/electric-car-news" className="block px-4 py-2 text-sm text-white hover:bg-white/10 hover:text-motortrend-red">Electric Car News</Link>
              <Link to="/hybrid-car-news" className="block px-4 py-2 text-sm text-white hover:bg-white/10 hover:text-motortrend-red">Hybrid Car News</Link>
            </div>
          }
        >
          News
        </NavLink>
        <NavLink 
          href="/buyers-guide" 
          hasDropdown 
          dropdownContent={
            <div className="py-2">
              <Link to="/car-finder" className="block px-4 py-2 text-sm text-white hover:bg-white/10 hover:text-motortrend-red">Car Finder</Link>
              <Link to="/compare-cars" className="block px-4 py-2 text-sm text-white hover:bg-white/10 hover:text-motortrend-red">Compare Cars</Link>
              <Link to="/rankings" className="block px-4 py-2 text-sm text-white hover:bg-white/10 hover:text-motortrend-red">Ultimate Car Rankings</Link>
              <Link to="/best-sedans" className="block px-4 py-2 text-sm text-white hover:bg-white/10 hover:text-motortrend-red">Best Sedans</Link>
              <Link to="/best-suvs" className="block px-4 py-2 text-sm text-white hover:bg-white/10 hover:text-motortrend-red">Best SUVs</Link>
              <Link to="/best-trucks" className="block px-4 py-2 text-sm text-white hover:bg-white/10 hover:text-motortrend-red">Best Trucks</Link>
              <Link to="/cars-for-sale" className="block px-4 py-2 text-sm text-white hover:bg-white/10 hover:text-motortrend-red">Cars for Sale</Link>
              <Link to="/sell-your-car" className="block px-4 py-2 text-sm text-white hover:bg-white/10 hover:text-motortrend-red">Sell Your Car</Link>
              <Link to="/certified" className="block px-4 py-2 text-sm text-white hover:bg-white/10 hover:text-motortrend-red">MotorTrend Certified</Link>
              <Link to="/intellichoice" className="block px-4 py-2 text-sm text-white hover:bg-white/10 hover:text-motortrend-red">IntelliChoice Awards</Link>
              <Link to="/gear" className="block px-4 py-2 text-sm text-white hover:bg-white/10 hover:text-motortrend-red">Gear Shopping</Link>
              <Link to="/shopping-tools" className="block px-4 py-2 text-sm text-white hover:bg-white/10 hover:text-motortrend-red">Shopping Tools</Link>
            </div>
          }
        >
          Cars
        </NavLink>
        {/* Videos dropdown - hidden at 980px or below using custom nav-md breakpoint */}
        <NavLink 
          href="/videos" 
          hasDropdown 
          dropdownContent={
            <div className="py-2">
              <Link to="/videos/latest" className="block px-4 py-2 text-sm text-white hover:bg-white/10 hover:text-motortrend-red">Latest Videos</Link>
              <Link to="/videos/first-looks" className="block px-4 py-2 text-sm text-white hover:bg-white/10 hover:text-motortrend-red">First Looks</Link>
              <Link to="/videos/first-drives" className="block px-4 py-2 text-sm text-white hover:bg-white/10 hover:text-motortrend-red">First Drives</Link>
              <Link to="/videos/comparison-tests" className="block px-4 py-2 text-sm text-white hover:bg-white/10 hover:text-motortrend-red">Comparison Tests</Link>
              <Link to="/videos/first-test" className="block px-4 py-2 text-sm text-white hover:bg-white/10 hover:text-motortrend-red">First Test</Link>
              <Link to="/videos/walkarounds" className="block px-4 py-2 text-sm text-white hover:bg-white/10 hover:text-motortrend-red">Walkarounds</Link>
              <Link to="/videos/inevitable" className="block px-4 py-2 text-sm text-white hover:bg-white/10 hover:text-motortrend-red">InEvitable</Link>
              <Link to="/videos/hot-rod" className="block px-4 py-2 text-sm text-white hover:bg-white/10 hover:text-motortrend-red">HOT ROD</Link>
            </div>
          }
        >
          Videos
        </NavLink>
        {/* Icons */}
        <div className="flex items-center space-x-2 ml-4">
          {/* My Garage Icon */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Link to="/garage" aria-label="My Garage" className="text-white p-2 focus:outline-none hover:bg-motortrend-dark/50 rounded-md transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" height="22" viewBox="0 -960 960 960" width="22" fill="currentColor"><path d="M160-120v-480l320-240 320 240v480h-80v-440L480-740 240-560v440h-80Zm200-80h240v-80H360v80Zm0-160h240v-80H360v80Zm-80 240v-400h400v400H280Z"/></svg>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>My Garage</p>
            </TooltipContent>
          </Tooltip>
          {/* Profile Icon */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Link to="/profile" aria-label="Profile" className="text-white p-2 focus:outline-none hover:bg-motortrend-dark/50 rounded-md transition-colors">
                <User size={22} />
              </Link>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Profile</p>
            </TooltipContent>
          </Tooltip>
          {/* Hamburger Icon (Menu) */}
          <Sheet>
            <Tooltip>
              <TooltipTrigger asChild>
                <SheetTrigger asChild>
                  <button className="text-white p-2 focus:outline-none hover:bg-motortrend-dark/50 rounded-md transition-colors" aria-label="Menu">
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
                    return (
                      <Link 
                        key={item.path}
                        to={item.path} 
                        className={`flex items-center gap-3 px-6 py-3 text-base font-medium transition-colors
                          ${isActiveMobile ? 'text-motortrend-red bg-white/5' : 'text-white hover:bg-white/5'}`}
                      >
                        {item.label === 'My Garage' ? (
                          <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 -960 960 960" width="18" fill="currentColor" className="inline"><path d="M160-120v-480l320-240 320 240v480h-80v-440L480-740 240-560v440h-80Zm200-80h240v-80H360v80Zm0-160h240v-80H360v80Zm-80 240v-400h400v400H280Z"/></svg>
                        ) : (
                          item.icon && <item.icon size={18} />
                        )}
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
      </div>
    </TooltipProvider>
  );
};

export default MainNavigation;
