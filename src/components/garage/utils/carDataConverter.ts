
import { SavedItem } from "../../../contexts/SavedItemsContext";
import { CarData } from "../../CarCard";

export const savedItemToCarData = (item: SavedItem): CarData => {
  return {
    id: item.id,
    title: item.title,
    imageUrl: item.imageUrl || '/placeholder.svg',
    price: item.metadata?.price || 'Contact dealer',
    category: item.metadata?.category || 'Car',
    year: item.metadata?.year,
    mileage: item.metadata?.mileage,
    fuelType: item.metadata?.fuelType,
    drivetrain: item.metadata?.drivetrain,
    location: item.metadata?.location,
    bodyStyle: item.metadata?.bodyStyle as any,
    isNew: item.type === 'newCar',
    
    // SUV specs
    cargoCapacity: item.metadata?.cargoCapacity,
    cargoCapacityFolded: item.metadata?.cargoCapacityFolded,
    passengerCapacity: item.metadata?.passengerCapacity,
    seatingConfiguration: item.metadata?.seatingConfiguration,
    
    // Sedan specs
    trunkCapacity: item.metadata?.trunkCapacity,
    safetyRating: item.metadata?.safetyRating,
    horsepowerTorque: item.metadata?.horsepowerTorque,
    
    // Truck specs
    towingCapacity: item.metadata?.towingCapacity,
    payloadCapacity: item.metadata?.payloadCapacity,
    bedDimensions: item.metadata?.bedDimensions,
    powertrainOptions: item.metadata?.powertrainOptions,
    
    // Sports Car specs
    zeroToSixty: item.metadata?.zeroToSixty,
    topSpeed: item.metadata?.topSpeed,
    weightPowerRatio: item.metadata?.weightPowerRatio,
    
    // Minivan specs
    slidingDoorFeatures: item.metadata?.slidingDoorFeatures,
    familyFeatures: item.metadata?.familyFeatures,
    
    // MotorTrend Rankings and Scores
    motorTrendRank: item.metadata?.motorTrendRank,
    motorTrendScore: item.metadata?.motorTrendScore,
    motorTrendCategoryRank: item.metadata?.motorTrendCategoryRank
  };
};
