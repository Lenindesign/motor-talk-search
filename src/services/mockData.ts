
import { ArticleData } from "../components/ArticleCard";
import { CarData } from "../components/CarCard";
import { PhotoData } from "../components/PhotoCard";
import { VideoData } from "../components/VideoCard";

// Mock Articles
export const mockArticles: ArticleData[] = [
  {
    id: "1",
    title: "2025 Ferrari 12Cilindri First Look: The 819-HP Replacement for the 812 Superfast",
    imageUrl: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZmVycmFyaXxlbnwwfHwwfHx8MA%3D%3D",
    date: "May 5, 2025",
    category: "Review",
    featured: true,
  },
  {
    id: "2",
    title: "Electric SUVs With the Longest Range in 2025",
    imageUrl: "https://images.unsplash.com/photo-1593941707882-a5bba53774a0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGVsZWN0cmljJTIwY2FyfGVufDB8fDB8fHww",
    date: "May 3, 2025",
    category: "Guide",
  },
  {
    id: "3",
    title: "Best Performance Cars Under $50,000",
    imageUrl: "https://images.unsplash.com/photo-1611016186353-9af58c69a533?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cG9yc2NoZXxlbnwwfHwwfHx8MA%3D%3D",
    date: "April 30, 2025",
    category: "Buyer's Guide",
  },
  {
    id: "4",
    title: "2025 Tesla Cybertruck Owner Review: Living With the Future",
    imageUrl: "https://images.unsplash.com/photo-1620891549027-942fdc95d3f5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y3liZXJ0cnVja3xlbnwwfHwwfHx8MA%3D%3D",
    date: "April 28, 2025",
    category: "Long-Term Test",
    photoCount: 12,
  },
  {
    id: "5",
    title: "Hybrid vs. Electric: Which Is Right For You in 2025?",
    imageUrl: "https://images.unsplash.com/photo-1562504208-03d85cc8c23e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aHlicmlkJTIwY2FyfGVufDB8fDB8fHww",
    date: "April 25, 2025",
    category: "Comparison",
  },
  {
    id: "6",
    title: "Future of Off-Roading: Electric 4x4s Put to the Test",
    imageUrl: "https://images.unsplash.com/photo-1519752594763-2633d8d4c94f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8b2ZmJTIwcm9hZHxlbnwwfHwwfHx8MA%3D%3D",
    date: "April 22, 2025",
    category: "Adventure",
    photoCount: 8,
  },
];

// Mock New Cars
export const mockNewCars: CarData[] = [
  {
    id: "1",
    title: "2025 Lucid Air Grand Touring",
    imageUrl: "https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGx1Y2lkJTIwYWlyfGVufDB8fDB8fHww",
    price: "$87,400",
    category: "Electric Sedan",
    isNew: true,
  },
  {
    id: "2",
    title: "2025 Rivian R1S",
    imageUrl: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cml2aWFufGVufDB8fDB8fHww",
    price: "$76,000",
    category: "Electric SUV",
    isNew: true,
  },
  {
    id: "3",
    title: "2025 BMW i5 eDrive40",
    imageUrl: "https://images.unsplash.com/photo-1614200179396-2bdb77a0b50f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGJtdyUyMGVsZWN0cmljfGVufDB8fDB8fHww",
    price: "$65,700",
    category: "Electric Sedan",
    isNew: true,
  },
  {
    id: "4",
    title: "2025 Ford Mustang GT",
    imageUrl: "https://images.unsplash.com/photo-1584345604476-8ec5f82d718c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9yZCUyMG11c3Rhbmd8ZW58MHx8MHx8fDA%3D",
    price: "$42,990",
    category: "Sports Car",
    isNew: true,
  },
  {
    id: "5",
    title: "2025 Toyota Crown Signia",
    imageUrl: "https://images.unsplash.com/photo-1617469767053-cab7889206d7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dG95b3RhJTIwY3Jvc3NvdmVyfGVufDB8fDB8fHww",
    price: "$39,950",
    category: "Luxury Crossover",
    isNew: true,
  },
  {
    id: "6",
    title: "2025 Hyundai Ioniq 6 Limited",
    imageUrl: "https://images.unsplash.com/photo-1663947719095-17af003c9193?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aHl1bmRhaSUyMGlvbmlxfGVufDB8fDB8fHww",
    price: "$53,650",
    category: "Electric Sedan",
    isNew: true,
  },
];

