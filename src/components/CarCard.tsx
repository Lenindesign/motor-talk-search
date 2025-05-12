
import React from "react";
import { useSavedItems } from "../contexts/SavedItemsContext";
import CarImageSection from "./car-parts/CarImageSection";
import CarSpecifications from "./car-parts/CarSpecifications";

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

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow transition-all hover:shadow-md">
      <CarImageSection 
        imageUrl={car.imageUrl}
        price={car.price}
        isNew={type === "new"}
        id={car.id}
        saved={saved}
        handleSave={handleSave}
      />
      
      <div className="p-4">
        <div className="mb-1 text-xs font-medium text-motortrend-red">
          {car.category} {car.bodyStyle ? `- ${car.bodyStyle}` : ''}
        </div>
        <h3 className="mb-2 line-clamp-2 text-sm font-bold">{car.title}</h3>
        
        <CarSpecifications car={car} />
        
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
