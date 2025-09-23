import React from 'react';
import CarCard from './CarCard';
import { mockUsedCars } from '../services/mockData';

const TestCarCard: React.FC = () => {
  // Find the BMW 3 Series
  const bmw3Series = mockUsedCars.find(car => car.id === 'bmw-3-series');
  
  if (!bmw3Series) {
    return <div>BMW 3 Series not found</div>;
  }
  
  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Test Car Card</h1>
      <CarCard car={bmw3Series} type="used" />
    </div>
  );
};

export default TestCarCard;
