
import React from "react";
import { CarData } from "../CarCard";
import { 
  SUVSpecs, 
  SedanSpecs, 
  TruckSpecs, 
  SportsCarSpecs, 
  MinivanSpecs, 
  DefaultSpecs 
} from "../car-specs/BodyStyleSpecs";

interface CarSpecificationsProps {
  car: CarData;
}

const CarSpecifications: React.FC<CarSpecificationsProps> = ({ car }) => {
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

export default CarSpecifications;
