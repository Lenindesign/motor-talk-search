export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: string | number;
  trim?: string;
  price: {
    base: number;
    asConfigured: number;
  };
  specs: {
    fuel: string;
    range?: number;
    mpg?: {
      city: number;
      highway: number;
    };
    engine?: string;
    transmission?: string;
    horsepower?: number;
    torque?: number;
    drivetrains?: string[];
  };
  type?: 'new' | 'used';
  motorTrendScore?: number;
  motorTrendRank?: number;
  ratings: {
    expert: {
      overall: number;
      performance: number;
      comfort: number;
      technology: number;
      safety: number;
      reliability: number;
      value: number;
    };
    user: {
      average: number;
      count: number;
    };
  };
  images: {
    main: string;
    gallery: string[];
  };
  photos?: string[];
  destinationFee?: number;
  msrp?: string;
  keyPoints?: string[];
}
