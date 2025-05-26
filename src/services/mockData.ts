import { ArticleData } from "../components/ArticleCard";
import { CarData } from "../components/CarCard";
import { PhotoData } from "../components/PhotoCard";
import { VideoData } from "../components/VideoCard";

// Mock Articles
export const mockArticles: ArticleData[] = [
  {
    id: "1",
    title: "2025 Ferrari 12Cilindri First Look: The 819-HP Replacement for the 812 Superfast",
    imageUrl: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    date: "May 5, 2025",
    category: "Review",
    featured: true,
  },
  {
    id: "2",
    title: "Electric SUVs With the Longest Range in 2025",
    imageUrl: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    date: "May 3, 2025",
    category: "Guide",
  },
  {
    id: "3",
    title: "Best Performance Cars Under $50,000",
    imageUrl: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    date: "April 30, 2025",
    category: "Buyer's Guide",
  },
  {
    id: "4",
    title: "2025 Tesla Cybertruck Owner Review: Living With the Future",
    imageUrl: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    date: "April 28, 2025",
    category: "Long-Term Test",
    photoCount: 12,
  },
  {
    id: "5",
    title: "Hybrid vs. Electric: Which Is Right For You in 2025?",
    imageUrl: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    date: "April 25, 2025",
    category: "Comparison",
  },
  {
    id: "6",
    title: "Future of Off-Roading: Electric 4x4s Put to the Test",
    imageUrl: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    date: "April 22, 2025",
    category: "Adventure",
    photoCount: 8,
  },
  {
    id: "7",
    title: "2025 Lucid Air: In-Depth Technology Overview",
    imageUrl: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    date: "May 10, 2025",
    category: "Technology",
  },
];

// Mock New Cars with high-quality automotive images
export const mockNewCars: CarData[] = [
  {
    id: "new-1",
    title: "2025 Lucid Air Grand Touring",
    imageUrl: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    price: "$87,400",
    category: "Electric Sedan",
    isNew: true,
    bodyStyle: "Sedan", // Using a reliable high-quality car image from Unsplash
  },
  {
    id: "new-2",
    title: "2025 Rivian R1S",
    imageUrl: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    price: "$76,000",
    category: "Electric SUV",
    isNew: true,
    bodyStyle: "SUV",
  },
  {
    id: "new-3",
    title: "2025 BMW i5 eDrive40",
    imageUrl: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    price: "$65,700",
    category: "Electric Sedan",
    isNew: true,
    bodyStyle: "Sedan",
  },
  {
    id: "new-4",
    title: "2025 Ford Mustang 60th Anniversary Edition",
    imageUrl: "https://hips.hearstapps.com/hmg-prod/images/2025-ford-mustang-60th-anniversary-exterior-66227932bb88e.jpg",
    price: "$42,990", 
    category: "Sports Car",
    isNew: true,
    bodyStyle: "Sports Car",
  },
  {
    id: "new-5",
    title: "2025 Toyota Crown Signia",
    imageUrl: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    price: "$39,950",
    category: "Luxury Crossover",
    isNew: true,
    bodyStyle: "Crossover",
  },
  {
    id: "new-6",
    title: "2025 Hyundai Ioniq 6 Limited",
    imageUrl: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    price: "$53,650",
    category: "Electric Sedan",
    isNew: true,
    bodyStyle: "Sedan",
  },
];

