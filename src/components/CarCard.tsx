import React, { memo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useCardSave } from '../hooks/useCardSave';
import { useOptimizedImageLoader } from '../hooks/useOptimizedImageLoader';
import CarSpecs from './CarCard/CarSpecs';
import GarageActionMenu from './GarageActionMenu';
import { Card } from './ui/card';
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
      dealerName: car.dealerName,
      dealerLocation: car.dealerLocation,
      bodyStyle: car.bodyStyle,
      isNew: car.isNew,
      // New car specs
      msrp: car.msrp,
      mpg: car.mpg,
      mpge: car.mpge,
      range: car.range,
      engine: car.engine,
      horsepower: car.horsepower,
      transmission: car.transmission,
      // MotorTrend ratings
      motorTrendScore: car.motorTrendScore,
      motorTrendRank: car.motorTrendRank,
      motorTrendCategoryRank: car.motorTrendCategoryRank
    }
  });
  const linkPath = type === 'new' ? `/new-car/${car.id}` : `/used-car/${car.id}`;
  if (isLoading) {
    return <Card isLoading className={className} />;
  }
  return <Card
    variant={type === 'new' ? 'newCar' : 'usedCar'}
    className={cn('flex flex-col w-full h-full bg-white rounded-t-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200', className)}
    isSaved={isSaved}
    onToggleSave={toggleSave}
    imageUrl={currentImage}
    metadata={{
      price: car.price,
      category: car.category,
      year: car.year,
      mileage: car.mileage,
      fuelType: car.fuelType,
      drivetrain: car.drivetrain,
      location: car.location,
      dealerName: car.dealerName,
      dealerLocation: car.dealerLocation,
      bodyStyle: car.bodyStyle,
      isNew: car.isNew ? 'Yes' : 'No'
    }}
    onClick={() => window.location.href = linkPath}
  >
    <div className="relative w-full h-full">

      <div className="p-4 flex flex-col flex-grow space-y-2">
        <div className="flex items-start justify-between">
          <RouterLink to={linkPath} className="flex-grow">
            <h3 className="text-lg line-clamp-2 transition-colors font-semibold text-motortrend-dark">
              {car.title}
            </h3>
          </RouterLink>
        </div>
        {/* Only show category for used cars since new cars already show it in the ranking */}
        {type !== 'new' && (
          <RouterLink to={linkPath} className="text-gray-600 hover:text-motortrend-red transition-colors">
            {car.category}
          </RouterLink>
        )}
        <CarSpecs car={car} type={type} />
      </div>
    </div>
    <div className="mt-3 pt-3 px-4 pb-4 border-t border-gray-100">
      <GarageActionMenu car={car} type={type} className="w-full" />
    </div>
  </Card>;
});
CarCard.displayName = 'CarCard';
export default CarCard;