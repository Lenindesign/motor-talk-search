export type CarStatus = 'owned' | 'testDriven' | 'interested' | 'all';

export interface CarData {
  id: string;
  title: string;
  imageUrl: string;
  price: string;
  year?: number;
  mileage?: string | number;
  mpg?: string | number;
  status: CarStatus;
  type: 'newCar' | 'usedCar';
  make?: string;
  model?: string;
  updatedAt?: string | number | Date;
  [key: string]: any;
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
