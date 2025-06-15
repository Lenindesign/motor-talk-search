
import React from 'react';
import { SavedItem } from '../../contexts/SavedItemsContext';
import CarCard from '../CarCard';
import { CarData } from '../CarCard/types';
import { Car, Heart, Search, Settings } from 'lucide-react';

interface GarageVehicleGridProps {
  cars: SavedItem[];
  viewMode: 'grid' | 'list';
  emptyStateFilter: 'all' | 'owned' | 'testDriven' | 'interested';
}

const GarageVehicleGrid: React.FC<GarageVehicleGridProps> = ({
  cars,
  viewMode,
  emptyStateFilter
}) => {
  // Helper function to convert SavedItem to CarData
  const savedItemToCarData = (item: SavedItem): CarData => {
    // Ensure bodyStyle is a valid value from the union type
    const getValidBodyStyle = (bodyStyle: string | undefined): "SUV" | "Sedan" | "Truck" | "Sports Car" | "Minivan" | "Crossover" | "Coupe" | "Convertible" | "Hatchback" | "Wagon" => {
      const validBodyStyles = ['SUV', 'Sedan', 'Truck', 'Sports Car', 'Minivan', 'Crossover', 'Coupe', 'Convertible', 'Hatchback', 'Wagon'];
      return validBodyStyles.includes(bodyStyle || '') ? bodyStyle as any : 'SUV';
    };

    return {
      id: item.id,
      title: item.title,
      imageUrl: item.imageUrl,
      price: item.metadata?.price || 'N/A',
      category: item.metadata?.category || 'Unknown',
      year: item.metadata?.year || 'N/A',
      mileage: item.metadata?.mileage,
      fuelType: item.metadata?.fuelType || 'N/A',
      drivetrain: item.metadata?.drivetrain || 'N/A',
      location: item.metadata?.location || 'N/A',
      bodyStyle: getValidBodyStyle(item.metadata?.bodyStyle),
      isNew: item.type === 'newCar',
      motorTrendScore: item.metadata?.motorTrendScore || '0.0',
      motorTrendRank: item.metadata?.motorTrendRank || 'N/A',
      motorTrendCategoryRank: item.metadata?.motorTrendCategoryRank || false,
      msrp: item.metadata?.msrp,
      mpg: item.metadata?.mpg,
      mpge: item.metadata?.mpge,
      range: item.metadata?.range,
      engine: item.metadata?.engine,
      horsepower: item.metadata?.horsepower,
      transmission: item.metadata?.transmission,
      userReviewsScore: '8.5'
    };
  };

  const getEmptyStateContent = () => {
    switch (emptyStateFilter) {
      case 'owned':
        return {
          icon: <Car className="w-16 h-16 text-neutral-4" />,
          title: 'No Owned Cars Yet',
          description: 'Mark cars as "Owned" to track maintenance, plan upgrades, and manage your vehicles.',
          actionText: 'Browse Cars'
        };
      case 'testDriven':
        return {
          icon: <Search className="w-16 h-16 text-neutral-4" />,
          title: 'No Test Drives Scheduled',
          description: 'Add cars to your test drive list to keep track of vehicles you want to experience.',
          actionText: 'Find Cars to Test Drive'
        };
      case 'interested':
        return {
          icon: <Heart className="w-16 h-16 text-neutral-4" />,
          title: 'No Interested Cars',
          description: 'Save cars you\'re interested in to compare and research later.',
          actionText: 'Explore Cars'
        };
      default:
        return {
          icon: <Car className="w-16 h-16 text-neutral-4" />,
          title: 'No Vehicles in Garage',
          description: 'Start building your garage by saving cars you own, want to test drive, or are interested in.',
          actionText: 'Add Your First Vehicle'
        };
    }
  };

  if (cars.length === 0) {
    const emptyState = getEmptyStateContent();
    return (
      <div className="p-12 text-center">
        <div className="flex flex-col items-center space-y-4">
          {emptyState.icon}
          <h3 className="typography-subtitle text-neutral-2">{emptyState.title}</h3>
          <p className="typography-body text-neutral-4 max-w-md">{emptyState.description}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className={`grid gap-6 ${
        viewMode === 'grid' 
          ? 'grid-cols-1 md:grid-cols-2' 
          : 'grid-cols-1'
      }`}>
        {cars.map(car => {
          const carData = savedItemToCarData(car);
          return (
            <CarCard
              key={car.id}
              car={carData}
              type={car.type === 'newCar' ? 'new' : 'used'}
              layout={viewMode === 'list' ? 'horizontal' : 'vertical'}
            />
          );
        })}
      </div>
    </div>
  );
};

export default GarageVehicleGrid;
