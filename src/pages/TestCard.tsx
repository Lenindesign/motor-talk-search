import React from 'react';
import CarCard from '../components/CarCard';
import { mockUsedCars } from '../services/mockData';
import { Card } from '../components/ui/card';

const TestCard: React.FC = () => {
  // Find the BMW 3 Series
  const bmw3Series = mockUsedCars.find(car => car.id === 'bmw-3-series');
  
  if (!bmw3Series) {
    return <div className="p-6">BMW 3 Series not found</div>;
  }
  
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Car Card Test Page</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Car Data</h2>
          <Card className="p-4">
            <pre className="whitespace-pre-wrap text-sm">
              {JSON.stringify(bmw3Series, null, 2)}
            </pre>
          </Card>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Rendered Card</h2>
          <div className="max-w-sm mx-auto">
            <CarCard car={bmw3Series} type="used" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestCard;
