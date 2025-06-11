import React from 'react';
import { Car } from '../../types/car';

interface OverviewProps {
  car: Car;
}

const Overview: React.FC<OverviewProps> = ({ car }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <img 
            src={car.image} 
            alt={`${car.year} ${car.make} ${car.model}`} 
            className="w-full h-auto rounded-lg"
          />
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">{car.year} {car.make} {car.model}</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-400">Body Style</p>
              <p>{car.bodyStyle}</p>
            </div>
            <div>
              <p className="text-gray-400">Trim</p>
              <p>{car.trim}</p>
            </div>
            <div>
              <p className="text-gray-400">Starting MSRP</p>
              <p>${car.price.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
