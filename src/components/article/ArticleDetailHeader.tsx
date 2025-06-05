
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
    <div className="container mx-auto px-4 py-6">
      <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
        <Link to="/" className="hover:text-motortrend-red transition-colors">
          Home
        </Link>
        <ChevronRight className="w-4 h-4" />
        <Link to="/news" className="hover:text-motortrend-red transition-colors">
          News
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900">{car.title}</span>
      </nav>
      
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          {car.title}
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          {car.excerpt}
        </p>
      </div>
    </div>
  );
};

export default ArticleDetailHeader;
