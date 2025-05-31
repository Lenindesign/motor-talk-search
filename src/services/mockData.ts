
import { ArticleData } from "../components/ArticleCard";
import { CarData } from "../components/CarCard";
import { PhotoData } from "../components/PhotoCard";
import { VideoData } from "../components/VideoCard";

// Mock Articles
export const mockArticles: ArticleData[] = [
  {
    id: "1",
    title: "2025 Ferrari 12Cilindri First Look: The 819-HP Replacement for the 812 Superfast",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/68000bec7be0880008e8056a/8-2025-ferrari-296-gtb-front-view.jpg",
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
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/67a2776e659f9800084efe53/39-2025-tesla-cybertruck-front-view.jpg",
    date: "April 28, 2025",
    category: "Long-Term Test",
    photoCount: 12,
  },
  {
    id: "5",
    title: "Hybrid vs. Electric: Which Is Right For You in 2025?",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/65b8df47ba5411000890c695/camry-hybrid-vs-kona-electric.jpg",
    date: "April 25, 2025",
    category: "Comparison",
  },
  {
    id: "6",
    title: "Future of Off-Roading: Electric 4x4s Put to the Test",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/65baf60fa70c820008b0c38b/2017-mercedes-benz-g-550-off-roading-04.jpg",
    date: "April 22, 2025",
    category: "Adventure",
    photoCount: 8,
  },
  {
    id: "7",
    title: "2025 Lucid Air: In-Depth Technology Overview",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/67c22302ae874400087d4ca9/23-2025-lucid-air-front-view.jpg",
    date: "May 10, 2025",
    category: "Technology",
  },
];

