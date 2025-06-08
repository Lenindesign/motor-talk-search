import { Car } from '@/types';

// Mock car data for the service
const mockCars: Car[] = [
  {
    id: 'lucid-air-grand-touring-2025',
    title: 'Lucid Air Grand Touring',
    year: '2025',
    make: 'Lucid',
    model: 'Air Grand Touring',
    price: '$125,600',
    imageUrl: '/images/cars/lucid-air-grand-touring.jpg',
    description: 'The Lucid Air Grand Touring combines luxury with electric performance, offering exceptional range and cutting-edge technology.',
    bodyStyle: 'Sedan',
    fuelType: 'Electric',
    drivetrain: 'AWD'
  },
  {
    id: 'bmw-ix-2025',
    title: 'BMW iX',
    year: '2025',
    make: 'BMW',
    model: 'iX',
    price: '$87,100',
    imageUrl: '/images/cars/bmw-ix.jpg',
    description: 'The BMW iX represents the future of electric mobility with its innovative design and sustainable materials.',
    bodyStyle: 'SUV',
    fuelType: 'Electric',
    drivetrain: 'AWD'
  }
];

/**
 * Get a car by its ID
 * @param id The car ID
 * @returns The car object or null if not found
 */
export const getCar = (id: string): Car | null => {
  return mockCars.find(car => car.id === id) || null;
};

/**
 * Get all cars
 * @returns Array of car objects
 */
export const getAllCars = (): Car[] => {
  return mockCars;
};

/**
 * Parse car ID from URL format
 * @param urlId The car ID from URL (e.g., "lucid-air-grand-touring-2025")
 * @returns Parsed car information
 */
export const parseCarIdFromUrl = (urlId: string): { make: string; model: string; year: string } => {
  const parts = urlId.split('-');
  const year = parts[parts.length - 1];
  const make = parts[0];
  const model = parts.slice(1, -1).join(' ');
  
  return {
    make: make.charAt(0).toUpperCase() + make.slice(1),
    model: model.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
    year
  };
};
