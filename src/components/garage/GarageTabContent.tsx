import React from "react";
import CarCard from "../CarCard";
import { SavedItem } from "../../contexts/SavedItemsContext";
import { CarData } from "../CarCard/types";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";
import GarageStats from "../GarageStats";
import FamilyReadinessScore from "./FamilyReadinessScore";
import ModificationTracker from "./ModificationTracker";

interface GarageTabContentProps {
  activeTab: 'all' | 'owned' | 'testDriven' | 'interested';
  onTabChange: (value: 'all' | 'owned' | 'testDriven' | 'interested') => void;
  displayCars: SavedItem[];
  savedItemToCarData: (item: SavedItem) => CarData;
  minScore: number;
}

const GarageTabContent: React.FC<GarageTabContentProps> = ({
  activeTab,
  onTabChange,
  displayCars,
  savedItemToCarData,
  minScore
}) => {
  // Filter valid cars and enhance their data
  const enhancedCarData = displayCars
    .filter(item => item.id && item.title && item.type)
    .map(car => {
      const carData = savedItemToCarData(car);
      return {
        ...carData,
        mpg: carData.mpg || 'N/A',
        mpge: carData.mpge || 'N/A',
        range: carData.range || 'N/A',
        engine: carData.engine || 'N/A',
        horsepower: carData.horsepower || 'N/A',
        transmission: carData.transmission || 'N/A',
        motorTrendScore: carData.motorTrendScore || '0.0',
        motorTrendRank: carData.motorTrendRank || 'N/A',
        userReviewsScore: carData.userReviewsScore || '8.5'
      };
    });

  // Get the first car for detailed views
  const firstCar = enhancedCarData[0];
  const firstSavedItem = displayCars[0];

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <GarageStats activeTab={activeTab} onTabChange={onTabChange} />
      
      {/* Persona-specific features */}
      {activeTab === 'owned' && firstCar && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ModificationTracker 
            carId={firstCar.id}
            carName={firstCar.title}
            modifications={[]}
            onAddModification={(mod) => console.log('Add modification:', mod)}
          />
          <FamilyReadinessScore
            safetyRating={typeof firstCar.safetyRating === 'number' ? firstCar.safetyRating : parseInt(firstCar.safetyRating || '0')}
            cargoCapacity={firstCar.cargoCapacity}
            passengerCapacity={firstCar.passengerCapacity}
            fuelEfficiency={firstCar.mpg}
            price={firstCar.price}
            familyFeatures={Array.isArray(firstCar.familyFeatures) ? firstCar.familyFeatures : []}
          />
        </div>
      )}

      {activeTab === 'interested' && firstCar && (
        <FamilyReadinessScore
          safetyRating={typeof firstCar.safetyRating === 'number' ? firstCar.safetyRating : parseInt(firstCar.safetyRating || '0')}
          cargoCapacity={firstCar.cargoCapacity}
          passengerCapacity={firstCar.passengerCapacity}
          fuelEfficiency={firstCar.mpg}
          price={firstCar.price}
          familyFeatures={Array.isArray(firstCar.familyFeatures) ? firstCar.familyFeatures : []}
        />
      )}
      
      {/* Car Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {enhancedCarData.length > 0 ? (
          enhancedCarData.map(car => (
            <CarCard
              key={car.id}
              car={car}
              type={car.isNew ? 'new' : 'used'}
            />
          ))
        ) : (
          <Alert className="col-span-full bg-neutral-8 border-neutral-6">
            <Info className="h-4 w-4 text-neutral-4" />
            <AlertDescription className="text-neutral-3">
              No vehicles found. Add some vehicles to your garage to get started!
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
};

export default GarageTabContent;
