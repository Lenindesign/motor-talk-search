
import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Gauge, Fuel, Settings, Loader2, Bookmark } from 'lucide-react';
import { useSavedItems } from '../contexts/SavedItemsContext';
import { Skeleton } from '@/components/ui/skeleton';
import GarageActionMenu from './GarageActionMenu';

// Import cn utility if not already available
const cn = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ');
};

export interface CarData {
  id: string;
  title: string;
  imageUrl: string;
  price: string;
  category: string;
  isNew?: boolean;
  year?: string;
  mileage?: string;
  fuelType?: string;
  drivetrain?: string;
  location?: string;
  
  // Body style and basic specs
  bodyStyle?: 'SUV' | 'Sedan' | 'Truck' | 'Sports Car' | 'Minivan' | 'Crossover' | 'Coupe' | 'Convertible' | 'Hatchback' | 'Wagon';
  
  // SUV-specific specs
  cargoCapacity?: string;
  cargoCapacityFolded?: string;
  passengerCapacity?: string;
  seatingConfiguration?: string;
  
  // Sedan-specific specs
  trunkCapacity?: string;
  safetyRating?: string;
  horsepowerTorque?: string;
  
  // Truck-specific specs
  towingCapacity?: string;
  payloadCapacity?: string;
  bedDimensions?: string;
  powertrainOptions?: string;
  
  // Sports Car-specific specs
  zeroToSixty?: string;
  topSpeed?: string;
  weightPowerRatio?: string;
  
  // Minivan-specific specs
  slidingDoorFeatures?: string;
  familyFeatures?: string;
  
  // MotorTrend scores and rankings
  motorTrendScore?: number;
  motorTrendRank?: number;
  motorTrendCategoryRank?: number;
  
  // Image optimization settings
  width?: number;
  height?: number;
  quality?: number;
  priority?: boolean;
}

interface CarCardProps {
  car: CarData;
  type: 'new' | 'used';
  width?: number;
  height?: number;
  quality?: number;
  priority?: boolean;
  fallbackImageUrl?: string;
  secondaryFallbackImageUrl?: string;
  tertiaryFallbackImageUrl?: string;
  quaternaryFallbackImageUrl?: string;
  quinaryFallbackImageUrl?: string;
  // Image optimization settings
  blurRadius?: number;
  borderRadius?: number;
  transitionDuration?: number;
  // Car type specific fallbacks
  sedanFallback?: string;
  suvFallback?: string;
  truckFallback?: string;
  sportsCarFallback?: string;
  minivanFallback?: string;
  crossoverFallback?: string;
  coupeFallback?: string;
  convertibleFallback?: string;
  hatchbackFallback?: string;
  wagonFallback?: string;
}

