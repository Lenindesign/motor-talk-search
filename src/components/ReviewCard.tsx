import React, { memo } from 'react';
import { Star, User, Calendar, Car } from 'lucide-react';
import { useCardSave } from '../hooks/useCardSave';
import { Card } from './ui/card';
import { cn } from '@/lib/utils';

export interface ReviewData {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  rating: number;
  carTitle?: string;
  carId?: string;
  helpful?: number;
  verified?: boolean;
  metadata?: {
    author?: string;
    date?: string;
    rating?: string;
    carTitle?: string;
    carId?: string;
    helpful?: string;
    verified?: string;
  };
}

export interface ReviewCardProps extends React.HTMLAttributes<HTMLDivElement> {
  review: ReviewData;
  className?: string;
  onClick?: () => void;
  isLoading?: boolean;
}

const ReviewCard: React.FC<ReviewCardProps> = memo(({
  review,
  className,
  onClick,
  isLoading = false
}) => {
  const { isSaved, toggleSave } = useCardSave({
    id: review.id,
    type: 'review',
    title: review.title,
    imageUrl: '', // Reviews don't have images
    metadata: {
      author: review.author,
      date: review.date,
      rating: review.rating.toString(),
      carTitle: review.carTitle,
      carId: review.carId,
      helpful: review.helpful?.toString(),
      verified: review.verified?.toString()
    }
  });

  const handleClick = onClick || (() => {
    if (review.carId) {
      window.location.href = `/car/${review.carId}#review-${review.id}`;
    }
  });

  if (isLoading) {
    return <Card isLoading className={className} />;
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={12}
        className={i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
      />
    ));
  };

  return (
    <Card
      className={cn('group relative hover:shadow-lg transition-shadow duration-300 cursor-pointer', className)}
      isSaved={isSaved}
      onToggleSave={toggleSave}
      onClick={handleClick}
    >
      <div className="p-4">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
            <User size={16} className="text-gray-600" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-medium text-sm text-gray-900">{review.author}</span>
              {review.verified && (
                <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded">
                  Verified
                </span>
              )}
              <span className="text-xs text-gray-500">•</span>
              <span className="text-xs text-gray-500">{review.date}</span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-1">
                {renderStars(review.rating)}
              </div>
              <span className="text-xs text-gray-600">({review.rating}/5)</span>
            </div>
            {review.carTitle && (
              <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
                <Car size={12} />
                <span>{review.carTitle}</span>
              </div>
            )}
          </div>
        </div>
        
        <h4 className="font-medium text-sm text-gray-900 mb-2 line-clamp-1">
          {review.title}
        </h4>
        
        <p className="text-sm text-gray-700 line-clamp-3 mb-3">
          {review.content}
        </p>
        
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <span>👍</span>
            <span>{review.helpful || 0} helpful</span>
          </div>
        </div>
      </div>
    </Card>
  );
});

ReviewCard.displayName = 'ReviewCard';
export default ReviewCard; 