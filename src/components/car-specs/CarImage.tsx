
import React, { useState } from "react";
import { AlertCircle } from "lucide-react";

interface CarImageProps {
  imageUrl: string;
  title: string;
  price: string;
  isNew?: boolean;
}

export const CarImage: React.FC<CarImageProps> = ({ imageUrl, title, price, isNew }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Function to get a fallback image based on the car make/model
  const getFallbackImage = () => {
    if (!title) return '/placeholder.svg';
    
    const lowerTitle = title.toLowerCase();
    // Check for common car makes
    if (lowerTitle.includes('tesla')) return 'https://images.unsplash.com/photo-1617704548623-340376564e68?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
    if (lowerTitle.includes('bmw')) return 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
    if (lowerTitle.includes('ford')) return 'https://images.unsplash.com/photo-1551830820-330a71b99659?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
    if (lowerTitle.includes('honda')) return 'https://images.unsplash.com/photo-1583267746897-2cf415887172?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
    if (lowerTitle.includes('toyota')) return 'https://images.unsplash.com/photo-1559416523-140ddc3d238c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
    if (lowerTitle.includes('chevrolet') || lowerTitle.includes('chevy')) return 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
    if (lowerTitle.includes('jeep')) return 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
    
    // Fallback for any car
    return '/placeholder.svg';
  };

  return (
    <div className="relative">
      {!imageLoaded && !imageError && (
        <div className="h-40 w-full bg-gray-200 animate-pulse flex items-center justify-center">
          <span className="text-gray-400 text-sm">Loading car image...</span>
        </div>
      )}
      
      <img
        src={imageUrl}
        alt={title}
        className={`h-40 w-full object-cover ${!imageLoaded ? 'hidden' : ''}`}
        onLoad={() => setImageLoaded(true)}
        onError={(e) => {
          setImageError(true);
          setImageLoaded(true);
          (e.target as HTMLImageElement).src = getFallbackImage();
          console.log(`Using fallback image for: ${title}`);
        }}
      />
      
      {imageError && (
        <div className="absolute top-2 left-2 bg-black/70 px-2 py-1 rounded text-xs text-white">
          <span className="flex items-center">
            <AlertCircle size={12} className="mr-1" />
            Alternative image
          </span>
        </div>
      )}
      
      <div className="absolute bottom-2 right-2 rounded bg-black/70 px-2 py-1 text-sm font-bold text-white">
        {price}
      </div>
      
      {isNew && (
        <span className="absolute left-2 top-2 rounded bg-motortrend-red px-2 py-1 text-xs font-bold text-white">
          New
        </span>
      )}
    </div>
  );
};

export default CarImage;
