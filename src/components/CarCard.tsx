import React from "react";
import { Link } from "react-router-dom";
import { Bookmark } from "lucide-react";
import { useSavedItems } from "../contexts/SavedItemsContext";
import CarSpecifications from "./car-specs/CarSpecifications";
import MotorTrendScore from "./car-specs/MotorTrendScore";
import CarImage from "./car-specs/CarImage";

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
  const saved = isSaved(car.id, type === "new" ? "newCar" : "usedCar");

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault(); // Prevent the link navigation when clicking save button
    
    if (saved) {
      removeSavedItem(car.id, type === "new" ? "newCar" : "usedCar");
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
          // MotorTrend Rankings and Scores
          motorTrendRank: car.motorTrendRank,
          motorTrendScore: car.motorTrendScore,
          motorTrendCategoryRank: car.motorTrendCategoryRank
        }
      });
    }
  };

  // Make sure we have a valid ID for research link
  const getResearchUrl = () => {
    // If we have an ID, use it directly
    if (car.id) {
      return `/research/${car.id}`;
    }
    
    // Fallback: create a URL-friendly ID from the car title
    const urlFriendlyId = car.title.replace(/\s+/g, '-').toLowerCase();
    return `/research/${urlFriendlyId}`;
  };

  return (
    <Link to={getResearchUrl()} className="block no-underline text-inherit">
      <div className="overflow-hidden rounded-lg bg-white shadow transition-all hover:shadow-md cursor-pointer">
        <div className="relative">
          <CarImage 
            imageUrl={car.imageUrl}
            title={car.title}
            price={car.price}
            isNew={type === "new"}
          />
          
          <MotorTrendScore 
            score={car.motorTrendScore} 
            rank={car.motorTrendRank} 
          />
          
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
          
          <CarSpecifications car={car} />
          
          {car.location && (
            <div className="mt-2 text-xs text-gray-500">
              <span className="mr-1">📍</span>
              {car.location}
            </div>
          )}
        </div>
        {/* CTA Button with 32px padding */}
        <div style={{ padding: 32 }}>
          <button
            style={{ backgroundColor: '#E90C17', color: '#fff', width: '100%', fontWeight: 600, fontSize: '1rem', padding: '0.75rem', borderRadius: '0.375rem', boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}
            className="transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E90C17]"
            onClick={e => { e.preventDefault(); e.stopPropagation(); window.open('https://www.autotrader.com/cars-for-sale', '_blank'); }}
          >
            See Local Listings
          </button>
        </div>
      </div>
    </Link>
  );
};

export default CarCard;