const CarCard: React.FC<CarCardProps> = ({ 
  car, 
  type,
  width = 800,
  // Calculate height to maintain 16:9 aspect ratio
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
  sedanFallback = 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3',
  suvFallback = 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3',
  truckFallback = 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3',
  sportsCarFallback = 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3',
  minivanFallback = 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3',
  crossoverFallback = 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3',
  coupeFallback = 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3',
  convertibleFallback = 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3',
  hatchbackFallback = 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3',
  wagonFallback = 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3',
  isLoading = false,
  onAction,
  isSaved = false
}) => {
  const navigate = useNavigate();
  const { addSavedItem, removeSavedItem, isSaved: isItemSaved } = useSavedItems();
  const isCarSaved = isItemSaved(car.id, type === 'new' ? 'newCar' : 'usedCar');
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

  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [currentImage, setCurrentImage] = useState<string>(car.imageUrl);

  const linkPath = type === 'new' ? `/new-car/${car.id}` : `/used-car/${car.id}`;

  useEffect(() => {
    const loadImage = async () => {
      try {
        const img = new Image();
        img.onload = () => {
          setCurrentImage(car.imageUrl);
          setImageLoading(false);
          setImageError(false);
        };
        img.onerror = () => {
          // Try fallback images in order
          const fallbacks = [
            fallbackImageUrl,
            secondaryFallbackImageUrl,
            tertiaryFallbackImageUrl,
            quaternaryFallbackImageUrl,
            quinaryFallbackImageUrl
          ];
          for (const fallback of fallbacks) {
            if (fallback) {
              setCurrentImage(fallback);
              setImageLoading(true);
              setImageError(false);
              const fallbackImg = new Image();
              fallbackImg.onload = () => {
                setCurrentImage(fallback);
                setImageLoading(false);
                setImageError(false);
              };
              fallbackImg.onerror = () => {
                setImageError(true);
              };
              fallbackImg.src = fallback;
              return;
            }
          }
          setImageError(true);
        };
        img.src = car.imageUrl;
      } catch (error) {
        console.error('Error loading image:', error);
        setImageLoading(false);
        setImageError(true);
      }
    };

    loadImage();
  }, [car.imageUrl, fallbackImageUrl, secondaryFallbackImageUrl, tertiaryFallbackImageUrl, quaternaryFallbackImageUrl, quinaryFallbackImageUrl]);

  return (
    <div className="group flex flex-col w-full h-full bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
      <RouterLink to={linkPath} className="flex-grow">
        <div className="relative w-full aspect-[16/9] overflow-hidden">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleSave();
            }}
            className="absolute top-2.5 left-2.5 p-2.5 rounded-full bg-white/90 hover:bg-gray-50 shadow-md transition-all duration-300 transform hover:scale-110 z-50"
          >
            <Bookmark 
              size={22} 
              className={`text-gray-600 ${isCarSaved ? 'fill-current' : 'stroke-current'} transition-colors duration-300 ${isCarSaved ? 'text-blue-600' : ''}`}
            />
          </button>
          <div
            className={cn(
              'absolute inset-0 bg-gradient-to-br from-gray-900/50 to-gray-900/30 flex items-center justify-center',
              imageLoading && 'animate-pulse'
            )}
            style={{
              opacity: imageLoading ? 1 : 0,
              transition: 'opacity 0.3s ease-out'
            }}
          >
            {imageLoading ? (
              <Loader2 className="h-8 w-8 animate-spin text-white" />
            ) : (
              <Settings className="h-8 w-8 text-white" />
            )}
          </div>
          <img
            src={currentImage}
            alt={car.title}
            className={cn(
              'w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
            )}
            onLoad={() => setImageLoading(false)}
            onError={() => setImageError(true)}
            loading="lazy"
            width={width}
            height={height}
            style={{
              filter: imageLoading ? `blur(${blurRadius}px)` : 'none',
              transition: `filter ${transitionDuration}s ease-out`
            }}
          />
          {car.isNew && (
            <div className="absolute top-2 left-2">
              <span className="bg-green-600 text-white px-2 py-1 rounded text-xs font-bold">
                NEW 2025
              </span>
            </div>
          )}
        </div>
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
          
          {type === 'used' && (
            <div className="mt-3 space-y-2">
              <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                {car.year && (
                  <div className="flex items-center">
                    <Calendar size={14} className="mr-1" />
                    <span>{car.year}</span>
                  </div>
                )}
                {car.mileage && (
                  <div className="flex items-center">
                    <Gauge size={14} className="mr-1" />
                    <span>{car.mileage}</span>
                  </div>
                )}
                {car.fuelType && (
                  <div className="flex items-center">
                    <Fuel size={14} className="mr-1" />
                    <span>{car.fuelType}</span>
                  </div>
                )}
                {car.drivetrain && (
                  <div className="flex items-center">
                    <Settings size={14} className="mr-1" />
                    <span>{car.drivetrain}</span>
                  </div>
                )}
                {car.location && (
                  <div className="flex items-center">
                    <MapPin size={14} className="mr-1" />
                    <span>{car.location}</span>
                  </div>
                )}
              </div>
            </div>
          )}
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
