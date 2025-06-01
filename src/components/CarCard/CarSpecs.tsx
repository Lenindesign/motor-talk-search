import React from 'react';
import { MapPin, Calendar, Gauge, Fuel, Settings, DollarSign, Zap, Battery, Car, Cpu, Cog, Award, Medal } from 'lucide-react';
import { CarData } from './types';

interface CarSpecsProps {
  car: CarData;
  type: 'new' | 'used';
}

const CarSpecs: React.FC<CarSpecsProps> = ({ car, type }) => {
  // Display different specs based on car type
  // Prioritize the type prop over the isNew property
  const isNewCar = type === 'new';
  
  return (
    <div className="mt-3 space-y-4">
      {/* Basic specs that appear only for used cars */}
      {!isNewCar && (
        <div className="flex flex-wrap gap-2 text-sm text-gray-600">
          {car.year && (
            <div className="flex items-center">
              <Calendar size={14} className="mr-1 text-motortrend-dark" />
              <span>{car.year}</span>
            </div>
          )}
          {car.mileage && (
            <div className="flex items-center">
              <Gauge size={14} className="mr-1 text-motortrend-dark" />
              <span>{car.mileage}</span>
            </div>
          )}
          {car.fuelType && (
            <div className="flex items-center">
              <Fuel size={14} className="mr-1 text-motortrend-dark" />
              <span>{car.fuelType}</span>
            </div>
          )}
          {car.drivetrain && (
            <div className="flex items-center">
              <Settings size={14} className="mr-1 text-motortrend-dark" />
              <span>{car.drivetrain}</span>
            </div>
          )}
          {car.location && (
            <div className="flex items-center">
              <MapPin size={14} className="mr-1 text-motortrend-dark" />
              <span>{car.location}</span>
            </div>
          )}
        </div>
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
      
      {/* Additional specs for new cars - show only 3 most relevant specs based on body style */}
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
          
          {/* For sports cars and performance vehicles, show horsepower */}
          {(car.category === 'Sports Car' || car.category === 'Luxury' || car.horsepower?.includes('hp')) && car.horsepower && (
            <div className="flex items-center">
              <Cpu size={14} className="mr-1 text-motortrend-dark" />
              <span className="font-medium">Horsepower:</span>
              <span className="ml-1">{car.horsepower}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CarSpecs;
