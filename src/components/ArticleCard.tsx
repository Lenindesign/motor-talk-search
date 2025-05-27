import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, User, Camera, Bookmark } from 'lucide-react';
import { useSavedItems } from '../contexts/SavedItemsContext';
import BaseCard from './ui/BaseCard';
import { CARD_STYLES } from '@/styles/cardStyles';
import { cn } from '@/lib/utils';
export interface ArticleData {
  id: string;
  title: string;
  imageUrl: string;
  date: string;
  category: string;
  featured?: boolean;
  photoCount?: number;
  metadata?: {
    category?: string;
    date?: string;
    photoCount?: number;
    featured?: boolean;
  };
}
export interface ArticleCardProps {
  article: ArticleData;
  className?: string;
  onClick?: () => void;
  isLoading?: boolean;
}
const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  className,
  onClick,
  isLoading
}) => {
  const navigate = useNavigate();
  const {
    addSavedItem,
    removeSavedItem,
    isSaved
  } = useSavedItems();
  const isArticleSaved = isSaved(article.id, 'article');
  const handleSave = () => {
    if (isArticleSaved) {
      removeSavedItem(article.id, 'article');
    } else {
      addSavedItem({
        id: article.id,
        title: article.title,
        type: 'article' as const,
        imageUrl: article.imageUrl,
        savedAt: new Date().toISOString(),
        metadata: article.metadata || {
          category: article.category,
          date: article.date,
          photoCount: article.photoCount,
          featured: article.featured
        }
      });
    }
  };
  if (isLoading) {
    return <div className={cn(CARD_STYLES.base, CARD_STYLES.skeleton, className)}>
        <div className="h-48 bg-gray-200 animate-pulse" />
        <div className="p-4">
          <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse mb-2" />
          <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse" />
        </div>
      </div>;
  }
  return <BaseCard type="article" className={className} isLoading={isLoading} isSaved={isArticleSaved} onToggleSave={handleSave} metadata={{
    date: article.date,
    category: article.category
  }} onClick={onClick || (() => navigate(`/article/${article.id}`))}>
      <div className="relative pt-[56.25%]">
        <img src={article.imageUrl} alt={article.title} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        {article.photoCount && <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded flex items-center text-xs">
            <Camera className="mr-1" />
            <span>{article.photoCount}</span>
          </div>}
      </div>
      <div className="p-4">
        <h3 className="font-bold leading-tight text-gray-900 mb-1 text-base">
          {article.title}
        </h3>
      </div>
    </BaseCard>;
};
export default ArticleCard;