
import React, { memo } from 'react';
import { Camera, Calendar } from 'lucide-react';
import { useCardSave } from '../hooks/useCardSave';
import { useOptimizedImageLoader } from '../hooks/useOptimizedImageLoader';
import { Card } from './ui/card';
import CardSkeleton from './ui/CardSkeleton';
import { cn } from '@/lib/utils';

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
}

export interface PhotoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  photo: PhotoData;
  className?: string;
  onClick?: () => void;
  isLoading?: boolean;
  priority?: boolean;
}

const PhotoCard: React.FC<PhotoCardProps> = memo(({
  photo,
  className,
  onClick,
  isLoading = false,
  priority = false
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

  return (
    <Card
      variant="photo"
      className={cn('group relative hover:shadow-xl transition-shadow duration-300 cursor-pointer bg-gray-800 border-gray-700', className)}
      isSaved={isSaved}
      onToggleSave={toggleSave}
      onClick={handleClick}
    >
      {/* Image and overlays */}
      <div className="relative pt-[56.25%]">
        <img src={currentImage} alt={photo.title} className="absolute inset-0 w-full h-full object-cover transition-all duration-300 rounded-t-xl" loading="lazy" />
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
      <div className="p-4 bg-motortrend-dark rounded-b-xl">
        <div className="flex items-center">
          <h3 className="font-semibold leading-tight text-white line-clamp-2 text-base">{photo.title}</h3>
        </div>
      </div>
    </Card>
  );
});

PhotoCard.displayName = 'PhotoCard';

export default PhotoCard;
