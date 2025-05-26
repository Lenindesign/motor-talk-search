import React from 'react';
import { MapPin, Calendar, Gauge, Fuel, Settings } from 'lucide-react';
import { CarData } from './types';

interface CarSpecsProps {
  car: CarData;
  type: 'new' | 'used';
}

const CarSpecs: React.FC<CarSpecsProps> = ({ car, type }) => {
  return (
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
  );
};

export default CarSpecs;
