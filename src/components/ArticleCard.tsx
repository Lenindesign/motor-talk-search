
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export interface ArticleData {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
  date: string;
  author?: string;
  excerpt?: string;
  readTime?: string;
  tags?: string[];
}

export interface ArticleCardProps {
  article: ArticleData;
  className?: string;
  showAuthor?: boolean;
  showDate?: boolean;
  showExcerpt?: boolean;
  showCategory?: boolean;
  variant?: 'default' | 'compact' | 'featured';
}

const ArticleCard: React.FC<ArticleCardProps> = ({ 
  article, 
  className = '', 
  showAuthor = false,
  showDate = true,
  showExcerpt = false,
  showCategory = true,
  variant = 'default'
}) => {
  return (
    <Card className={`group overflow-hidden hover:shadow-lg transition-shadow duration-300 ${className}`}>
      <Link to={`/news/${article.id}`} className="block">
        <div className="aspect-video overflow-hidden">
          <img 
            src={article.imageUrl} 
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <CardContent className="p-4">
          {showCategory && (
            <div className="text-xs font-medium text-motortrend-red mb-2 uppercase tracking-wide">
              {article.category}
            </div>
          )}
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-motortrend-red transition-colors">
            {article.title}
          </h3>
          {showExcerpt && article.excerpt && (
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {article.excerpt}
            </p>
          )}
          <div className="flex items-center text-xs text-gray-500 space-x-4">
            {showDate && (
              <div className="flex items-center">
                <Calendar className="w-3 h-3 mr-1" />
                {article.date}
              </div>
            )}
            {showAuthor && article.author && (
              <div className="flex items-center">
                <User className="w-3 h-3 mr-1" />
                {article.author}
              </div>
            )}
            {article.readTime && (
              <div className="flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {article.readTime}
              </div>
            )}
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

export default ArticleCard;
