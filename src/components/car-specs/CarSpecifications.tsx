
import React from "react";
import { Box, Car as CarIcon, Truck, Gauge, Fuel, Layers, DoorOpen, Wind } from "lucide-react";
import { CarData } from "../CarCard";

interface CarSpecificationsProps {
  car: CarData;
}

export const CarSpecifications: React.FC<CarSpecificationsProps> = ({ car }) => {
  switch(car.bodyStyle) {
    case "SUV":
      return <SUVSpecs car={car} />;
    case "Sedan":
      return <SedanSpecs car={car} />;
    case "Truck":
      return <TruckSpecs car={car} />;
    case "Sports Car":
      return <SportsCarSpecs car={car} />;
    case "Minivan":
      return <MinivanSpecs car={car} />;
    default:
      return <DefaultSpecs car={car} />;
  }
};

const SUVSpecs: React.FC<CarSpecificationsProps> = ({ car }) => (
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

const SedanSpecs: React.FC<CarSpecificationsProps> = ({ car }) => (
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

const TruckSpecs: React.FC<CarSpecificationsProps> = ({ car }) => (
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

const SportsCarSpecs: React.FC<CarSpecificationsProps> = ({ car }) => (
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

const MinivanSpecs: React.FC<CarSpecificationsProps> = ({ car }) => (
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

const DefaultSpecs: React.FC<CarSpecificationsProps> = ({ car }) => (
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

export default CarSpecifications;
