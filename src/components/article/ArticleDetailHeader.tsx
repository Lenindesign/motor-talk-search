
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface ArticleDetailHeaderProps {
  car: any;
}

const ArticleDetailHeader: React.FC<ArticleDetailHeaderProps> = ({ car }) => {
  return (
    <div className="flex items-center mb-5 overflow-x-auto whitespace-nowrap py-1 text-xs md:text-sm max-w-3xl mx-auto px-4">
      <Link to="/cars" className="text-neutral-4 hover:text-motortrend-red transition-colors">
        Articles
      </Link>
      <ChevronRight size={12} className="mx-1 text-neutral-4 flex-shrink-0" />
      <Link to={`/articles/${car.category.toLowerCase().replace(' ', '-')}`} className="text-neutral-4 hover:text-motortrend-red transition-colors">
        {car.category}
      </Link>
      <ChevronRight size={12} className="mx-1 text-neutral-4 flex-shrink-0" />
      <span className="text-neutral-3 truncate">{car.title}</span>
    </div>
  );
};

export default ArticleDetailHeader;
