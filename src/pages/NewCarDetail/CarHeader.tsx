import React from 'react';
import { MapPin, Share, Calendar, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import GarageActionMenu from '@/components/GarageActionMenu';
import { CarData } from '@/components/CarCard';

interface CarHeaderProps {
  car: {
    id: string;
    title: string;
    category: string;
    imageUrl: string;
  };
  carData: CarData;
  overallRating: number;
}

const CarHeader: React.FC<CarHeaderProps> = ({
  car,
  carData,
  overallRating
}) => {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
      {/* Left side - Car Images */}
      <div className="lg:col-span-2">
        <div className="relative">
          {/* MT Score Badge */}
          <div className="absolute top-4 right-4 z-10 space-y-2">
            <div className="flex flex-col items-end">
              <div className="w-32 flex items-center justify-center px-3 py-2 rounded-lg bg-white/90 backdrop-blur-sm">
                <div className="text-center">
                  <span className="text-2xl font-bold text-green-600">{overallRating}</span>
                  <span className="text-sm text-gray-600">/10</span>
                </div>
              </div>
              <div className="w-32 mt-1 px-2 py-1 rounded-md bg-white/90 backdrop-blur-sm text-xs font-medium text-gray-700 text-center">
                #2 of 12 {car.category}s
              </div>
            </div>
          </div>
          
          {/* Main Image */}
          <div className="aspect-[16/10] rounded-lg overflow-hidden">
            <img 
              src={car.imageUrl} 
              alt={car.title} 
              className="w-full h-full object-cover object-center" 
            />
          </div>
          
          {/* Thumbnails */}
          <div className="flex gap-2 mt-2 overflow-x-auto pb-2">
            <div className="flex-none w-24 aspect-[4/3] rounded-lg overflow-hidden">
              <img src={car.imageUrl} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="flex-none w-24 aspect-[4/3] rounded-lg overflow-hidden">
              <img src={car.imageUrl} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="flex-none w-24 aspect-[4/3] rounded-lg overflow-hidden">
              <img src={car.imageUrl} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="flex-none w-24 aspect-[4/3] rounded-lg overflow-hidden relative">
              <img src={car.imageUrl} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white text-sm font-medium">
                +279
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right side - Car Info */}
      <div className="lg:col-span-1">
        <div className="space-y-4">
        {/* Basic Info */}
        <div>
          <h1 className="text-xl md:text-2xl font-bold mb-2">
            {car.title}
          </h1>
          
          <div className="flex items-center gap-3">
            <span className="text-sm">
              {car.category}
            </span>
            <div className="h-3 w-px bg-neutral-4"></div>
            <div className="flex items-center">
              <Calendar size={14} className="mr-1" />
              <span className="text-sm">2025</span>
            </div>
          </div>
        </div>
        
        {/* Pricing Section */}
        <div className="bg-white rounded-lg space-y-4">
          {/* Year and Type Selectors */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <select className="w-full border rounded-lg pl-3 pr-12 py-2 text-sm appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2014%2014%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20d%3D%22M3.5%205.25L7%208.75L10.5%205.25%22%20stroke%3D%22%23374151%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%0A%3C%2Fsvg%3E')] bg-[position:right_12px_center] bg-no-repeat">

                <option>2025 - New</option>
              </select>
            </div>
            <div>
              <select className="w-full border rounded-lg pl-3 pr-12 py-2 text-sm appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2014%2014%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20d%3D%22M3.5%205.25L7%208.75L10.5%205.25%22%20stroke%3D%22%23374151%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%0A%3C%2Fsvg%3E')] bg-[position:right_12px_center] bg-no-repeat">

                <option>Electric</option>
              </select>
            </div>
          </div>
          
          {/* Trim Selector */}
          <div>
            <select className="w-full border rounded-lg pl-3 pr-12 py-2 text-sm appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2014%2014%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20d%3D%22M3.5%205.25L7%208.75L10.5%205.25%22%20stroke%3D%22%23374151%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%0A%3C%2Fsvg%3E')] bg-[position:right_12px_center] bg-no-repeat">
              <option>Dual-Motor - $78,000 MSRP</option>
              <option>Performance Dual-Motor - $89,000 MSRP</option>
              <option>Max Pack Dual-Motor - $93,000 MSRP</option>
              <option>Performance Max Pack - $99,000 MSRP</option>
            </select>
          </div>
          
          {/* Suggested Price */}
          <div className="space-y-1">
            <p className="text-sm">Edmunds suggests you pay</p>
            <p className="text-2xl font-bold">$76,500</p>
          </div>
          
          {/* Find Price Button */}
          <Button 
            className="w-full" 
            onClick={() => navigate(`/find-best-price/${car.title.toLowerCase().replace(/ /g, '-')}-${carData.year}`)}
          >
            Find Best Price
          </Button>
          
          {/* Additional Info */}
          <div className="text-xs space-y-1">
            <p>12 for sale near you</p>
            <p>Prices based on sales in CA thru 5/19/25</p>
            <p>Final assembly in Normal, Illinois</p>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default CarHeader;
