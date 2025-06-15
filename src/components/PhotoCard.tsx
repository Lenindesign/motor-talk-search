import React, { memo } from 'react';
import { Camera, Calendar } from 'lucide-react';
import { useCardSave } from '../hooks/useCardSave';
import { useOptimizedImageLoader } from '../hooks/useOptimizedImageLoader';
import { Card } from './ui/card';
import CardSkeleton from './ui/CardSkeleton';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

export interface PhotoData {
  id: string;
  imageUrl: string;
  title: string;
  position: string;
  make: string;
  carModel: string;
  year: string;
  detailUrl?: string;
  metadata?: {
    position?: string;
    make?: string;
    carModel?: string;
    year?: string;
  };
  category?: string;
}

export interface PhotoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  photo: PhotoData;
  className?: string;
  onClick?: () => void;
  isLoading?: boolean;
  priority?: boolean;
  layout?: 'vertical' | 'horizontal';
}

const PhotoCard: React.FC<PhotoCardProps> = memo(({
  photo,
  className,
  onClick,
  isLoading = false,
  priority = false,
  layout = 'vertical'
}) => {
  const { currentImage, isLoading: imageLoading } = useOptimizedImageLoader({
    imageUrl: photo.imageUrl,
    priority
  });

  const { isSaved, toggleSave } = useCardSave({
    id: photo.id,
    type: 'photo',
    title: photo.title,
    imageUrl: photo.imageUrl,
    metadata: {
      position: photo.position,
      make: photo.make,
      carModel: photo.carModel,
      year: photo.year
    }
  });

  const handleClick = onClick || (() => window.location.href = `/photo/${photo.id}`);

  if (isLoading || imageLoading) {
    return <Card isLoading className={className} />;
  }

  if (layout === 'horizontal') {
    return (
      <Card 
        className={cn('group overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white border-0 rounded-2xl', className)}
        showSaveButton={false}
      >
        <Link to={`/photo/${photo.id}`} className="block">
          <div className="flex p-6">
            {/* Content - Left side */}
            <div className="flex-1 flex flex-col justify-between min-w-0 pr-6">
              <div>
                {photo.category && (
                  <div className="text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">
                    {photo.category}
                  </div>
                )}
                <h3 className="text-base font-semibold line-clamp-3 group-hover:text-motortrend-red transition-colors leading-tight text-gray-900 mb-3">
                  {photo.title}
                </h3>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-500 mt-4">
                <div className="flex items-center">
                  <span>{photo.year} {photo.make} {photo.carModel} • {photo.position}</span>
                </div>
                {/* Bookmark button next to date */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    toggleSave();
                  }}
                  className="p-1 text-gray-400 hover:text-gray-600 transition-colors ml-3"
                  aria-label={isSaved ? "Unsave photo" : "Save photo"}
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
                src={currentImage} 
                alt={photo.title}
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
      variant="photo"
      className={cn('group relative shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-shadow duration-300 cursor-pointer bg-gray-800 border-0', className)}
      isSaved={isSaved}
      onToggleSave={toggleSave}
      onClick={handleClick}
    >
      {/* Image and overlays */}
      <div className="relative pt-[56.25%] overflow-hidden">
        <img src={currentImage} alt={photo.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 rounded-t-xl" loading="lazy" />
        {/* Overlays absolutely positioned on top of Card image */}
        <div className="absolute top-2 right-2 z-20 pointer-events-none">
          <span className="bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center">
            <Camera className="mr-1" size={12} />
            {photo.position}
          </span>
        </div>
        
        {/* No gradient overlay */}
      </div>
      
      {/* Card content below image - headline moved here */}
      <div className="p-8 bg-motortrend-dark rounded-b-xl">
        <div className="flex items-center">
          <h3 className="text-lg text-white line-clamp-2">{photo.title}</h3>
        </div>
      </div>
    </Card>
  );
});

PhotoCard.displayName = 'PhotoCard';

export default PhotoCard;
