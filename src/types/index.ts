export type SavedItemType = 'article' | 'newCar' | 'usedCar' | 'photo' | 'video' | 'owned' | 'testDriven' | 'interested';

export interface SavedItem {
  id: string;
  title: string;
  imageUrl: string;
  type: SavedItemType;
  savedAt: string;
  metadata: Record<string, string | number | boolean | null>;
}

export interface ContentSection {
  type: 'paragraph' | 'heading' | 'quote' | 'specs';
  content?: string;
  author?: string;
  title?: string;
  data?: Array<{ label?: string; value?: string }>;
  description?: string;
  buttonText?: string;
}

export interface ArticleContent {
  subtitle?: string;
  author?: string;
  authorTitle?: string;
  readTime?: string;
  sections?: ContentSection[];
}

export interface ArticleData {
  id: string;
  title: string;
  imageUrl: string;
  date: string;
  category: string;
  featured?: boolean;
  photoCount?: number;
  content?: ArticleContent;
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

export interface Car {
  id: string;
  title: string;
  year: string;
  make: string;
  model: string;
  price: string;
  imageUrl: string;
  fallbackImageUrl?: string;
  description?: string;
  category?: string;
  bodyStyle?: string;
  fuelType?: string;
  mileage?: string;
  drivetrain?: string;
}
