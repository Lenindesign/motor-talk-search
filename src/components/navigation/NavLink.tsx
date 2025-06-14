
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";

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
        className={`relative group ${isVideosLink ? 'hidden lg:block' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center gap-1">
          <Link
            to={href}
            className={`typography-button2 transition-colors hover:text-motortrend-red ${isActive ? 'text-motortrend-red' : 'text-white'} ${className}`}
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
          className={`absolute top-full left-0 w-64 bg-motortrend-dark border border-neutral-2 rounded-md shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${isHovered ? 'opacity-100 translate-y-0 max-h-[500px]' : 'opacity-0 -translate-y-2 max-h-0 pointer-events-none'}`}
          style={{ zIndex: 9997 }}
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

export default NavLink;
