import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { ArticleData, ArticleCardProps } from '@/types/article';
import { useCardSave } from '../hooks/useCardSave';
import { cn } from '@/lib/utils';

interface ExtendedArticleCardProps extends ArticleCardProps {
  layout?: 'vertical' | 'horizontal';
}

const ArticleCard: React.FC<ExtendedArticleCardProps> = ({ 
  article, 
  className = '', 
  showAuthor = false,
  showDate = true,
  showExcerpt = false,
  showCategory = true,
  variant = 'default',
  layout = 'vertical'
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

  if (layout === 'horizontal') {
    return (
      <Card 
        className={cn('group overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white border-0 rounded-2xl', className)}
        showSaveButton={false}
      >
        <Link to={`http://localhost:8080/article/${article.id}`} className="block">
          <div className="flex p-6">
            {/* Content - Left side */}
            <div className="flex-1 flex flex-col justify-between min-w-0 pr-6">
              <div>
                {showCategory && (
                  <div className="text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">
                    {article.category}
                  </div>
                )}
                <h3 className="text-base font-semibold line-clamp-3 group-hover:text-motortrend-red transition-colors leading-tight text-gray-900 mb-3">
                  {article.title}
                </h3>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-500 mt-4">
                <div className="flex items-center">
                  {showDate && (
                    <span>{article.date}</span>
                  )}
                  {showAuthor && article.author && (
                    <>
                      <span className="mx-2">•</span>
                      <span>{article.author}</span>
                    </>
                  )}
                  {article.readTime && (
                    <>
                      <span className="mx-2">•</span>
                      <span>{article.readTime}</span>
                    </>
                  )}
                </div>
                {/* Bookmark button next to date */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    toggleSave();
                  }}
                  className="p-1 text-gray-400 hover:text-gray-600 transition-colors ml-3"
                  aria-label={isSaved ? "Unsave article" : "Save article"}
                >
                  <svg width="16" height="16" fill={isSaved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/>
                  </svg>
                </button>
              </div>
            </div>
            {/* Image - Right side */}
            <div className="w-32 h-24 flex-shrink-0 overflow-hidden rounded-xl">
              <img 
                src={article.imageUrl} 
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </Link>
      </Card>
    );
  }

  return (
    <Card 
      className={cn('group overflow-hidden hover:shadow-lg transition-shadow duration-300', className)}
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
