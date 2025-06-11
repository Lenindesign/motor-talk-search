// Shared utility for enriching saved car items with robust specs, sample merging, and fallbacks
import type { SavedItem } from '../../contexts/SavedItemsContext';
import type { CarData } from '../CarCard/types';

// Sample car data for enrichment (copy from GarageTabContent)
const sampleCars: CarData[] = [
  {
    id: 'honda-1',
    title: '2025 Honda Accord',
    price: '$29,500',
    msrp: '$29,500',
    imageUrl: 'https://d2kde5ohu8qb21.cloudfront.net/files/679d37b47ff34400082301e7/19-2025-honda-accord-front-view.jpg',
    isNew: true,
    year: '2025',
    category: 'Sedan',
    fuelType: 'Gasoline',
    mpg: '30 city / 38 hwy',
    engine: '1.5L Turbo 4-cylinder',
    horsepower: '192 hp',
    transmission: 'CVT',
    motorTrendScore: '8.8',
    motorTrendRank: '2',
    motorTrendCategoryRank: true
  },
  {
    id: 'lucid-1',
    title: '2025 Lucid Air Grand Touring',
    price: '$87,400',
    msrp: '$87,400',
    imageUrl: 'https://d2kde5ohu8qb21.cloudfront.net/files/67eebefe5107540008d18c50/020-2025-lucid-air-pure.jpg',
    isNew: true,
    year: '2025',
    category: 'Luxury Sedan',
    fuelType: 'Electric',
    range: '516 miles',
    mpge: '131 MPGe',
    motorTrendScore: '9.2',
    motorTrendRank: '#1',
    motorTrendCategoryRank: true
  }
];

// Base enrichment logic (from GarageContent)
export function savedItemToCarData(item: SavedItem): CarData {
  const metadata = item.metadata || {};
  const isNewCar = item.type === 'newCar';
  const carStatus = (metadata.ownership as string) || (metadata.status as string) || 'interested';

  return {
    id: item.id,
    title: item.title || '',
    imageUrl: item.imageUrl || '/placeholder-vehicle.jpg',
    price: metadata.price || 'Contact Dealer',
    year: metadata.year ? String(metadata.year) : '',
    mileage: metadata.mileage ? String(metadata.mileage) : (isNewCar ? 'New' : ''),
    mpg: metadata.mpg || (isNewCar ? '28 city / 36 hwy' : ''),
    make: metadata.make || '',
    model: metadata.model || '',
    status: carStatus,
    type: item.type as 'newCar' | 'usedCar',
    category: (metadata.category as string) || 'Sedan',
    fuelType: metadata.fuelType || (isNewCar ? 'Hybrid' : 'Gasoline'),
    drivetrain: metadata.drivetrain || 'AWD',
    location: metadata.location || 'Dealer Lot',
    bodyStyle: (metadata.bodyStyle || 'Sedan') as string,
    msrp: metadata.msrp || (isNewCar ? `$${(Math.floor(Math.random() * 30000) + 25000).toLocaleString()}` : ''),
    dealerName: metadata.dealerName || 'MotorTrend Certified Dealer',
    dealerLocation: metadata.dealerLocation || 'San Francisco, CA',
    updatedAt: metadata.updatedAt || new Date().toISOString(),
    isNew: isNewCar,
    // MotorTrend ratings
    motorTrendScore: metadata.motorTrendScore || (isNewCar ? '8.5' : ''),
    motorTrendRank: metadata.motorTrendRank || (isNewCar ? '2' : ''),
    motorTrendCategoryRank: metadata.motorTrendCategoryRank !== undefined ? metadata.motorTrendCategoryRank : isNewCar,
    // New car specific specs
    mpge: metadata.mpge || (isNewCar && metadata.fuelType === 'Electric' ? 'Up to 134 city / 126 highway' : undefined),
    range: metadata.range || (isNewCar ? (metadata.fuelType === 'Electric' ? '315 to 341 mi battery-only' : '450 mi fuel tank') : undefined),
    engine: metadata.engine || (isNewCar ? (metadata.fuelType === 'Electric' ? 'Electric' : '2.0L Turbo 4-cylinder') : undefined),
    horsepower: metadata.horsepower || (isNewCar ? '280 hp' : undefined),
    transmission: metadata.transmission || (isNewCar ? 'Automatic' : ''),
    metadata: {
      ...metadata,
      ownership: carStatus,
      status: carStatus,
      isNew: isNewCar
    }
  };
}

// Merge sample specs for new cars and ensure robust fallback values
export function enrichCarDataWithSampleSpecs(item: SavedItem): CarData {
  const baseCarData = savedItemToCarData(item);
  if (item.type === 'newCar' || baseCarData.isNew) {
    const normalize = (str: string) => str.toLowerCase().replace(/\s+/g, '');
    const matchingSample = sampleCars.find(sample => 
      normalize(sample.title).includes(normalize(baseCarData.title)) ||
      normalize(baseCarData.title).includes(normalize(sample.title))
    );
    if (matchingSample) {
      return {
        ...baseCarData,
        msrp: baseCarData.msrp || matchingSample.msrp,
        mpg: baseCarData.mpg || matchingSample.mpg,
        mpge: baseCarData.mpge || matchingSample.mpge,
        range: baseCarData.range || matchingSample.range,
        engine: baseCarData.engine || matchingSample.engine,
        horsepower: baseCarData.horsepower || matchingSample.horsepower,
        transmission: baseCarData.transmission || matchingSample.transmission,
        motorTrendScore: baseCarData.motorTrendScore || matchingSample.motorTrendScore,
        motorTrendRank: baseCarData.motorTrendRank || matchingSample.motorTrendRank,
        motorTrendCategoryRank: baseCarData.motorTrendCategoryRank || matchingSample.motorTrendCategoryRank
      };
    }
    // Fallback defaults for new cars
    return {
      ...baseCarData,
      msrp: baseCarData.msrp ?? '$35,000',
      mpg: baseCarData.mpg ?? (baseCarData.fuelType === 'Electric' ? '—' : '28 city / 36 hwy'),
      mpge: baseCarData.mpge ?? (baseCarData.fuelType === 'Electric' ? '120 MPGe' : '—'),
      range: baseCarData.range ?? (baseCarData.fuelType === 'Electric' ? '300 miles' : '—'),
      engine: baseCarData.engine ?? (baseCarData.fuelType === 'Electric' ? 'Electric Motor' : '2.0L 4-cylinder'),
      horsepower: baseCarData.horsepower ?? '200 hp',
      transmission: baseCarData.transmission ?? (baseCarData.fuelType === 'Electric' ? 'Single-speed' : 'Automatic'),
      motorTrendScore: baseCarData.motorTrendScore ?? '8.5',
      motorTrendRank: baseCarData.motorTrendRank ?? '#3',
      motorTrendCategoryRank: baseCarData.motorTrendCategoryRank ?? true
    };
  }
  return baseCarData;
}
