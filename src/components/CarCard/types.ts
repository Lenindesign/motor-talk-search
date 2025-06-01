
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
  make?: string;
  model?: string;
  detailUrl?: string;
  dealerName?: string;
  dealerLocation?: string;
  
  // New car specs
  msrp?: string;
  mpg?: string;
  mpge?: string;
  range?: string;
  engine?: string;
  horsepower?: string;
  transmission?: string;
  
  // MotorTrend ratings
  motorTrendScore?: string;
  motorTrendRank?: string;
  motorTrendCategoryRank?: boolean;
  
  // Body style and basic specs
  bodyStyle?: 'SUV' | 'Sedan' | 'Truck' | 'Sports Car' | 'Minivan' | 'Crossover' | 'Coupe' | 'Convertible' | 'Hatchback' | 'Wagon';
  
  // SUV-specific specs
  cargoCapacity?: string;
  cargoCapacityFolded?: string;
  passengerCapacity?: string;
  seatingConfiguration?: string;
  
  // Sedan-specific specs
  trunkCapacity?: string;
  safetyRating?: string;
  horsepowerTorque?: string;
  
  // Truck-specific specs
  towingCapacity?: string;
  payloadCapacity?: string;
  bedDimensions?: string;
  powertrainOptions?: string;
  
  // Sports Car-specific specs
  zeroToSixty?: string;
  topSpeed?: string;
  weightPowerRatio?: string;
  
  // Minivan-specific specs
  slidingDoorFeatures?: string;
  familyFeatures?: string;
  

  
  // Image optimization settings
  width?: number;
  height?: number;
  quality?: number;
  priority?: boolean;
}

export interface CarCardProps {
  car: CarData;
  type: 'new' | 'used';
  width?: number;
  height?: number;
  quality?: number;
  priority?: boolean;
  fallbackImageUrl?: string;
  secondaryFallbackImageUrl?: string;
  tertiaryFallbackImageUrl?: string;
  quaternaryFallbackImageUrl?: string;
  quinaryFallbackImageUrl?: string;
  // Image optimization settings
  blurRadius?: number;
  borderRadius?: number;
  transitionDuration?: number;
  // Car type specific fallbacks
  sedanFallback?: string;
  suvFallback?: string;
  truckFallback?: string;
  sportsCarFallback?: string;
  minivanFallback?: string;
  crossoverFallback?: string;
  coupeFallback?: string;
  convertibleFallback?: string;
  hatchbackFallback?: string;
  wagonFallback?: string;
  isLoading?: boolean;
  onAction?: (action: string, car: CarData) => void;
  isSaved?: boolean;
}
