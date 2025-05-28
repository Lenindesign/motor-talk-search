
import React, { memo } from 'react';
import { Camera, Calendar } from 'lucide-react';
import { useCardSave } from '../hooks/useCardSave';
import { useOptimizedImageLoader } from '../hooks/useOptimizedImageLoader';
import BaseCard from './ui/BaseCard';
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

  if (isLoading) {
    return <CardSkeleton className={className} />;
  }

  return (
    <BaseCard 
      type="photo" 
      className={cn('block overflow-hidden hover:shadow-xl transition-shadow duration-300', className)} 
      isSaved={isSaved} 
      onToggleSave={toggleSave}
      onClick={handleClick}
    >
      <div className="relative pt-[56.25%]">
        <img 
          src={currentImage} 
          alt={photo.title} 
          className={cn(
            "absolute inset-0 w-full h-full object-cover transition-opacity duration-300",
            imageLoading ? "opacity-0" : "opacity-100"
          )}
          loading={priority ? "eager" : "lazy"}
        />
        <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded flex items-center text-xs">
          <Camera className="mr-1" size={12} />
          {photo.position}
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
          <h3 className="font-bold leading-tight text-white mb-1 line-clamp-2 text-base">{photo.title}</h3>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span className="font-medium">{photo.make} {photo.carModel}</span>
          <div className="flex items-center">
            <Calendar className="mr-1" size={12} />
            <span>{photo.year}</span>
          </div>
        </div>
      </div>
    </BaseCard>
  );
});

PhotoCard.displayName = 'PhotoCard';

export default PhotoCard;
