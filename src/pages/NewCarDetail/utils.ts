
export const getBodyStyle = (category: string): "SUV" | "Sedan" | "Truck" | "Sports Car" | "Minivan" | "Crossover" | "Coupe" | "Convertible" | "Hatchback" | "Wagon" => {
  const categoryLower = category.toLowerCase();
  if (categoryLower.includes('suv')) return 'SUV';
  if (categoryLower.includes('sedan')) return 'Sedan';
  if (categoryLower.includes('truck')) return 'Truck';
  if (categoryLower.includes('sports')) return 'Sports Car';
  if (categoryLower.includes('minivan')) return 'Minivan';
  if (categoryLower.includes('crossover')) return 'Crossover';
  if (categoryLower.includes('coupe')) return 'Coupe';
  if (categoryLower.includes('convertible')) return 'Convertible';
  if (categoryLower.includes('hatchback')) return 'Hatchback';
  if (categoryLower.includes('wagon')) return 'Wagon';
  return 'SUV'; // Default fallback
};

export const mockSpecs = {
  engine: '400 HP Electric Motor',
  acceleration: '4.2 seconds 0-60 mph',
  range: '405 miles EPA estimated',
  charging: '350kW DC Fast Charging',
  drivetrain: 'All-Wheel Drive',
  seating: '5 passengers',
  cargo: '28.1 cu ft',
  warranty: '4 years/50,000 miles'
};

export const mockTrims = [
  { name: 'Base', basePrice: 0, features: ['Standard Features', '19" Wheels', 'LED Headlights'] },
  { name: 'Premium', basePrice: 5000, features: ['Premium Audio', '20" Wheels', 'Heated Seats'] },
  { name: 'Performance', basePrice: 12000, features: ['Sport Suspension', '21" Wheels', 'Performance Brakes'] }
];

export const expertRatings = [
  { category: 'Performance', score: 8.5, description: 'Excellent acceleration and handling' },
  { category: 'Comfort', score: 9.2, description: 'Premium interior and smooth ride' },
  { category: 'Technology', score: 9.0, description: 'Advanced infotainment and driver aids' },
  { category: 'Safety', score: 9.5, description: 'Top safety ratings across all tests' },
  { category: 'Reliability', score: 8.0, description: 'Good predicted reliability' },
  { category: 'Value', score: 7.5, description: 'Competitive in premium segment' }
];

export const classComparison = [
  { metric: 'Price', thisVehicle: 85, classAverage: 70, unit: 'k' },
  { metric: 'MPG', thisVehicle: 92, classAverage: 75, unit: 'e' },
  { metric: 'Cargo', thisVehicle: 28, classAverage: 30, unit: 'ft³' },
  { metric: 'Safety', thisVehicle: 9.5, classAverage: 8.5, unit: '/10' },
  { metric: 'Tech', thisVehicle: 90, classAverage: 75, unit: '%' }
];

export const ownerReviews = {
  overallScore: 4.2,
  totalReviews: 1247,
  ratingDistribution: [
    { stars: 5, count: 587 },
    { stars: 4, count: 394 },
    { stars: 3, count: 156 },
    { stars: 2, count: 78 },
    { stars: 1, count: 32 }
  ],
  topPros: ['Amazing acceleration', 'Quiet cabin', 'Premium materials'],
  topCons: ['Expensive options', 'Learning curve for tech', 'Firm ride']
};
