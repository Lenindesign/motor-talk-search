
import { carMakes } from './carData';

// Mock vehicle data for demonstration
const vehicleDatabase = [
  {
    id: 'vehicle-1',
    year: 2025,
    make: 'Honda',
    model: 'Accord',
    trim: 'Touring',
    type: 'Sedan',
    price: {
      base: 38000,
      asConfigured: 41500,
    },
    ratings: {
      expert: {
        overall: 8.7,
        performance: 8.5,
        comfort: 9.0,
        technology: 8.9,
        safety: 9.4,
        reliability: 9.1,
        value: 8.3,
      },
      user: {
        average: 4.6,
        count: 128,
        distribution: [3, 5, 10, 35, 75],
      }
    },
    keyPoints: [
      'Hybrid powertrain with excellent fuel economy',
      'Premium interior with impressive tech features',
      'Top-tier safety ratings and standard features',
    ],
    specs: {
      engine: '2.0L inline-4 hybrid',
      horsepower: 204,
      torque: 247,
      transmission: 'E-CVT',
      mpg: {
        city: 48,
        highway: 47,
        combined: 48,
      },
      dimensions: {
        length: 195.7,
        width: 73.3,
        height: 57.1,
        wheelbase: 111.4,
        weight: 3450,
        cargo: 16.7,
      },
      seating: 5,
      drivetrains: ['FWD'],
      fuel: 'Hybrid',
      acceleration: 7.1, // 0-60 mph in seconds
    },
    features: {
      standard: [
        'Adaptive cruise control',
        'Lane keeping assist',
        'Collision mitigation braking',
        'Blind spot monitoring',
        'Wireless Apple CarPlay/Android Auto',
        'Dual-zone automatic climate control',
        '12.3-inch touchscreen display',
        '12-speaker premium audio system',
      ],
      optional: [
        'Head-up display',
        'Heated/ventilated front seats',
        'Heated rear seats',
        'Wireless phone charging',
        'Parking sensors',
        '360-degree camera system',
      ]
    },
    ownership: {
      warranty: {
        basic: '3 years / 36,000 miles',
        powertrain: '5 years / 60,000 miles',
        hybrid: '8 years / 100,000 miles',
      },
      maintenance: {
        year1: 180,
        year2: 320,
        year3: 450,
        year4: 780,
        year5: 580,
      },
      depreciation: [
        {year: 1, value: 35000},
        {year: 3, value: 29500},
        {year: 5, value: 24300},
      ],
      fuelCost: 1200, // yearly based on avg driving
    },
    photos: [
      '/lovable-uploads/35ad1cf0-8807-4008-be7c-96fc7b43062b.png',
      '/lovable-uploads/5b8a120c-3d52-41cb-8e20-9a16e6b9bf6a.png',
      '/lovable-uploads/6f8fd40c-6013-4f96-89f0-8406d6febb7c.png',
      '/lovable-uploads/930641e7-042c-4f43-a9f6-c81fa3a9a0c4.png',
    ],
    reviews: [
      {
        id: 'review-1',
        user: 'JDriving',
        rating: 5,
        title: 'Best car I\'ve ever owned',
        content: 'The hybrid powertrain is incredibly efficient, and the ride is smooth and quiet. The tech features are intuitive and work well.',
        pros: ['Great fuel economy', 'Comfortable ride', 'Premium interior'],
        cons: ['Trunk space reduced by battery', 'Some road noise at highway speeds'],
        ownershipLength: '6 months',
        verified: true,
        date: '2024-10-15',
      },
      {
        id: 'review-2',
        user: 'CarEnthusiast',
        rating: 4,
        title: 'Excellent daily driver',
        content: 'Very happy with my purchase. The car feels premium and the technology is great. Fuel economy is even better than advertised.',
        pros: ['Fuel efficiency', 'Technology', 'Safety features'],
        cons: ['Price is a bit high', 'Not the most exciting to drive'],
        ownershipLength: '1 year',
        verified: true,
        date: '2024-08-22',
      },
      {
        id: 'review-3',
        user: 'FamilyDriver',
        rating: 5,
        title: 'Perfect family car',
        content: 'Plenty of space for the family and all our gear. The safety features give great peace of mind, and the hybrid system saves us so much on gas.',
        pros: ['Spacious interior', 'Great safety', 'Excellent fuel economy'],
        cons: ['Infotainment can be slow sometimes'],
        ownershipLength: '9 months',
        verified: true,
        date: '2024-09-05',
      },
      {
        id: 'review-4',
        user: 'DailyCommuter',
        rating: 4,
        title: 'Great commuter car',
        content: 'I drive 60 miles round trip daily and this car has been fantastic. Comfortable, efficient, and the adaptive cruise control makes traffic bearable.',
        pros: ['Comfort on long drives', 'Adaptive cruise is excellent', 'Great fuel economy'],
        cons: ['Lane keeping can be aggressive', 'Wish it had more power'],
        ownershipLength: '1.5 years',
        verified: true,
        date: '2024-07-12',
      },
    ],
    competitors: [
      {
        id: 'vehicle-2',
        make: 'Toyota',
        model: 'Camry',
        year: 2025,
        price: 36500,
        overallRating: 8.5,
        mpg: 47,
        key_difference: 'More conservative styling, slightly lower tech features',
      },
      {
        id: 'vehicle-3',
        make: 'Hyundai',
        model: 'Sonata',
        year: 2025,
        price: 35500,
        overallRating: 8.3,
        mpg: 45,
        key_difference: 'More dramatic styling, longer warranty, slightly less refinement',
      },
      {
        id: 'vehicle-4',
        make: 'Kia',
        model: 'K5',
        year: 2025,
        price: 34500,
        overallRating: 8.2,
        mpg: 41,
        key_difference: 'Sportier handling, more aggressive styling, less fuel efficient',
      },
    ],
    classComparison: {
      avgPrice: 37000,
      avgMpg: 39,
      avgCargoSpace: 15.4,
      avgSafetyRating: 8.8,
      avgReliabilityRating: 8.5,
      avgTechRating: 8.4,
    },
    motorTrendScore: 9.2,
    motorTrendRank: 1,
  },
  // More vehicles would be added here
];

export const getVehicleById = async (id: string) => {
  // Simulate an API call with a delay
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const vehicle = vehicleDatabase.find(v => v.id === id);
      if (vehicle) {
        resolve(vehicle);
      } else {
        reject(new Error('Vehicle not found'));
      }
    }, 800);
  });
};

export const getSimilarVehicles = async (id: string, limit?: number) => {
  // Find the current vehicle
  const currentVehicle = vehicleDatabase.find(v => v.id === id);
  if (!currentVehicle) {
    return [];
  }

  // Get competitors directly from the vehicle data
  return currentVehicle.competitors.slice(0, limit || currentVehicle.competitors.length);
};

export const getVehiclesByMakeModel = async (make: string, model: string) => {
  return vehicleDatabase.filter(
    v => v.make.toLowerCase() === make.toLowerCase() && v.model.toLowerCase() === model.toLowerCase()
  );
};

export const searchVehicles = async (query: string) => {
  const lowerQuery = query.toLowerCase();
  return vehicleDatabase.filter(v => 
    v.make.toLowerCase().includes(lowerQuery) ||
    v.model.toLowerCase().includes(lowerQuery) ||
    `${v.year} ${v.make} ${v.model}`.toLowerCase().includes(lowerQuery)
  );
};
