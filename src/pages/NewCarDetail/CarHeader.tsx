
import React from 'react';
import { Star, Calculator, MapPin, Share } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GarageActionMenu from '@/components/GarageActionMenu';
import { CarData } from '@/components/CarCard';

interface CarHeaderProps {
  car: {
    id: string;
    title: string;
    price: string;
    category: string;
    imageUrl: string;
  };
  carData: CarData;
  selectedTrimPrice: string;
  overallRating: number;
}

const CarHeader: React.FC<CarHeaderProps> = ({ car, carData, selectedTrimPrice, overallRating }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
      <div className="relative">
        <img
          src={car.imageUrl}
          alt={car.title}
          className="w-full h-[400px] object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
          <div className="flex items-center mb-2">
            <span className="bg-green-600 text-white px-2 py-1 rounded text-xs font-semibold mr-3">
              NEW 2025
            </span>
            <div className="flex items-center text-yellow-400">
              <Star size={16} className="fill-current mr-1" />
              <span className="text-white text-sm">{overallRating.toFixed(1)}/10 Expert Rating</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">{car.title}</h1>
          <div className="flex items-center text-gray-200 text-sm">
            <span className="text-2xl font-bold text-white mr-4">{selectedTrimPrice}</span>
            <span>{car.category}</span>
          </div>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <div className="flex space-x-3">
            <Button className="bg-motortrend-red hover:bg-motortrend-red/90">
              <Calculator size={16} className="mr-2" />
              Build & Price
            </Button>
            <Button variant="outline">
              <MapPin size={16} className="mr-2" />
              Find Dealer
            </Button>
            <GarageActionMenu car={carData} type="new" className="ml-2" />
            <Button variant="outline" size="sm">
              <Share size={16} className="mr-2" />
              Share
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarHeader;
