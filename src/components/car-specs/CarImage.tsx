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
  const [triedFallback, setTriedFallback] = useState(false);
  
  // Function to get a fallback image based on the car make/model
  const getFallbackImage = () => {
    if (!title) return 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
    
    const lowerTitle = title.toLowerCase();
    
    // Extract year, make, and model from title
    const yearMatch = lowerTitle.match(/\d{4}/);
    const year = yearMatch ? yearMatch[0] : '';
    
    // Common car makes with their Unsplash image IDs
    const makeImages: { [key: string]: string } = {
      // Luxury Brands
      'tesla': '1617704548623-340376564e68',
      'bmw': '1607853202273-797f1c22a38e',
      'mercedes': '1618843474573-739b486f3f69',
      'audi': '1603584176860-3a9de7a49219',
      'porsche': '1618843474573-739b486f3f69',
      'ferrari': '1618843474573-739b486f3f69',
      'lamborghini': '1618843474573-739b486f3f69',
      'lexus': '1618843474573-739b486f3f69',
      'acura': '1618843474573-739b486f3f69',
      'infiniti': '1618843474573-739b486f3f69',
      'cadillac': '1618843474573-739b486f3f69',
      'lincoln': '1618843474573-739b486f3f69',
      
      // Mainstream Brands
      'ford': '1551830820-330a71b99659',
      'honda': '1583267746897-2cf415887172',
      'toyota': '1559416523-140ddc3d238c',
      'chevrolet': '1552519507-da3b142c6e3d',
      'chevy': '1552519507-da3b142c6e3d',
      'nissan': '1618843474573-739b486f3f69',
      'hyundai': '1618843474573-739b486f3f69',
      'kia': '1618843474573-739b486f3f69',
      'volkswagen': '1618843474573-739b486f3f69',
      'volvo': '1618843474573-739b486f3f69',
      'subaru': '1618843474573-739b486f3f69',
      'mazda': '1618843474573-739b486f3f69',
      'mitsubishi': '1618843474573-739b486f3f69',
      'buick': '1618843474573-739b486f3f69',
      'chrysler': '1618843474573-739b486f3f69',
      'dodge': '1618843474573-739b486f3f69',
      'gmc': '1618843474573-739b486f3f69',
      
      // Specialty Brands
      'jeep': '1502877338535-766e1452684a',
      'mini': '1618843474573-739b486f3f69',
      'ram': '1618843474573-739b486f3f69',
      'scion': '1618843474573-739b486f3f69',
      'smart': '1618843474573-739b486f3f69',
      'suzuki': '1618843474573-739b486f3f69',
    };
    
    // Vehicle type images
    const typeImages: { [key: string]: string } = {
      'suv': '1618843479313-40f8afb4b4d8',
      'crossover': '1618843479313-40f8afb4b4d8',
      'sedan': '1618843479313-40f8afb4b4d8',
      'truck': '1618843479313-40f8afb4b4d8',
      'pickup': '1618843479313-40f8afb4b4d8',
      'sports': '1618843479313-40f8afb4b4d8',
      'coupe': '1618843479313-40f8afb4b4d8',
      'minivan': '1618843479313-40f8afb4b4d8',
      'van': '1618843479313-40f8afb4b4d8',
      'hatchback': '1618843479313-40f8afb4b4d8',
      'wagon': '1618843479313-40f8afb4b4d8',
      'convertible': '1618843479313-40f8afb4b4d8',
    };
    
    // Try to find a matching make first
    for (const [make, imageId] of Object.entries(makeImages)) {
      if (lowerTitle.includes(make)) {
        return `https://images.unsplash.com/photo-${imageId}?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3`;
      }
    }
    
    // If no make is found, try to match vehicle type
    for (const [type, imageId] of Object.entries(typeImages)) {
      if (lowerTitle.includes(type)) {
        return `https://images.unsplash.com/photo-${imageId}?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3`;
      }
    }
    
    // If no specific match is found, use a generic car image based on the year
    if (year) {
      const yearNum = parseInt(year);
      if (yearNum >= 2020) {
        return 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
      } else if (yearNum >= 2010) {
        return 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
      } else {
        return 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
      }
    }
    
    // Ultimate fallback - generic car image
    return 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
  };

  // Decide which image to show
  const srcToShow = !imageError ? (imageUrl || getFallbackImage()) : (!triedFallback ? getFallbackImage() : 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3');

  return (
    <div className="relative">
      {!imageLoaded && (
        <div className="h-40 w-full bg-gray-200 animate-pulse flex items-center justify-center">
          <span className="text-gray-400 text-sm">Loading car image...</span>
        </div>
      )}
      
      <img
        src={srcToShow}
        alt={title}
        className={`h-40 w-full object-cover ${!imageLoaded ? 'hidden' : ''}`}
        onLoad={() => setImageLoaded(true)}
        onError={(e) => {
          if (!triedFallback && (imageUrl || srcToShow !== getFallbackImage())) {
            setTriedFallback(true);
            setImageLoaded(false);
            (e.target as HTMLImageElement).src = getFallbackImage();
          } else {
            setImageError(true);
            setImageLoaded(true);
          }
        }}
      />
      
      {imageError && (
        <div className="absolute top-2 left-2 bg-black/70 px-2 py-1 rounded text-xs text-white">
          <span className="flex items-center">
            <AlertCircle size={12} className="mr-1" />
            Alternative image unavailable
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
