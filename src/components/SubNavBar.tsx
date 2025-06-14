
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const LINKS = [
  { label: 'News', href: '/news' },
  { label: 'Cars', href: '/buyers-guide' },
  { label: 'Videos', href: '/videos' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'Shopping', href: '/shopping' },
  { label: 'Garage', href: '/garage' },
];

const SubNavBar: React.FC = () => {
  const location = useLocation();
  return (
    <nav
      className="sticky top-[56px] z-[9998] w-full bg-motortrend-dark border-b border-neutral-2 shadow-sm overflow-x-auto scrollbar-none"
      style={{ WebkitOverflowScrolling: 'touch' }}
      aria-label="Subnavigation"
    >
      <ul className="flex flex-row gap-2 px-2 sm:px-8 py-2 overflow-x-auto whitespace-nowrap typography-caption sm:typography-body">
        {LINKS.map(link => (
          <li key={link.href}>
            <Link
              to={link.href}
              className={`px-3 py-1.5 rounded-md typography-button2 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-motortrend-red focus:ring-offset-2 focus:bg-motortrend-red/10 hover:bg-motortrend-red/10 hover:text-motortrend-red ${location.pathname.startsWith(link.href) ? 'text-motortrend-red bg-white/10' : 'text-white'}`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SubNavBar;
