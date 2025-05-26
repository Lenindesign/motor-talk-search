export type SavedItemType = 'article' | 'newCar' | 'usedCar' | 'photo' | 'video' | 'owned' | 'testDriven' | 'interested';

export interface SavedItem {
  id: string;
  title: string;
  imageUrl: string;
  type: SavedItemType;
  savedAt: string;
  metadata: Record<string, any>;
}

export interface ArticleData {
  id: string;
  title: string;
  imageUrl: string;
  date: string;
  category: string;
  featured?: boolean;
  photoCount?: number;
}

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
  bodyStyle?: 'SUV' | 'Sedan' | 'Truck' | 'Sports Car' | 'Minivan' | 'Crossover' | 'Coupe' | 'Convertible' | 'Hatchback' | 'Wagon';
  cargoCapacity?: string;
  cargoCapacityFolded?: string;
  passengerCapacity?: string;
  seatingConfiguration?: string;
  trunkCapacity?: string;
  safetyRating?: string;
  horsepowerTorque?: string;
  towingCapacity?: string;
  payloadCapacity?: string;
}
