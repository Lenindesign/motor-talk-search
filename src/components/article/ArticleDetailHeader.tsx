
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
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center text-sm text-gray-600 mb-4">
        <Link to="/" className="hover:text-motortrend-red">
          Home
        </Link>
        <ChevronRight size={16} className="mx-2" />
        <Link to="/news" className="hover:text-motortrend-red">
          News
        </Link>
        <ChevronRight size={16} className="mx-2" />
        <span className="text-gray-900">Article</span>
      </nav>

      {/* Article Header Info */}
      {car && (
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            {car.title || `${car.make} ${car.model} ${car.year}`}
          </h1>
          <p className="text-gray-600">
            Latest news and updates about the {car.make} {car.model}
          </p>
        </div>
      )}
    </div>
  );
};

export default ArticleDetailHeader;
