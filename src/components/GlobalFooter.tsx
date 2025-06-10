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
    <div className="max-w-[980px] mx-auto px-4 sm:px-8 py-16">
      {/* Main Footer Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
        {/* Brand Section */}
        <div className="lg:col-span-1">
          <div className="mb-6">
            <Link to="/" aria-label="MOTORTREND Home">
              <img src="/lovable-uploads/6f8fd40c-6013-4f96-89f0-8406d6febb7c.png" alt="MotorTrend Logo" className="h-8 w-auto" />
            </Link>
          </div>
          <p className="text-gray-400 text-sm mb-6 leading-relaxed">
            Your ultimate destination for automotive news, reviews, and expert insights.
          </p>
          <div className="flex gap-4">
            {socialLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="text-lg text-gray-400 hover:text-motortrend-red transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-motortrend-red rounded p-1"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Footer Links */}
        {footerLinks.map((section) => (
          <div key={section.heading} className="lg:col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-6 text-white">{section.heading}</h3>
            <ul className="space-y-3">
              {section.links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-motortrend-red rounded px-1 py-1 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 pt-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="text-xs text-gray-400">
            &copy; {currentYear} Motor Talk. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-xs">
            <Link 
              to="/accessibility" 
              className="text-gray-400 hover:text-motortrend-red transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-motortrend-red rounded px-1 py-1"
            >
              Accessibility
            </Link>
            <span className="text-gray-600">•</span>
            <Link 
              to="/sitemap" 
              className="text-gray-400 hover:text-motortrend-red transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-motortrend-red rounded px-1 py-1"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default GlobalFooter;
