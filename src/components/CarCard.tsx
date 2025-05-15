
import React, { useState } from "react";
import { Bookmark, Car as CarIcon, Truck, Gauge, Fuel, Layers, Box, DoorOpen, Wind, AlertCircle } from "lucide-react";
import { useSavedItems } from "../contexts/SavedItemsContext";

export interface CarData {
  id: string;
  title: string;
  imageUrl: string;
  price: string;
  category: string;
  isNew?: boolean;
  year?: string;
  mileage?: string;
  fuelType?: string;
  drivetrain?: string;
  location?: string;
  bodyStyle?: "SUV" | "Sedan" | "Truck" | "Sports Car" | "Minivan";
  
  // SUV specs
  cargoCapacity?: string;
  cargoCapacityFolded?: string;
  passengerCapacity?: string;
  seatingConfiguration?: string;
  
  // Sedan specs
  trunkCapacity?: string;
  safetyRating?: string;
  horsepowerTorque?: string;
  
  // Truck specs
  towingCapacity?: string;
  payloadCapacity?: string;
  bedDimensions?: string;
  powertrainOptions?: string;
  
  // Sports Car specs
  zeroToSixty?: string;
  topSpeed?: string;
  weightPowerRatio?: string;
  
  // Minivan specs
  slidingDoorFeatures?: string;
  familyFeatures?: string;
  
  // MotorTrend Rankings and Scores
  motorTrendRank?: number;
  motorTrendScore?: number;
  motorTrendCategoryRank?: number;
}

interface CarCardProps {
  car: CarData;
  type: "new" | "used";
}

