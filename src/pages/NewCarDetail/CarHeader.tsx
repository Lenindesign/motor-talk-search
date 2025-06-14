import React, { useState } from 'react';
import { MapPin, Calendar, Award, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import GarageActionMenu from '@/components/GarageActionMenu';
import { CarData } from '@/components/CarCard';
import { carPhotos } from '@/services/mockData';
import DualScoreBadge from './DualScoreBadge';
import { Button } from '@/components/ui/button';

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
  ownerRating = 4.2
}) => {
  const [currentImage, setCurrentImage] = useState(carPhotos[0]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Convert owner rating from 0-5 scale to 0-10 scale for consistency
  const ownerRatingConverted = ownerRating * 2;

  const nextImage = () => {
    const nextIndex = (currentImageIndex + 1) % carPhotos.length;
    setCurrentImageIndex(nextIndex);
    setCurrentImage(carPhotos[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = currentImageIndex === 0 ? carPhotos.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(prevIndex);
    setCurrentImage(carPhotos[prevIndex]);
  };

  return (
    <div className="relative">
      {/* Hero Image Section */}
      <div className="relative aspect-[16/9] bg-neutral-100 overflow-hidden">
        {/* Score Badge - Positioned absolutely */}
        <div className="absolute top-4 left-4 z-20">
          <DualScoreBadge 
            expertRating={overallRating} 
            ownerRating={ownerRatingConverted}
            rank={{ position: 2, total: 12 }}
          />
        </div>

        {/* Score Badges - Top Right */}
        <div className="absolute top-4 right-4 z-20 flex gap-2">
          {/* MT Score Badge */}
          <div className="bg-neutral-800/90 backdrop-blur-sm border border-white/20 rounded-xl px-3 py-2 shadow-modern">
            <div className="text-center">
              <div className="flex items-center gap-1 mb-1">
                <Award className="w-3 h-3 text-white" />
                <span className="text-xs font-medium text-white/80 uppercase tracking-wide">MT SCORE</span>
              </div>
              <div className="text-lg font-bold text-white">{overallRating}</div>
              <div className="text-xs text-white/60">/10</div>
              <div className="flex justify-center mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-2.5 h-2.5 ${
                      i < Math.floor(overallRating / 2) 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-white/30'
                    }`} 
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Owner Score Badge */}
          <div className="bg-neutral-800/90 backdrop-blur-sm border border-white/20 rounded-xl px-3 py-2 shadow-modern">
            <div className="text-center">
              <div className="flex items-center gap-1 mb-1">
                <Star className="w-3 h-3 text-white" />
                <span className="text-xs font-medium text-white/80 uppercase tracking-wide">OWNERS</span>
              </div>
              <div className="text-lg font-bold text-white">{ownerRatingConverted.toFixed(1)}</div>
              <div className="text-xs text-white/60">/10</div>
              <div className="flex justify-center mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-2.5 h-2.5 ${
                      i < Math.floor(ownerRating) 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-white/30'
                    }`} 
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Car Image */}
        <img
          src={currentImage}
          alt={car.title}
          className="w-full h-full object-cover"
        />

        {/* Navigation Arrows */}
        {carPhotos.length > 1 && (
          <>
            <button 
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm border border-white/20 hover:bg-white shadow-modern transition-all duration-200 flex items-center justify-center z-10"
            >
              <ChevronLeft className="w-5 h-5 text-neutral-1" />
            </button>
            
            <button 
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm border border-white/20 hover:bg-white shadow-modern transition-all duration-200 flex items-center justify-center z-10"
            >
              <ChevronRight className="w-5 h-5 text-neutral-1" />
            </button>
          </>
        )}

        {/* Image Indicators */}
        {carPhotos.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {carPhotos.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentImageIndex(index);
                  setCurrentImage(carPhotos[index]);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentImageIndex 
                    ? 'bg-white shadow-modern' 
                    : 'bg-white/50 hover:bg-white/75'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Vehicle Information */}
      <div className="p-6">
        <div className="space-y-4">
          {/* Title and Price */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="space-y-2">
              <h1 className="typography-display text-neutral-1">{car.title}</h1>
              <div className="flex items-center gap-4 text-sm text-neutral-3">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  2025 Model Year
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  Available Nationwide
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="typography-title text-neutral-1">{car.price}</div>
              <div className="text-sm text-neutral-3">Starting MSRP</div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-neutral-6">
            <div className="text-center">
              <div className="typography-subtitle text-neutral-1">400 HP</div>
              <div className="text-xs text-neutral-3 uppercase tracking-wide">Power</div>
            </div>
            <div className="text-center">
              <div className="typography-subtitle text-neutral-1">4.2s</div>
              <div className="text-xs text-neutral-3 uppercase tracking-wide">0-60 MPH</div>
            </div>
            <div className="text-center">
              <div className="typography-subtitle text-neutral-1">405 mi</div>
              <div className="text-xs text-neutral-3 uppercase tracking-wide">Range</div>
            </div>
            <div className="text-center">
              <div className="typography-subtitle text-neutral-1">AWD</div>
              <div className="text-xs text-neutral-3 uppercase tracking-wide">Drivetrain</div>
            </div>
          </div>
        </div>
      </div>

      {/* Simplified Thumbnail Gallery */}
      {carPhotos.length > 1 && (
        <div className="px-6 pb-6">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {carPhotos.map((photo, index) => (
              <button 
                key={index}
                onClick={() => {
                  setCurrentImageIndex(index);
                  setCurrentImage(photo);
                }}
                className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden transition-all duration-200 ${
                  currentImageIndex === index 
                    ? 'ring-2 ring-motortrend-red shadow-modern' 
                    : 'hover:ring-2 ring-neutral-300'
                }`}
              >
                <img 
                  src={photo} 
                  alt={`${car.title} view ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CarHeader;
