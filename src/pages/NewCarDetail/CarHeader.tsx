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
const CarHeader: React.FC<CarHeaderProps> = ({
  car,
  carData,
  selectedTrimPrice,
  overallRating
}) => {
  return <div className="bg-white rounded-2xl shadow-modern-lg overflow-hidden border-modern">
      <div className="relative">
        <div className="aspect-[16/9] lg:aspect-[21/9] overflow-hidden">
          <img src={car.imageUrl} alt={car.title} className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105" />
        </div>
        
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
          <div className="flex items-center gap-4 mb-4">
            <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-green-600 text-white typography-small font-semibold tracking-wide">
              NEW 2025
            </span>
            <div className="flex items-center">
              <Star size={18} className="fill-yellow-400 text-yellow-400 mr-2" />
              <span className="text-white typography-body font-medium">
                {overallRating.toFixed(1)}/10 Expert Rating
              </span>
            </div>
          </div>
          
          <h1 className="text-4xl text-white">
            {car.title}
          </h1>
          
          <div className="flex items-center gap-6 text-neutral-6">
            <span className="typography-display text-white font-bold text-lg">
              {selectedTrimPrice}
            </span>
            <span className="typography-body-large text-neutral-300">
              {car.category}
            </span>
          </div>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="card-spacing border-t border-neutral-6/30">
        <div className="flex flex-wrap items-center gap-4 lg:gap-6">
          <Button size="lg" className="bg-motortrend-red hover:bg-motortrend-red/90 text-white font-semibold px-6 py-3 rounded-xl shadow-modern transition-all duration-200 hover:shadow-modern-lg">
            <Calculator size={18} className="mr-3" />
            Build & Price
          </Button>
          
          <Button variant="outline" size="lg" className="border-neutral-4 text-neutral-2 hover:bg-neutral-7 px-6 py-3 rounded-xl font-semibold transition-all duration-200">
            <MapPin size={18} className="mr-3" />
            Find Dealer
          </Button>
          
          <GarageActionMenu car={carData} type="new" className="ml-auto lg:ml-0" />
          
          <Button variant="outline" size="lg" className="border-neutral-4 text-neutral-2 hover:bg-neutral-7 rounded-xl font-semibold transition-all duration-200">
            <Share size={18} className="mr-3" />
            Share
          </Button>
        </div>
      </div>
    </div>;
};
export default CarHeader;