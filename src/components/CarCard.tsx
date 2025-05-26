import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useSavedItems } from '../contexts/SavedItemsContext';
import { useImageLoader } from './CarCard/useImageLoader';
import CarSpecs from './CarCard/CarSpecs';
import GarageActionMenu from './GarageActionMenu';
import BaseCard from './ui/BaseCard';
import { CardType } from '@/styles/cardStyles';
import { cn } from '@/lib/utils';
import { CarData, CarCardProps } from './CarCard/types';

// Re-export types for backward compatibility
export type { CarData, CarCardProps } from './CarCard/types';

interface EnhancedCarCardProps extends CarCardProps {
  className?: string;
}

const CarCard: React.FC<EnhancedCarCardProps> = ({ 
  car, 
  type,
  width = 800,
  height = width * (9/16),
  quality = 80,
  priority = false,
  fallbackImageUrl = 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3',
  secondaryFallbackImageUrl = 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3',
  tertiaryFallbackImageUrl = 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3',
  quaternaryFallbackImageUrl = 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3',
  quinaryFallbackImageUrl = 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3',
  blurRadius = 3,
  borderRadius = 8,
  transitionDuration = 0.3,
  isLoading = false,
  onAction,
  isSaved = false,
  className
}) => {
  const { addSavedItem, removeSavedItem, isSaved: isItemSaved } = useSavedItems();
  const isCarSaved = isItemSaved(car.id, type === 'new' ? 'newCar' : 'usedCar');
  
  const { imageLoading, imageError, currentImage } = useImageLoader({
    imageUrl: car.imageUrl,
    fallbackImageUrl,
    secondaryFallbackImageUrl,
    tertiaryFallbackImageUrl,
    quaternaryFallbackImageUrl,
    quinaryFallbackImageUrl
  });

  const savedItem = {
    id: car.id,
    title: car.title,
    type: type === 'new' ? 'newCar' as const : 'usedCar' as const,
    imageUrl: car.imageUrl,
    savedAt: new Date().toISOString(),
    metadata: {
      price: car.price,
      category: car.category,
      year: car.year,
      mileage: car.mileage,
      fuelType: car.fuelType,
      drivetrain: car.drivetrain,
      location: car.location,
      bodyStyle: car.bodyStyle,
      isNew: car.isNew
    }
  };

  const handleSave = () => {
    if (isCarSaved) {
      removeSavedItem(car.id, type === 'new' ? 'newCar' : 'usedCar');
    } else {
      addSavedItem(savedItem);
    }
  };

  const linkPath = type === 'new' ? `/new-car/${car.id}` : `/used-car/${car.id}`;

  return (
    <BaseCard
      type={type === 'new' ? 'newCar' : 'usedCar' as CardType}
      className={cn(
        'flex flex-col w-full h-full bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200',
        className
      )}
      isSaved={isCarSaved}
      onToggleSave={handleSave}
      isLoading={isLoading}
      onClick={() => window.location.href = linkPath}
    >
      <div className="flex-grow">
        <img
          src={currentImage}
          alt={car.title}
          className={cn(
            'w-full h-full object-cover transition-transform duration-300 group-hover:scale-105',
            imageLoading ? 'blur-2xl' : 'blur-0'
          )}
          onLoad={() => {
            if (imageLoading) {
              // Add any additional loading logic here
            }
          }}
          onError={() => {
            // Add any additional error handling here
          }}
          loading="lazy"
          width={width}
          height={height}
        />
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <div className="flex-grow space-y-2">
          <div className="flex items-start justify-between">
            <RouterLink to={linkPath} className="flex-grow">
              <h3 className="font-bold text-lg line-clamp-2 hover:text-motortrend-red transition-colors">
                {car.title}
              </h3>
            </RouterLink>
            <span className="text-motortrend-red text-lg font-semibold ml-2 flex-shrink-0">
              {car.price}
            </span>
          </div>
          <RouterLink to={linkPath} className="text-gray-600 hover:text-motortrend-red transition-colors">
            {car.category}
          </RouterLink>
          <CarSpecs car={car} type={type} />
        </div>
      </div>
      <div className="mt-3 pt-3 px-4 pb-4 border-t border-gray-100">
        <GarageActionMenu car={car} type={type} className="w-full" />
      </div>
    </BaseCard>
  );
};

export default CarCard;
