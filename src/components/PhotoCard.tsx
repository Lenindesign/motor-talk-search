
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
    return <Card isLoading className={className} />;
  }

  return (
    <Card
      variant="photo"
      className={cn('block overflow-hidden hover:shadow-xl transition-shadow duration-300', className)}
      isSaved={isSaved}
      onToggleSave={toggleSave}
      imageUrl={currentImage}
      metadata={{
        position: photo.position,
        make: photo.make,
        carModel: photo.carModel,
        year: photo.year
      }}
      onClick={handleClick}
    >
      <div className="relative w-full h-full">
        {/* Overlay: photo count badge (top right) */}
        <div className="absolute top-2 right-2 z-10 bg-black/70 text-white px-2 py-1 rounded flex items-center text-xs pointer-events-none">
          <Camera className="mr-1" size={12} />
          {photo.position}
        </div>
        {/* Overlay: title and year badge in bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/80 to-transparent p-3 flex items-center justify-between pointer-events-none">
          <h3 className="font-bold leading-tight text-white line-clamp-2 text-base mr-2">{photo.title}</h3>
          <div className="flex items-center bg-black/70 text-white px-2 py-1 rounded text-xs">
            <Calendar className="mr-1" size={12} />
            <span>{photo.year}</span>
          </div>
        </div>
        {/* Card content below image */}
        <div className="p-4">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span className="font-medium">{photo.make} {photo.carModel}</span>
          </div>
          <div className="mt-2 text-sm text-gray-600">
            <span className="font-medium">position:</span> {photo.position}<br />
            <span className="font-medium">make:</span> {photo.make}<br />
            <span className="font-medium">carModel:</span> {photo.carModel}<br />
            <span className="font-medium">year:</span> {photo.year}
          </div>
        </div>
      </div>
    </Card>
  );
});

PhotoCard.displayName = 'PhotoCard';

export default PhotoCard;