// Mock Used Cars with high-quality automotive images
export const mockUsedCars: CarData[] = [
  {
    id: "used-1",
    title: "2023 Tesla Model Y Performance",
    imageUrl: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    price: "$53,900",
    category: "Electric SUV",
    year: "2023",
    mileage: "15,245 mi",
    fuelType: "Electric",
    drivetrain: "AWD",
    location: "San Francisco, CA",
    bodyStyle: "SUV",
  },
  {
    id: "used-2",
    title: "2022 Porsche 911 Carrera 4S",
    imageUrl: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    price: "$124,500",
    category: "Sports Car",
    year: "2022",
    mileage: "8,670 mi",
    fuelType: "Gasoline",
    drivetrain: "AWD",
    location: "Los Angeles, CA",
    bodyStyle: "Sports Car",
  },
  {
    id: "used-3",
    title: "2021 Ford F-150 Raptor",
    imageUrl: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    price: "$65,800",
    category: "Pickup Truck",
    year: "2021",
    mileage: "26,543 mi",
    fuelType: "Gasoline",
    drivetrain: "4WD",
    location: "Denver, CO",
    bodyStyle: "Truck",
  },
  {
    id: "used-4",
    title: "2022 BMW M3 Competition",
    imageUrl: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    price: "$72,900",
    category: "Sports Sedan",
    year: "2022",
    mileage: "12,876 mi",
    fuelType: "Gasoline",
    drivetrain: "RWD",
    location: "Miami, FL",
    bodyStyle: "Sedan",
  },
  {
    id: "used-5",
    title: "2020 Jeep Wrangler Unlimited Rubicon",
    imageUrl: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    price: "$45,500",
    category: "SUV",
    year: "2020",
    mileage: "32,145 mi",
    fuelType: "Gasoline",
    drivetrain: "4WD",
    location: "Austin, TX",
    bodyStyle: "SUV",
  },
  {
    id: "used-6",
    title: "2021 Audi e-tron GT",
    imageUrl: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    price: "$89,700",
    category: "Electric Sports Car",
    year: "2021",
    mileage: "14,325 mi",
    fuelType: "Electric",
    drivetrain: "AWD",
    location: "Seattle, WA",
    bodyStyle: "Sports Car",
  },
];

// Mock Photos with enhanced metadata and high-quality automotive images
export const mockPhotos: PhotoData[] = [
  {
    id: "1",
    imageUrl: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    title: "2023 Aston Martin Vantage at Sunset",
    position: "1/14",
    make: "Aston Martin",
    carModel: "Vantage",
    year: "2023"
  },
  {
    id: "2",
    imageUrl: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    title: "2022 BMW i8 Front Angle",
    position: "2/14",
    make: "BMW",
    carModel: "i8",
    year: "2022"
  },
  {
    id: "3",
    imageUrl: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    title: "2023 Mercedes-AMG GT Interior",
    position: "3/14",
    make: "Mercedes-Benz",
    carModel: "AMG GT",
    year: "2023"
  },
  {
    id: "4",
    imageUrl: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    title: "2023 Porsche 911 GT3 RS Track Day",
    position: "4/14",
    make: "Porsche",
    carModel: "911 GT3 RS",
    year: "2023"
  },
  {
    id: "5",
    imageUrl: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    title: "2023 Ferrari SF90 Stradale",
    position: "5/14",
    make: "Ferrari",
    carModel: "SF90 Stradale",
    year: "2023"
  },
  {
    id: "6",
    imageUrl: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    title: "2022 Lamborghini Huracán EVO",
    position: "6/14",
    make: "Lamborghini",
    carModel: "Huracán EVO",
    year: "2022"
  },
  {
    id: "7",
    imageUrl: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    title: "2022 McLaren 720S Detail Shot",
    position: "7/14",
    make: "McLaren",
    carModel: "720S",
    year: "2022"
  },
  {
    id: "8",
    imageUrl: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    title: "2022 Jaguar F-Type R Coupe",
    position: "8/14",
    make: "Jaguar",
    carModel: "F-Type R",
    year: "2022"
  }
];

