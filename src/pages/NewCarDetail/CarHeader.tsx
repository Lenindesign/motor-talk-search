import React, { useState } from 'react';
import { MapPin, Share, Calendar, Award, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import GarageActionMenu from '@/components/GarageActionMenu';
import { CarData } from '@/components/CarCard';
import { carPhotos } from '@/services/mockData';

interface CarHeaderProps {
  car: {
    id: string;
    title: string;
    category: string;
    imageUrl: string;
    price: string;
  };
  carData: CarData;
  overallRating: number;
}

const CarHeader: React.FC<CarHeaderProps> = ({
  car,
  carData,
  overallRating
}) => {
  const [currentImage, setCurrentImage] = useState(carPhotos[0]);
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
      {/* Left side - Car Images */}
      <div className="lg:col-span-2">
        <div className="relative">
          {/* MT Score Badge */}
          <div className="absolute top-4 right-4 z-10 space-y-2">
            <div className="flex flex-col items-end">
              <div className="flex flex-col gap-2">
                {/* Rating Badge */}
                <div className="bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-neutral-100">
                  <div className="flex items-center gap-4">
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
                        {overallRating}
                      </span>
                      <span className="text-sm font-medium text-neutral-400 ml-1">/10</span>
                    </div>
                    <div className="h-10 w-[1px] bg-neutral-200"></div>
                    <div className="flex flex-col">
                      <div className="text-[11px] uppercase tracking-wider text-neutral-500 font-medium">Ranked</div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-lg font-bold text-neutral-900">#2</span>
                        <span className="text-sm text-neutral-600">of 12</span>
                      </div>
                      <div className="text-[11px] text-neutral-500">Electric SUVs</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Car Image */}
          <div className="relative w-full aspect-[16/9] overflow-hidden rounded-lg bg-neutral-100">
            <img
              src={currentImage}
              alt={car.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Thumbnails Carousel */}
          <div className="relative mt-4">
            <div className="flex items-center">
              <button 
                onClick={() => {
                  const container = document.getElementById('thumbnails-container');
                  if (container) {
                    container.scrollLeft -= 200;
                  }
                }}
                className="absolute left-0 z-10 p-1.5 rounded-full bg-white/90 backdrop-blur-sm shadow-lg border border-neutral-200 hover:bg-white transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              
              <div 
                id="thumbnails-container"
                className="flex gap-2 overflow-x-auto hide-scrollbar scroll-smooth px-8"
              >
                {carPhotos.map((photo, index) => (
                  <button 
                    key={index}
                    onClick={() => setCurrentImage(photo)}
                    className={`
                      flex-shrink-0 w-24 aspect-[4/3] rounded-lg overflow-hidden 
                      transition-all duration-200
                      ${currentImage === photo 
                        ? 'ring-2 ring-motortrend-red shadow-lg scale-105' 
                        : 'hover:ring-2 ring-neutral-200 hover:ring-motortrend-red/50'}
                    `}
                  >
                    <img 
                      src={photo} 
                      alt={`${car.title} photo ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>

              <button 
                onClick={() => {
                  const container = document.getElementById('thumbnails-container');
                  if (container) {
                    container.scrollLeft += 200;
                  }
                }}
                className="absolute right-0 z-10 p-1.5 rounded-full bg-white/90 backdrop-blur-sm shadow-lg border border-neutral-200 hover:bg-white transition-colors"
              >
                <ChevronRight size={16} />
              </button>
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
            <div className="text-sm text-neutral-3">MotorTrend suggests you pay</div>
            <div className="text-2xl font-bold">{car.price}</div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-semibold text-green-600">$634</span>
              <span className="text-sm text-neutral-3">/mo*</span>
            </div>
            <div className="text-[11px] text-neutral-3">*Est. payment with $7,600 down for 24 months</div>
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
