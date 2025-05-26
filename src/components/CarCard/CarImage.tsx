
import React from 'react';
import { Loader2, Settings, Bookmark } from 'lucide-react';
import { CarData } from './types';

// Import cn utility
const cn = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ');
};

interface CarImageProps {
  car: CarData;
  currentImage: string;
  imageLoading: boolean;
  imageError: boolean;
  width: number;
  height: number;
  blurRadius: number;
  transitionDuration: number;
  isCarSaved: boolean;
  onSave: () => void;
  onImageLoad: () => void;
  onImageError: () => void;
}

const CarImage: React.FC<CarImageProps> = ({
  car,
  currentImage,
  imageLoading,
  imageError,
  width,
  height,
  blurRadius,
  transitionDuration,
  isCarSaved,
  onSave,
  onImageLoad,
  onImageError
}) => {
  return (
    <div className="relative w-full aspect-[16/9] overflow-hidden">
      <button
        onClick={(e) => {
          e.stopPropagation();
          onSave();
        }}
        className="absolute top-2.5 left-2.5 p-2.5 rounded-full bg-white/90 hover:bg-gray-50 shadow-md transition-all duration-300 transform hover:scale-110 z-50"
      >
        <Bookmark 
          size={22} 
          className={`text-gray-600 ${isCarSaved ? 'fill-current' : 'stroke-current'} transition-colors duration-300 ${isCarSaved ? 'text-blue-600' : ''}`}
        />
      </button>
      <div
        className={cn(
          'absolute inset-0 bg-gradient-to-br from-gray-900/50 to-gray-900/30 flex items-center justify-center',
          imageLoading && 'animate-pulse'
        )}
        style={{
          opacity: imageLoading ? 1 : 0,
          transition: 'opacity 0.3s ease-out'
        }}
      >
        {imageLoading ? (
          <Loader2 className="h-8 w-8 animate-spin text-white" />
        ) : (
          <Settings className="h-8 w-8 text-white" />
        )}
      </div>
      <img
        src={currentImage}
        alt={car.title}
        className={cn(
          'w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
        )}
        onLoad={onImageLoad}
        onError={onImageError}
        loading="lazy"
        width={width}
        height={height}
        style={{
          filter: imageLoading ? `blur(${blurRadius}px)` : 'none',
          transition: `filter ${transitionDuration}s ease-out`
        }}
      />
      {car.isNew && (
        <div className="absolute top-2 left-2">
          <span className="bg-green-600 text-white px-2 py-1 rounded text-xs font-bold">
            NEW 2025
          </span>
        </div>
      )}
    </div>
  );
};

export default CarImage;
