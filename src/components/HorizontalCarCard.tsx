import React, { memo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useCardSave } from '../hooks/useCardSave';
import { useOptimizedImageLoader } from '../hooks/useOptimizedImageLoader';
import { Card } from './ui/card';
import { cn } from '@/lib/utils';
import { CarData, CarCardProps } from './CarCard/types';
import { Badge } from './ui/badge';
import { Bookmark } from 'lucide-react';

interface HorizontalCarCardProps extends CarCardProps {
  className?: string;
  compact?: boolean;
}

const HorizontalCarCard: React.FC<HorizontalCarCardProps> = memo(({
  car,
  type,
  priority = false,
  isLoading = false,
  className,
  compact = false
}) => {
  const {
    currentImage,
    isLoading: imageLoading
  } = useOptimizedImageLoader({
    imageUrl: car?.imageUrl || '/placeholder-vehicle.jpg',
    priority
  });
  
  const {
    isSaved,
    toggleSave
  } = useCardSave({
    id: car?.id || '',
    type: type === 'new' ? 'newCar' : 'usedCar',
    title: car?.title || '',
    imageUrl: car?.imageUrl || '/placeholder-vehicle.jpg',
    metadata: {
      price: car?.price || '',
      category: car?.category || '',
      year: car?.year || '',
      mileage: car?.mileage || '',
      fuelType: car?.fuelType || '',
      drivetrain: car?.drivetrain || '',
      location: car?.location || '',
      dealerName: car?.dealerName || '',
      dealerLocation: car?.dealerLocation || '',
      bodyStyle: car?.bodyStyle || '',
      isNew: car?.isNew || false,
      msrp: car?.msrp || '',
      mpg: car?.mpg || '',
      mpge: car?.mpge || '',
      range: car?.range || '',
      engine: car?.engine || '',
      horsepower: car?.horsepower || '',
      transmission: car?.transmission || '',
      motorTrendScore: car?.motorTrendScore || '',
      motorTrendRank: car?.motorTrendRank || '',
      motorTrendCategoryRank: car?.motorTrendCategoryRank || false
    }
  });

  const linkPath = type === 'new' ? `/new-car/${car?.id || ''}` : `/used-car/${car?.id || ''}`;

  if (isLoading) {
    return <div className={cn("flex w-full bg-white border border-gray-200 rounded-lg shadow-sm h-32", className)}>
      <div className="animate-pulse bg-gray-200 w-1/3 h-full rounded-l-lg"></div>
      <div className="w-2/3 p-3 flex flex-col justify-between">
        <div className="animate-pulse bg-gray-200 h-4 w-3/4 mb-2"></div>
        <div className="animate-pulse bg-gray-200 h-3 w-1/2 mb-2"></div>
        <div className="animate-pulse bg-gray-200 h-3 w-2/3"></div>
      </div>
    </div>;
  }

  return (
    <div className={cn(
      "flex w-full bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow transition-shadow duration-200 overflow-hidden",
      compact ? "h-24" : "h-32",
      className
    )}>
      {/* Image Section - Square 1:1 Format */}
      <div className={cn(
        "relative overflow-hidden shrink-0",
        compact ? "w-24 h-full" : "w-32 h-full"
      )}>
        <RouterLink to={linkPath} className="block h-full">
          <div className="w-full h-full bg-gray-100">
            <img 
              src={currentImage} 
              alt={car?.title || 'Vehicle'} 
              className="w-full h-full object-cover object-center" 
            />
          </div>
        </RouterLink>
      </div>

      {/* Content Section */}
      <div className="flex-1 flex flex-col justify-between p-3">
        <div>
          <h3 className={cn(
            "font-medium text-gray-900 line-clamp-1 mb-1",
            compact ? "text-sm" : "text-base"
          )}>
            {car?.title || 'Untitled Vehicle'}
          </h3>
          
          {car?.motorTrendScore && (
            <div className="flex items-center">
              <span className="text-xs font-medium text-gray-500">
                {car.motorTrendScore} MotorTrend Score
              </span>
            </div>
          )}
        </div>
        
        <div className="mt-1">
          <div className="text-base font-semibold text-gray-900">
            {car?.price || 'Contact for price'}
          </div>
          {!car?.isNew && car?.dealerLocation && (
            <div className="text-xs text-gray-500">
              {car.dealerLocation}
            </div>
          )}
        </div>
      </div>
      
      {/* Save Button */}
      <div className="p-2 flex items-start">
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleSave();
          }}
          className="text-gray-400 hover:text-gray-600 transition-colors"
          aria-label={isSaved ? "Remove from saved" : "Save to garage"}
        >
          <Bookmark
            size={20}
            fill={isSaved ? "#000000" : "none"}
            stroke={isSaved ? "#000000" : "currentColor"}
            strokeWidth={2}
          />
        </button>
      </div>
    </div>
  );
});

HorizontalCarCard.displayName = 'HorizontalCarCard';
export default HorizontalCarCard;
