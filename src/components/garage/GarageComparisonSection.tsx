
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { SavedItem } from '../../contexts/SavedItemsContext';
import GarageCompare from '../GarageCompare';

interface GarageComparisonSectionProps {
  savedCars: SavedItem[];
  selectedCars: string[];
  onToggleCar: (id: string, type: any) => void;
  onCompare: () => void;
}

const GarageComparisonSection: React.FC<GarageComparisonSectionProps> = ({
  savedCars,
  selectedCars,
  onToggleCar,
  onCompare
}) => {
  if (savedCars.length <= 1) return null;

  return (
    <div className="mb-8">
      <Card className="border-2 border-motortrend-red/20 bg-gradient-to-r from-motortrend-red/5 to-transparent">
        <CardContent className="p-6">
          <GarageCompare 
            savedCars={savedCars} 
            selectedCars={selectedCars} 
            onToggleCar={onToggleCar} 
            onCompare={onCompare} 
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default GarageComparisonSection;
