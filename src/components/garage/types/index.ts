export type CarStatus = 'owned' | 'testDriven' | 'interested' | 'all';

export type VehicleCategory = 'Sedan' | 'SUV' | 'Truck' | 'Sports Car' | 'Minivan' | 'Crossover' | 'Coupe' | 'Convertible' | 'Hatchback' | 'Wagon';

// Re-export the CarData interface from the CarCard component for consistency
import { CarData as BaseCarData } from '../../CarCard/types';

// Extend the CarData interface with garage-specific properties
export interface CarData extends BaseCarData {
  status?: CarStatus;
  type?: 'newCar' | 'usedCar';
  updatedAt?: string | number | Date;
  metadata?: {
    ownership?: CarStatus;
    notes?: string;
    lastUpdated?: string;
    [key: string]: any;
  };
}

export interface GarageContentProps {
  initialTab?: CarStatus;
}

export interface GarageFiltersProps {
  activeTab: CarStatus;
  onTabChange: (tab: CarStatus) => void;
  onFilterChange: (filters: any) => void;
  onSortChange: (sortBy: string) => void;
  selectedCount: number;
  onCompare: () => void;
  onClearAll: () => void;
}

export interface GarageVehicleCardProps {
  car: CarData;
  isSelected: boolean;
  onSelect: (carId: string) => void;
  onRemove: (carId: string) => void;
  onViewDetails: (carId: string) => void;
  status: CarStatus;
}

export interface GarageEmptyStateProps {
  onAddVehicle: () => void;
  searchQuery: string;
}
