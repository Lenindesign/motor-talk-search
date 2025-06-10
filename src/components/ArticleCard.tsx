
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { ArticleData, ArticleCardProps } from '@/types/article';
import { useCardSave } from '../hooks/useCardSave';

const ArticleCard: React.FC<ArticleCardProps> = ({ 
  article, 
  className = '', 
  showAuthor = false,
  showDate = true,
  showExcerpt = false,
  showCategory = true,
  variant = 'default'
}) => {
  const { isSaved, toggleSave } = useCardSave({
    id: article.id,
    type: 'article',
    title: article.title,
    imageUrl: article.imageUrl,
    metadata: {
      category: article.category,
      date: article.date
    }
  });
  return (
    <Card 
      className={`group overflow-hidden hover:shadow-lg transition-shadow duration-300 ${className}`}
      isSaved={isSaved}
      onToggleSave={toggleSave}
    >
      <Link to={`http://localhost:8080/article/${article.id}`} className="block">
        <div className="aspect-video overflow-hidden">
          <img 
            src={article.imageUrl} 
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <CardContent className="p-4">
          {showCategory && (
            <div className="text-xs font-medium text-neutral-3 mb-2 uppercase tracking-wide">
              {article.category}
            </div>
          )}
          <h3 className="typography-subtitle line-clamp-2 group-hover:text-motortrend-red transition-colors">
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
