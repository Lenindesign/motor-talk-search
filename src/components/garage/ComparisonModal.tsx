import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, BarChart3, CheckCircle2 } from 'lucide-react';
import { SavedItem } from '../../contexts/SavedItemsContext';
import { CarData } from '../CarCard';

interface ComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedCars: SavedItem[];
  savedItemToCarData: (item: SavedItem) => CarData;
}

const ComparisonModal: React.FC<ComparisonModalProps> = ({
  isOpen,
  onClose,
  savedCars,
  savedItemToCarData
}) => {
  const [selectedCars, setSelectedCars] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);

  const handleCarToggle = (carId: string) => {
    setSelectedCars(prev => {
      if (prev.includes(carId)) {
        return prev.filter(id => id !== carId);
      } else {
        if (prev.length >= 4) {
          return prev; // Don't add more than 4 cars
        }
        return [...prev, carId];
      }
    });
  };

  const handleCompare = () => {
    if (selectedCars.length >= 2) {
      setShowComparison(true);
    }
  };

  const handleBack = () => {
    setShowComparison(false);
    setSelectedCars([]);
  };

  const handleClose = () => {
    setShowComparison(false);
    setSelectedCars([]);
    onClose();
  };

  const getSelectedCarData = (): CarData[] => {
    return savedCars
      .filter(car => selectedCars.includes(car.id))
      .map(car => savedItemToCarData(car));
  };

  const getOwnershipBadge = (ownership: string) => {
    switch (ownership) {
      case 'owned':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Owned</Badge>;
      case 'testDriven':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">Test Drive</Badge>;
      case 'interested':
        return <Badge variant="secondary" className="bg-amber-100 text-amber-800">Interested</Badge>;
      default:
        return null;
    }
  };

  const ComparisonTable = ({ cars }: { cars: CarData[] }) => {
    const specs = [
      { label: 'Price', key: 'price' },
      { label: 'Year', key: 'year' },
      { label: 'MotorTrend Score', key: 'motorTrendScore', isScore: true },
      { label: 'Owner Score', key: 'userReviewsScore', isScore: true },
      { label: 'MT Rank', key: 'motorTrendRank' },
      { label: 'Category Rank', key: 'motorTrendCategoryRank', isRank: true },
      { label: 'Fuel Type', key: 'fuelType' },
      { label: 'Drivetrain', key: 'drivetrain' },
      { label: 'MPG', key: 'mpg' },
      { label: 'Horsepower', key: 'horsepower' },
      { label: 'Engine', key: 'engine' },
      { label: 'Transmission', key: 'transmission' },
      { label: 'Body Style', key: 'bodyStyle' },
      { label: 'Range', key: 'range' },
    ];

    return (
      <div className="space-y-6">
        {/* Car Headers */}
        <div className="grid gap-4" style={{ gridTemplateColumns: `200px repeat(${cars.length}, 1fr)` }}>
          <div></div>
          {cars.map((car, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="aspect-video bg-neutral-100 relative">
                <img 
                  src={car.imageUrl} 
                  alt={car.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-sm mb-2">{car.title}</h3>
                <div className="text-lg font-bold text-motortrend-red">{car.price}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-neutral-50 border-b">
            <div className="grid gap-4 p-4" style={{ gridTemplateColumns: `200px repeat(${cars.length}, 1fr)` }}>
              <div className="font-semibold text-neutral-1">Specifications</div>
              {cars.map((car, index) => (
                <div key={index} className="font-medium text-center">{car.title.split(' ').slice(-2).join(' ')}</div>
              ))}
            </div>
          </div>
          
          {specs.map((spec, specIndex) => (
            <div key={spec.key} className={`grid gap-4 p-4 ${specIndex % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}`} style={{ gridTemplateColumns: `200px repeat(${cars.length}, 1fr)` }}>
              <div className="font-medium text-neutral-2">{spec.label}</div>
              {cars.map((car, carIndex) => {
                const value = (car as any)[spec.key];
                const renderValue = () => {
                  if (!value || value === 'N/A') return 'N/A';
                  
                  if ((spec as any).isScore) {
                    const numValue = parseFloat(value);
                    const scoreColor = numValue >= 8 ? 'text-green-600' : numValue >= 6 ? 'text-amber-600' : 'text-red-600';
                    return (
                      <div className={`font-semibold ${scoreColor}`}>
                        {value}/10
                      </div>
                    );
                  }
                  
                  if ((spec as any).isRank) {
                    return value === true ? (
                      <div className="flex items-center justify-center">
                        <Badge variant="secondary" className="bg-motortrend-red text-white text-xs">
                          #1 in Category
                        </Badge>
                      </div>
                    ) : 'N/A';
                  }
                  
                  if (spec.key === 'motorTrendRank') {
                    return value !== 'N/A' ? (
                      <div className="font-medium text-motortrend-red">
                        #{value}
                      </div>
                    ) : 'N/A';
                  }
                  
                  return value;
                };
                
                return (
                  <div key={carIndex} className="text-center text-neutral-1">
                    {renderValue()}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {showComparison && (
              <Button variant="ghost" size="sm" onClick={handleBack} className="mr-2">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            <BarChart3 className="h-5 w-5" />
            {showComparison ? 'Vehicle Comparison' : 'Compare Vehicles'}
          </DialogTitle>
        </DialogHeader>

        {!showComparison ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <p className="text-neutral-3">Select 2-4 vehicles to compare</p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-neutral-3">
                  {selectedCars.length}/4 selected
                </span>
                <Button 
                  onClick={handleCompare}
                  disabled={selectedCars.length < 2}
                  className="bg-motortrend-red hover:bg-motortrend-red/90"
                >
                  Compare ({selectedCars.length})
                </Button>
              </div>
            </div>

            {selectedCars.length >= 4 && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                <p className="text-amber-800 text-sm">
                  Maximum of 4 vehicles can be compared at once. Uncheck a vehicle to select a different one.
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {savedCars.map(car => {
                const carData = savedItemToCarData(car);
                const isSelected = selectedCars.includes(car.id);
                const isDisabled = !isSelected && selectedCars.length >= 4;

                return (
                  <Card 
                    key={car.id} 
                    className={`cursor-pointer transition-all ${
                      isSelected 
                        ? 'ring-2 ring-motortrend-red bg-red-50' 
                        : isDisabled 
                          ? 'opacity-50 cursor-not-allowed' 
                          : 'hover:shadow-md'
                    }`}
                    onClick={() => !isDisabled && handleCarToggle(car.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="flex items-center">
                          <Checkbox 
                            checked={isSelected}
                            disabled={isDisabled}
                            onChange={() => !isDisabled && handleCarToggle(car.id)}
                          />
                        </div>
                        
                        <div className="flex-shrink-0 w-20 h-14 bg-neutral-100 rounded-lg overflow-hidden">
                          <img 
                            src={carData.imageUrl} 
                            alt={carData.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h3 className="font-semibold text-neutral-1 truncate">{carData.title}</h3>
                              <p className="text-sm text-neutral-3">{carData.category}</p>
                              <p className="text-lg font-bold text-motortrend-red mt-1">{carData.price}</p>
                            </div>
                            <div className="flex flex-col items-end gap-1">
                              {getOwnershipBadge(car.metadata?.ownership)}
                              {isSelected && (
                                <CheckCircle2 className="h-5 w-5 text-motortrend-red" />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {savedCars.length === 0 && (
              <div className="text-center py-8">
                <p className="text-neutral-3">No vehicles in your garage to compare.</p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <p className="text-neutral-3">Comparing {selectedCars.length} vehicles</p>
              <Button variant="outline" onClick={handleBack}>
                Select Different Vehicles
              </Button>
            </div>
            
            <ComparisonTable cars={getSelectedCarData()} />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ComparisonModal; 