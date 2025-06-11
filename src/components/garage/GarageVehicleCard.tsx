import React from 'react';
import { Car, Trash2, BarChart2, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CarData } from '../CarCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface GarageVehicleCardProps {
  car: CarData;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onRemove: (id: string) => void;
  onViewDetails: (id: string) => void;
  status: 'owned' | 'testDriven' | 'interested';
}

export const GarageVehicleCard: React.FC<GarageVehicleCardProps> = ({
  car,
  isSelected,
  onSelect,
  onRemove,
  onViewDetails,
  status
}) => {
  const statusColors = {
    owned: 'bg-green-100 text-green-800',
    testDriven: 'bg-blue-100 text-blue-800',
    interested: 'bg-yellow-100 text-yellow-800'
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="relative">
        <img
          src={car.imageUrl || '/placeholder-vehicle.jpg'}
          alt={car.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2">
          <Badge className={statusColors[status]}>
            {status === 'owned' ? 'Owned' : status === 'testDriven' ? 'Test Driven' : 'Interested'}
          </Badge>
        </div>
      </div>
      
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-lg font-semibold line-clamp-1">{car.title}</CardTitle>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Car className="h-4 w-4" />
          <span>{car.year} • {car.mileage || 'New'}</span>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 pt-0">
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="text-sm">
            <div className="text-gray-500">Price</div>
            <div className="font-medium">{car.price || 'Contact Dealer'}</div>
          </div>
          <div className="text-sm">
            <div className="text-gray-500">MPG</div>
            <div className="font-medium">{car.mpg || 'N/A'}</div>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => onViewDetails(car.id)}
          >
            <Edit className="h-4 w-4 mr-2" /> Edit
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onRemove(car.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="mt-3 pt-3 border-t">
          <Button 
            variant={isSelected ? 'default' : 'outline'} 
            size="sm" 
            className="w-full"
            onClick={() => onSelect(car.id)}
          >
            <BarChart2 className="h-4 w-4 mr-2" />
            {isSelected ? 'Selected for Compare' : 'Compare'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
