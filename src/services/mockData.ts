
import { ArticleData } from "../components/ArticleCard";
import { CarData } from "../components/CarCard";
import { PhotoData } from "../components/PhotoCard";
import { VideoData } from "../components/VideoCard";

// Mock Articles
export const mockArticles: ArticleData[] = [
  // --- Honda Articles ---
  {
    id: "honda-article-1",
    title: "2025 Honda Accord Review: The Midsize Sedan Benchmark",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/679d37ac7ff34400082301e3/16-2025-honda-accord-top-view.jpg",
    date: "May 15, 2025",
    category: "Review",
    featured: true,
  },
  {
    id: "honda-article-2",
    title: "2025 Honda CR-V Hybrid: Family SUV Gets Smarter",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/6807e90a5275530008bc0a89/002-2026-honda-crv.jpg",
    date: "May 10, 2025",
    category: "Hybrid",
  },
  {
    id: "honda-article-3",
    title: "2024 Honda Civic Type R: Hot Hatch King?",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/679d316690e08b0008b8a28b/1-2025-honda-civic-type-r-front-view.jpg",
    date: "April 28, 2025",
    category: "Performance",
  },
  {
    id: "honda-article-4",
    title: "Honda Pilot 2024: Three-Row SUV for the Family",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/65f803940315ac000873e138/01-2025-honda-pilot-black-edition.jpg",
    date: "April 20, 2025",
    category: "SUV",
  },
  {
    id: "honda-article-5",
    title: "2025 Honda Odyssey: Still the Minivan to Beat?",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/6712c28ec3fea600083e5009/001-2025-honda-odyssey-elite.jpg",
    date: "April 10, 2025",
    category: "Minivan",
  },
  {
    id: "honda-article-6",
    title: "2025 Honda Ridgeline: Truck Utility, Honda Comfort",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/672d075cd198830008ca7125/23-2025-honda-ridgeline-front-view.jpg",
    date: "March 30, 2025",
    category: "Truck",
  },
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
  // --- Honda New Cars ---
  {
    id: "honda-new-1",
    title: "2025 Honda Accord Touring",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/671a7554264766000986939b/008-2025-honda-accord-hybrid.jpg",
    price: "$37,000",
    category: "Sedan",
    isNew: true,
    bodyStyle: "Sedan",
    year: "2025",
  },
  {
    id: "honda-new-2",
    title: "2025 Honda CR-V Hybrid",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/68388e3f67366d0008aebdad/001-best-selling-cars-states-honda-crv-motortrend-ryan-lugo-design.jpg",
    price: "$34,500",
    category: "SUV",
    isNew: true,
    bodyStyle: "SUV",
    year: "2025",
  },
  {
    id: "honda-new-3",
    title: "2025 Honda Civic Type R",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/679d31ae0c91990008185451/22-2025-honda-civic-type-r-front-view.jpg",
    price: "$44,795",
    category: "Sport Compact",
    isNew: true,
    bodyStyle: "Hatchback",
    year: "2025",
  },
  {
    id: "honda-new-4",
    title: "2025 Honda Pilot Elite",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/65f803940315ac000873e138/01-2025-honda-pilot-black-edition.jpg",
    price: "$50,000",
    category: "SUV",
    isNew: true,
    bodyStyle: "SUV",
    year: "2025",
  },
  {
    id: "honda-new-5",
    title: "2025 Honda Odyssey EX-L",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/669aafc8cdb3c60008f17f07/2025hondaodysseyminivan20.png",
    price: "$41,000",
    category: "Minivan",
    isNew: true,
    bodyStyle: "Minivan",
    year: "2025",
  },
  {
    id: "honda-new-6",
    title: "2025 Honda Ridgeline Black Edition",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/672d075ece8ea400088fd122/24-2025-honda-ridgeline-side-view.jpg",
    price: "$46,500",
    category: "Truck",
    isNew: true,
    bodyStyle: "Truck",
    year: "2025",
  },
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
  // --- Honda Used Cars ---
  {
    id: "honda-used-1",
    title: "2022 Honda Accord EX-L",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/65a34be80d8ef10008504e24/2022-honda-accord-hybrid-sport-003.jpg",
    price: "$27,500",
    category: "Sedan",
    year: "2022",
    mileage: "18,200 mi",
    fuelType: "Gasoline",
    drivetrain: "FWD",
    location: "Los Angeles, CA",
    bodyStyle: "Sedan",
  },
  {
    id: "honda-used-2",
    title: "2021 Honda CR-V Touring",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/65cf764c8d38e9000841c15d/2012-honda-crv-front-view2.jpg",
    price: "$25,900",
    category: "SUV",
    year: "2021",
    mileage: "22,000 mi",
    fuelType: "Gasoline",
    drivetrain: "AWD",
    location: "San Diego, CA",
    bodyStyle: "SUV",
  },
  {
    id: "honda-used-3",
    title: "2020 Honda Civic Si",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/65c2804a53c45c0008da655c/2020-honda-civic-si-06.jpg",
    price: "$19,800",
    category: "Sport Compact",
    year: "2020",
    mileage: "30,500 mi",
    fuelType: "Gasoline",
    drivetrain: "FWD",
    location: "San Jose, CA",
    bodyStyle: "Sedan",
  },
  {
    id: "honda-used-4",
    title: "2023 Honda Pilot Touring",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/659f19132cad330008ca88c6/2023-honda-pilot-elite-1.jpg",
    price: "$38,700",
    category: "SUV",
    year: "2023",
    mileage: "12,800 mi",
    fuelType: "Gasoline",
    drivetrain: "AWD",
    location: "San Francisco, CA",
    bodyStyle: "SUV",
  },
  {
    id: "honda-used-5",
    title: "2021 Honda Odyssey Elite",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/65a44d83b4af830008ae6d1d/2024-honda-odyssey-side-view-010.jpg",
    price: "$31,200",
    category: "Minivan",
    year: "2021",
    mileage: "28,400 mi",
    fuelType: "Gasoline",
    drivetrain: "FWD",
    location: "Oakland, CA",
    bodyStyle: "Minivan",
  },
  {
    id: "honda-used-6",
    title: "2020 Honda Ridgeline RTL-E",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/65a1f2c4a02d960009c91a06/2023-honda-ridgeline-sport-hpd-20-motion.jpg",
    price: "$33,800",
    category: "Truck",
    year: "2020",
    mileage: "35,900 mi",
    fuelType: "Gasoline",
    drivetrain: "AWD",
    location: "Sacramento, CA",
    bodyStyle: "Truck",
  },
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
  // --- Honda Photos ---
  {
    id: "honda-photo-1",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/671a7554264766000986939b/008-2025-honda-accord-hybrid.jpg",
    title: "2025 Honda Accord Hybrid Front View",
    position: "1/6",
    make: "Honda",
    carModel: "Accord",
    year: "2025"
  },
  {
    id: "honda-photo-2",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/6787f2342a8b790008a4202b/2025-honda-cr-v-front-view-1.jpg",
    title: "2025 Honda CR-V Hybrid Front Angle",
    position: "2/6",
    make: "Honda",
    carModel: "CR-V",
    year: "2025"
  },
  {
    id: "honda-photo-3",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/679d317290e08b0008b8a28c/3-2025-honda-civic-type-r-front-view.jpg",
    title: "2025 Honda Civic Type R",
    position: "3/6",
    make: "Honda",
    carModel: "Civic Type R",
    year: "2025"
  },
  {
    id: "honda-photo-4",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/65b709ac9e852f000896101a/2016-honda-pilot-16.jpg",
    title: "2024 Honda Pilot Front View",
    position: "4/6",
    make: "Honda",
    carModel: "Pilot",
    year: "2024"
  },
  {
    id: "honda-photo-5",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/6712c2acbf21860008e085a1/013-2025-honda-odyssey-elite.jpg",
    title: "2025 Honda Odyssey Front View",
    position: "5/6",
    make: "Honda",
    carModel: "Odyssey",
    year: "2025"
  },
  {
    id: "honda-photo-6",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/65b9a9104c372d0008b64bb0/2017-honda-ridgeline-rtl-e-gas-station-stop-02.jpg",
    title: "2025 Honda Ridgeline Front View",
    position: "6/6",
    make: "Honda",
    carModel: "Ridgeline",
    year: "2025"
  },
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
  // --- Honda Videos ---
  {
    id: "honda-video-1",
    title: "2025 Honda Accord Touring Test Drive",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/671a7554264766000986939b/008-2025-honda-accord-hybrid.jpg",
    duration: "13:05",
  },
  {
    id: "honda-video-2",
    title: "2025 Honda CR-V Hybrid vs. Toyota RAV4 Hybrid Comparison",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/65a16d3ee28b82000847aa29/2023-honda-cr-v-hybrid-vs-2023-toyota-rav4-hybrid-comparison-55.jpg",
    duration: "12:22",
  },
  {
    id: "honda-video-3",
    title: "2025 Honda Civic Type R Track Review",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/679d31a066f0e90008e579f4/18-2025-honda-civic-type-r-side-view.jpg",
    duration: "10:30",
  },
  {
    id: "honda-video-4",
    title: "2024 Honda Pilot Full Family Test",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/65b6a5e53b36ca00083f8272/2016-honda-pilot-front-three-quarter-03.jpg",
    duration: "15:00",
  },
  {
    id: "honda-video-5",
    title: "2025 Honda Odyssey: Best Minivan Features",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/67801f81e5984c0008196817/020-2025-honda-odyssey-interior.jpg",
    duration: "11:55",
  },
  {
    id: "honda-video-6",
    title: "2025 Honda Ridgeline Off-Road Test",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/65dc2e6437e1e800087bfcca/2017-honda-ridgeline-rtl-e-blizzard-07.jpg",
    duration: "13:40",
  },
  // --- Car Reviews Category ---
  {
    id: "review-1",
    title: "2025 BMW M5 First Drive Review",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/67296714564fe600071c8de3/003-2025-bmw-m5-touring-wagon.jpg",
    duration: "12:45",
  },
  {
    id: "review-2",
    title: "2025 Mercedes EQS SUV Review: Luxury Electric Flagship",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/67bde8b188aa6d00084aba44/mercedes-benzeqssemi-solid-statebatterytest11.png",
    duration: "14:20",
  },
  {
    id: "review-3",
    title: "2025 Audi RS6 Avant Performance Review",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/6685ed60b2d9990008368b70/0105-audi-rs6-gt-track-drive-thumbnail-1920x1080.jpg",
    duration: "15:30",
  },
  // --- Track & Performance Category ---
  {
    id: "track-1",
    title: "Lamborghini Revuelto: 1000HP Hypercar Track Test",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/66b6901ea3735500089a5155/0116-lamborghini-revuelto-drive-thumbnail-1920x1080-v1.jpg",
    duration: "15:18",
  },
  {
    id: "track-2",
    title: "Ferrari 296 GTB Track Performance Analysis",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/658ad91d57af9a00085e6ac4/ferrari-296-gtb-action-2.jpg",
    duration: "17:22",
  },
  {
    id: "track-3",
    title: "McLaren Artura Track Day: Hybrid Performance Tested",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/65a16e363e3c42000895dcb4/2023-mclaren-artura-performance-track-test.jpg",
    duration: "14:10",
  },
  // --- Off-Road & Adventure Category ---
  {
    id: "offroad-1",
    title: "Toyota Tacoma TRD Pro vs. Ford Ranger Raptor: Off-Road Showdown",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/662067c76159e7000883aef9/0033-tacoma-vs-ranger-vs-colorado-comparo-thumbnail-1920x1080.jpg",
    duration: "21:45",
  },
  {
    id: "offroad-2",
    title: "Jeep Wrangler Rubicon 392 Off-Road Adventure",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/675b763a3e60930008889114/011-2025-jeep-gladiator-rubicon-x.jpg",
    duration: "18:55",
  },
  {
    id: "offroad-3",
    title: "Land Rover Defender 130 Outback Adventure",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/65c6e59b4dd34d0008f05bed/2023-land-rover-defender-130-outbound-v8-action.jpg",
    duration: "19:30",
  },
  // --- Classic Cars & Restorations Category ---
  {
    id: "classic-1",
    title: "Classic Porsche 911 Restoration Project",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/682cf399bc0f41000786b8ce/024-2025-aston-martin-vantage-porsche-911.jpg",
    duration: "22:15",
  },
  {
    id: "classic-2",
    title: "Ferrari 250 GTO: The Classic Restoration Story",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/65bb23089677b70008f8b3b0/1962-ferrari-250-gto-side.jpg",
    duration: "25:40",
  },
  {
    id: "classic-3",
    title: "Classic Ford Mustang Shelby GT500 Restoration",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/66ea0c29f96f07000863ed69/032-1967-ford-mustang-cobra-ruffian-green-shelby-vintage-flares.jpg",
    duration: "20:30",
  },
  // --- EVs & Future Tech Category ---
  {
    id: "ev-1",
    title: "2025 Porsche Taycan: The Ultimate EV Sports Car?",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/65f1c6af2c8f3500089e03be/2025-porsche-taycan-turbo-gt-nurburgring-10.jpg",
    duration: "14:22",
  },
  {
    id: "ev-2",
    title: "Electric Off-Road Comparison: Rivian R1T vs Ford F-150 Lightning",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/64a8c2fe3aec69000819c3d0/rivian-r1t-vs-ford-f-150-lightning-comparison.jpg",
    duration: "18:30",
  },
  {
    id: "ev-3",
    title: "Future Electric Hypercars: Rimac Nevera vs Lotus Evija",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/6656edb9dec73100084dcdcf/rimac-nevera-acceleration-run.jpg",
    duration: "16:45",
  },
  // --- Motorsports Category ---
  {
    id: "motorsport-1",
    title: "F1 2025 Season Preview: New Cars, New Rules",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/65a1ea77ba9631000891c1fa/f1-2023-british-gp-race-start.jpg",
    duration: "24:10",
  },
  {
    id: "motorsport-2",
    title: "Le Mans 24 Hour Race Highlights",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/673252085459e4000863b22c/2018-lemans-toyota-gazoo-racing-win-01.jpg",
    duration: "28:35",
  },
  {
    id: "motorsport-3",
    title: "NASCAR Cup Series: Race Day Analysis",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/65bbdd8eca6887000869df14/nascar-at-sonoma-raceway-16.jpg",
    duration: "22:50",
  },
  {
    id: "original-1",
    title: "2025 BMW M5 First Drive Review",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/67296714564fe600071c8de3/003-2025-bmw-m5-touring-wagon.jpg",
    duration: "12:45",
  },
  {
    id: "original-2",
    title: "Electric Off-Road Comparison: Rivian R1T vs Ford F-150 Lightning",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/64a8c2fe3aec69000819c3d0/rivian-r1t-vs-ford-f-150-lightning-comparison.jpg",
    duration: "18:30",
  },
  {
    id: "original-3",
    title: "Supercar Drag Race: Ferrari vs Lamborghini vs McLaren",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/68349f24aa8f18000865fec2/1996-mclaren-f1-gtr-110.jpg",
    duration: "8:54",
  },
  {
    id: "original-4",
    title: "2025 Lucid Air: In-Depth Technology Overview",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/67c222dbae874400087d4c90/3-2025-lucid-air-side-view.jpg",
    duration: "14:17",
  },
  {
    id: "original-5",
    title: "DIY Car Maintenance Tips Every Owner Should Know",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/65cedb67c7bc5b00085f8763/010-ls-porting-diy-706-heads-chamber.jpg",
    duration: "10:05",
  },
  {
    id: "original-6",
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
