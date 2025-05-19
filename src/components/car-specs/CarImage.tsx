
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
  
  // Function to get an accurate fallback image based on the car make/model
  const getFallbackImage = () => {
    if (!title) return 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
    
    const lowerTitle = title.toLowerCase();
    
    // Extract year, make, and model from title
    const yearMatch = lowerTitle.match(/\d{4}/);
    const year = yearMatch ? yearMatch[0] : '';
    
    // Check for specific makes for accurate image matches
    if (lowerTitle.includes("aston martin")) {
      return 'https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
    } else if (lowerTitle.includes("bmw") || lowerTitle.includes("i5") || lowerTitle.includes("m5")) {
      return 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
    } else if (lowerTitle.includes("mercedes")) {
      return 'https://images.unsplash.com/photo-1546518071-fddcdda7580a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
    } else if (lowerTitle.includes("porsche")) {
      return 'https://images.unsplash.com/photo-1582639510494-c80b5de9f148?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
    } else if (lowerTitle.includes("ferrari")) {
      return 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
    } else if (lowerTitle.includes("lamborghini")) {
      return 'https://images.unsplash.com/photo-1633509817627-5a29e6c4606f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
    } else if (lowerTitle.includes("tesla") || lowerTitle.includes("model")) {
      return 'https://images.unsplash.com/photo-1617704548623-340376564e68?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
    } else if (lowerTitle.includes("audi") || lowerTitle.includes("q7") || lowerTitle.includes("e-tron")) {
      return 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
    } else if (lowerTitle.includes("honda") || lowerTitle.includes("accord")) {
      return 'https://images.unsplash.com/photo-1583267746897-2cf415887172?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
    } else if (lowerTitle.includes("toyota") || lowerTitle.includes("crown") || lowerTitle.includes("camry")) {
      return 'https://images.unsplash.com/photo-1559416523-140ddc3d238c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
    } else if (lowerTitle.includes("ford") || lowerTitle.includes("mustang") || lowerTitle.includes("f-150")) {
      if (lowerTitle.includes("mustang")) {
        return 'https://images.unsplash.com/photo-1584345604476-8ec5f82d718c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
      } else {
        return 'https://images.unsplash.com/photo-1551830820-330a71b99659?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
      }
    } else if (lowerTitle.includes("chevrolet") || lowerTitle.includes("chevy") || lowerTitle.includes("corvette") || lowerTitle.includes("camaro")) {
      return 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
    } else if (lowerTitle.includes("jeep") || lowerTitle.includes("wrangler")) {
      return 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
    } else if (lowerTitle.includes("dodge") || lowerTitle.includes("challenger")) {
      return 'https://images.unsplash.com/photo-1584345604476-8ec5f82d718c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
    } else if (lowerTitle.includes("hyundai") || lowerTitle.includes("ioniq")) {
      return 'https://images.unsplash.com/photo-1663947719095-17af003c9193?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
    } else if (lowerTitle.includes("kia")) {
      return 'https://images.unsplash.com/photo-1669893631979-7686c59623e3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
    } else if (lowerTitle.includes("lexus") || lowerTitle.includes("es")) {
      return 'https://images.unsplash.com/photo-1604429868519-8a64cb3b010a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
    } else if (lowerTitle.includes("rivian")) {
      return 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
    } else if (lowerTitle.includes("lucid")) {
      return 'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
    }
    
    // Vehicle type fallbacks
    if (lowerTitle.includes("suv") || lowerTitle.includes("crossover")) {
      return 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
    } else if (lowerTitle.includes("sedan")) {
      return 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
    } else if (lowerTitle.includes("truck") || lowerTitle.includes("pickup")) {
      return 'https://images.unsplash.com/photo-1647983216233-e16d8f364ece?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
    } else if (lowerTitle.includes("sport") || lowerTitle.includes("coupe")) {
      return 'https://images.unsplash.com/photo-1580274916550-e323be2ae537?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
    }
    
    // If no specific match is found, use a generic car image
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
            Using alternative image
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
