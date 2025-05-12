
import React from "react";
import { Bookmark, Car as CarIcon, Truck, Gauge, Fuel, Layers, Box, DoorOpen, Wind, Star } from "lucide-react";
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
}

interface CarCardProps {
  car: CarData;
  type: "new" | "used";
}

const CarCard: React.FC<CarCardProps> = ({ car, type }) => {
  const { addSavedItem, removeSavedItem, isSaved } = useSavedItems();
  const saved = isSaved(car.id);

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
          drivetrain: car.drivetrain
        }
      });
    }
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

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow transition-all hover:shadow-md">
      <div className="relative">
        <img
          src={car.imageUrl}
          alt={car.title}
          className="h-40 w-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/placeholder.svg';
          }}
        />
        <div className="absolute bottom-2 right-2 rounded bg-black/70 px-2 py-1 text-sm font-bold text-white">
          {car.price}
        </div>
        {type === "new" && (
          <span className="absolute left-2 top-2 rounded bg-motortrend-red px-2 py-1 text-xs font-bold text-white">
            New
          </span>
        )}
        <button
          onClick={handleSave}
          className={`absolute top-2 right-2 p-1.5 rounded-full ${saved ? 'bg-motortrend-red text-white' : 'bg-black/70 text-white hover:bg-motortrend-red'} transition-colors`}
          aria-label={saved ? "Unsave car" : "Save car"}
        >
          <Bookmark size={16} className={saved ? 'fill-white' : ''} />
        </button>
      </div>
      <div className="p-4">
        <div className="mb-1 text-xs font-medium text-motortrend-red">
          {car.category} {car.bodyStyle ? `- ${car.bodyStyle}` : ''}
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
