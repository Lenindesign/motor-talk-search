import React, { memo } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useCardSave } from '../hooks/useCardSave';
import { useOptimizedImageLoader } from '../hooks/useOptimizedImageLoader';
import CarSpecs from './CarCard/CarSpecs';
import GarageActionMenu from './GarageActionMenu';
import { Card } from './ui/card';
import CardSkeleton from './ui/CardSkeleton';
import { CardType } from '@/styles/cardStyles';
import { cn } from '@/lib/utils';
import { CarData, CarCardProps } from './CarCard/types';
import { Button } from './ui/button';
import { Search } from 'lucide-react';

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
  const navigate = useNavigate();
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
    className={cn('flex flex-col w-full h-full bg-white rounded-t-xl shadow-modern overflow-hidden transition-shadow duration-200', className)}
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
    onClick={() => navigate(linkPath)}
  >
    <div className="relative w-full h-full flex flex-col">
      <div className="p-8 flex-1 flex flex-col min-h-0">
        {/* Use grid with consistent gap instead of space-y for better spacing control */}
        <div className="grid gap-2">
        <div className="flex items-start justify-between">
          <RouterLink to={linkPath} className="flex-grow">
            <h3 className="typography-subtitle line-clamp-2 transition-colors text-neutral-1">
              {car.title}
            </h3>
          </RouterLink>
        </div>
        {/* Only show category for used cars since new cars already show it in the ranking */}
        {type !== 'new' && (
          <RouterLink to={linkPath} className="typography-caption text-neutral-3 hover:text-motortrend-red transition-colors">
            {car.category}
          </RouterLink>
        )}
        <CarSpecs car={car} type={type} />

        </div>
      </div>
      {/* Fixed bottom section */}
      <div className="p-8 pt-0 mt-auto">
        <Button
          variant="outline-primary"
          size="lg"
          className="w-full mb-4"
          onClick={(e) => {
            e.stopPropagation();
            // Extract make and model from title (e.g. "2025 Rivian R1S")
            const titleParts = car.title.split(' ');
            if (titleParts.length >= 3) {
              const year = titleParts[0];
              const make = titleParts[1];
              const model = titleParts.slice(2).join(' ');
              const carId = `${make.toLowerCase()}-${model.toLowerCase()}-${year}`;
              navigate(`/find-best-price/${carId}`);
            }
          }}
        >
          <Search />
          Find Best Price
        </Button>
        <GarageActionMenu car={car} type={type} className="w-full" />
      </div>
    </div>
  </Card>;
});
CarCard.displayName = 'CarCard';
export default CarCard;