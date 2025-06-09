import React, { useState } from 'react';
import { MapPin, Share, Calendar, Award, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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
  return (
    <div className="bg-white shadow-modern border-modern rounded-xl overflow-hidden">
      {/* Car Images */}
      <div className="p-0">
        <div className="relative">
          {/* MT Score Badge */}
          <div className="absolute top-6 right-6 z-10">
            <div className="inline-flex items-center gap-3 bg-black/80 backdrop-blur-md rounded-lg py-2 px-3 text-white shadow-xl">
              <div className="flex items-baseline">
                <span className="typography-title text-white">{overallRating}</span>
                <span className="typography-caption text-white/60 ml-0.5">/10</span>
              </div>
              <div className="h-8 w-px bg-white/20"></div>
              <div>
                <div className="typography-caption uppercase tracking-wider text-white/60">Ranked</div>
                <div className="flex items-baseline gap-1 -mt-0.5">
                  <span className="typography-subtitle font-bold">#2</span>
                  <span className="typography-caption text-white/80">of 12</span>
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
    </div>
  );
};

export default CarHeader;