// Mock Videos with high-quality automotive thumbnails
export const mockVideos: VideoData[] = [
  {
    id: "1",
    title: "2025 BMW M5 First Drive Review",
    imageUrl: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    duration: "12:45",
  },
  {
    id: "2",
    title: "Electric Off-Road Comparison: Rivian R1T vs Ford F-150 Lightning",
    imageUrl: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    duration: "18:32",
  },
  {
    id: "3",
    title: "Supercar Drag Race: Ferrari vs Lamborghini vs McLaren",
    imageUrl: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    duration: "8:54",
  },
  {
    id: "4",
    title: "2025 Lucid Air: In-Depth Technology Overview",
    imageUrl: "https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    duration: "14:17",
  },
  {
    id: "5",
    title: "DIY Car Maintenance Tips Every Owner Should Know",
    imageUrl: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    duration: "10:05",
  },
  {
    id: "6",
    title: "Best Car Audio Systems of 2025",
    imageUrl: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    duration: "16:28",
  },
];

// Chat responses for common queries
export const chatResponses: Record<string, string> = {
  "best ev": "Based on our testing, the best electric vehicles of 2025 include the Lucid Air for luxury sedans, the Rivian R1S for SUVs, and the Hyundai Ioniq 6 for value. The Lucid Air offers the longest range at up to 516 miles, while the Rivian excels in off-road capability. For those on a budget, the Hyundai Ioniq 6 provides excellent efficiency and features at a lower price point.",
  "electric cars": "Electric vehicles have come a long way in 2025. The average range for new EVs is now over 350 miles, with some luxury models exceeding 500 miles. Charging infrastructure has expanded significantly, with ultra-fast 350kW chargers becoming more common. Popular models include the Tesla Model Y, Lucid Air, Rivian R1S, Hyundai Ioniq 6, and BMW i5. These vehicles offer a combination of range, performance, and technology that make them compelling alternatives to traditional gasoline cars.",
  "car maintenance": "Regular car maintenance is essential for longevity. For modern vehicles, we recommend: 1) Oil changes every 7,500-10,000 miles for conventional engines, 2) Tire rotation every 5,000-8,000 miles, 3) Brake inspections twice yearly, 4) Air filter replacement every 15,000-30,000 miles, 5) Regular battery checks, especially in extreme temperatures. For EVs, focus on software updates, tire maintenance, and brake system checks, as they typically require less maintenance than combustion engines.",
  "sports cars": "The top sports cars of 2025 combine performance with increasingly efficient powertrains. The Porsche 911 remains a benchmark with its hybrid-assisted flat-six. The Chevrolet Corvette Z06 offers supercar performance at a more accessible price point. For those seeking electric thrills, the Rimac Nevera and Tesla Roadster deliver incredible acceleration. Japanese options like the Nissan Z and Toyota Supra continue to provide engaging driving experiences with updated technology.",
  "suv": "SUVs continue to dominate the market in 2025. For family-friendly options, the Hyundai Santa Fe, Toyota Highlander, and Kia Telluride offer excellent value and features. In the luxury segment, the BMW X5, Mercedes-Benz GLE, and Genesis GV80 stand out with premium materials and cutting-edge technology. Off-road enthusiasts should consider the Jeep Grand Cherokee, Ford Bronco, or Land Rover Defender. For electric SUVs, the Rivian R1S, Tesla Model Y, and Kia EV9 are our top recommendations.",
};

export const determineContentType = (query: string): "all" | "articles" | "newCars" | "usedCars" | "photos" | "videos" => {
  query = query.toLowerCase();
  
  if (query.includes("photo")) return "photos";
  if (query.includes("video")) return "videos";
  if (query.includes("used") && query.includes("car")) return "usedCars";
  if (query.includes("new") && query.includes("car")) return "newCars";
  
  return "articles";
};

export const generateChatResponse = (query: string): string => {
  query = query.toLowerCase();
  
  for (const key in chatResponses) {
    if (query.includes(key)) {
      return chatResponses[key];
    }
  }
  
  return "I'd be happy to help with your question about cars. At MotorTrend, we're automotive experts who test and review the latest vehicles. Could you provide more specific details about what you're looking for, such as a particular model, comparison, or type of information?";
};

export const getAllContent = () => {
  return {
    articles: mockArticles,
    newCars: mockNewCars,
    usedCars: mockUsedCars,
    photos: mockPhotos,
    videos: mockVideos,
  };
};
