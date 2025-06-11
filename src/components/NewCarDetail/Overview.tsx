import React from 'react';
import { Car } from '../../types/car';

interface Props {
  car: Car;
}

const Overview: React.FC<Props> = ({ car }) => {
  return (
    <div className="space-y-6">
      <div className="aspect-video rounded-lg overflow-hidden bg-gray-800">
        <img 
          src={car.image} 
          alt={`${car.year} ${car.make} ${car.model}`}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-bold mb-4">Vehicle Information</h3>
          <dl className="space-y-4">
            <div>
              <dt className="text-gray-400">Make</dt>
              <dd className="font-medium text-white">{car.make}</dd>
            </div>
            <div>
              <dt className="text-gray-400">Model</dt>
              <dd className="font-medium text-white">{car.model}</dd>
            </div>
            <div>
              <dt className="text-gray-400">Year</dt>
              <dd className="font-medium text-white">{car.year}</dd>
            </div>
            <div>
              <dt className="text-gray-400">Body Style</dt>
              <dd className="font-medium text-white">{car.bodyStyle}</dd>
            </div>
          </dl>
        </div>
        
        <div>
          <h3 className="text-xl font-bold mb-4">Pricing</h3>
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="text-3xl font-bold mb-2 text-white">
              ${car.price.toLocaleString()}
            </div>
            <p className="text-gray-400">Starting MSRP</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
