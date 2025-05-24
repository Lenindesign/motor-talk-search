import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, Camera } from 'lucide-react';
export interface ArticleData {
  id: string;
  title: string;
  imageUrl: string;
  date: string;
  category: string;
  featured?: boolean;
  photoCount?: number;
}
interface ArticleCardProps {
  article: ArticleData;
}
const ArticleCard: React.FC<ArticleCardProps> = ({
  article
}) => {
  return <Link to={`/article/${article.id}`} className="block bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <img src={article.imageUrl} alt={article.title} className="h-48 w-full object-cover" />
        {article.photoCount && <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded flex items-center text-xs">
            <Camera size={12} className="mr-1" />
            {article.photoCount}
          </div>}
        <div className="absolute bottom-2 left-2">
          <span className="bg-motortrend-red text-white px-2 py-1 rounded text-xs font-bold">
            {article.category}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 line-clamp-2">{article.title}</h3>
        <div className="flex items-center text-sm text-gray-500">
          <Calendar size={14} className="mr-1" />
          <span className="mr-3">{article.date}</span>
          <User size={14} className="mr-1" />
          <span>MotorTrend</span>
        </div>
      </div>
    </Link>;
};
export default ArticleCard;