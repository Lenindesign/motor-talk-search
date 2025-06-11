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
import MaterialIcon from './ui/MaterialIcon';

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

  // Helper: is this a dealer quote from Find My Best Price?
  const isDealerQuote = ((car as any).status === 'interested' || (car as any).ownership === 'interested') && car.price && car.dealerName;
  
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
                    <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium">
                      Used
                    </span>
                    <span>{car.category} • {car.mileage} miles</span>
                  </div>
                </div>
              )}
              {type === 'new' && (
                <div className="text-sm text-gray-700 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                      New
                    </span>
                    <span>{car.category}</span>
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
    className={cn('flex flex-col w-full bg-white rounded-t-xl shadow-modern overflow-hidden transition-shadow duration-200', className, isDealerQuote && 'border-2 border-motortrend-red')}
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
        <div className="grid gap-2">
        <div className="flex items-start justify-between">
          <RouterLink to={linkPath} className="flex-grow">
            <h3 className="typography-subtitle line-clamp-2 transition-colors text-neutral-1">
              {car.title}
            </h3>
          </RouterLink>
          {isDealerQuote && (
            <span className="ml-2 px-3 py-1 rounded-full bg-motortrend-red text-white text-xs font-semibold">Dealer Offer</span>
          )}
        </div>
        {/* Only show category for used cars since new cars already show it in the ranking */}
        {type !== 'new' && (
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium">
              Used
            </span>
            <RouterLink to={linkPath} className="typography-caption text-neutral-3 hover:text-motortrend-red transition-colors">
              {car.category}
            </RouterLink>
          </div>
        )}
        {type === 'new' && (
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
              New
            </span>
            <span className="typography-caption text-neutral-3">
              {car.category}
            </span>
          </div>
        )}
        <CarSpecs car={car} type={type} />
        {/* Dealer quote details */}
        {isDealerQuote && (
          <div className="mt-2 p-3 rounded bg-red-50 border border-motortrend-red/30">
            <div className="font-bold text-motortrend-red text-lg mb-1">Verified Dealer Price: ${Number(car.price).toLocaleString()}</div>
            <div className="text-sm text-gray-700 mb-1">Dealer: <span className="font-semibold">{car.dealerName}</span></div>
            {(car as any).dealerPhone && (
              <div className="text-sm text-gray-700 mb-1">Phone: <a href={`tel:${(car as any).dealerPhone}`} className="text-motortrend-red underline">{(car as any).dealerPhone}</a></div>
            )}
            {car.dealerLocation && (
              <div className="text-sm text-gray-700">Location: {car.dealerLocation}</div>
            )}
          </div>
        )}
        </div>
      </div>
      {/* Fixed bottom section */}
      <div className="p-8 pt-0">
        {isDealerQuote ? (
          <Button
            variant="solid-primary"
            size="lg"
            className="w-full mb-4 bg-motortrend-red hover:bg-motortrend-dark text-white font-bold text-lg"
            onClick={(e) => {
              e.stopPropagation();
              // Start buy process (could open modal, link, etc.)
              alert('Starting buy process for this dealer quote!');
            }}
          >
            Buy Now!
          </Button>
        ) : (
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
            <MaterialIcon name="search" />
            Find Best Price
          </Button>
        )}
        <GarageActionMenu car={car} type={type} className="w-full" />
      </div>
    </div>
  </Card>;
});
CarCard.displayName = 'CarCard';
export default CarCard;