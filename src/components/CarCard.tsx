
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Gauge, Fuel, Settings } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

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
}

interface CarCardProps {
  car: CarData;
  type: 'new' | 'used';
}

const CarCard: React.FC<CarCardProps> = ({ car, type }) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  
  const linkPath = type === 'new' ? `/new-car/${car.id}` : `/used-car/${car.id}`;
  
  // Fallback image URL for automotive content
  const fallbackImageUrl = 'https://images.unsplash.com/photo-1494976688602-30db25b13217?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3';
  
  const handleImageLoad = () => {
    setImageLoading(false);
  };
  
  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };
  
  return (
    <Link 
      to={linkPath}
      className="block bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative">
        {imageLoading && (
          <Skeleton className="h-48 w-full" />
        )}
        <img
          src={imageError ? fallbackImageUrl : car.imageUrl}
          alt={car.title}
          className={`h-48 w-full object-cover transition-opacity duration-300 ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
          onLoad={handleImageLoad}
          onError={handleImageError}
          loading="lazy"
        />
        {car.isNew && (
          <div className="absolute top-2 left-2">
            <span className="bg-green-600 text-white px-2 py-1 rounded text-xs font-bold">
              NEW 2025
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg flex-1 line-clamp-2">{car.title}</h3>
        </div>
        <div className="text-xl font-bold text-motortrend-red mb-2">{car.price}</div>
        <div className="text-sm text-gray-600 mb-3">{car.category}</div>
        
        {type === 'used' && (
          <div className="space-y-1 text-xs text-gray-500">
            {car.year && (
              <div className="flex items-center">
                <Calendar size={12} className="mr-1" />
                <span>{car.year}</span>
              </div>
            )}
            {car.mileage && (
              <div className="flex items-center">
                <Gauge size={12} className="mr-1" />
                <span>{car.mileage}</span>
              </div>
            )}
            {car.fuelType && (
              <div className="flex items-center">
                <Fuel size={12} className="mr-1" />
                <span>{car.fuelType}</span>
              </div>
            )}
            {car.drivetrain && (
              <div className="flex items-center">
                <Settings size={12} className="mr-1" />
                <span>{car.drivetrain}</span>
              </div>
            )}
            {car.location && (
              <div className="flex items-center">
                <MapPin size={12} className="mr-1" />
                <span>{car.location}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </Link>
  );
};

export default CarCard;
