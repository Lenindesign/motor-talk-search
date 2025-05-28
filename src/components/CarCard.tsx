import React, { memo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useCardSave } from '../hooks/useCardSave';
import { useOptimizedImageLoader } from '../hooks/useOptimizedImageLoader';
import CarSpecs from './CarCard/CarSpecs';
import GarageActionMenu from './GarageActionMenu';
import BaseCard from './ui/BaseCard';
import CardSkeleton from './ui/CardSkeleton';
import { CardType } from '@/styles/cardStyles';
import { cn } from '@/lib/utils';
import { CarData, CarCardProps } from './CarCard/types';

// Re-export types for backward compatibility
export type { CarData, CarCardProps } from './CarCard/types';
interface EnhancedCarCardProps extends CarCardProps {
  className?: string;
}
const CarCard: React.FC<EnhancedCarCardProps> = memo(({
  car,
  type,
  priority = false,
  isLoading = false,
  className
}) => {
  const {
    currentImage,
    isLoading: imageLoading
  } = useOptimizedImageLoader({
    imageUrl: car.imageUrl,
    priority
  });
  const {
    isSaved,
    toggleSave
  } = useCardSave({
    id: car.id,
    type: type === 'new' ? 'newCar' : 'usedCar',
    title: car.title,
    imageUrl: car.imageUrl,
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
  });
  const linkPath = type === 'new' ? `/new-car/${car.id}` : `/used-car/${car.id}`;
  if (isLoading) {
    return <CardSkeleton className={className} variant="detailed" />;
  }
  return <BaseCard type={type === 'new' ? 'newCar' : 'usedCar' as CardType} className={cn('flex flex-col w-full h-full bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200', className)} isSaved={isSaved} onToggleSave={toggleSave} onClick={() => window.location.href = linkPath}>
      <div className="flex-grow relative">
        <img src={currentImage} alt={car.title} className={cn('w-full h-full object-cover transition-all duration-300 group-hover:scale-105', imageLoading ? 'opacity-0' : 'opacity-100')} loading={priority ? "eager" : "lazy"} />
        {car.isNew && <div className="absolute top-2 right-2">
            
          </div>}
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <div className="flex-grow space-y-2">
          <div className="flex items-start justify-between">
            <RouterLink to={linkPath} className="flex-grow">
              <h3 className="font-bold text-lg line-clamp-2 hover:text-motortrend-red transition-colors">
                {car.title}
              </h3>
            </RouterLink>
            <span className="text-lg font-semibold ml-2 flex-shrink-0 text-motortrend-dark">
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
    </BaseCard>;
});
CarCard.displayName = 'CarCard';
export default CarCard;