// Mock Used Cars
export const mockUsedCars: CarData[] = [
  {
    id: "1",
    title: "2023 Tesla Model Y Performance",
    imageUrl: "https://images.unsplash.com/photo-1619072073550-6bab734633dc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHRlc2xhJTIwbW9kZWwlMjB5fGVufDB8fDB8fHww",
    price: "$53,900",
    category: "Electric SUV",
    year: "2023",
    mileage: "15,245 mi",
    fuelType: "Electric",
    drivetrain: "AWD",
    location: "San Francisco, CA",
  },
  {
    id: "2",
    title: "2022 Porsche 911 Carrera 4S",
    imageUrl: "https://images.unsplash.com/photo-1584345604476-8ec5f82d718c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cG9yc2NoZSUyMDkxMXxlbnwwfHwwfHx8MA%3D%3D",
    price: "$124,500",
    category: "Sports Car",
    year: "2022",
    mileage: "8,670 mi",
    fuelType: "Gasoline",
    drivetrain: "AWD",
    location: "Los Angeles, CA",
  },
  {
    id: "3",
    title: "2021 Ford F-150 Raptor",
    imageUrl: "https://images.unsplash.com/photo-1647983216233-e16d8f364ece?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGZvcmQlMjBmMTUwfGVufDB8fDB8fHww",
    price: "$65,800",
    category: "Pickup Truck",
    year: "2021",
    mileage: "26,543 mi",
    fuelType: "Gasoline",
    drivetrain: "4WD",
    location: "Denver, CO",
  },
  {
    id: "4",
    title: "2022 BMW M3 Competition",
    imageUrl: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGJtd3xlbnwwfHwwfHx8MA%3D%3D",
    price: "$72,900",
    category: "Sports Sedan",
    year: "2022",
    mileage: "12,876 mi",
    fuelType: "Gasoline",
    drivetrain: "RWD",
    location: "Miami, FL",
  },
  {
    id: "5",
    title: "2020 Jeep Wrangler Unlimited Rubicon",
    imageUrl: "https://images.unsplash.com/photo-1675651843669-1f6bf556fe1e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGplZXAlMjB3cmFuZ2xlcnxlbnwwfHwwfHx8MA%3D%3D",
    price: "$45,500",
    category: "SUV",
    year: "2020",
    mileage: "32,145 mi",
    fuelType: "Gasoline",
    drivetrain: "4WD",
    location: "Austin, TX",
  },
  {
    id: "6",
    title: "2021 Audi e-tron GT",
    imageUrl: "https://images.unsplash.com/photo-1671101405572-a3f903731869?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXVkaSUyMGUlMjB0cm9ufGVufDB8fDB8fHww",
    price: "$89,700",
    category: "Electric Sports Car",
    year: "2021",
    mileage: "14,325 mi",
    fuelType: "Electric",
    drivetrain: "AWD",
    location: "Seattle, WA",
  },
];

