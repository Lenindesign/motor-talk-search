import React from 'react';
import { Link, useLocation } from 'react-router-dom';
const LINKS = [{
  label: 'News',
  href: '/news'
}, {
  label: 'Cars',
  href: '/buyers-guide'
}, {
  label: 'Videos',
  href: '/videos'
}, {
  label: 'Reviews',
  href: '/reviews'
}, {
  label: 'Shopping',
  href: '/shopping'
}, {
  label: 'Garage',
  href: '/garage'
}];
const SubNavBar: React.FC = () => {
  const location = useLocation();
  return <nav className="sticky top-[56px] z-30 w-full bg-motortrend-dark border-b border-gray-700 shadow-sm overflow-x-auto scrollbar-none" style={{
    WebkitOverflowScrolling: 'touch'
  }} aria-label="Subnavigation">
      
    </nav>;
};
export default SubNavBar;