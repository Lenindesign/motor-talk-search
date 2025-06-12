import { SavedItem } from "../../contexts/SavedItemsContext";
import { CarData } from "../CarCard/types";

export function savedItemToCarData(item: SavedItem): CarData {
  const metadata = item.metadata || {};
  const isNewCar = item.type === 'newCar';
  
  return {
    id: item.id,
    title: item.title,
    imageUrl: item.imageUrl || '/placeholder.svg',
    price: metadata.price || 'Contact dealer',
    category: metadata.category || 'Car',
    year: metadata.year,
    mileage: metadata.mileage,
    fuelType: metadata.fuelType || (isNewCar ? 'Hybrid' : 'Gasoline'),
    drivetrain: metadata.drivetrain || 'AWD',
    location: metadata.location || 'Dealer Lot',
    bodyStyle: (metadata.bodyStyle as CarData['bodyStyle']) || 'Sedan',
    msrp: metadata.msrp || (isNewCar ? `$${(Math.floor(Math.random() * 30000) + 25000).toLocaleString()}` : ''),
    dealerName: metadata.dealerName || 'MotorTrend Certified Dealer',
    dealerLocation: metadata.dealerLocation || 'San Francisco, CA',
    make: metadata.make,
    model: metadata.model,
    detailUrl: metadata.detailUrl,
    isNew: item.type === 'newCar',
    
    // Garage status
    inGarage: true,
    garageStatus: (metadata.ownership === 'owned' ? 'Owned' : 
                  metadata.ownership === 'testDriven' ? 'Test Drive' : 'Interested') as 'Owned' | 'Test Drive' | 'Interested',
    
    // New car specs
    mpg: metadata.mpg,
    mpge: metadata.mpge,
    range: metadata.range,
    engine: metadata.engine,
    horsepower: metadata.horsepower,
    transmission: metadata.transmission,
    
    // Ratings
    motorTrendScore: metadata.motorTrendScore,
    motorTrendRank: metadata.motorTrendRank,
    motorTrendCategoryRank: metadata.motorTrendCategoryRank,
    userReviewsScore: metadata.userReviewsScore || '8.5',
    
    // Body style specific specs
    cargoCapacity: metadata.cargoCapacity,
    cargoCapacityFolded: metadata.cargoCapacityFolded,
    passengerCapacity: metadata.passengerCapacity,
    seatingConfiguration: metadata.seatingConfiguration,
    trunkCapacity: metadata.trunkCapacity,
    safetyRating: metadata.safetyRating,
    horsepowerTorque: metadata.horsepowerTorque,
    towingCapacity: metadata.towingCapacity,
    payloadCapacity: metadata.payloadCapacity,
    bedDimensions: metadata.bedDimensions,
    powertrainOptions: metadata.powertrainOptions,
    zeroToSixty: metadata.zeroToSixty,
    topSpeed: metadata.topSpeed,
    weightPowerRatio: metadata.weightPowerRatio,
    slidingDoorFeatures: metadata.slidingDoorFeatures,
    familyFeatures: metadata.familyFeatures
  };
}

export function enrichCarDataWithSampleSpecs(car: CarData): CarData {
  // Sample data for demonstration purposes
  const sampleSpecs = {
    engine: car.isNew ? '2.0L Turbo 4-Cylinder' : '3.5L V6',
    horsepower: car.isNew ? '250 hp' : '290 hp',
    transmission: car.isNew ? '8-Speed Automatic' : '6-Speed Automatic',
    fuelType: car.isNew ? 'Hybrid' : 'Gasoline',
    drivetrain: 'AWD',
    mpg: car.isNew ? '35 City / 40 Hwy' : '20 City / 28 Hwy',
    msrp: car.isNew ? `$${(Math.floor(Math.random() * 30000) + 25000).toLocaleString()}` : '',
    range: car.isNew ? '500 miles' : '',
    cargoCapacity: car.bodyStyle === 'SUV' ? '75.8 cu ft' : '',
    trunkCapacity: car.bodyStyle === 'Sedan' ? '16.7 cu ft' : '',
    towingCapacity: car.bodyStyle === 'Truck' ? '10,000 lbs' : '',
    zeroToSixty: car.category === 'Sports Car' ? '4.5 seconds' : '',
    userReviewsScore: '8.5'
  };

  return {
    ...car,
    engine: car.engine || sampleSpecs.engine,
    horsepower: car.horsepower || sampleSpecs.horsepower,
    transmission: car.transmission || sampleSpecs.transmission,
    fuelType: car.fuelType || sampleSpecs.fuelType,
    drivetrain: car.drivetrain || sampleSpecs.drivetrain,
    mpg: car.mpg || sampleSpecs.mpg,
    msrp: car.msrp || sampleSpecs.msrp,
    range: car.range || sampleSpecs.range,
    cargoCapacity: car.cargoCapacity || sampleSpecs.cargoCapacity,
    trunkCapacity: car.trunkCapacity || sampleSpecs.trunkCapacity,
    towingCapacity: car.towingCapacity || sampleSpecs.towingCapacity,
    zeroToSixty: car.zeroToSixty || sampleSpecs.zeroToSixty,
    userReviewsScore: car.userReviewsScore || sampleSpecs.userReviewsScore
  };
}
