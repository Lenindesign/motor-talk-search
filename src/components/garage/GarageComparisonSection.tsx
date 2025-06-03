
import React from 'react';
import { ArrowRightLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-motortrend-dark flex items-center gap-2">
                <ArrowRightLeft size={20} className="text-motortrend-red" />
                Compare Your Cars
              </h3>
              <p className="text-gray-600">Select vehicles to compare side by side</p>
            </div>
            <Button 
              onClick={onCompare} 
              disabled={selectedCars.length < 2} 
              className="bg-motortrend-red hover:bg-motortrend-red/90"
            >
              Compare Selected ({selectedCars.length})
            </Button>
          </div>
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
