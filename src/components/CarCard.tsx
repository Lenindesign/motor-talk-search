
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useSavedItems } from '../contexts/SavedItemsContext';
import { useImageLoader } from './CarCard/useImageLoader';
import CarImage from './CarCard/CarImage';
import CarSpecs from './CarCard/CarSpecs';
import GarageActionMenu from './GarageActionMenu';
import { CarCardProps } from './CarCard/types';

// Re-export types for backward compatibility
export type { CarData, CarCardProps } from './CarCard/types';

const CarCard: React.FC<CarCardProps> = ({ 
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
  isSaved = false
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
    <div className="group flex flex-col w-full h-full bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
      <RouterLink to={linkPath} className="flex-grow">
        <CarImage
          car={car}
          currentImage={currentImage}
          imageLoading={imageLoading}
          imageError={imageError}
          width={width}
          height={height}
          blurRadius={blurRadius}
          transitionDuration={transitionDuration}
          isCarSaved={isCarSaved}
          onSave={handleSave}
          onImageLoad={() => {}}
          onImageError={() => {}}
        />
      </RouterLink>
      
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
          
          <RouterLink to={linkPath}>
            <p className="text-sm text-gray-600 hover:text-gray-800 transition-colors">
              {car.category}
            </p>
          </RouterLink>
          
          <CarSpecs car={car} type={type} />
        </div>
        
        {/* Garage Action Menu */}
        <div className="mt-3 pt-3 border-t border-gray-100">
          <GarageActionMenu car={car} type={type} className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default CarCard;
