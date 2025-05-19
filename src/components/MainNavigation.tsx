
import React from "react";
import { Link } from "react-router-dom";
import { useIsMobile } from "../hooks/use-mobile";
import { Menu, X, User, ChevronRight } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { useLocation } from "react-router-dom";
import { Home, Car, Wrench, Star, PlayCircle, User as UserIcon } from "lucide-react";
import { Button } from "./ui/button";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const NavLink = ({ href, children, className = "" }: NavLinkProps) => {
  const location = useLocation();
  const isActive = location.pathname === href;
  
  return (
    <Link
      to={href}
      className={`text-white font-medium hover:text-motortrend-red transition-colors ${isActive ? 'border-b-2 border-motortrend-red' : ''} ${className}`}
    >
      {children}
    </Link>
  );
};

const MainNavigation = () => {
  const location = useLocation();
  const isMobile = useIsMobile();

  const menuItems = [
    { label: 'News', path: '/news', featured: true },
    { label: 'Reviews', path: '/reviews', featured: true },
    { label: 'Buyer\'s Guide', path: '/buyers-guide', featured: true },
    { label: 'Videos', path: '/videos', featured: true },
    { label: 'Garage', path: '/garage' },
    { label: 'Profile', path: '/profile' },
  ];
  
  const featuredMenuItems = menuItems.filter(item => item.featured);
  const mobileMenuItems = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'New Cars', path: '/cars', icon: Car },
    { label: 'Garage', path: '/garage', icon: Wrench },
    { label: 'Reviews', path: '/reviews', icon: Star },
    { label: 'Videos', path: '/videos', icon: PlayCircle },
    { label: 'Profile', path: '/profile', icon: UserIcon }
  ];

  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
            <Menu size={24} />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="bg-motortrend-dark border-r border-gray-800 p-0 w-[300px]">
          <div className="flex flex-col h-full">
            <div className="p-4 flex items-center justify-between border-b border-gray-800">
              <Link to="/">
                <img
                  src="/lovable-uploads/6f8fd40c-6013-4f96-89f0-8406d6febb7c.png"
                  alt="MotorTrend Logo"
                  className="h-6"
                />
              </Link>
              <SheetClose className="text-white hover:bg-white/10 p-2 rounded-full">
                <X size={20} />
              </SheetClose>
            </div>
            <div className="overflow-y-auto flex-1">
              <div className="py-2 border-b border-gray-800">
                {mobileMenuItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <SheetClose key={item.path} asChild>
                      <Link 
                        to={item.path}
                        className={`flex items-center justify-between px-6 py-3 ${isActive ? 'bg-white/10 text-white' : 'text-gray-300 hover:text-white hover:bg-white/5'}`}
                      >
                        <div className="flex items-center space-x-3">
                          <item.icon size={20} />
                          <span className="font-medium">{item.label}</span>
                        </div>
                        <ChevronRight size={18} className="text-gray-500" />
                      </Link>
                    </SheetClose>
                  );
                })}
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Featured Categories</h3>
                <div className="space-y-4">
                  {featuredMenuItems.map((item) => (
                    <SheetClose key={item.path} asChild>
                      <Link 
                        to={item.path} 
                        className="block text-gray-300 hover:text-white font-medium"
                      >
                        {item.label}
                      </Link>
                    </SheetClose>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-auto border-t border-gray-800 p-4">
              <SheetClose asChild>
                <Link to="/profile" className="flex items-center space-x-2 text-white hover:text-motortrend-red">
                  <User size={20} />
                  <span>My Account</span>
                </Link>
              </SheetClose>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <NavigationMenu className="max-w-none justify-start">
      <NavigationMenuList className="space-x-6">
        {featuredMenuItems.map((item) => (
          <NavigationMenuItem key={item.path}>
            <Link 
              to={item.path}
              className={`text-white hover:text-motortrend-red transition-colors px-1 py-2 ${location.pathname === item.path ? 'border-b-2 border-motortrend-red font-semibold' : 'font-medium'}`}
            >
              {item.label}
            </Link>
          </NavigationMenuItem>
        ))}
        <NavigationMenuItem>
          <Link
            to="/profile"
            className="flex items-center gap-1 text-white hover:text-motortrend-red transition-colors"
          >
            <User size={20} />
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default MainNavigation;
