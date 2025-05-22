
import React from "react";
import { Link } from "react-router-dom";
import { useIsMobile } from "../hooks/use-mobile";
import { Menu, X, User, Home, Car, Wrench, Star, PlayCircle, LayoutDashboard } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useLocation } from "react-router-dom";
import GlobalHeader from '@/components/GlobalHeader';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const NavLink = ({ href, children, className = "" }: NavLinkProps) => (
  <Link
    to={href}
    className={`text-white font-medium hover:text-motortrend-red transition-colors ${className}`}
  >
    {children}
  </Link>
);

const MainNavigation = () => {
  const location = useLocation();
  const isMobile = useIsMobile();

  const navItems = (
    <>
      <NavLink href="/dashboard">Dashboard</NavLink>
      <NavLink href="/news">News</NavLink>
      <NavLink href="/buyers-guide">Cars</NavLink>
      <NavLink href="/videos">Videos</NavLink>
    </>
  );

  const menuItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Home', path: '/', icon: Home },
    { label: 'Cars', path: '/buyers-guide', icon: Car },
    { label: 'Garage', path: '/garage', icon: Wrench },
    { label: 'Videos', path: '/videos', icon: PlayCircle },
    { label: 'Profile', path: '/profile', icon: User }
  ];

  if (isMobile) {
    return (
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
              {menuItems.map((item) => (
                <Link 
                  key={item.path}
                  to={item.path} 
                  className={`flex items-center gap-3 px-6 py-3 text-base font-medium transition-colors
                    ${location.pathname === item.path ? 'text-motortrend-red bg-white/5' : 'text-white hover:bg-white/5'}`}
                >
                  <item.icon size={18} />
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </SheetContent>
      </Sheet>
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