const CarCard: React.FC<CarCardProps> = ({ car, type }) => {
  const { addSavedItem, removeSavedItem, isSaved } = useSavedItems();
  const saved = isSaved(car.id);
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (saved) {
      removeSavedItem(car.id);
    } else {
      addSavedItem({
        id: car.id,
        title: car.title,
        type: type === "new" ? "newCar" : "usedCar",
        imageUrl: car.imageUrl,
        savedAt: new Date().toISOString(),
        metadata: {
          price: car.price,
          category: car.category,
          year: car.year,
          mileage: car.mileage,
          location: car.location,
          bodyStyle: car.bodyStyle,
          // Include all spec fields in the metadata
          cargoCapacity: car.cargoCapacity,
          cargoCapacityFolded: car.cargoCapacityFolded,
          passengerCapacity: car.passengerCapacity,
          seatingConfiguration: car.seatingConfiguration,
          trunkCapacity: car.trunkCapacity,
          safetyRating: car.safetyRating,
          horsepowerTorque: car.horsepowerTorque,
          towingCapacity: car.towingCapacity,
          payloadCapacity: car.payloadCapacity,
          bedDimensions: car.bedDimensions,
          powertrainOptions: car.powertrainOptions,
          zeroToSixty: car.zeroToSixty,
          topSpeed: car.topSpeed,
          weightPowerRatio: car.weightPowerRatio,
          slidingDoorFeatures: car.slidingDoorFeatures,
          familyFeatures: car.familyFeatures,
          fuelType: car.fuelType,
          drivetrain: car.drivetrain,
          // Add MotorTrend Rankings and Scores
          motorTrendRank: car.motorTrendRank,
          motorTrendScore: car.motorTrendScore,
          motorTrendCategoryRank: car.motorTrendCategoryRank
        }
      });
    }
  };

  // Function to get a fallback image based on the car make/model
  const getFallbackImage = () => {
    if (!car.title) return '/placeholder.svg';
    
    const title = car.title.toLowerCase();
    // Check for common car makes
    if (title.includes('tesla')) return 'https://images.unsplash.com/photo-1617704548623-340376564e68?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
    if (title.includes('bmw')) return 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
    if (title.includes('ford')) return 'https://images.unsplash.com/photo-1551830820-330a71b99659?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
    if (title.includes('honda')) return 'https://images.unsplash.com/photo-1583267746897-2cf415887172?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
    if (title.includes('toyota')) return 'https://images.unsplash.com/photo-1559416523-140ddc3d238c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
    if (title.includes('chevrolet') || title.includes('chevy')) return 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
    if (title.includes('jeep')) return 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
    
    // Fallback for any car
    return '/placeholder.svg';
  };

  // Helper function to render body style-specific specs
  const renderSpecifications = () => {
    switch(car.bodyStyle) {
      case "SUV":
        return (
          <div className="mt-2 space-y-1 text-xs">
            <div className="flex items-center gap-1">
              <Box size={12} className="text-gray-500" />
              <span className="text-gray-500">Cargo:</span> {car.cargoCapacity || 'N/A'} (Folded: {car.cargoCapacityFolded || 'N/A'})
            </div>
            <div className="flex items-center gap-1">
              <Fuel size={12} className="text-gray-500" />
              <span className="text-gray-500">Fuel Economy:</span> {car.fuelType || 'N/A'}
            </div>
            <div className="flex items-center gap-1">
              <CarIcon size={12} className="text-gray-500" />
              <span className="text-gray-500">Drivetrain:</span> {car.drivetrain || 'N/A'}
            </div>
            <div className="flex items-center gap-1">
              <Layers size={12} className="text-gray-500" />
              <span className="text-gray-500">Seating:</span> {car.passengerCapacity || 'N/A'} ({car.seatingConfiguration || 'N/A'})
            </div>
          </div>
        );
      
      case "Sedan":
        return (
          <div className="mt-2 space-y-1 text-xs">
            <div className="flex items-center gap-1">
              <Fuel size={12} className="text-gray-500" />
              <span className="text-gray-500">Fuel Economy:</span> {car.fuelType || 'N/A'}
            </div>
            <div className="flex items-center gap-1">
              <Box size={12} className="text-gray-500" />
              <span className="text-gray-500">Trunk Capacity:</span> {car.trunkCapacity || 'N/A'}
            </div>
            <div className="flex items-center gap-1">
              <CarIcon size={12} className="text-gray-500" />
              <span className="text-gray-500">Safety Rating:</span> {car.safetyRating || 'N/A'}
            </div>
            <div className="flex items-center gap-1">
              <Gauge size={12} className="text-gray-500" />
              <span className="text-gray-500">Engine:</span> {car.horsepowerTorque || 'N/A'}
            </div>
          </div>
        );
      
      case "Truck":
        return (
          <div className="mt-2 space-y-1 text-xs">
            <div className="flex items-center gap-1">
              <Truck size={12} className="text-gray-500" />
              <span className="text-gray-500">Towing:</span> {car.towingCapacity || 'N/A'}
            </div>
            <div className="flex items-center gap-1">
              <Box size={12} className="text-gray-500" />
              <span className="text-gray-500">Payload:</span> {car.payloadCapacity || 'N/A'}
            </div>
            <div className="flex items-center gap-1">
              <Layers size={12} className="text-gray-500" />
              <span className="text-gray-500">Bed:</span> {car.bedDimensions || 'N/A'}
            </div>
            <div className="flex items-center gap-1">
              <Gauge size={12} className="text-gray-500" />
              <span className="text-gray-500">Powertrain:</span> {car.powertrainOptions || 'N/A'}
            </div>
          </div>
        );
      
      case "Sports Car":
        return (
          <div className="mt-2 space-y-1 text-xs">
            <div className="flex items-center gap-1">
              <Gauge size={12} className="text-gray-500" />
              <span className="text-gray-500">0-60 mph:</span> {car.zeroToSixty || 'N/A'}
            </div>
            <div className="flex items-center gap-1">
              <Wind size={12} className="text-gray-500" />
              <span className="text-gray-500">Top Speed:</span> {car.topSpeed || 'N/A'}
            </div>
            <div className="flex items-center gap-1">
              <CarIcon size={12} className="text-gray-500" />
              <span className="text-gray-500">Engine:</span> {car.horsepowerTorque || 'N/A'}
            </div>
            <div className="flex items-center gap-1">
              <Layers size={12} className="text-gray-500" />
              <span className="text-gray-500">Weight/Power:</span> {car.weightPowerRatio || 'N/A'}
            </div>
          </div>
        );
      
      case "Minivan":
        return (
          <div className="mt-2 space-y-1 text-xs">
            <div className="flex items-center gap-1">
              <Layers size={12} className="text-gray-500" />
              <span className="text-gray-500">Seating:</span> {car.passengerCapacity || 'N/A'} ({car.seatingConfiguration || 'N/A'})
            </div>
            <div className="flex items-center gap-1">
              <Box size={12} className="text-gray-500" />
              <span className="text-gray-500">Cargo:</span> {car.cargoCapacity || 'N/A'}
            </div>
            <div className="flex items-center gap-1">
              <DoorOpen size={12} className="text-gray-500" />
              <span className="text-gray-500">Doors:</span> {car.slidingDoorFeatures || 'N/A'}
            </div>
            <div className="flex items-center gap-1">
              <CarIcon size={12} className="text-gray-500" />
              <span className="text-gray-500">Features:</span> {car.familyFeatures || 'N/A'}
            </div>
          </div>
        );
        
      default:
        return (
          <div className="mb-3 grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-gray-500">Year:</span> {car.year || 'N/A'}
            </div>
            <div>
              <span className="text-gray-500">Mileage:</span> {car.mileage || 'N/A'}
            </div>
            <div>
              <span className="text-gray-500">Fuel:</span> {car.fuelType || 'N/A'}
            </div>
            <div>
              <span className="text-gray-500">Drivetrain:</span> {car.drivetrain || 'N/A'}
            </div>
          </div>
        );
    }
  };

  // Add MotorTrend score display
  const renderMotorTrendScore = () => {
    if (!car.motorTrendScore) return null;
    
    // Calculate color based on score (0-10 scale)
    const score = car.motorTrendScore;
    let scoreColor = "bg-red-500";
    
    if (score >= 9) {
      scoreColor = "bg-green-600";
    } else if (score >= 7) {
      scoreColor = "bg-green-500";
    } else if (score >= 5) {
      scoreColor = "bg-amber-500";
    } else if (score >= 3) {
      scoreColor = "bg-orange-500";
    }
    
    return (
      <div className="absolute top-2 left-2 flex items-center gap-1">
        <div className={`text-white text-xs font-bold px-2 py-1 rounded ${scoreColor} flex items-center`}>
          <span className="mr-1">MT</span>
          {score.toFixed(1)}
        </div>
        {car.motorTrendRank && (
          <div className="bg-black/70 text-white text-xs px-2 py-1 rounded">
            #{car.motorTrendRank}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow transition-all hover:shadow-md">
      <div className="relative">
        {!imageLoaded && !imageError && (
          <div className="h-40 w-full bg-gray-200 animate-pulse flex items-center justify-center">
            <span className="text-gray-400 text-sm">Loading car image...</span>
          </div>
        )}
        
        <img
          src={car.imageUrl}
          alt={car.title}
          className={`h-40 w-full object-cover ${!imageLoaded ? 'hidden' : ''}`}
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            setImageError(true);
            setImageLoaded(true);
            (e.target as HTMLImageElement).src = getFallbackImage();
            console.log(`Using fallback image for: ${car.title}`);
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
          {car.price}
        </div>
        {type === "new" && (
          <span className="absolute left-2 top-2 rounded bg-motortrend-red px-2 py-1 text-xs font-bold text-white">
            New
          </span>
        )}
        {renderMotorTrendScore()}
        <button
          onClick={handleSave}
          className={`absolute top-2 right-2 p-1.5 rounded-full ${saved ? 'bg-motortrend-red text-white' : 'bg-black/70 text-white hover:bg-motortrend-red'} transition-colors`}
          aria-label={saved ? "Unsave car" : "Save car"}
        >
          <Bookmark size={16} className={saved ? 'fill-white' : ''} />
        </button>
      </div>
      <div className="p-4">
        <div className="mb-1 text-xs font-medium text-motortrend-red flex justify-between">
          <div>
            {car.category} {car.bodyStyle ? `- ${car.bodyStyle}` : ''}
          </div>
          {car.motorTrendCategoryRank && (
            <div className="text-gray-700 font-semibold">
              #{car.motorTrendCategoryRank} in class
            </div>
          )}
        </div>
        <h3 className="mb-2 line-clamp-2 text-sm font-bold">{car.title}</h3>
        
        {renderSpecifications()}
        
        {car.location && (
          <div className="mt-2 text-xs text-gray-500">
            <span className="mr-1">📍</span>
            {car.location}
          </div>
        )}
      </div>
    </div>
  );
};

export default CarCard;
