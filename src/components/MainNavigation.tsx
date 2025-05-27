import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useIsMobile } from "../hooks/use-mobile";
import { Menu, X, User, Home, Car, Wrench, Star, PlayCircle } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const NavLink = ({ href, children, className = "" }: NavLinkProps) => {
  const location = useLocation();
  // Active if current path starts with href, or exact match for home ('/')
  const isActive = href === '/' ? location.pathname === href : location.pathname.startsWith(href);
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

  const navItems = (
    <>
      <NavLink href="/news">News</NavLink>
      <NavLink href="/buyers-guide">Cars</NavLink>
      <NavLink href="/videos">Videos</NavLink>
      <NavLink href="/garage">My Garage</NavLink>
    </>
  );

  const menuItems = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Cars', path: '/buyers-guide', icon: Car },
    { label: 'Videos', path: '/videos', icon: PlayCircle },
    { label: 'Profile', path: '/profile', icon: User }, 
    { label: 'My Garage', path: '/garage', icon: null }
  ];

  if (isMobile) {
    return (
      <div className="flex items-center">
        <Link to="/garage" aria-label="My Garage" className="text-white p-2 focus:outline-none hover:bg-motortrend-dark/50 rounded-md transition-colors mr-1">
          <svg xmlns="http://www.w3.org/2000/svg" height="22" viewBox="0 -960 960 960" width="22" fill="currentColor"><path d="M160-120v-480l320-240 320 240v480h-80v-440L480-740 240-560v440h-80Zm200-80h240v-80H360v80Zm0-160h240v-80H360v80Zm-80 240v-400h400v400H280Z"/></svg>
        </Link>
        <Link to="/profile" aria-label="Profile" className="text-white p-2 focus:outline-none hover:bg-motortrend-dark/50 rounded-md transition-colors mr-1">
          <User size={22} />
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <button className="text-white p-2 focus:outline-none hover:bg-motortrend-dark/50 rounded-md transition-colors mr-2" aria-label="Menu">
              <Menu size={24} />
            </button>
          </SheetTrigger>
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
    );
  }

  return (
    <nav className="hidden sm:flex items-center space-x-6">
      {navItems}
      <NavLink href="/profile" className="flex items-center gap-1 p-1 hover:bg-white/10 rounded-full transition-colors">
        <User size={16} />
      </NavLink>
    </nav>
  );
};

export default MainNavigation;
