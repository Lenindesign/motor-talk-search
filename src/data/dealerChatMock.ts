export interface Dealer {
  id: string;
  name: string;
  dealership: string;
  avatar: string;
  rating: number;
  responseTime: string;
  location: string;
}

export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  trim: string;
  msrp: number;
  image: string;
  features: string[];
  availableColors: string[];
}

export const mockDealers: Dealer[] = [
  {
    id: "d1",
    name: "Sarah Johnson",
    dealership: "MotorTrend Certified Honda",
    avatar: "https://i.pravatar.cc/150?img=1",
    rating: 4.9,
    responseTime: "< 5 min",
    location: "Los Angeles, CA"
  },
  {
    id: "d2",
    name: "Michael Chen",
    dealership: "MotorTrend Certified Toyota",
    avatar: "https://i.pravatar.cc/150?img=2",
    rating: 4.8,
    responseTime: "< 10 min",
    location: "San Francisco, CA"
  }
];

export const mockCars: Car[] = [
  {
    id: "c1",
    make: "Honda",
    model: "Accord",
    year: 2024,
    trim: "Sport",
    msrp: 32995,
    image: "/images/cars/honda-accord-2024.jpg",
    features: [
      "Wireless Apple CarPlay",
      "Honda Sensing Suite",
      "12.3-inch touchscreen",
      "Wireless charging"
    ],
    availableColors: [
      "Platinum White Pearl",
      "Crystal Black Pearl",
      "Sonic Gray Pearl",
      "Still Night Pearl"
    ]
  },
  {
    id: "c2",
    make: "Toyota",
    model: "Camry",
    year: 2024,
    trim: "XSE",
    msrp: 33545,
    image: "/images/cars/toyota-camry-2024.jpg",
    features: [
      "10-inch Head-Up Display",
      "Toyota Safety Sense 2.5+",
      "9-inch touchscreen",
      "JBL Premium Audio"
    ],
    availableColors: [
      "Wind Chill Pearl",
      "Midnight Black Metallic",
      "Celestial Silver Metallic",
      "Supersonic Red"
    ]
  }
];

export const commonQuestions = [
  "What's your best price out the door?",
  "Are there any current manufacturer incentives?",
  "Do you have this model in stock?",
  "Can I schedule a test drive?",
  "What's included in the warranty?",
  "Do you offer financing options?"
];

export const dealerResponses = {
  pricing: (car: Car) => `I can offer you a great deal on the ${car.year} ${car.make} ${car.model} ${car.trim}. The MSRP is $${car.msrp.toLocaleString()}, but I can offer it to you for $${Math.floor(car.msrp * 0.92).toLocaleString()} out the door. This includes all fees and taxes.`,
  
  availability: (car: Car) => `Yes, we currently have the ${car.year} ${car.make} ${car.model} ${car.trim} in stock in the following colors: ${car.availableColors.join(", ")}. Would you like to schedule a viewing?`,
  
  features: (car: Car) => `The ${car.year} ${car.make} ${car.model} ${car.trim} comes with these key features: ${car.features.join(", ")}. Would you like more details about any specific feature?`,
  
  testDrive: "I'd be happy to schedule a test drive for you. We're available 7 days a week. What day and time works best for you?",
  
  warranty: "Our vehicles come with a comprehensive warranty package including:\n- 3-year/36,000-mile basic warranty\n- 5-year/60,000-mile powertrain warranty\n- 24/7 roadside assistance\nWould you like more details about the coverage?"
};
