import React, { useState } from 'react';
import { MapPin, Share, Calendar, Award, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Calculator } from 'lucide-react';
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
          <div className="absolute top-6 right-6 z-10">
            <div className="inline-flex items-center gap-3 bg-black/80 backdrop-blur-md rounded-lg py-2 px-3 text-white shadow-xl">
              <div className="flex items-baseline">
                <span className="text-2xl font-bold">{overallRating}</span>
                <span className="text-xs font-medium text-white/60 ml-0.5">/10</span>
              </div>
              <div className="h-8 w-px bg-white/20"></div>
              <div>
                <div className="text-[10px] font-medium uppercase tracking-wider text-white/60">Ranked</div>
                <div className="flex items-baseline gap-1 -mt-0.5">
                  <span className="text-base font-bold">#2</span>
                  <span className="text-xs text-white/80">of 12</span>
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
                className="flex gap-2 overflow-x-auto hide-scrollbar scroll-smooth pl-0 pr-8"
              >
                {carPhotos.map((photo, index) => (
                  <button 
                    key={index}
                    onClick={() => setCurrentImage(photo)}
                    className={`
                      flex-shrink-0 w-24 aspect-[4/3] rounded-lg overflow-hidden 
                      transition-all duration-200 relative
                      ${currentImage === photo 
                        ? 'ring-2 ring-motortrend-red shadow-modern' 
                        : 'hover:ring-2 ring-neutral-200 hover:ring-motortrend-red/50'}
                    `}
                  >
                    <img 
                      src={photo} 
                      alt={`${car.title} photo ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {currentImage === photo && (
                      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                    )}
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
        {/* Vehicle Configuration Sidebar */}
        <div className="bg-white shadow-modern border-modern rounded-xl p-4 space-y-4 sticky top-[120px]">
          {/* Vehicle Title */}
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-neutral-1">{car.title}</h1>

          </div>

          {/* Divider */}
          <div className="h-px bg-neutral-200"></div>
          {/* Vehicle Selection */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <select className="w-full border rounded-lg pl-3 pr-12 py-2 text-sm appearance-none bg-no-repeat bg-[position:right_12px_center] bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2014%2014%22%20fill%3D%22none%22%3E%3Cpath%20d%3D%22M3.5%205.25L7%208.75L10.5%205.25%22%20stroke%3D%22%23374151%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')]">
                <option>2025 - New</option>
              </select>
            </div>
            <div>
              <select className="w-full border rounded-lg pl-3 pr-12 py-2 text-sm appearance-none bg-no-repeat bg-[position:right_12px_center] bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2014%2014%22%20fill%3D%22none%22%3E%3Cpath%20d%3D%22M3.5%205.25L7%208.75L10.5%205.25%22%20stroke%3D%22%23374151%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')]">
                <option>Electric</option>
              </select>
            </div>
          </div>
            
          {/* Trim Selector */}
          <div>
            <select className="w-full border rounded-lg pl-3 pr-12 py-2 text-sm appearance-none bg-no-repeat bg-[position:right_12px_center] bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2014%2014%22%20fill%3D%22none%22%3E%3Cpath%20d%3D%22M3.5%205.25L7%208.75L10.5%205.25%22%20stroke%3D%22%23374151%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')]">
              <option>Dual-Motor - $78,000 MSRP</option>
              <option>Performance Dual-Motor - $89,000 MSRP</option>
              <option>Max Pack Dual-Motor - $93,000 MSRP</option>
              <option>Performance Max Pack - $99,000 MSRP</option>
            </select>
          </div>
            
          {/* Price Divider */}
          <div className="h-px bg-neutral-200"></div>
          
          {/* Suggested Price */}
          <div className="space-y-1">
            <div className="text-sm text-neutral-3">MotorTrend suggests you pay</div>
            <div className="text-2xl font-bold">{car.price}</div>
            <a 
              href="#payment-calculator" 
              className="flex items-baseline gap-1.5 hover:opacity-80 transition-opacity cursor-pointer group"
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById('payment-calculator');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <Calculator className="h-4 w-4 text-neutral-1 mr-1 self-center group-hover:text-motortrend-red transition-colors" />
              <span className="text-lg font-semibold text-motortrend-dark">$1,290.79</span>
              <span className="text-sm text-neutral-3">/mo*</span>
            </a>
            <div className="text-[11px] text-neutral-3">*Est. payment with $7,600 down for 60 months</div>
          </div>
          
          {/* Find Price Button */}
          <Button 
            className="w-full" 
            onClick={() => navigate(`/find-best-price/${car.title.toLowerCase().replace(/ /g, '-')}-${carData.year}`)}
          >
            Find Best Price
          </Button>
          
          {/* Additional Info */}
          <div className="text-xs space-y-1 text-neutral-3">
            <p>12 for sale near you</p>
            <p>Prices based on sales in CA thru 5/19/25</p>
            <p>Final assembly in Normal, Illinois</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarHeader;
