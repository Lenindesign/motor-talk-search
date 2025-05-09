
import React from "react";
import { Link } from "react-router-dom";
import { useIsMobile } from "../hooks/use-mobile";
import { Menu, X, User } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

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
  const isMobile = useIsMobile();

  const navItems = (
    <>
      <NavLink href="/news">News</NavLink>
      <NavLink href="/reviews">Reviews</NavLink>
      <NavLink href="/buyers-guide">Buyer's Guide</NavLink>
      <NavLink href="/videos">Videos</NavLink>
      <NavLink href="/magazines">Magazines</NavLink>
      <NavLink href="/the-future">The Future</NavLink>
    </>
  );

  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <button className="text-white p-2 focus:outline-none mr-2">
            <Menu size={24} />
          </button>
        </SheetTrigger>
        <SheetContent side="left" className="bg-motortrend-dark border-r border-gray-800 p-0 w-[280px]">
          <div className="flex flex-col h-full">
            <div className="p-6">
              <Link to="/">
                <img
                  src="/lovable-uploads/6f8fd40c-6013-4f96-89f0-8406d6febb7c.png"
                  alt="MotorTrend Logo"
                  className="h-6 mb-8"
                />
              </Link>
            </div>
            <div className="flex flex-col space-y-4 p-6">
              {navItems}
              <NavLink href="/profile" className="flex items-center gap-2">
                <User size={18} />
                Profile
              </NavLink>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <nav className="flex items-center space-x-6">
      {navItems}
      <NavLink href="/profile" className="flex items-center gap-1">
        <User size={16} />
      </NavLink>
    </nav>
  );
};

export default MainNavigation;
