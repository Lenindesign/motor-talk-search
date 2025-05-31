
import React from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import NavLink from "./NavLink";
import HamburgerMenu from "./HamburgerMenu";

const DesktopNavigation = () => {
  return (
    <TooltipProvider delayDuration={150}>
      <div className="flex items-center justify-between w-full">
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
          {/* Hamburger Menu - Moved to first position */}
          <HamburgerMenu />
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
          {/* Profile Avatar - Moved to last position */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Link to="/profile" aria-label="Profile" className="text-white p-2 focus:outline-none hover:bg-motortrend-dark/50 rounded-md transition-colors">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="https://d2kde5ohu8qb21.cloudfront.net/files/6839e7e53277480008013d30/greg.jpg" alt="Greg Driver" />
                  <AvatarFallback className="bg-gray-600 text-white text-xs">GD</AvatarFallback>
                </Avatar>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Profile</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </nav>
      </div>
    </TooltipProvider>
  );
};

export default DesktopNavigation;