// Mock Photos
export const mockPhotos: PhotoData[] = [
  {
    id: "1",
    imageUrl: "https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YXN0b24lMjBtYXJ0aW58ZW58MHx8MHx8fDA%3D",
    title: "Aston Martin Vantage at Sunset",
    position: "1/14",
  },
  {
    id: "2",
    imageUrl: "https://images.unsplash.com/photo-1566024146453-8d975a02c51b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGJtdyUyMGk4fGVufDB8fDB8fHww",
    title: "BMW i8 Front Angle",
    position: "2/14",
  },
  {
    id: "3",
    imageUrl: "https://images.unsplash.com/photo-1542362567-b07e54358753?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVyY2VkZXMlMjBhbWd8ZW58MHx8MHx8fDA%3D",
    title: "Mercedes-AMG GT Interior",
    position: "3/14",
  },
  {
    id: "4",
    imageUrl: "https://images.unsplash.com/photo-1612393266591-c32944e815c8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDd8fHBvcnNjaGV8ZW58MHx8MHx8fDA%3D",
    title: "Porsche 911 GT3 RS Track Day",
    position: "4/14",
  },
  {
    id: "5",
    imageUrl: "https://images.unsplash.com/photo-1580274518385-51df6cf307a8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZmVycmFyaXxlbnwwfHwwfHx8MA%3D%3D",
    title: "Ferrari SF90 Stradale",
    position: "5/14",
  },
  {
    id: "6",
    imageUrl: "https://images.unsplash.com/photo-1633509817627-5a29e6c4606f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bGFtYm9yZ2hpbmklMjBodXJhY2FufGVufDB8fDB8fHww",
    title: "Lamborghini Huracán EVO",
    position: "6/14",
  },
  {
    id: "7",
    imageUrl: "https://images.unsplash.com/photo-1534093607318-f025413f49cb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG1jbGFyZW58ZW58MHx8MHx8fDA%3D",
    title: "McLaren 720S Detail Shot",
    position: "7/14",
  },
  {
    id: "8",
    imageUrl: "https://images.unsplash.com/photo-1617654112323-797e8f67b124?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8amFndWFyJTIwZnR5cGV8ZW58MHx8MHx8fDA%3D",
    title: "Jaguar F-Type R Coupe",
    position: "8/14",
  },
];

// Mock Videos
export const mockVideos: VideoData[] = [
  {
    id: "1",
    title: "2025 BMW M5 First Drive Review",
    imageUrl: "https://images.unsplash.com/photo-1665531440083-a9a6f8b75394?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGJtdyUyMG01fGVufDB8fDB8fHww",
    duration: "12:45",
  },
  {
    id: "2",
    title: "Electric Off-Road Comparison: Rivian R1T vs Ford F-150 Lightning",
    imageUrl: "https://images.unsplash.com/photo-1631793208942-4b7190d92217?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cml2aWFuJTIwcjF0fGVufDB8fDB8fHww",
    duration: "18:32",
  },
  {
    id: "3",
    title: "Supercar Drag Race: Ferrari vs Lamborghini vs McLaren",
    imageUrl: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZmVycmFyaSUyMHJhY2V8ZW58MHx8MHx8fDA%3D",
    duration: "8:54",
  },
  {
    id: "4",
    title: "2025 Lucid Air: In-Depth Technology Overview",
    imageUrl: "https://images.unsplash.com/photo-1618846042125-0a64df35d3e4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bHVjaWQlMjBhaXJ8ZW58MHx8MHx8fDA%3D",
    duration: "14:17",
  },
  {
    id: "5",
    title: "DIY Car Maintenance Tips Every Owner Should Know",
    imageUrl: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGNhciUyMG1haW50ZW5hbmNlfGVufDB8fDB8fHww",
    duration: "10:05",
  },
  {
    id: "6",
    title: "Best Car Audio Systems of 2025",
    imageUrl: "https://images.unsplash.com/photo-1624628639856-100bf817a80f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGNhciUyMGF1ZGlvfGVufDB8fDB8fHww",
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

// Function to determine best content type based on query
export const determineContentType = (query: string): "all" | "articles" | "newCars" | "usedCars" | "photos" | "videos" => {
  query = query.toLowerCase();
  
  if (query.includes("photo")) return "photos";
  if (query.includes("video")) return "videos";
  if (query.includes("used") && query.includes("car")) return "usedCars";
  if (query.includes("new") && query.includes("car")) return "newCars";
  
  return "articles"; // Default to articles
};

// Function to generate a chat response
export const generateChatResponse = (query: string): string => {
  query = query.toLowerCase();
  
  // Check for specific phrases in query
  for (const key in chatResponses) {
    if (query.includes(key)) {
      return chatResponses[key];
    }
  }
  
  // Default response if no match is found
  return "I'd be happy to help with your question about cars. At MotorTrend, we're automotive experts who test and review the latest vehicles. Could you provide more specific details about what you're looking for, such as a particular model, comparison, or type of information?";
};

// Function to get all content
export const getAllContent = () => {
  return {
    articles: mockArticles,
    newCars: mockNewCars,
    usedCars: mockUsedCars,
    photos: mockPhotos,
    videos: mockVideos,
  };
};
