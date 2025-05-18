
import React, { useState, useEffect } from "react";
import { Bookmark, AlertCircle } from "lucide-react";
import { useSavedItems } from "../contexts/SavedItemsContext";

export interface PhotoData {
  id: string;
  imageUrl: string;
  title: string;
  position: string;
  carModel?: string;
  year?: string;
  make?: string;
}

interface PhotoCardProps {
  photo: PhotoData;
  onClick?: () => void;
}

const PhotoCard: React.FC<PhotoCardProps> = ({ photo, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addSavedItem, removeSavedItem, isSaved } = useSavedItems();
  const saved = isSaved(photo.id);
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Extract car info from title if not explicitly provided
  useEffect(() => {
    if (!photo.carModel && photo.title) {
      // This is a basic extraction - we'll improve it with the actual data
      const titleParts = photo.title.split(' ');
      if (titleParts.length >= 2) {
        console.log(`Extracted car info from title: ${photo.title}`);
      }
    }
  }, [photo]);

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (saved) {
      removeSavedItem(photo.id);
    } else {
      addSavedItem({
        id: photo.id,
        title: photo.title,
        type: 'photo',
        imageUrl: photo.imageUrl,
        savedAt: new Date().toISOString(),
        metadata: {
          position: photo.position,
          carModel: photo.carModel,
          year: photo.year,
          make: photo.make
        }
      });
    }
  };

  // Function to find fallback image based on car details
  const getFallbackImage = () => {
    if (!photo.title) return '/placeholder.svg';
    
    // Extract make from title as fallback
    const title = photo.title.toLowerCase();
    
    // Check for common car makes in the title
    const commonMakes = ["aston martin", "bmw", "mercedes", "porsche", "ferrari", "lamborghini", "tesla", "audi", "honda", "toyota", "ford", "chevrolet", "jeep"];
    
    for (const make of commonMakes) {
      if (title.includes(make)) {
        return `/fallback-cars/${make.replace(' ', '-')}.jpg`;
      }
    }
    
    // Default fallback
    return '/placeholder.svg';
  };
  
  return (
    <div 
      className={`relative overflow-hidden rounded-lg bg-white shadow transition-all ${isHovered ? 'shadow-lg transform scale-[1.02]' : 'hover:shadow-md'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className="relative">
        {!imageLoaded && !imageError && (
          <div className="h-48 w-full bg-gray-200 animate-pulse flex items-center justify-center">
            <span className="text-gray-400 text-sm">Loading...</span>
          </div>
        )}
        
        <img
          src={photo.imageUrl}
          alt={photo.title || 'Car photo'}
          className={`h-48 w-full object-cover ${!imageLoaded ? 'hidden' : ''}`}
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            setImageError(true);
            setImageLoaded(true);
            // Try to get a better matching fallback image
            (e.target as HTMLImageElement).src = getFallbackImage();
          }}
        />
        
        {imageError && (
          <div className="absolute top-0 left-0 right-0 flex items-center justify-center h-48 bg-gray-100">
            <div className="text-center px-4">
              <AlertCircle className="mx-auto h-6 w-6 text-gray-400 mb-1" />
              <p className="text-xs text-gray-500">Using alternative image for {photo.title || 'this car'}</p>
            </div>
          </div>
        )}
        
        <div className="absolute bottom-2 left-2 rounded bg-black/70 px-2 py-1 text-xs text-white">
          {photo.position}
        </div>
        <button
          onClick={handleSave}
          className={`absolute top-2 right-2 p-1.5 rounded-full ${saved ? 'bg-motortrend-red text-white' : 'bg-black/70 text-white hover:bg-motortrend-red'} transition-colors`}
          aria-label={saved ? "Unsave photo" : "Save photo"}
        >
          <Bookmark size={16} className={saved ? 'fill-white' : ''} />
        </button>
      </div>
      <div className="p-2">
        <h3 className="text-sm font-medium line-clamp-2">{photo.title || 'Car Photo'}</h3>
        {(photo.year || photo.make || photo.carModel) && (
          <p className="text-xs text-gray-500 mt-1">
            {[photo.year, photo.make, photo.carModel].filter(Boolean).join(' ')}
          </p>
        )}
      </div>
    </div>
  );
};

export default PhotoCard;
