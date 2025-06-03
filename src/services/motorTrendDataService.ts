
// MotorTrend data service for car scoring and ranking
export interface MotorTrendCarData {
  score: number;
  rank: number;
  categoryRank: number;
  imageUrl?: string;
}

// Mock MotorTrend data - in a real app would come from an API
const motorTrendData: Record<string, MotorTrendCarData> = {
  // Generate some mock data based on popular cars
  "Honda Civic": {
    score: 8.7,
    rank: 3,
    categoryRank: 1
  },
  "Toyota Camry": {
    score: 8.5,
    rank: 5,
    categoryRank: 2
  },
  "Honda Accord": {
    score: 8.8,
    rank: 2,
    categoryRank: 1,
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/679d37b47ff34400082301e7/19-2025-honda-accord-front-view.jpg"
  },
  "Toyota Corolla": {
    score: 8.3,
    rank: 7,
    categoryRank: 3
  },
  "Ford F-150": {
    score: 8.9,
    rank: 1,
    categoryRank: 1
  },
  "Chevrolet Silverado": {
    score: 8.6,
    rank: 4,
    categoryRank: 2
  },
  "Ram 1500": {
    score: 8.5,
    rank: 6,
    categoryRank: 3
  },
  "Tesla Model 3": {
    score: 8.7,
    rank: 3,
    categoryRank: 1
  },
  "Tesla Model Y": {
    score: 8.6,
    rank: 4,
    categoryRank: 2
  },
  "Jeep Wrangler": {
    score: 7.9,
    rank: 12,
    categoryRank: 4
  },
  "Subaru Outback": {
    score: 8.2,
    rank: 8,
    categoryRank: 2
  },
  "BMW 3 Series": {
    score: 8.5,
    rank: 6,
    categoryRank: 1
  },
  "Mercedes-Benz C-Class": {
    score: 8.4,
    rank: 7,
    categoryRank: 2
  },
  "Audi A4": {
    score: 8.3,
    rank: 8,
    categoryRank: 3
  },
  "Toyota RAV4": {
    score: 8.1,
    rank: 9,
    categoryRank: 3
  },
  "Honda CR-V": {
    score: 8.4,
    rank: 7,
    categoryRank: 1
  },
  "Mazda CX-5": {
    score: 8.3,
    rank: 8,
    categoryRank: 2
  },
  "Subaru Forester": {
    score: 8.0,
    rank: 10,
    categoryRank: 4
  },
  "Ford Mustang": {
    score: 8.2,
    rank: 9,
    categoryRank: 2
  },
  "Chevrolet Corvette": {
    score: 9.1,
    rank: 1,
    categoryRank: 1
  },
  "Porsche 911": {
    score: 9.0,
    rank: 2,
    categoryRank: 2
  },
  "Dodge Challenger": {
    score: 7.8,
    rank: 14,
    categoryRank: 3
  },
  "Toyota Sienna": {
    score: 8.3,
    rank: 8,
    categoryRank: 1
  },
  "Honda Odyssey": {
    score: 8.2,
    rank: 9,
    categoryRank: 2
  },
  "Chrysler Pacifica": {
    score: 8.0,
    rank: 11,
    categoryRank: 3
  },
  // For generics by make
  "Honda": {
    score: 8.2,
    rank: 8,
    categoryRank: 3
  },
  "Toyota": {
    score: 8.3,
    rank: 7,
    categoryRank: 2
  },
  "Ford": {
    score: 7.9,
    rank: 10,
    categoryRank: 5
  },
  "Chevrolet": {
    score: 7.8,
    rank: 11,
    categoryRank: 6
  },
  "BMW": {
    score: 8.4,
    rank: 6,
    categoryRank: 1
  },
  "Mercedes-Benz": {
    score: 8.3,
    rank: 7,
    categoryRank: 2
  },
  "Tesla": {
    score: 8.6,
    rank: 3,
    categoryRank: 1
  },
  "Audi": {
    score: 8.2,
    rank: 8,
    categoryRank: 3
  },
  "Lexus": {
    score: 8.5,
    rank: 5,
    categoryRank: 1
  },
  "Acura": {
    score: 8.0,
    rank: 9,
    categoryRank: 4
  }
};

// Helper function to get MT data for a car
export const getMotorTrendDataForCar = (carTitle: string): MotorTrendCarData => {
  // Look for exact match first
  if (motorTrendData[carTitle]) {
    return motorTrendData[carTitle];
  }

  // Look for make in the title
  for (const make in motorTrendData) {
    if (carTitle.toLowerCase().includes(make.toLowerCase())) {
      return motorTrendData[make];
    }
  }

  // Return default data if no match
  return {
    score: 7.5,
    rank: 20,
    categoryRank: 8
  };
};