// Mock New Cars with high-quality automotive images
export const mockNewCars: CarData[] = [
  {
    id: "new-1",
    title: "2025 Lucid Air Grand Touring",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/67eebe7faf98e400084a3e75/001-2025-lucid-air-pure-front-three-quarter-static-lead.jpg",
    price: "$87,400",
    category: "Electric Sedan",
    isNew: true,
    bodyStyle: "Sedan", // Using a reliable high-quality car image from Unsplash
  },
  {
    id: "new-2",
    title: "2025 Rivian R1S",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/6700323d9326e80008726afc/018-2025-rivian-r1s-dual-max.jpg",
    price: "$76,000",
    category: "Electric SUV",
    isNew: true,
    bodyStyle: "SUV",
  },
  {
    id: "new-3",
    title: "2025 BMW i5 eDrive40",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/66f1b4fea063c100087ac1dc/002-2025-bmw-i5-m60-front-view.jpg",
    price: "$65,700",
    category: "Electric Sedan",
    isNew: true,
    bodyStyle: "Sedan",
  },
  {
    id: "new-4",
    title: "2025 Ford Mustang 60th Anniversary Edition",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/67803d741f7f8d00081b8228/2025fordmustanggtdspiritofamerica8.png",
    price: "$42,990", 
    category: "Sports Car",
    isNew: true,
    bodyStyle: "Sports Car",
  },
  {
    id: "new-5",
    title: "2025 Toyota Crown Signia",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/65a4c435544c890008b8417b/2025-toyota-crown-signia-suv-reveal-4.jpg",
    price: "$39,950",
    category: "Luxury Crossover",
    isNew: true,
    bodyStyle: "Crossover",
  },
  {
    id: "new-6",
    title: "2025 Hyundai Ioniq 6 Limited",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/683a13b525213f0008ca3bff/001-2025-hyundai-ioniq-5-xrt-lead.jpg",
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
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/663515bddbe9350008773b00/002-2023-tesla-model-y.jpg",
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
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/65c44b3fb907d30008f1b5b9/2022-porsche-911-gt3-9.jpg",
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
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/6679efdd03729c0008b14be8/031-2021-ford-f-150-raptor.jpg",
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
    title: "2025 Honda Accord Hybrid",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/671a7554264766000986939b/008-2025-honda-accord-hybrid.jpg",
    price: "$72,900",
    category: "Hybrid Sedan",
    year: "2025",
    mileage: "12,876 mi",
    fuelType: "Hybrid",
    drivetrain: "FWD",
    location: "Miami, FL",
    bodyStyle: "Sedan",
  },
  {
    id: "used-5",
    title: "2020 Jeep Wrangler Unlimited Rubicon",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/65c37e5d81670a0008bdb6df/2020-jeep-wrangler-unlimited-rubicon-ecodiesel-22.jpg",
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
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/65c42d9dadc7280009f459e8/2021-audi-rs-e-tron-gt-prototype-20.jpg",
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
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/65a1ee783da2cd0008171982/2023-aston-martin-v12-vantage-track-driving-4.jpg",
    title: "2023 Aston Martin Vantage at Sunset",
    position: "1/14",
    make: "Aston Martin",
    carModel: "Vantage",
    year: "2023"
  },
  {
    id: "2",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/659f01cce758ec0008136065/tunerevo-anaheim-bmw-i8.jpg",
    title: "2022 BMW i8 Front Angle",
    position: "2/14",
    make: "BMW",
    carModel: "i8",
    year: "2022"
  },
  {
    id: "3",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/659f167267366d0008dd93b1/2023-mercedes-benz-amg-gt63-4-door-coupe-interior-15.jpg",
    title: "2023 Mercedes-AMG GT Interior",
    position: "3/14",
    make: "Mercedes-Benz",
    carModel: "AMG GT",
    year: "2023"
  },
  {
    id: "4",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/65a0be80e0fe3e00085a93e8/2023-porsche-911-gt3-rs-6.jpg",
    title: "2023 Porsche 911 GT3 RS Track Day",
    position: "4/14",
    make: "Porsche",
    carModel: "911 GT3 RS",
    year: "2023"
  },
  {
    id: "5",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/659fa24d59558a0008c53288/ferrari-sf90-spider-first-test-44.jpg",
    title: "2023 Ferrari SF90 Stradale",
    position: "5/14",
    make: "Ferrari",
    carModel: "SF90 Stradale",
    year: "2023"
  },
  {
    id: "6",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/65a27391ad70b4000865f8e9/2022-lamborghini-countach-lpi-800-4-7.jpg",
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
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/65c5333cf028450008666d96/2022-jaguar-f-type-r-dynamic-p450-13.jpg",
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
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/67296714564fe600071c8de3/003-2025-bmw-m5-touring-wagon.jpg",
    duration: "12:45",
  },
  {
    id: "2",
    title: "Electric Off-Road Comparison: Rivian R1T vs Ford F-150 Lightning",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/67b7c45f3431cf0008c8eb4c/2025-rivian-r1t-app-19.jpg",
    duration: "18:32",
  },
  {
    id: "3",
    title: "Supercar Drag Race: Ferrari vs Lamborghini vs McLaren",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/68349f24aa8f18000865fec2/1996-mclaren-f1-gtr-110.jpg",
    duration: "8:54",
  },
  {
    id: "4",
    title: "2025 Lucid Air: In-Depth Technology Overview",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/67c222dbae874400087d4c90/3-2025-lucid-air-side-view.jpg",
    duration: "14:17",
  },
  {
    id: "5",
    title: "DIY Car Maintenance Tips Every Owner Should Know",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/65cedb67c7bc5b00085f8763/010-ls-porting-diy-706-heads-chamber.jpg",
    duration: "10:05",
  },
  {
    id: "6",
    title: "Best Car Audio Systems of 2025",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/65b987bcc668c90008d34e06/2018-volvo-xc60-t6-audio.jpg",
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

// Helper function to create markdown links for search queries
const createSearchLink = (displayText: string, searchQuery?: string): string => {
  const query = searchQuery || displayText;
  return `[${displayText}](/search?q=${encodeURIComponent(query)})`;
};

// Function to generate chat responses
export const generateChatResponse = (query: string): string => {
  const lowerQuery = query.toLowerCase();
  let responseText = "";

  if (lowerQuery.includes("best car")) {
    responseText = `The best car depends on your needs! Are you looking for an SUV, sedan, or truck? We have many guides, for example, on ${createSearchLink("Best Performance Cars Under $50,000")}.`;
  } else if (lowerQuery.includes("compare")) {
    responseText = `Sure, what vehicles would you like to compare? For example, 'compare the ${createSearchLink("2025 Lucid Air Grand Touring")} and ${createSearchLink("2025 Rivian R1S")}.`;
  } else if (lowerQuery.includes("latest news") || lowerQuery.includes("ferrari")) {
    responseText = `You can find the latest automotive news in our articles section. We recently published an article titled "${createSearchLink(mockArticles[0].title)}".`; // Assuming mockArticles[0] is the Ferrari one
  } else if (lowerQuery.includes("electric cars") || lowerQuery.includes("evs")) {
    responseText = `We have many articles and listings for electric cars. Check out the article "${createSearchLink("Electric SUVs With the Longest Range in 2025")}" or browse our new EV inventory like the ${createSearchLink("2025 Lucid Air Grand Touring")} and ${createSearchLink("2025 Rivian R1S")}.`;
  } else if (lowerQuery.includes("list of cars") || lowerQuery.includes("show me some cars") || lowerQuery.includes("list of year make models")) {
    const exampleCars = [
      mockNewCars.length > 0 ? createSearchLink(mockNewCars[0].title) : null,
      mockNewCars.length > 1 ? createSearchLink(mockNewCars[1].title) : null,
      mockUsedCars.length > 0 ? createSearchLink(mockUsedCars[0].title) : null,
    ].filter(Boolean) as string[]; 

    if (exampleCars.length > 0) {
      responseText = `Sure, here are some examples: ${exampleCars.join(', ')}. You can ask for more specific types too!`;
    } else {
      responseText = "I can show you cars, what are you interested in?";
    }
  } else {
    responseText = "I can help with that. What specific information are you looking for?";
  }
  return responseText;
};

// Function to get all content types
export const getAllContent = () => {
  return {
    articles: mockArticles,
    newCars: mockNewCars,
    usedCars: mockUsedCars,
    photos: mockPhotos,
    videos: mockVideos,
  };
};

export const determineContentType = (query: string): "all" | "articles" | "newCars" | "usedCars" | "photos" | "videos" => {
  query = query.toLowerCase();
  
  if (query.includes("photo")) return "photos";
  if (query.includes("video")) return "videos";
  if (query.includes("used") && query.includes("car")) return "usedCars";
  if (query.includes("new") && query.includes("car")) return "newCars";
  
  return "articles";
};
