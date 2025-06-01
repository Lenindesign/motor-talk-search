import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useCardSave } from '../../hooks/useCardSave';
import { useOptimizedImageLoader } from '../../hooks/useOptimizedImageLoader';
import { Card } from '../ui/card';
import { CarData, CarCardProps } from '../CarCard/types';
import { DollarSign, Battery, Zap, Fuel, Car, Medal } from 'lucide-react';
import GarageActionMenu from '../GarageActionMenu';
import { cn } from '@/lib/utils';

interface GarageCarCardProps extends CarCardProps {
  className?: string;
}

const GarageCarCard: React.FC<GarageCarCardProps> = ({
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
  
  const isNewCar = type === 'new' || car.isNew;
  
  return (
    <Card
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
            <span className="text-lg font-semibold ml-2 flex-shrink-0 text-motortrend-dark">
              {car.price}
            </span>
          </div>
          
          {/* Only show category for used cars since new cars already show it in the ranking */}
          {type !== 'new' && (
            <RouterLink to={linkPath} className="text-gray-600 hover:text-motortrend-red transition-colors">
              {car.category}
            </RouterLink>
          )}
          
          {/* MotorTrend score and ranking for new cars */}
          {isNewCar && car.motorTrendScore && (
            <div className="flex flex-col space-y-2 mb-2">
              <div className="flex items-center bg-neutral-100 rounded px-2 py-1 w-fit">
                <span className="text-motortrend-red font-bold mr-1">{car.motorTrendScore}</span>
                <span className="text-sm font-medium">MT Score</span>
              </div>
              {car.motorTrendRank && (
                <div className="flex items-center text-sm">
                  <Medal size={14} className="mr-1 text-motortrend-dark" />
                  <span className="font-medium">Rank:</span>
                  <span className="ml-1 font-bold">{car.motorTrendRank}{car.motorTrendCategoryRank ? ` in ${car.category}` : ''}</span>
                </div>
              )}
            </div>
          )}
          
          {/* Additional specs for new cars */}
          {isNewCar && (
            <div className="grid grid-cols-1 gap-y-2 text-sm border-t border-gray-100 pt-3">
              {/* Always show MSRP as the first spec for all cars */}
              {car.msrp && (
                <div className="flex items-center">
                  <DollarSign size={14} className="mr-1 text-motortrend-dark" />
                  <span className="font-medium">MSRP:</span>
                  <span className="ml-1">{car.msrp}</span>
                </div>
              )}
              
              {/* For electric cars, show range and MPGe */}
              {car.fuelType === 'Electric' && car.range && (
                <div className="flex items-center">
                  <Battery size={14} className="mr-1 text-motortrend-dark" />
                  <span className="font-medium">Range:</span>
                  <span className="ml-1">{car.range}</span>
                </div>
              )}
              {car.fuelType === 'Electric' && car.mpge && (
                <div className="flex items-center">
                  <Zap size={14} className="mr-1 text-motortrend-dark" />
                  <span className="font-medium">MPGe:</span>
                  <span className="ml-1">{car.mpge}</span>
                </div>
              )}
              
              {/* For gas/hybrid cars, show MPG and engine */}
              {car.fuelType !== 'Electric' && car.mpg && (
                <div className="flex items-center">
                  <Fuel size={14} className="mr-1 text-motortrend-dark" />
                  <span className="font-medium">MPG:</span>
                  <span className="ml-1">{car.mpg}</span>
                </div>
              )}
              {car.fuelType !== 'Electric' && car.engine && (
                <div className="flex items-center">
                  <Car size={14} className="mr-1 text-motortrend-dark" />
                  <span className="font-medium">Engine:</span>
                  <span className="ml-1">{car.engine}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="mt-3 pt-3 px-4 pb-4 border-t border-gray-100">
        <GarageActionMenu car={car} type={type} className="w-full" />
      </div>
    </Card>
  );
};

export default GarageCarCard;
