import React, { useState } from 'react';
import { MapPin, Share, Calendar, Award, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import GarageActionMenu from '@/components/GarageActionMenu';
import { CarData } from '@/components/CarCard';
import { carPhotos } from '@/services/mockData';
import DualScoreBadge from './DualScoreBadge';

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
  ownerRating?: number;
}

const CarHeader: React.FC<CarHeaderProps> = ({
  car,
  carData,
  overallRating,
  ownerRating = 4.2 // Default value if not provided
}) => {
  const [currentImage, setCurrentImage] = useState(carPhotos[0]);
  return (
    <div className="bg-white shadow-modern border-modern rounded-xl overflow-hidden">
      {/* Car Images */}
      <div className="p-0">
        <div className="relative">
          {/* Score Badge */}
          <DualScoreBadge 
            expertRating={overallRating} 
            ownerRating={ownerRating}
            rank={{ position: 2, total: 12 }}
          />
          
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
