
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Home, Car, PlayCircle, User } from "lucide-react";
import { X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface MenuItemProps {
  label: string;
  path: string;
  icon?: React.ComponentType<{ size?: number }>;
  subItems?: Array<{ label: string; path: string }>;
}

export const MobileMenu = () => {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({
    News: false,
    Cars: false,
    Videos: false,
  });

  const toggleExpand = (label: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setExpandedItems((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  // Submenu definitions
  const newsSubmenu = [
    { label: "SUV News", path: "/news/suv" },
    { label: "Truck News", path: "/news/truck" },
    { label: "EV News", path: "/news/ev" },
    { label: "Spy Photos", path: "/news/spy-photos" },
    { label: "Auto Shows", path: "/news/auto-shows" },
  ];

  const carsSubmenu = [
    { label: "Car Finder", path: "/cars/finder" },
    { label: "Compare Cars", path: "/cars/compare" },
    { label: "New Cars", path: "/cars/new" },
    { label: "Used Cars", path: "/cars/used" },
    { label: "Car Reviews", path: "/cars/reviews" },
    { label: "Car Rankings", path: "/cars/rankings" },
    { label: "Car Deals", path: "/cars/deals" },
    { label: "Car Buying Advice", path: "/cars/buying-advice" },
    { label: "Certified Pre-Owned", path: "/cars/cpo" },
    { label: "Car Loan Calculator", path: "/cars/loan-calculator" },
    { label: "EV Charging Network", path: "/cars/ev-charging" },
    { label: "Car Values", path: "/cars/values" },
  ];

  const videosSubmenu = [
    { label: "Latest Videos", path: "/videos/latest" },
    { label: "First Looks", path: "/videos/first-looks" },
    { label: "First Drives", path: "/videos/first-drives" },
    { label: "Comparison Tests", path: "/videos/comparison" },
    { label: "First Test", path: "/videos/first-test" },
    { label: "Walkarounds", path: "/videos/walkarounds" },
    { label: "InEVitable", path: "/videos/inevitable" },
    { label: "HOT ROD", path: "/videos/hot-rod" },
  ];

  // Custom garage icon component
  const GarageIcon: React.FC<{ size?: number }> = ({ size = 18 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" height={size} viewBox="0 -960 960 960" width={size} fill="currentColor" className="inline">
      <path d="M160-120v-480l320-240 320 240v480h-80v-440L480-740 240-560v440h-80Zm200-80h240v-80H360v80Zm0-160h240v-80H360v80Zm-80 240v-400h400v400H280Z"/>
    </svg>
  );

  // Menu items with icons and submenus
  const menuItems: MenuItemProps[] = [
    { label: "Home", path: "/", icon: Home },
    { label: "News", path: "/news", subItems: newsSubmenu },
    { label: "Cars", path: "/cars", icon: Car, subItems: carsSubmenu },
    { label: "Videos", path: "/videos", icon: PlayCircle, subItems: videosSubmenu },
    { label: "Profile", path: "/profile", icon: User },
    { label: "My Garage", path: "/garage", icon: GarageIcon },
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="text-white p-2 focus:outline-none hover:bg-motortrend-dark/50 rounded-md transition-colors" aria-label="Menu">
          <span className="sr-only">Open main menu</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="bg-motortrend-dark border-r border-gray-800 p-0 w-[280px]">
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-gray-800 flex justify-between items-center">
            <Link to="/">
              <img
                src="/lovable-uploads/6f8fd40c-6013-4f96-89f0-8406d6febb7c.png"
                alt="MotorTrend Logo"
                className="h-6"
              />
            </Link>
            <SheetTrigger asChild>
              <button className="text-white hover:text-gray-300 focus:outline-none">
                <X size={20} />
              </button>
            </SheetTrigger>
          </div>
          <div className="flex-1 overflow-y-auto py-4">
            {menuItems.map((item) => (
              <div key={item.path} className="mb-1">
                {item.subItems ? (
                  <>
                    <div className="relative">
                      <div className="relative flex items-center">
                        <button
                          onClick={(e) => toggleExpand(item.label, e)}
                          className="mr-2 p-2 text-white hover:text-gray-300 transition-colors z-10 hover:bg-white/10 rounded-md focus:outline-none"
                          aria-label={`Toggle ${item.label} submenu`}
                          tabIndex={0}
                          type="button"
                        >
                          <ChevronDown
                            size={16}
                            className={`transition-transform duration-200 ml-2 ${
                              expandedItems[item.label]
                                ? 'rotate-180 text-motortrend-red'
                                : 'text-white'
                            }`}
                          />
                        </button>
                        <Link
                          to={item.path}
                          className="flex-1 flex items-center gap-3 px-6 py-3 text-base font-medium text-white hover:bg-white/5 transition-colors"
                          tabIndex={0}
                        >
                          {item.icon && <item.icon size={18} />}
                          {item.label}
                        </Link>
                      </div>
                    </div>
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        expandedItems[item.label] 
                          ? "max-h-[500px] opacity-100" 
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="pl-6 border-l border-gray-800 ml-8 mt-1 mb-2">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.path}
                            to={subItem.path}
                            className="flex items-center gap-3 px-6 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    to={item.path}
                    className="flex items-center gap-3 px-6 py-3 text-base font-medium text-white hover:bg-white/5 transition-colors"
                  >
                    {item.icon && <item.icon size={18} />}
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
