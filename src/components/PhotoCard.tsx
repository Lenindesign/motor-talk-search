
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
  const saved = isSaved(photo.id, 'photo');
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
      removeSavedItem(photo.id, 'photo');
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

  // Function to find accurate fallback image based on car details
  const getFallbackImage = () => {
    if (!photo.make && !photo.title) return 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
    
    // Extract make from photo.make or title as fallback
    const make = photo.make ? photo.make.toLowerCase() : photo.title.toLowerCase();
    
    // Check for car makes and provide specific images
    if (make.includes("aston martin")) {
      return 'https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
    } else if (make.includes("bmw")) {
      return 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
    } else if (make.includes("mercedes")) {
      return 'https://images.unsplash.com/photo-1546518071-fddcdda7580a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
    } else if (make.includes("porsche")) {
      return 'https://images.unsplash.com/photo-1582639510494-c80b5de9f148?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
    } else if (make.includes("ferrari")) {
      return 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
    } else if (make.includes("lamborghini")) {
      return 'https://images.unsplash.com/photo-1633509817627-5a29e6c4606f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
    } else if (make.includes("tesla")) {
      return 'https://images.unsplash.com/photo-1617704548623-340376564e68?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
    } else if (make.includes("audi")) {
      return 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
    } else if (make.includes("honda")) {
      return 'https://images.unsplash.com/photo-1583267746897-2cf415887172?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
    } else if (make.includes("toyota")) {
      return 'https://images.unsplash.com/photo-1559416523-140ddc3d238c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
    } else if (make.includes("ford")) {
      return 'https://images.unsplash.com/photo-1551830820-330a71b99659?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
    } else if (make.includes("chevrolet") || make.includes("chevy")) {
      return 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
    } else if (make.includes("jeep")) {
      return 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
    } else if (make.includes("dodge")) {
      return 'https://images.unsplash.com/photo-1584345604476-8ec5f82d718c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
    } else if (make.includes("hyundai")) {
      return 'https://images.unsplash.com/photo-1670763261899-d1bbde4d7b00?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
    } else if (make.includes("kia")) {
      return 'https://images.unsplash.com/photo-1669893631979-7686c59623e3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
    } 
    
    // Default fallback
    return 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
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
            // Try to get a matching fallback image based on make
            (e.target as HTMLImageElement).src = getFallbackImage();
          }}
        />
        
        {imageError && (
          <div className="absolute top-0 left-0 right-0 flex items-center justify-center h-48 bg-gray-100">
            <div className="text-center px-4">
              <AlertCircle className="mx-auto h-6 w-6 text-gray-400 mb-1" />
              <p className="text-xs text-gray-500">Using alternative image for {photo.make || 'this car'}</p>
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
