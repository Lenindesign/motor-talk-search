import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera } from 'lucide-react';
import { useCardSave } from '../hooks/useCardSave';
import { useOptimizedImageLoader } from '../hooks/useOptimizedImageLoader';
import { Card } from './ui/card';
import CardSkeleton from './ui/CardSkeleton';
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
  priority?: boolean;
}
const ArticleCard: React.FC<ArticleCardProps> = memo(({
  article,
  className,
  onClick,
  isLoading = false,
  priority = false
}) => {
  const navigate = useNavigate();
  const {
    currentImage,
    isLoading: imageLoading,
    hasError
  } = useOptimizedImageLoader({
    imageUrl: article.imageUrl,
    priority
  });
  const {
    isSaved,
    toggleSave
  } = useCardSave({
    id: article.id,
    type: 'article',
    title: article.title,
    imageUrl: article.imageUrl,
    metadata: {
      category: article.category,
      date: article.date,
      photoCount: article.photoCount,
      featured: article.featured
    }
  });
  const handleClick = onClick || (() => navigate(`/article/${article.id}`));
  if (isLoading) {
    return <Card isLoading className={className} />;
  }
  return <Card
    variant="article"
    className={className}
    isSaved={isSaved}
    onToggleSave={toggleSave}
    imageUrl={currentImage}
    metadata={{
      category: article.category,
      date: article.date,
      photoCount: article.photoCount ? String(article.photoCount) : undefined,
      featured: article.featured ? 'Yes' : undefined
    }}
    onClick={handleClick}
  >
    {/* Overlays absolutely positioned on top of Card image */}
    {article.photoCount && (
      <div className="absolute top-2 right-2 z-10 bg-black/70 text-white px-2 py-1 rounded flex items-center text-xs pointer-events-none">
        <Camera className="mr-1" size={12} />
        <span>{article.photoCount}</span>
      </div>
    )}
    <div className="p-4">
      <h3 className="leading-tight text-gray-900 mb-2 line-clamp-2 text-base font-semibold">
        {article.title}
      </h3>
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span className="font-medium">{article.category}</span>
        <span>{article.date}</span>
      </div>
    </div>
  </Card>;
});
ArticleCard.displayName = 'ArticleCard';
export default ArticleCard;