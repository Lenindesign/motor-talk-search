import { carMakes } from './carData';

// Mock vehicle database for demonstration
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
  // Add the new vehicles from the BuyersGuide page
  {
    id: 'new-1',
    year: 2025,
    make: 'Ford',
    model: 'Mustang',
    trim: 'GT',
    type: 'Sports Car',
    price: {
      base: 45995,
      asConfigured: 48500,
    },
    ratings: {
      expert: {
        overall: 8.7,
        performance: 9.2,
        comfort: 7.8,
        technology: 8.5,
        safety: 8.0,
        reliability: 7.9,
        value: 8.4,
      },
      user: {
        average: 4.5,
        count: 87,
        distribution: [2, 4, 8, 28, 45],
      }
    },
    keyPoints: [
      'V8 engine with excellent power delivery',
      'Classic muscle car styling with modern tech',
      'Engaging driving dynamics',
    ],
    specs: {
      engine: '5.0L V8',
      horsepower: 480,
      torque: 420,
      transmission: '10-speed automatic',
      mpg: {
        city: 15,
        highway: 24,
        combined: 18,
      },
      dimensions: {
        length: 188.5,
        width: 75.4,
        height: 54.3,
        wheelbase: 107.1,
        weight: 3850,
        cargo: 13.5,
      },
      seating: 4,
      drivetrains: ['RWD'],
      fuel: 'Premium Gasoline',
      acceleration: 4.2, // 0-60 mph in seconds
    },
    features: {
      standard: [
        'Digital instrument cluster',
        'SYNC infotainment system',
        'Apple CarPlay/Android Auto',
        'Selectable drive modes',
        'LED headlights',
      ],
      optional: [
        'MagneRide suspension',
        'Recaro seats',
        'Bang & Olufsen sound system',
        'Performance Package',
      ]
    },
    ownership: {
      warranty: {
        basic: '3 years / 36,000 miles',
        powertrain: '5 years / 60,000 miles',
      },
      maintenance: {
        year1: 250,
        year2: 420,
        year3: 650,
        year4: 920,
        year5: 780,
      },
      depreciation: [
        {year: 1, value: 41000},
        {year: 3, value: 35000},
        {year: 5, value: 28500},
      ],
      fuelCost: 2200, // yearly based on avg driving
    },
    photos: [
      '/lovable-uploads/35ad1cf0-8807-4008-be7c-96fc7b43062b.png',
      '/lovable-uploads/5b8a120c-3d52-41cb-8e20-9a16e6b9bf6a.png',
      '/lovable-uploads/6f8fd40c-6013-4f96-89f0-8406d6febb7c.png',
      '/lovable-uploads/930641e7-042c-4f43-a9f6-c81fa3a9a0c4.png',
    ],
    reviews: [
      {
        id: 'review-m1',
        user: 'CarEnthusiast88',
        rating: 5,
        title: 'The best Mustang yet',
        content: 'The power delivery is amazing, and the handling has improved dramatically from previous generations.',
        pros: ['Powerful V8', 'Great handling', 'Iconic styling'],
        cons: ['Fuel economy', 'Limited rear seat space'],
        ownershipLength: '8 months',
        verified: true,
        date: '2024-09-22',
      },
      {
        id: 'review-m2',
        user: 'MustangLover',
        rating: 4,
        title: 'Almost perfect',
        content: 'Love the car but wish it had better fuel economy for daily driving.',
        pros: ['Acceleration', 'Exterior design', 'Sound'],
        cons: ['Fuel economy', 'Tech could be better'],
        ownershipLength: '1 year',
        verified: true,
        date: '2024-07-15',
      },
    ],
    competitors: [
      {
        id: 'competitor-m1',
        make: 'Chevrolet',
        model: 'Camaro',
        year: 2025,
        price: 43995,
        overallRating: 8.5,
        mpg: 19,
        key_difference: 'Better handling, less interior space',
      },
      {
        id: 'competitor-m2',
        make: 'Dodge',
        model: 'Challenger',
        year: 2025,
        price: 44995,
        overallRating: 8.3,
        mpg: 17,
        key_difference: 'More spacious, less nimble handling',
      },
    ],
    classComparison: {
      avgPrice: 49000,
      avgMpg: 19,
      avgCargoSpace: 12.8,
      avgSafetyRating: 8.2,
      avgReliabilityRating: 7.9,
      avgTechRating: 8.6,
    },
    motorTrendScore: 8.7,
    motorTrendRank: 2,
  },
  {
    id: 'new-2',
    year: 2025,
    make: 'BMW',
    model: 'i5',
    trim: 'eDrive40',
    type: 'Luxury Sedan',
    price: {
      base: 67795,
      asConfigured: 75850,
    },
    ratings: {
      expert: {
        overall: 9.1,
        performance: 8.7,
        comfort: 9.4,
        technology: 9.5,
        safety: 9.3,
        reliability: 8.8,
        value: 8.5,
      },
      user: {
        average: 4.7,
        count: 42,
        distribution: [1, 2, 4, 12, 23],
      }
    },
    keyPoints: [
      'Luxurious electric sedan with impressive range',
      'Cutting-edge technology and premium interior',
      'Excellent balance of comfort and performance',
    ],
    specs: {
      engine: 'Electric motor',
      horsepower: 335,
      torque: 295,
      transmission: 'Single-speed automatic',
      mpg: {
        equivalent: 109,
        range: 295, // miles
      },
      dimensions: {
        length: 199.2,
        width: 76.8,
        height: 58.2,
        wheelbase: 118.1,
        weight: 4750,
        cargo: 17.3,
      },
      seating: 5,
      drivetrains: ['RWD'],
      fuel: 'Electric',
      acceleration: 5.7, // 0-60 mph in seconds
    },
    features: {
      standard: [
        'BMW Curved Display',
        'iDrive 8 infotainment',
        'Wireless charging',
        'Ambient lighting',
        'Harman Kardon sound system',
        'Driver assistance package',
      ],
      optional: [
        'Executive package',
        'Premium technology package',
        'Massage seats',
        'Rear entertainment system',
      ]
    },
    ownership: {
      warranty: {
        basic: '4 years / 50,000 miles',
        battery: '8 years / 100,000 miles',
      },
      maintenance: {
        year1: 0,
        year2: 180,
        year3: 320,
        year4: 450,
        year5: 280,
      },
      depreciation: [
        {year: 1, value: 57000},
        {year: 3, value: 47500},
        {year: 5, value: 39000},
      ],
      fuelCost: 950, // yearly based on avg electricity costs
    },
    photos: [
      '/lovable-uploads/35ad1cf0-8807-4008-be7c-96fc7b43062b.png',
      '/lovable-uploads/5b8a120c-3d52-41cb-8e20-9a16e6b9bf6a.png',
      '/lovable-uploads/6f8fd40c-6013-4f96-89f0-8406d6febb7c.png',
      '/lovable-uploads/930641e7-042c-4f43-a9f6-c81fa3a9a0c4.png',
    ],
    reviews: [
      {
        id: 'review-b1',
        user: 'LuxuryCarFan',
        rating: 5,
        title: 'Exceptional luxury EV',
        content: 'The i5 delivers exactly what you expect from BMW - luxury, tech, and performance in an electric package.',
        pros: ['Premium interior', 'Quiet ride', 'Impressive tech'],
        cons: ['Charging network still growing', 'Price premium'],
        ownershipLength: '4 months',
        verified: true,
        date: '2024-11-10',
      },
      {
        id: 'review-b2',
        user: 'EVConvert',
        rating: 4,
        title: 'Great transition from gas to electric',
        content: 'As my first EV, the i5 made the transition seamless. Familiar BMW luxury with electric benefits.',
        pros: ['Range', 'Interior quality', 'Performance'],
        cons: ['Learning curve with charging', 'Expensive options'],
        ownershipLength: '6 months',
        verified: true,
        date: '2024-10-05',
      },
    ],
    competitors: [
      {
        id: 'competitor-b1',
        make: 'Tesla',
        model: 'Model S',
        year: 2025,
        price: 74990,
        overallRating: 8.9,
        mpg: 120, // MPGe
        key_difference: 'Better range and charging network, less luxurious interior',
      },
      {
        id: 'competitor-b2',
        make: 'Mercedes-Benz',
        model: 'EQE',
        year: 2025,
        price: 74900,
        overallRating: 8.8,
        mpg: 105, // MPGe
        key_difference: 'More opulent interior, slightly less range',
      },
    ],
    classComparison: {
      avgPrice: 72000,
      avgMpg: 110, // MPGe
      avgCargoSpace: 16.4,
      avgSafetyRating: 9.1,
      avgReliabilityRating: 8.5,
      avgTechRating: 9.0,
    },
    motorTrendScore: 9.1,
    motorTrendRank: 1,
  },
  {
    id: 'new-3',
    year: 2025,
    make: 'Toyota',
    model: 'Crown',
    trim: 'Signia',
    type: 'Crossover',
    price: {
      base: 42500,
      asConfigured: 45700,
    },
    ratings: {
      expert: {
        overall: 8.0,
        performance: 7.5,
        comfort: 8.4,
        technology: 7.9,
        safety: 9.0,
        reliability: 9.2,
        value: 8.0,
      },
      user: {
        average: 4.2,
        count: 65,
        distribution: [3, 6, 11, 20, 25],
      }
    },
    keyPoints: [
      'Unique crossover-sedan design with hybrid efficiency',
      'Comfortable ride with upscale features',
      'Toyota reliability with premium touches',
    ],
    specs: {
      engine: '2.5L 4-cylinder hybrid',
      horsepower: 236,
      torque: 163,
      transmission: 'E-CVT',
      mpg: {
        city: 42,
        highway: 41,
        combined: 41,
      },
      dimensions: {
        length: 194.0,
        width: 72.4,
        height: 60.6,
        wheelbase: 112.2,
        weight: 3900,
        cargo: 15.2,
      },
      seating: 5,
      drivetrains: ['AWD'],
      fuel: 'Hybrid',
      acceleration: 7.8, // 0-60 mph in seconds
    },
    features: {
      standard: [
        'Toyota Safety Sense 3.0',
        'Panoramic moonroof',
        '12.3-inch touchscreen',
        'Wireless smartphone integration',
        'Heated front seats',
      ],
      optional: [
        'Advanced Technology Package',
        'Premium Audio',
        'Heated steering wheel',
        'Ventilated front seats',
      ]
    },
    ownership: {
      warranty: {
        basic: '3 years / 36,000 miles',
        powertrain: '5 years / 60,000 miles',
        hybrid: '8 years / 100,000 miles',
      },
      maintenance: {
        year1: 0, // ToyotaCare covers first 2 years
        year2: 0,
        year3: 320,
        year4: 480,
        year5: 390,
      },
      depreciation: [
        {year: 1, value: 37000},
        {year: 3, value: 32500},
        {year: 5, value: 28000},
      ],
      fuelCost: 1050, // yearly based on avg driving
    },
    photos: [
      '/lovable-uploads/35ad1cf0-8807-4008-be7c-96fc7b43062b.png',
      '/lovable-uploads/5b8a120c-3d52-41cb-8e20-9a16e6b9bf6a.png',
      '/lovable-uploads/6f8fd40c-6013-4f96-89f0-8406d6febb7c.png',
      '/lovable-uploads/930641e7-042c-4f43-a9f6-c81fa3a9a0c4.png',
    ],
    reviews: [
      {
        id: 'review-t1',
        user: 'CommuterPro',
        rating: 4,
        title: 'Great daily driver with style',
        content: 'The Crown Signia is comfortable, efficient, and has enough unique styling to stand out.',
        pros: ['Fuel economy', 'Reliability', 'Comfortable ride'],
        cons: ['Infotainment can be sluggish', 'Unusual styling not for everyone'],
        ownershipLength: '10 months',
        verified: true,
        date: '2024-08-12',
      },
      {
        id: 'review-t2',
        user: 'FamilyDriver',
        rating: 5,
        title: 'Perfect balance of practicality and luxury',
        content: 'This is our second Toyota hybrid and by far the best. Great for family trips and daily commuting.',
        pros: ['Spacious interior', 'Great fuel economy', 'Smooth ride'],
        cons: ['Could use more cargo space'],
        ownershipLength: '7 months',
        verified: true,
        date: '2024-09-28',
      },
    ],
    competitors: [
      {
        id: 'competitor-t1',
        make: 'Honda',
        model: 'Insight',
        year: 2025,
        price: 39500,
        overallRating: 7.9,
        mpg: 48,
        key_difference: 'Better fuel economy, less premium feel',
      },
      {
        id: 'competitor-t2',
        make: 'Lexus',
        model: 'ES Hybrid',
        year: 2025,
        price: 48500,
        overallRating: 8.3,
        mpg: 44,
        key_difference: 'More luxurious, higher price point',
      },
    ],
    classComparison: {
      avgPrice: 44000,
      avgMpg: 39,
      avgCargoSpace: 16.0,
      avgSafetyRating: 8.7,
      avgReliabilityRating: 8.4,
      avgTechRating: 8.0,
    },
    motorTrendScore: 8.0,
    motorTrendRank: 5,
  },
  {
    id: 'new-4',
    year: 2025,
    make: 'Hyundai',
    model: 'Ioniq 6',
    trim: 'Limited',
    type: 'Electric Sedan',
    price: {
      base: 52150,
      asConfigured: 55800,
    },
    ratings: {
      expert: {
        overall: 8.8,
        performance: 8.9,
        comfort: 8.5,
        technology: 9.1,
        safety: 9.0,
        reliability: 8.6,
        value: 8.7,
      },
      user: {
        average: 4.4,
        count: 53,
        distribution: [2, 3, 7, 18, 23],
      }
    },
    keyPoints: [
      'Sleek, aerodynamic design with impressive range',
      'Fast charging capability and strong performance',
      'Feature-packed interior with sustainable materials',
    ],
    specs: {
      engine: 'Dual electric motors',
      horsepower: 320,
      torque: 446,
      transmission: 'Single-speed automatic',
      mpg: {
        equivalent: 113,
        range: 270, // miles
      },
      dimensions: {
        length: 191.1,
        width: 74.4,
        height: 58.9,
        wheelbase: 116.1,
        weight: 4250,
        cargo: 16.0,
      },
      seating: 5,
      drivetrains: ['AWD'],
      fuel: 'Electric',
      acceleration: 4.8, // 0-60 mph in seconds
    },
    features: {
      standard: [
        'Vehicle-to-Load (V2L) capability',
        'Dual 12.3-inch displays',
        'Hyundai SmartSense safety suite',
        'Eco-friendly interior materials',
        'Bose premium audio',
      ],
      optional: [
        'Digital key',
        'Head-up display',
        'Remote smart parking assist',
        'Vision roof',
      ]
    },
    ownership: {
      warranty: {
        basic: '5 years / 60,000 miles',
        powertrain: '10 years / 100,000 miles',
        battery: '10 years / 100,000 miles',
      },
      maintenance: {
        year1: 75,
        year2: 150,
        year3: 225,
        year4: 350,
        year5: 275,
      },
      depreciation: [
        {year: 1, value: 43000},
        {year: 3, value: 36000},
        {year: 5, value: 29000},
      ],
      fuelCost: 900, // yearly based on avg electricity costs
    },
    photos: [
      '/lovable-uploads/35ad1cf0-8807-4008-be7c-96fc7b43062b.png',
      '/lovable-uploads/5b8a120c-3d52-41cb-8e20-9a16e6b9bf6a.png',
      '/lovable-uploads/6f8fd40c-6013-4f96-89f0-8406d6febb7c.png',
      '/lovable-uploads/930641e7-042c-4f43-a9f6-c81fa3a9a0c4.png',
    ],
    reviews: [
      {
        id: 'review-h1',
        user: 'EarlyAdopter',
        rating: 5,
        title: 'The future of EVs is here',
        content: 'The Ioniq 6 has exceeded all my expectations. Fast charging, great range, and the tech is impressive.',
        pros: ['Ultra-fast charging', 'Striking design', 'Tech features'],
        cons: ['Limited service network for EVs', 'Learning curve for new tech'],
        ownershipLength: '5 months',
        verified: true,
        date: '2024-10-30',
      },
      {
        id: 'review-h2',
        user: 'TechEnthusiast',
        rating: 4,
        title: 'Great EV with minor drawbacks',
        content: 'The technology and efficiency are impressive, but interior space could be better given the exterior size.',
        pros: ['Performance', 'Range', 'Technology'],
        cons: ['Interior space', 'Some cheap plastic trim'],
        ownershipLength: '9 months',
        verified: true,
        date: '2024-08-17',
      },
    ],
    competitors: [
      {
        id: 'competitor-h1',
        make: 'Tesla',
        model: 'Model 3',
        year: 2025,
        price: 47000,
        overallRating: 8.9,
        mpg: 131, // MPGe
        key_difference: 'Supercharger network, minimalist interior, better software',
      },
      {
        id: 'competitor-h2',
        make: 'Polestar',
        model: '2',
        year: 2025,
        price: 51900,
        overallRating: 8.6,
        mpg: 107, // MPGe
        key_difference: 'More European styling, Google-based infotainment',
      },
    ],
    classComparison: {
      avgPrice: 53000,
      avgMpg: 118, // MPGe
      avgCargoSpace: 14.8,
      avgSafetyRating: 8.9,
      avgReliabilityRating: 8.3,
      avgTechRating: 9.2,
    },
    motorTrendScore: 8.8,
    motorTrendRank: 3,
  },
  {
    id: 'used-1',
    year: 2022,
    make: 'Tesla',
    model: 'Model 3',
    trim: 'Long Range',
    type: 'Electric Sedan',
    price: {
      base: 38995,
      asConfigured: 38995,
    },
    ratings: {
      expert: {
        overall: 8.5,
        performance: 9.0,
        comfort: 8.0,
        technology: 9.2,
        safety: 9.3,
        reliability: 7.8,
        value: 8.2,
      },
      user: {
        average: 4.3,
        count: 213,
        distribution: [10, 15, 28, 67, 93],
      }
    },
    keyPoints: [
      'Long range electric vehicle with supercharger access',
      'Minimalist interior with large central screen',
      'Strong acceleration and handling',
    ],
    specs: {
      engine: 'Dual electric motors',
      horsepower: 346,
      torque: 389,
      transmission: 'Single-speed automatic',
      mpg: {
        equivalent: 134,
        range: 358, // miles
      },
      dimensions: {
        length: 184.8,
        width: 72.8,
        height: 56.8,
        wheelbase: 113.2,
        weight: 4065,
        cargo: 23, // combined trunk and frunk
      },
      seating: 5,
      drivetrains: ['AWD'],
      fuel: 'Electric',
      acceleration: 4.2, // 0-60 mph in seconds
      mileage: 27540,
    },
    features: {
      standard: [
        '15-inch central touchscreen',
        'Autopilot',
        'Glass roof',
        'Wireless phone charging',
        'Premium audio',
      ],
      optional: [
        'Full Self-Driving capability',
        'Premium Connectivity',
      ]
    },
    ownership: {
      warranty: {
        battery: '6 years / 70,000 miles remaining',
        drivetrain: '6 years / 70,000 miles remaining',
      },
      maintenance: {
        year1: 0, // Minimal maintenance required
        year2: 50,
        year3: 150,
        year4: 250,
        year5: 350,
      },
      depreciation: [
        {year: 1, value: 36000},
        {year: 3, value: 30000},
        {year: 5, value: 25000},
      ],
      fuelCost: 650, // yearly based on avg electricity costs
    },
    location: 'Scottsdale, AZ',
    photos: [
      '/lovable-uploads/35ad1cf0-8807-4008-be7c-96fc7b43062b.png',
      '/lovable-uploads/5b8a120c-3d52-41cb-8e20-9a16e6b9bf6a.png',
      '/lovable-uploads/6f8fd40c-6013-4f96-89f0-8406d6febb7c.png',
      '/lovable-uploads/930641e7-042c-4f43-a9f6-c81fa3a9a0c4.png',
    ],
    reviews: [
      {
        id: 'review-t1',
        user: 'EVFanatic',
        rating: 5,
        title: 'Still the best EV on the market',
        content: 'After 2 years, my Model 3 still feels cutting edge. The Supercharger network is unbeatable.',
        pros: ['Range', 'Supercharging network', 'Performance'],
        cons: ['Some build quality issues', 'Service can be hit or miss'],
        ownershipLength: '2 years',
        verified: true,
        date: '2024-06-10',
      },
      {
        id: 'review-t2',
        user: 'DailyCommuter',
        rating: 4,
        title: 'Great daily driver with some quirks',
        content: 'Love the car overall, but the minimalist interior takes getting used to.',
        pros: ['Cost savings vs. gas', 'Acceleration', 'Tech features'],
        cons: ['Everything controlled via touchscreen', 'Ride can be harsh'],
        ownershipLength: '1.5 years',
        verified: true,
        date: '2024-07-22',
      },
    ],
    competitors: [
      {
        id: 'competitor-tu1',
        make: 'Polestar',
        model: '2',
        year: 2022,
        price: 39995,
        overallRating: 8.3,
        mpg: 107, // MPGe
        key_difference: 'More traditional interior, less range',
      },
      {
        id: 'competitor-tu2',
        make: 'Ford',
        model: 'Mach-E',
        year: 2022,
        price: 40500,
        overallRating: 8.4,
        mpg: 103, // MPGe
        key_difference: 'More conventional SUV styling, less range',
      },
    ],
    classComparison: {
      avgPrice: 39500,
      avgMpg: 114, // MPGe
      avgCargoSpace: 18.7,
      avgSafetyRating: 8.9,
      avgReliabilityRating: 7.9,
      avgTechRating: 8.8,
    },
    motorTrendScore: 8.5,
    motorTrendRank: 4,
  },
  {
    id: 'used-2',
    year: 2021,
    make: 'Audi',
    model: 'Q7',
    trim: 'Premium Plus',
    type: 'Luxury SUV',
    price: {
      base: 42750,
      asConfigured: 42750,
    },
    ratings: {
      expert: {
        overall: 8.2,
        performance: 8.0,
        comfort: 9.0,
        technology: 8.5,
        safety: 9.1,
        reliability: 7.5,
        value: 7.8,
      },
      user: {
        average: 4.1,
        count: 85,
        distribution: [5, 7, 12, 31, 30],
      }
    },
    keyPoints: [
      'Refined luxury SUV with three-row seating',
      'Premium materials and build quality',
      'Balanced performance and comfort',
    ],
    specs: {
      engine: '3.0L Turbocharged V6',
      horsepower: 335,
      torque: 369,
      transmission: '8-speed automatic',
      mpg: {
        city: 18,
        highway: 23,
        combined: 20,
      },
      dimensions: {
        length: 199.3,
        width: 77.6,
        height: 68.5,
        wheelbase: 117.9,
        weight: 5080,
        cargo: 69.6, // with seats folded
      },
      seating: 7,
      drivetrains: ['AWD'],
      fuel: 'Premium Gasoline',
      acceleration: 5.7, // 0-60 mph in seconds
      mileage: 35872,
    },
    features: {
      standard: [
        'Panoramic sunroof',
        'Audi virtual cockpit',
        'MMI touch response system',
        'Leather upholstery',
        'Power-folding third row',
        'Adaptive air suspension',
      ],
      optional: [
        'Bang & Olufsen 3D sound system',
        'Night vision assistant',
        'Driver assistance package',
        'Rear seat entertainment',
      ]
    },
    ownership: {
      warranty: {
        basic: '1 year / 12,000 miles remaining',
        powertrain: '2 years / 24,000 miles remaining',
      },
      maintenance: {
        year1: 450,
        year2: 750,
        year3: 1200,
        year4: 1500,
        year5: 1800,
      },
      depreciation: [
        {year: 1, value: 39000},
        {year: 3, value: 32000},
        {year: 5, value: 25000},
      ],
      fuelCost: 2900, // yearly based on avg driving
    },
    location: 'Denver, CO',
    photos: [
      '/lovable-uploads/35ad1cf0-8807-4008-be7c-96fc7b43062b.png',
      '/lovable-uploads/5b8a120c-3d52-41cb-8e20-9a16e6b9bf6a.png',
      '/lovable-uploads/6f8fd40c-6013-4f96-89f0-8406d6febb7c.png',
      '/lovable-uploads/930641e7-042c-4f43-a9f6-c81fa3a9a0c4.png',
    ],
    reviews: [
      {
        id: 'review-a1',
        user: 'LuxurySUVFan',
        rating: 5,
        title: 'Perfect family luxury vehicle',
        content: 'The Q7 offers everything we need - space, luxury, safety, and enough performance to make driving enjoyable.',
        pros: ['Interior quality', 'Comfortable ride', 'Advanced tech'],
        cons: ['Fuel economy', 'Third row is tight for adults'],
        ownershipLength: '2.5 years',
        verified: true,
        date: '2024-05-12',
      },
      {
        id: 'review-a2',
        user: 'MountainDriver',
        rating: 4,
        title: 'Great in all conditions',
        content: 'The Quattro system handles Colorado winters with ease, and the air suspension provides great comfort.',
        pros: ['All-weather capability', 'Luxury feel', 'Technology'],
        cons: ['Maintenance costs', 'Complex infotainment'],
        ownershipLength: '3 years',
        verified: true,
        date: '2024-04-18',
      },
    ],
    competitors: [
      {
        id: 'competitor-a1',
        make: 'BMW',
        model: 'X5',
        year: 2021,
        price: 44500,
        overallRating: 8.4,
        mpg: 23,
        key_difference: 'More sporty handling, less third-row space',
      },
      {
        id: 'competitor-a2',
        make: 'Mercedes-Benz',
        model: 'GLE',
        year: 2021,
        price: 45750,
        overallRating: 8.3,
        mpg: 22,
        key_difference: 'More luxurious styling, similar capability',
      },
    ],
    classComparison: {
      avgPrice: 44000,
      avgMpg: 21,
      avgCargoSpace: 65.2,
      avgSafetyRating: 8.8,
      avgReliabilityRating: 7.7,
      avgTechRating: 8.4,
    },
    motorTrendScore: 8.2,
    motorTrendRank: 7,
  },
  {
    id: 'used-3',
    year: 2020,
    make: 'Lexus',
    model: 'ES',
    trim: '350 F Sport',
    type: 'Luxury Sedan',
    price: {
      base: 32495,
      asConfigured: 32495,
    },
    ratings: {
      expert: {
        overall: 7.8,
        performance: 7.5,
        comfort: 8.7,
        technology: 7.2,
        safety: 8.9,
        reliability: 9.0,
        value: 8.3,
      },
      user: {
        average: 4.4,
        count: 112,
        distribution: [3, 8, 14, 37, 50],
      }
    },
    keyPoints: [
      'Reliable luxury sedan with sporty F Sport touches',
      'Comfortable and quiet interior',
      'Lexus quality with reasonable maintenance costs',
    ],
    specs: {
      engine: '3.5L V6',
      horsepower: 302,
      torque: 267,
      transmission: '8-speed automatic',
      mpg: {
        city: 22,
        highway: 31,
        combined: 25,
      },
      dimensions: {
        length: 195.9,
        width: 73.4,
        height: 56.9,
        wheelbase: 113.0,
        weight: 3750,
        cargo: 16.7,
      },
      seating: 5,
      drivetrains: ['FWD'],
      fuel: 'Premium Gasoline',
      acceleration: 6.6, // 0-60 mph in seconds
      mileage: 42150,
    },
    features: {
      standard: [
        'F Sport suspension',
        'Sport seats with enhanced bolsters',
        'LFA-inspired instrument cluster',
        'Lexus Safety System+ 2.0',
        '10.2-inch display',
      ],
      optional: [
        'Mark Levinson audio system',
        'Wireless charging',
        'Panoramic view monitor',
        'Heated steering wheel',
      ]
    },
    ownership: {
      warranty: {
        basic: 'Expired',
        powertrain: '2 years / 30,000 miles remaining',
      },
      maintenance: {
        year1: 250,
        year2: 480,
        year3: 390,
        year4: 750,
        year5: 560,
      },
      depreciation: [
        {year: 1, value: 29500},
        {year: 3, value: 25000},
        {year: 5, value: 21000},
      ],
      fuelCost: 1800, // yearly based on avg driving
    },
    location: 'Atlanta, GA',
    photos: [
      '/lovable-uploads/35ad1cf0-8807-4008-be7c-96fc7b43062b.png',
      '/lovable-uploads/5b8a120c-3d52-41cb-8e20-9a16e6b9bf6a.png',
      '/lovable-uploads/6f8fd40c-6013-4f96-89f0-8406d6febb7c.png',
      '/lovable-uploads/930641e7-042c-4f43-a9f6-c81fa3a9a0c4.png',
    ],
    reviews: [
      {
        id: 'review-l1',
        user: 'ReliabilityFirst',
        rating: 5,
        title: 'Best luxury car for reliability',
        content: 'After coming from German luxury cars, the Lexus ES offers 90% of the luxury with none of the reliability headaches.',
        pros: ['Build quality', 'Comfort', 'Low maintenance costs'],
        cons: ['Infotainment system is dated', 'Not as sporty as some competitors'],
        ownershipLength: '4 years',
        verified: true,
        date: '2024-03-20',
      },
      {
        id: 'review-l2',
        user: 'ComfortSeeker',
        rating: 4,
        title: 'Luxury without the price premium',
        content: 'The ES F Sport offers a nice balance of comfort and handling, though it\'s not truly sporty despite the badge.',
        pros: ['Quiet cabin', 'Smooth ride', 'Reliability'],
        cons: ['Remote touch interface is frustrating', 'Front-wheel drive only'],
        ownershipLength: '3.5 years',
        verified: true,
        date: '2024-02-15',
      },
    ],
    competitors: [
      {
        id: 'competitor-l1',
        make: 'Acura',
        model: 'TLX',
        year: 2020,
        price: 30795,
        overallRating: 7.9,
        mpg: 25,
        key_difference: 'More athletic handling, less refined interior',
      },
      {
        id: 'competitor-l2',
        make: 'Genesis',
        model: 'G80',
        year: 2020,
        price: 33950,
        overallRating: 8.0,
        mpg: 24,
        key_difference: 'More powerful engine options, newer brand with less established reputation',
      },
    ],
    classComparison: {
      avgPrice: 32500,
      avgMpg: 26,
      avgCargoSpace: 15.4,
      avgSafetyRating: 8.5,
      avgReliabilityRating: 7.9,
      avgTechRating: 7.7,
    },
    motorTrendScore: 7.8,
    motorTrendRank: 12,
  },
  // Tesla New Cars - 2025 Models
  {
    id: 'tesla-new-1',
    year: 2025,
    make: 'Tesla',
    model: 'Model 3',
    trim: 'Long Range',
    type: 'Electric Sedan',
    price: {
      base: 38990,
      asConfigured: 42500,
    },
    ratings: {
      expert: {
        overall: 8.8,
        performance: 8.9,
        comfort: 8.2,
        technology: 9.5,
        safety: 9.4,
        reliability: 8.1,
        value: 8.6,
      },
      user: {
        average: 4.5,
        count: 324,
        distribution: [8, 12, 25, 89, 190],
      }
    },
    keyPoints: [
      'Impressive range and efficiency with updated Highland design',
      'Minimalist interior with premium materials',
      'Access to Tesla Supercharger network',
    ],
    specs: {
      engine: 'Dual electric motors',
      horsepower: 346,
      torque: 389,
      transmission: 'Single-speed automatic',
      mpg: {
        equivalent: 132,
        range: 272, // miles
      },
      dimensions: {
        length: 184.8,
        width: 72.8,
        height: 56.8,
        wheelbase: 113.2,
        weight: 4065,
        cargo: 23, // combined trunk and frunk
      },
      seating: 5,
      drivetrains: ['AWD'],
      fuel: 'Electric',
      acceleration: 4.2, // 0-60 mph in seconds
    },
    features: {
      standard: [
        '15.4-inch central touchscreen',
        'Autopilot',
        'Glass roof',
        'Wireless phone charging',
        'Premium audio system',
        'Heated front seats',
        'LED headlights',
      ],
      optional: [
        'Full Self-Driving capability',
        'Premium Connectivity',
        'Enhanced Autopilot',
      ]
    },
    ownership: {
      warranty: {
        basic: '4 years / 50,000 miles',
        battery: '8 years / 120,000 miles',
      },
      maintenance: {
        year1: 0,
        year2: 150,
        year3: 200,
        year4: 350,
        year5: 250,
      },
      depreciation: [
        {year: 1, value: 33000},
        {year: 3, value: 28500},
        {year: 5, value: 23000},
      ],
      fuelCost: 850, // yearly based on avg electricity costs
    },
    photos: [
      '/lovable-uploads/35ad1cf0-8807-4008-be7c-96fc7b43062b.png',
      '/lovable-uploads/5b8a120c-3d52-41cb-8e20-9a16e6b9bf6a.png',
      '/lovable-uploads/6f8fd40c-6013-4f96-89f0-8406d6febb7c.png',
      '/lovable-uploads/930641e7-042c-4f43-a9f6-c81fa3a9a0c4.png',
    ],
    reviews: [
      {
        id: 'review-t3-1',
        user: 'TechEnthusiast',
        rating: 5,
        title: 'The future of driving',
        content: 'The Highland refresh makes the Model 3 even better. The interior is more refined and the driving experience is exceptional.',
        pros: ['Incredible tech', 'Great range', 'Supercharger network'],
        cons: ['Learning curve for new users', 'Road noise on some surfaces'],
        ownershipLength: '6 months',
        verified: true,
        date: '2024-11-15',
      },
      {
        id: 'review-t3-2',
        user: 'EVConvert',
        rating: 4,
        title: 'Best EV for the money',
        content: 'Switched from a BMW 3 Series and couldn\'t be happier. The efficiency and performance are outstanding.',
        pros: ['Performance', 'Efficiency', 'Over-the-air updates'],
        cons: ['Build quality inconsistencies', 'Service center availability'],
        ownershipLength: '1 year',
        verified: true,
        date: '2024-09-20',
      },
    ],
    competitors: [
      {
        id: 'competitor-t3-1',
        make: 'BMW',
        model: 'i4',
        year: 2025,
        price: 56395,
        overallRating: 8.5,
        mpg: 119, // MPGe
        key_difference: 'More luxurious interior, higher price point',
      },
      {
        id: 'competitor-t3-2',
        make: 'Genesis',
        model: 'Electrified G80',
        year: 2025,
        price: 59345,
        overallRating: 8.4,
        mpg: 108, // MPGe
        key_difference: 'More traditional luxury approach, less tech integration',
      },
    ],
    classComparison: {
      avgPrice: 45000,
      avgMpg: 120, // MPGe
      avgCargoSpace: 18.2,
      avgSafetyRating: 9.1,
      avgReliabilityRating: 8.2,
      avgTechRating: 9.0,
    },
    motorTrendScore: 8.8,
    motorTrendRank: 2,
  },
  {
    id: 'tesla-new-2',
    year: 2025,
    make: 'Tesla',
    model: 'Model Y',
    trim: 'Long Range',
    type: 'Electric SUV',
    price: {
      base: 44990,
      asConfigured: 48500,
    },
    ratings: {
      expert: {
        overall: 9.1,
        performance: 9.0,
        comfort: 8.5,
        technology: 9.6,
        safety: 9.5,
        reliability: 8.3,
        value: 8.9,
      },
      user: {
        average: 4.6,
        count: 456,
        distribution: [5, 8, 18, 125, 300],
      }
    },
    keyPoints: [
      'Refreshed Juniper design with improved aerodynamics',
      'Best-selling electric SUV with proven reliability',
      'Spacious interior with optional third row seating',
    ],
    specs: {
      engine: 'Dual electric motors',
      horsepower: 384,
      torque: 376,
      transmission: 'Single-speed automatic',
      mpg: {
        equivalent: 122,
        range: 320, // miles
      },
      dimensions: {
        length: 187.0,
        width: 75.6,
        height: 63.9,
        wheelbase: 113.8,
        weight: 4416,
        cargo: 76, // with rear seats folded
      },
      seating: 5, // 7 optional
      drivetrains: ['AWD'],
      fuel: 'Electric',
      acceleration: 4.8, // 0-60 mph in seconds
    },
    features: {
      standard: [
        '15-inch central touchscreen',
        'Autopilot',
        'Panoramic glass roof',
        'Wireless phone charging',
        'Premium audio system',
        'Heated front and rear seats',
        'Power liftgate',
        'LED light bar',
      ],
      optional: [
        'Full Self-Driving capability',
        'Premium Connectivity',
        'Third row seating',
        'Tow hitch',
      ]
    },
    ownership: {
      warranty: {
        basic: '4 years / 50,000 miles',
        battery: '8 years / 120,000 miles',
      },
      maintenance: {
        year1: 0,
        year2: 180,
        year3: 250,
        year4: 400,
        year5: 300,
      },
      depreciation: [
        {year: 1, value: 38000},
        {year: 3, value: 32500},
        {year: 5, value: 26000},
      ],
      fuelCost: 950, // yearly based on avg electricity costs
    },
    photos: [
      '/lovable-uploads/35ad1cf0-8807-4008-be7c-96fc7b43062b.png',
      '/lovable-uploads/5b8a120c-3d52-41cb-8e20-9a16e6b9bf6a.png',
      '/lovable-uploads/6f8fd40c-6013-4f96-89f0-8406d6febb7c.png',
      '/lovable-uploads/930641e7-042c-4f43-a9f6-c81fa3a9a0c4.png',
    ],
    reviews: [
             {
         id: 'review-ty-1',
         user: 'FamilyFirst',
         rating: 5,
         title: 'Perfect family electric SUV',
         content: 'The Juniper refresh makes the Model Y even better. Great space, efficiency, and the kids love the glass roof.',
         pros: ['Spacious interior', 'Great range', 'Family-friendly features'],
         cons: ['Firm ride quality', 'Wind noise at highway speeds'],
         ownershipLength: '8 months',
         verified: true,
         date: '2024-10-28',
       },
      {
        id: 'review-ty-2',
        user: 'CommuterPro',
        rating: 4,
        title: 'Excellent daily driver',
        content: 'Love the efficiency and the Supercharger network makes long trips stress-free.',
        pros: ['Efficiency', 'Charging network', 'Technology'],
        cons: ['Road noise', 'Service center availability'],
        ownershipLength: '4 years',
        verified: true,
        date: '2024-03-18',
      },
    ],
    competitors: [
      {
        id: 'competitor-ty-1',
        make: 'Ford',
        model: 'Mustang Mach-E',
        year: 2021,
        price: 36500,
        overallRating: 8.2,
        mpg: 103, // MPGe
        key_difference: 'More traditional interior, less charging infrastructure',
      },
      {
        id: 'competitor-ty-2',
        make: 'Volkswagen',
        model: 'ID.4',
        year: 2021,
        price: 34000,
        overallRating: 7.9,
        mpg: 107, // MPGe
        key_difference: 'More conventional design, less performance',
      },
    ],
    classComparison: {
      avgPrice: 48000,
      avgMpg: 105, // MPGe
      avgCargoSpace: 68.2,
      avgSafetyRating: 9.1,
      avgReliabilityRating: 7.9,
      avgTechRating: 8.8,
    },
    motorTrendScore: 9.1,
    motorTrendRank: 1,
  },
  {
    id: 'tesla-new-3',
    year: 2025,
    make: 'Tesla',
    model: 'Model S',
    trim: 'Long Range',
    type: 'Luxury Electric Sedan',
    price: {
      base: 84990,
      asConfigured: 92500,
    },
    ratings: {
      expert: {
        overall: 9.0,
        performance: 9.3,
        comfort: 9.2,
        technology: 9.7,
        safety: 9.4,
        reliability: 8.2,
        value: 8.1,
      },
      user: {
        average: 4.7,
        count: 187,
        distribution: [2, 4, 8, 45, 128],
      }
    },
    keyPoints: [
      'Flagship sedan with 410-mile range and plaid performance',
      'Luxurious interior with yoke steering wheel option',
      'Advanced autopilot and full self-driving capabilities',
    ],
    specs: {
      engine: 'Tri-motor electric',
      horsepower: 670,
      torque: 713,
      transmission: 'Single-speed automatic',
      mpg: {
        equivalent: 120,
        range: 410, // miles
      },
      dimensions: {
        length: 196.0,
        width: 77.3,
        height: 56.9,
        wheelbase: 116.5,
        weight: 4561,
        cargo: 28, // combined trunk and frunk
      },
      seating: 5,
      drivetrains: ['AWD'],
      fuel: 'Electric',
      acceleration: 3.1, // 0-60 mph in seconds
    },
    features: {
      standard: [
        '17-inch central touchscreen',
        'Autopilot',
        'Glass roof',
        'Premium audio system',
        'Heated and ventilated seats',
        'Air suspension',
        'Ambient lighting',
        'HEPA air filtration',
      ],
      optional: [
        'Full Self-Driving capability',
        'Yoke steering wheel',
        'Carbon fiber spoiler',
        'Premium interior package',
      ]
    },
    ownership: {
      warranty: {
        basic: '4 years / 50,000 miles',
        battery: '8 years / 150,000 miles',
      },
      maintenance: {
        year1: 0,
        year2: 200,
        year3: 350,
        year4: 500,
        year5: 400,
      },
      depreciation: [
        {year: 1, value: 72000},
        {year: 3, value: 58000},
        {year: 5, value: 45000},
      ],
      fuelCost: 1100, // yearly based on avg electricity costs
    },
    photos: [
      '/lovable-uploads/35ad1cf0-8807-4008-be7c-96fc7b43062b.png',
      '/lovable-uploads/5b8a120c-3d52-41cb-8e20-9a16e6b9bf6a.png',
      '/lovable-uploads/6f8fd40c-6013-4f96-89f0-8406d6febb7c.png',
      '/lovable-uploads/930641e7-042c-4f43-a9f6-c81fa3a9a0c4.png',
    ],
    reviews: [
      {
        id: 'review-ts-1',
        user: 'LuxuryCarOwner',
        rating: 5,
        title: 'The ultimate electric luxury sedan',
        content: 'The Model S refresh brings incredible performance and luxury. The range is outstanding for long trips.',
        pros: ['Incredible performance', 'Luxury interior', 'Amazing range'],
        cons: ['Price premium', 'Yoke steering takes getting used to'],
        ownershipLength: '10 months',
        verified: true,
        date: '2024-09-12',
      },
      {
        id: 'review-ts-2',
        user: 'TechExecutive',
        rating: 4,
        title: 'Impressive technology showcase',
        content: 'The tech in this car is unmatched. Autopilot works great on highway trips.',
        pros: ['Technology', 'Performance', 'Efficiency'],
        cons: ['Build quality issues', 'Service experience varies'],
        ownershipLength: '1.2 years',
        verified: true,
        date: '2024-07-08',
      },
    ],
    competitors: [
      {
        id: 'competitor-ts-1',
        make: 'Lucid',
        model: 'Air Dream',
        year: 2025,
        price: 87400,
        overallRating: 8.9,
        mpg: 124, // MPGe
        key_difference: 'Even more luxury, slightly less tech integration',
      },
      {
        id: 'competitor-ts-2',
        make: 'Mercedes-Benz',
        model: 'EQS',
        year: 2025,
        price: 104400,
        overallRating: 8.7,
        mpg: 108, // MPGe
        key_difference: 'Traditional luxury approach, higher price',
      },
    ],
    classComparison: {
      avgPrice: 95000,
      avgMpg: 115, // MPGe
      avgCargoSpace: 22.4,
      avgSafetyRating: 9.3,
      avgReliabilityRating: 8.0,
      avgTechRating: 9.4,
    },
    motorTrendScore: 9.0,
    motorTrendRank: 1,
  },
  {
    id: 'tesla-new-4',
    year: 2025,
    make: 'Tesla',
    model: 'Model X',
    trim: 'Long Range',
    type: 'Luxury Electric SUV',
    price: {
      base: 89990,
      asConfigured: 95500,
    },
    ratings: {
      expert: {
        overall: 8.9,
        performance: 9.1,
        comfort: 9.3,
        technology: 9.7,
        safety: 9.5,
        reliability: 8.1,
        value: 7.8,
      },
      user: {
        average: 4.6,
        count: 156,
        distribution: [3, 5, 12, 42, 94],
      }
    },
    keyPoints: [
      'Luxury electric SUV with distinctive falcon-wing doors',
      'Spacious 7-seat configuration with premium materials',
      'Advanced air filtration and bioweapon defense mode',
    ],
    specs: {
      engine: 'Tri-motor electric',
      horsepower: 670,
      torque: 713,
      transmission: 'Single-speed automatic',
      mpg: {
        equivalent: 102,
        range: 352, // miles
      },
      dimensions: {
        length: 198.3,
        width: 78.7,
        height: 66.3,
        wheelbase: 116.7,
        weight: 5390,
        cargo: 88, // with third row folded
      },
      seating: 7,
      drivetrains: ['AWD'],
      fuel: 'Electric',
      acceleration: 3.8, // 0-60 mph in seconds
    },
    features: {
      standard: [
        '17-inch central touchscreen',
        'Autopilot',
        'Panoramic windshield',
        'Falcon wing doors',
        'Premium audio system',
        'Heated and ventilated seats',
        'Air suspension',
        'HEPA air filtration',
        'Bioweapon Defense Mode',
      ],
      optional: [
        'Full Self-Driving capability',
        'Yoke steering wheel',
        'Premium interior package',
        'Six-seat configuration',
      ]
    },
    ownership: {
      warranty: {
        basic: '4 years / 50,000 miles',
        battery: '8 years / 150,000 miles',
      },
      maintenance: {
        year1: 0,
        year2: 250,
        year3: 400,
        year4: 600,
        year5: 500,
      },
      depreciation: [
        {year: 1, value: 76000},
        {year: 3, value: 62000},
        {year: 5, value: 48000},
      ],
      fuelCost: 1200, // yearly based on avg electricity costs
    },
    photos: [
      '/lovable-uploads/35ad1cf0-8807-4008-be7c-96fc7b43062b.png',
      '/lovable-uploads/5b8a120c-3d52-41cb-8e20-9a16e6b9bf6a.png',
      '/lovable-uploads/6f8fd40c-6013-4f96-89f0-8406d6febb7c.png',
      '/lovable-uploads/930641e7-042c-4f43-a9f6-c81fa3a9a0c4.png',
    ],
    reviews: [
      {
        id: 'review-tx-1',
        user: 'LuxuryFamilyOwner',
        rating: 5,
        title: 'Ultimate luxury electric SUV',
        content: 'The Model X is incredible. The falcon wing doors are a showstopper and the interior is luxurious. Perfect for families.',
        pros: ['Falcon wing doors', 'Luxury interior', 'Amazing technology'],
        cons: ['Very expensive', 'Complex door mechanism'],
        ownershipLength: '1 year',
        verified: true,
        date: '2024-08-22',
      },
      {
        id: 'review-tx-2',
        user: 'TechInnovator',
        rating: 4,
        title: 'Impressive but pricey',
        content: 'The technology is unmatched and the bioweapon defense mode is wild. However, the price is steep.',
        pros: ['Advanced technology', 'Unique features', 'Performance'],
        cons: ['High price', 'Service complexity'],
        ownershipLength: '8 months',
        verified: true,
        date: '2024-06-10',
      },
    ],
    competitors: [
      {
        id: 'competitor-tx-1',
        make: 'BMW',
        model: 'iX',
        year: 2025,
        price: 87100,
        overallRating: 8.7,
        mpg: 96, // MPGe
        key_difference: 'More traditional luxury approach, less tech integration',
      },
      {
        id: 'competitor-tx-2',
        make: 'Mercedes-Benz',
        model: 'EQS SUV',
        year: 2025,
        price: 105450,
        overallRating: 8.5,
        mpg: 91, // MPGe
        key_difference: 'Traditional luxury interior, higher price',
      },
    ],
    classComparison: {
      avgPrice: 98000,
      avgMpg: 95, // MPGe
      avgCargoSpace: 82.5,
      avgSafetyRating: 9.3,
      avgReliabilityRating: 8.0,
      avgTechRating: 9.2,
    },
    motorTrendScore: 8.9,
    motorTrendRank: 1,
  },
  // Tesla Used Cars
  {
    id: 'tesla-used-1',
    year: 2022,
    make: 'Tesla',
    model: 'Model 3',
    trim: 'Performance',
    type: 'Electric Sedan',
    price: {
      base: 42995,
      asConfigured: 42995,
    },
    ratings: {
      expert: {
        overall: 8.6,
        performance: 9.2,
        comfort: 8.0,
        technology: 9.3,
        safety: 9.2,
        reliability: 7.9,
        value: 8.4,
      },
      user: {
        average: 4.4,
        count: 289,
        distribution: [12, 18, 32, 89, 138],
      }
    },
    keyPoints: [
      'High-performance electric sedan with track capability',
      'Proven Tesla technology with regular software updates',
      'Access to extensive Supercharger network',
    ],
    specs: {
      engine: 'Dual electric motors',
      horsepower: 450,
      torque: 471,
      transmission: 'Single-speed automatic',
      mpg: {
        equivalent: 115,
        range: 315, // miles
      },
      dimensions: {
        length: 184.8,
        width: 72.8,
        height: 56.8,
        wheelbase: 113.2,
        weight: 4048,
        cargo: 23, // combined trunk and frunk
      },
      seating: 5,
      drivetrains: ['AWD'],
      fuel: 'Electric',
      acceleration: 3.1, // 0-60 mph in seconds
      mileage: 28750,
    },
    features: {
      standard: [
        '15-inch central touchscreen',
        'Autopilot',
        'Glass roof',
        'Performance brakes',
        'Lowered suspension',
        'Track Mode',
        'Premium audio',
      ],
      optional: [
        'Full Self-Driving capability',
        'Premium Connectivity',
      ]
    },
    ownership: {
      warranty: {
        basic: '2 years / 21,250 miles remaining',
        battery: '6 years / 91,250 miles remaining',
      },
      maintenance: {
        year1: 150,
        year2: 200,
        year3: 350,
        year4: 450,
        year5: 350,
      },
      depreciation: [
        {year: 1, value: 38000},
        {year: 3, value: 32000},
        {year: 5, value: 25000},
      ],
      fuelCost: 900, // yearly based on avg electricity costs
    },
    location: 'San Francisco, CA',
    photos: [
      '/lovable-uploads/35ad1cf0-8807-4008-be7c-96fc7b43062b.png',
      '/lovable-uploads/5b8a120c-3d52-41cb-8e20-9a16e6b9bf6a.png',
      '/lovable-uploads/6f8fd40c-6013-4f96-89f0-8406d6febb7c.png',
      '/lovable-uploads/930641e7-042c-4f43-a9f6-c81fa3a9a0c4.png',
    ],
    reviews: [
      {
        id: 'review-tu3-1',
        user: 'PerformanceDriver',
        rating: 5,
        title: 'Incredible performance for the price',
        content: 'The Model 3 Performance is a rocket ship. Track Mode is amazing and the handling is surprisingly good.',
        pros: ['Incredible acceleration', 'Track Mode', 'Over-the-air updates'],
        cons: ['Firm ride quality', 'Interior noise'],
        ownershipLength: '2.5 years',
        verified: true,
        date: '2024-06-15',
      },
      {
        id: 'review-tu3-2',
        user: 'DailyDriver',
        rating: 4,
        title: 'Great daily driver with performance',
        content: 'Perfect balance of efficiency and performance. Supercharging makes road trips easy.',
        pros: ['Performance', 'Efficiency', 'Technology'],
        cons: ['Build quality inconsistencies', 'Service wait times'],
        ownershipLength: '3 years',
        verified: true,
        date: '2024-04-22',
      },
    ],
    competitors: [
      {
        id: 'competitor-tu3-1',
        make: 'BMW',
        model: 'M3',
        year: 2022,
        price: 48500,
        overallRating: 8.8,
        mpg: 19, // combined
        key_difference: 'Traditional performance sedan, gas engine',
      },
      {
        id: 'competitor-tu3-2',
        make: 'Genesis',
        model: 'G70',
        year: 2022,
        price: 39500,
        overallRating: 8.3,
        mpg: 25, // combined
        key_difference: 'More luxurious interior, less performance',
      },
    ],
    classComparison: {
      avgPrice: 44000,
      avgMpg: 108, // MPGe for electric comparison
      avgCargoSpace: 18.5,
      avgSafetyRating: 9.0,
      avgReliabilityRating: 8.1,
      avgTechRating: 8.9,
    },
    motorTrendScore: 8.6,
    motorTrendRank: 3,
  },
  {
    id: 'tesla-used-2',
    year: 2021,
    make: 'Tesla',
    model: 'Model Y',
    trim: 'Long Range',
    type: 'Electric SUV',
    price: {
      base: 38995,
      asConfigured: 38995,
    },
    ratings: {
      expert: {
        overall: 8.4,
        performance: 8.7,
        comfort: 8.1,
        technology: 9.2,
        safety: 9.3,
        reliability: 7.8,
        value: 8.6,
      },
      user: {
        average: 4.3,
        count: 412,
        distribution: [15, 22, 38, 142, 195],
      }
    },
    keyPoints: [
      'Popular electric SUV with proven track record',
      'Spacious interior and cargo area for families',
      'Regular software updates add new features',
    ],
    specs: {
      engine: 'Dual electric motors',
      horsepower: 384,
      torque: 376,
      transmission: 'Single-speed automatic',
      mpg: {
        equivalent: 121,
        range: 326, // miles
      },
      dimensions: {
        length: 187.0,
        width: 75.6,
        height: 63.9,
        wheelbase: 113.8,
        weight: 4416,
        cargo: 76, // with rear seats folded
      },
      seating: 5,
      drivetrains: ['AWD'],
      fuel: 'Electric',
      acceleration: 4.8, // 0-60 mph in seconds
      mileage: 41250,
    },
    features: {
      standard: [
        '15-inch central touchscreen',
        'Autopilot',
        'Glass roof',
        'Wireless phone charging',
        'Premium audio system',
        'Heated front seats',
        'Power liftgate',
      ],
      optional: [
        'Full Self-Driving capability',
        'Premium Connectivity',
        'Tow hitch',
      ]
    },
    ownership: {
      warranty: {
        basic: '1 year / 8,750 miles remaining',
        battery: '5 years / 78,750 miles remaining',
      },
      maintenance: {
        year1: 180,
        year2: 250,
        year3: 400,
        year4: 500,
        year5: 400,
      },
      depreciation: [
        {year: 1, value: 34000},
        {year: 3, value: 28500},
        {year: 5, value: 22000},
      ],
      fuelCost: 950, // yearly based on avg electricity costs
    },
    location: 'Austin, TX',
    photos: [
      '/lovable-uploads/35ad1cf0-8807-4008-be7c-96fc7b43062b.png',
      '/lovable-uploads/5b8a120c-3d52-41cb-8e20-9a16e6b9bf6a.png',
      '/lovable-uploads/6f8fd40c-6013-4f96-89f0-8406d6febb7c.png',
      '/lovable-uploads/930641e7-042c-4f43-a9f6-c81fa3a9a0c4.png',
    ],
    reviews: [
      {
        id: 'review-tuy-1',
        user: 'FamilyOfFive',
        rating: 5,
        title: 'Perfect family electric SUV',
        content: 'The Model Y has been fantastic for our family. Great space, efficiency, and the kids love the glass roof.',
        pros: ['Spacious interior', 'Great range', 'Family-friendly'],
        cons: ['Some build quality issues', 'Firm suspension'],
        ownershipLength: '3.5 years',
        verified: true,
        date: '2024-05-10',
      },
      {
        id: 'review-tuy-2',
        user: 'CommuterPro',
        rating: 4,
        title: 'Excellent daily driver',
        content: 'Love the efficiency and the Supercharger network makes long trips stress-free.',
        pros: ['Efficiency', 'Charging network', 'Technology'],
        cons: ['Road noise', 'Service center availability'],
        ownershipLength: '4 years',
        verified: true,
        date: '2024-03-18',
      },
    ],
    competitors: [
      {
        id: 'competitor-tuy-1',
        make: 'Ford',
        model: 'Mustang Mach-E',
        year: 2021,
        price: 36500,
        overallRating: 8.2,
        mpg: 103, // MPGe
        key_difference: 'More traditional interior, less charging infrastructure',
      },
      {
        id: 'competitor-tuy-2',
        make: 'Volkswagen',
        model: 'ID.4',
        year: 2021,
        price: 34000,
        overallRating: 7.9,
        mpg: 107, // MPGe
        key_difference: 'More conventional design, less performance',
      },
    ],
    classComparison: {
      avgPrice: 42000,
      avgMpg: 105, // MPGe
      avgCargoSpace: 68.2,
      avgSafetyRating: 9.1,
      avgReliabilityRating: 7.9,
      avgTechRating: 8.8,
    },
    motorTrendScore: 8.4,
    motorTrendRank: 2,
  },
  {
    id: 'tesla-used-3',
    year: 2020,
    make: 'Tesla',
    model: 'Model S',
    trim: 'Long Range',
    type: 'Luxury Electric Sedan',
    price: {
      base: 52995,
      asConfigured: 52995,
    },
    ratings: {
      expert: {
        overall: 8.7,
        performance: 9.0,
        comfort: 8.8,
        technology: 9.1,
        safety: 9.2,
        reliability: 7.6,
        value: 8.2,
      },
      user: {
        average: 4.5,
        count: 178,
        distribution: [8, 12, 18, 54, 86],
      }
    },
    keyPoints: [
      'Luxury electric sedan with impressive range and performance',
      'Pre-refresh model with traditional steering wheel',
      'Proven Tesla technology with regular over-the-air updates',
    ],
    specs: {
      engine: 'Dual electric motors',
      horsepower: 412,
      torque: 485,
      transmission: 'Single-speed automatic',
      mpg: {
        equivalent: 113,
        range: 405, // miles
      },
      dimensions: {
        length: 196.0,
        width: 77.3,
        height: 56.9,
        wheelbase: 116.5,
        weight: 4561,
        cargo: 28, // combined trunk and frunk
      },
      seating: 5,
      drivetrains: ['AWD'],
      fuel: 'Electric',
      acceleration: 3.7, // 0-60 mph in seconds
      mileage: 52500,
    },
    features: {
      standard: [
        '17-inch central touchscreen',
        'Autopilot',
        'Glass roof',
        'Premium audio system',
        'Heated and ventilated seats',
        'Air suspension',
        'LED headlights',
      ],
      optional: [
        'Full Self-Driving capability',
        'Premium Connectivity',
      ]
    },
    ownership: {
      warranty: {
        basic: 'Expired',
        battery: '4 years / 67,500 miles remaining',
      },
      maintenance: {
        year1: 200,
        year2: 300,
        year3: 450,
        year4: 600,
        year5: 500,
      },
      depreciation: [
        {year: 1, value: 47000},
        {year: 3, value: 38000},
        {year: 5, value: 28000},
      ],
      fuelCost: 1050, // yearly based on avg electricity costs
    },
    location: 'Los Angeles, CA',
    photos: [
      '/lovable-uploads/35ad1cf0-8807-4008-be7c-96fc7b43062b.png',
      '/lovable-uploads/5b8a120c-3d52-41cb-8e20-9a16e6b9bf6a.png',
      '/lovable-uploads/6f8fd40c-6013-4f96-89f0-8406d6febb7c.png',
      '/lovable-uploads/930641e7-042c-4f43-a9f6-c81fa3a9a0c4.png',
    ],
    reviews: [
      {
        id: 'review-tus-1',
        user: 'LuxurySeeker',
        rating: 5,
        title: 'Still an amazing luxury EV',
        content: 'Even though it\'s a 2020, the Model S still feels futuristic. The range is incredible and the performance is thrilling.',
        pros: ['Amazing range', 'Luxury interior', 'Performance'],
        cons: ['Some interior wear', 'Older software'],
        ownershipLength: '2 years',
        verified: true,
        date: '2024-07-15',
      },
      {
        id: 'review-tus-2',
        user: 'EVEnthusiast',
        rating: 4,
        title: 'Great value for luxury EV',
        content: 'The 2020 Model S offers great value compared to new ones. Still has most of the features and incredible range.',
        pros: ['Great value', 'Range', 'Technology'],
        cons: ['Battery degradation concerns', 'Service costs'],
        ownershipLength: '1.5 years',
        verified: true,
        date: '2024-05-08',
      },
    ],
    competitors: [
      {
        id: 'competitor-tus-1',
        make: 'Porsche',
        model: 'Taycan',
        year: 2020,
        price: 58000,
        overallRating: 8.9,
        mpg: 79, // MPGe
        key_difference: 'More traditional luxury, sportier handling',
      },
      {
        id: 'competitor-tus-2',
        make: 'Audi',
        model: 'e-tron GT',
        year: 2020,
        price: 65000,
        overallRating: 8.6,
        mpg: 85, // MPGe
        key_difference: 'More conventional interior, less range',
      },
    ],
    classComparison: {
      avgPrice: 58000,
      avgMpg: 95, // MPGe
      avgCargoSpace: 25.2,
      avgSafetyRating: 9.1,
      avgReliabilityRating: 7.8,
      avgTechRating: 8.9,
    },
    motorTrendScore: 8.7,
    motorTrendRank: 2,
  },
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
