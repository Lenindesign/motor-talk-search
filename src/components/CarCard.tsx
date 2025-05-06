
import React from "react";

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
}

interface CarCardProps {
  car: CarData;
  type: "new" | "used";
}

const CarCard: React.FC<CarCardProps> = ({ car, type }) => {
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
      </div>
      <div className="p-4">
        <div className="mb-1 text-xs font-medium text-motortrend-red">
          {car.category}
        </div>
        <h3 className="mb-2 line-clamp-2 text-sm font-bold">{car.title}</h3>
        
        {type === "used" && (
          <>
            <div className="mb-3 grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-gray-500">Year:</span> {car.year}
              </div>
              <div>
                <span className="text-gray-500">Mileage:</span> {car.mileage}
              </div>
              <div>
                <span className="text-gray-500">Fuel:</span> {car.fuelType}
              </div>
              <div>
                <span className="text-gray-500">Drivetrain:</span> {car.drivetrain}
              </div>
            </div>
            {car.location && (
              <div className="text-xs text-gray-500">
                <span className="mr-1">📍</span>
                {car.location}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CarCard;
