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
import { Badge } from '@/components/ui/badge';

// Re-export types for backward compatibility
export type { CarData, CarCardProps } from './CarCard/types';
interface EnhancedCarCardProps extends CarCardProps {
  className?: string;
  layout?: 'vertical' | 'horizontal';
}
const CarCard: React.FC<EnhancedCarCardProps> = memo(({
  car,
  type,
  priority = false,
  isLoading = false,
  className,
  layout = 'vertical'
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

  if (layout === 'horizontal') {
    return (
      <Card
        variant={type === 'new' ? 'newCar' : 'usedCar'}
        className={cn('flex overflow-hidden bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 border-0', className)}
        showSaveButton={false}
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
        <div className="flex w-full p-6">
          {/* Content - Left side */}
          <div className="flex-1 flex flex-col min-w-0 pr-6">
            <div>
              <RouterLink to={linkPath} className="block">
                <h3 className="text-base font-semibold line-clamp-2 group-hover:text-motortrend-red transition-colors leading-tight text-gray-900 mb-2">
                  {car.title}
                </h3>
              </RouterLink>
              <p className="text-base font-bold text-black mb-3">
                {car.price}
              </p>
              {type !== 'new' && (
                <div className="text-sm text-gray-700 mb-3">
                  <div className="flex items-center gap-2">
                    <RouterLink to={linkPath} className="typography-caption text-neutral-3 hover:text-motortrend-red transition-colors">
                      {car.category}
                    </RouterLink>
                    <Badge variant="secondary" className="text-xs">
                      Used Car
                    </Badge>
                  </div>
                </div>
              )}
              {type === 'new' && (
                <div className="text-sm text-gray-700 mb-3">
                  <div className="flex items-center gap-2">
                    <RouterLink to={linkPath} className="typography-caption text-neutral-3 hover:text-motortrend-red transition-colors">
                      {car.category}
                    </RouterLink>
                    <Badge variant="default" className="text-xs bg-green-100 text-green-800 hover:bg-green-200">
                      New Car
                    </Badge>
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center justify-between mt-auto">
              <div className="flex items-center">
                {car.motorTrendScore && (
                  <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full mr-3">
                    MT {car.motorTrendScore}
                  </div>
                )}
                {/* Bookmark button next to MT score */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    toggleSave();
                  }}
                  className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label={isSaved ? "Unsave car" : "Save car"}
                >
                  <svg width="16" height="16" fill={isSaved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          {/* Car image - Right side */}
          <div className="w-32 h-24 flex-shrink-0 overflow-hidden rounded-xl">
            <img 
              src={currentImage} 
              alt={car.title}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>
      </Card>
    );
  }

  return <Card
    variant={type === 'new' ? 'newCar' : 'usedCar'}
    className={cn('flex flex-col w-full bg-white rounded-t-xl shadow-modern overflow-hidden transition-shadow duration-200', className)}
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
    <div className="relative w-full flex flex-col">
      <div className="p-8 flex-1 flex flex-col">
        {/* Use grid with consistent gap instead of space-y for better spacing control */}
        <div className="grid gap-2">
        <div className="flex items-start justify-between">
          <RouterLink to={linkPath} className="flex-grow">
            <h3 className="text-lg line-clamp-2 transition-colors text-neutral-1">
              {car.title}
            </h3>
          </RouterLink>
        </div>
        {/* Only show category for used cars since new cars already show it in the ranking */}
        {type !== 'new' && (
          <div className="flex items-center gap-2">
            <RouterLink to={linkPath} className="typography-caption text-neutral-3 hover:text-motortrend-red transition-colors">
              {car.category}
            </RouterLink>
            <Badge variant="secondary" className="text-xs">
              Used Car
            </Badge>
          </div>
        )}
        {type === 'new' && (
          <div className="flex items-center gap-2">
            <RouterLink to={linkPath} className="typography-caption text-neutral-3 hover:text-motortrend-red transition-colors">
              {car.category}
            </RouterLink>
            <Badge variant="default" className="text-xs bg-green-100 text-green-800 hover:bg-green-200">
              New Car
            </Badge>
          </div>
        )}
        <CarSpecs car={car} type={type} />

        </div>
      </div>
      {/* Fixed bottom section */}
      <div className="p-8 pt-0">
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
