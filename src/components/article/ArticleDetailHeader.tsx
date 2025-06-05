
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface ArticleDetailHeaderProps {
  car: any;
}

const ArticleDetailHeader: React.FC<ArticleDetailHeaderProps> = ({
  car
}) => {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-gray-500 mb-4">
          <Link to="/" className="hover:text-gray-700">
            Home
          </Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <Link to="/news" className="hover:text-gray-700">
            News
          </Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-gray-900">{car.title}</span>
        </nav>

        {/* Article Header */}
        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            {car.title}
          </h1>
          
          {car.subtitle && (
            <p className="text-xl text-gray-600 leading-relaxed">
              {car.subtitle}
            </p>
          )}

          {/* Article Meta */}
          <div className="flex items-center text-sm text-gray-500 space-x-4">
            {car.author && (
              <span>By {car.author}</span>
            )}
            {car.publishDate && (
              <span>{car.publishDate}</span>
            )}
            {car.readTime && (
              <span>{car.readTime}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetailHeader;
