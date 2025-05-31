import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const footerLinks = [
  {
    heading: 'About',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Careers', href: '/careers' },
      { label: 'Press', href: '/press' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
      { label: 'Accessibility', href: '/accessibility' },
    ],
  },
  {
    heading: 'Discover',
    links: [
      { label: 'News', href: '/news' },
      { label: 'Reviews', href: '/reviews' },
      { label: 'Videos', href: '/videos' },
      { label: 'Shopping', href: '/shopping' },
    ],
  },
];

const socialLinks = [
  { label: 'Facebook', href: 'https://facebook.com', icon: <FaFacebookF />, color: 'hover:text-[#1877f3]' },
  { label: 'Twitter', href: 'https://twitter.com', icon: <FaTwitter />, color: 'hover:text-[#1da1f2]' },
  { label: 'Instagram', href: 'https://instagram.com', icon: <FaInstagram />, color: 'hover:text-[#e1306c]' },
  { label: 'YouTube', href: 'https://youtube.com', icon: <FaYoutube />, color: 'hover:text-[#ff0000]' },
];

const currentYear = new Date().getFullYear();

const GlobalFooter: React.FC = () => (
  <footer className="w-full bg-[#1a1a1a] text-gray-200 border-t border-gray-800 mt-12" aria-label="Site Footer">
    <div className="max-w-[980px] mx-auto px-4 sm:px-8 py-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-6">
        <div className="flex items-center gap-3">
          <Link to="/" aria-label="MOTORTREND Home">
            <img src="/lovable-uploads/6f8fd40c-6013-4f96-89f0-8406d6febb7c.png" alt="MotorTrend Logo" className="h-8 sm:h-7 w-auto" />
          </Link>
        </div>
        <div className="flex gap-4 mt-2 sm:mt-0">
          {socialLinks.map(link => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className={`text-xl transition-colors duration-200 hover:text-motortrend-red focus:outline-none focus:ring-2 focus:ring-motortrend-red ${link.color}`}
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8 mb-10">
        {footerLinks.map((section) => (
          <div key={section.heading}>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-gray-300">{section.heading}</h3>
            <ul className="space-y-2">
              {section.links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-motortrend-red rounded px-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between border-t border-gray-700 pt-6 text-xs text-gray-400 gap-2">
        <span>&copy; {currentYear} Motor Talk. All rights reserved.</span>
        <span>
          <Link to="/accessibility" className="hover:text-motortrend-red underline focus:outline-none focus:ring-2 focus:ring-motortrend-red">Accessibility</Link>
          <span className="mx-2">|</span>
          <Link to="/sitemap" className="hover:text-motortrend-red underline focus:outline-none focus:ring-2 focus:ring-motortrend-red">Sitemap</Link>
        </span>
      </div>
    </div>
  </footer>
);

export default GlobalFooter;
