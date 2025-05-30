import React, { useState, useEffect } from 'react';
import MainNavigation from '@/components/MainNavigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter, ArrowUpDown, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CarCard, { CarData } from '@/components/CarCard';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { useCarSearchApi } from '@/hooks/use-cars-api';
const BuyersGuide: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'new' | 'used'>('new');
  const [searchTerm, setSearchTerm] = useState('');
  const [displayedSearchResults, setDisplayedSearchResults] = useState<CarData[]>([]);

  // Use the real car search API
  const {
    data: apiSearchResults,
    isLoading: apiLoading
  } = useCarSearchApi(searchTerm);

  // Transform API results to CarData format
  useEffect(() => {
    if (apiSearchResults && apiSearchResults.length > 0) {
      console.log('API Search Results:', apiSearchResults);
      const transformedResults: CarData[] = apiSearchResults.map((car, index) => ({
        id: `api-${car.make}-${car.model}-${car.year}-${index}`,
        title: `${car.year} ${car.make} ${car.model}`,
        imageUrl: `https://images.unsplash.com/photo-1494976688602-30db25b13217?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`,
        price: 'Contact Dealer',
        category: car.class || 'Vehicle',
        bodyStyle: car.class || 'Vehicle',
        year: car.year.toString(),
        horsepowerTorque: car.cylinders ? `${car.cylinders} cylinders` : undefined,
        fuelType: car.fuel_type || 'Gasoline',
        drivetrain: car.drive || 'FWD',
        motorTrendScore: Math.random() * 2 + 7,
        motorTrendRank: index + 1,
        motorTrendCategoryRank: index + 1
      }));
      console.log('Transformed Results:', transformedResults);
      setDisplayedSearchResults(transformedResults);
    } else if (searchTerm && !apiLoading) {
      console.log('No results found for:', searchTerm);
      setDisplayedSearchResults([]);
    } else if (!searchTerm) {
      setDisplayedSearchResults([]);
    }
  }, [apiSearchResults, apiLoading, searchTerm]);

  // Handle search
  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
    setSearchTerm(query);
    if (query.trim()) {
      toast.success('Searching vehicles...', {
        description: `Looking for "${query}" in our database`
      });
    }
  };

  // Default cars for when there's no search
  const defaultNewCars: CarData[] = [{
    id: 'new-1',
    title: '2025 Ford Mustang GT',
    imageUrl: 'https://d2kde5ohu8qb21.cloudfront.net/files/65a457a12936a70008a96a14/030-2025-ford-mustang-gtd.jpg',
    price: '$45,995',
    category: 'Sports Car',
    bodyStyle: 'Sports Car',
    year: '2025',
    horsepowerTorque: '480 hp',
    fuelType: 'Premium Gasoline',
    drivetrain: 'RWD',
    motorTrendScore: 8.7,
    motorTrendRank: 2,
    motorTrendCategoryRank: 1
  }, {
    id: 'new-2',
    title: '2025 BMW i5 eDrive40',
    imageUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3',
    price: '$67,795',
    category: 'Luxury Sedan',
    bodyStyle: 'Sedan',
    year: '2025',
    horsepowerTorque: '335 hp',
    fuelType: 'Electric',
    drivetrain: 'RWD',
    motorTrendScore: 9.1,
    motorTrendRank: 1,
    motorTrendCategoryRank: 1
  }, {
    id: 'new-3',
    title: '2025 Tesla Model 3 Performance',
    imageUrl: 'https://d2kde5ohu8qb21.cloudfront.net/files/6793fa8794846c00084135f8/3-2025-tesla-model-s-front-view.jpg',
    price: '$52,990',
    category: 'Electric Sedan',
    bodyStyle: 'Sedan',
    year: '2025',
    horsepowerTorque: '455 hp',
    fuelType: 'Electric',
    drivetrain: 'AWD',
    motorTrendScore: 8.9,
    motorTrendRank: 3,
    motorTrendCategoryRank: 1
  }, {
    id: 'new-4',
    title: '2025 Toyota Supra',
    imageUrl: 'https://d2kde5ohu8qb21.cloudfront.net/files/66cf9fe3818d95000860c4e9/2025-toyota-gr-supra-gt4-evo2-17.jpg',
    price: '$56,500',
    category: 'Sports Car',
    bodyStyle: 'Coupe',
    year: '2025',
    horsepowerTorque: '382 hp',
    fuelType: 'Premium Gasoline',
    drivetrain: 'RWD',
    motorTrendScore: 8.5,
    motorTrendRank: 4,
    motorTrendCategoryRank: 2
  }, {
    id: 'new-5',
    title: '2025 Porsche 911 Carrera',
    imageUrl: 'https://d2kde5ohu8qb21.cloudfront.net/files/67ead63126b4b600088db946/2025-porsche-911-carrera-s-first-drive-cartegena-yellow-coupe-11.jpg',
    price: '$116,050',
    category: 'Luxury Sports Car',
    bodyStyle: 'Coupe',
    year: '2025',
    horsepowerTorque: '443 hp',
    fuelType: 'Premium Gasoline',
    drivetrain: 'RWD',
    motorTrendScore: 9.5,
    motorTrendRank: 1,
    motorTrendCategoryRank: 1
  }, {
    id: 'new-6',
    title: '2025 Honda Civic Type R',
    imageUrl: 'https://d2kde5ohu8qb21.cloudfront.net/files/679d31ae0c91990008185451/22-2025-honda-civic-type-r-front-view.jpg',
    price: '$44,795',
    category: 'Sport Compact',
    bodyStyle: 'Hatchback',
    year: '2025',
    horsepowerTorque: '315 hp',
    fuelType: 'Premium Gasoline',
    drivetrain: 'FWD',
    motorTrendScore: 8.8,
    motorTrendRank: 2,
    motorTrendCategoryRank: 1
  }, {
    id: 'new-7',
    title: '2025 Chevrolet Corvette Z06',
    imageUrl: 'https://d2kde5ohu8qb21.cloudfront.net/files/673bbb24c432220008be9aae/2-2025-chevrolet-corvette-z06-front-view.jpg',
    price: '$109,295',
    category: 'Supercar',
    bodyStyle: 'Coupe',
    year: '2025',
    horsepowerTorque: '670 hp',
    fuelType: 'Premium Gasoline',
    drivetrain: 'RWD',
    motorTrendScore: 9.3,
    motorTrendRank: 1,
    motorTrendCategoryRank: 1
  }, {
    id: 'new-8',
    title: '2025 Audi RS e-tron GT',
    imageUrl: 'https://d2kde5ohu8qb21.cloudfront.net/files/67ec4bd56ffccf0008567e3a/29-2025-audi-rs-e-tron-gt-performance-first-drive.jpg',
    price: '$148,595',
    category: 'Electric Performance',
    bodyStyle: 'Sedan',
    year: '2025',
    horsepowerTorque: '637 hp',
    fuelType: 'Electric',
    drivetrain: 'AWD',
    motorTrendScore: 9.0,
    motorTrendRank: 2,
    motorTrendCategoryRank: 1
  }, {
    id: 'new-9',
    title: '2025 Lexus LFA Successor',
    imageUrl: 'https://d2kde5ohu8qb21.cloudfront.net/files/6811672b34acc00008264914/005-2025-lexus-rx500h.jpg',
    price: '$375,000',
    category: 'Hypercar',
    bodyStyle: 'Coupe',
    year: '2025',
    horsepowerTorque: '800 hp',
    fuelType: 'Premium Gasoline',
    drivetrain: 'AWD',
    motorTrendScore: 9.7,
    motorTrendRank: 1,
    motorTrendCategoryRank: 1
  }, {
    id: 'new-10',
    title: '2025 Volkswagen ID.4 Pro S',
    imageUrl: 'https://d2kde5ohu8qb21.cloudfront.net/files/6760ab27fe4b93000856f155/12-2025-volkswagen-id4-side-view.jpg',
    price: '$48,995',
    category: 'Electric SUV',
    bodyStyle: 'SUV',
    year: '2025',
    horsepowerTorque: '295 hp',
    fuelType: 'Electric',
    drivetrain: 'AWD',
    motorTrendScore: 8.4,
    motorTrendRank: 3,
    motorTrendCategoryRank: 2
  }, {
    id: 'new-11',
    title: '2025 Hyundai Ioniq 6 Limited',
    imageUrl: 'https://d2kde5ohu8qb21.cloudfront.net/files/683a154500b694000887672d/008-2025-hyundai-ioniq-5-xrt.jpg',
    price: '$52,650',
    category: 'Electric Sedan',
    bodyStyle: 'Sedan',
    year: '2025',
    horsepowerTorque: '320 hp',
    fuelType: 'Electric',
    drivetrain: 'AWD',
    motorTrendScore: 8.8,
    motorTrendRank: 2,
    motorTrendCategoryRank: 1
  }, {
    id: 'new-12',
    title: '2025 Rivian R1S',
    imageUrl: 'https://images.unsplash.com/photo-1666919643134-d97687c1826c?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3',
    price: '$78,000',
    category: 'Electric SUV',
    bodyStyle: 'SUV',
    year: '2025',
    horsepowerTorque: '835 hp',
    fuelType: 'Electric',
    drivetrain: 'AWD',
    motorTrendScore: 9.2,
    motorTrendRank: 1,
    motorTrendCategoryRank: 1
  }];
  const defaultUsedCars: CarData[] = [{
    id: 'used-1',
    title: '2023 Tesla Model 3 Long Range',
    imageUrl: 'https://d2kde5ohu8qb21.cloudfront.net/files/6700323d9326e80008726afc/018-2025-rivian-r1s-dual-max.jpg',
    price: '$38,995',
    category: 'Electric',
    bodyStyle: 'Sedan',
    year: '2023',
    horsepowerTorque: '346 hp',
    fuelType: 'Electric',
    drivetrain: 'AWD',
    motorTrendScore: 8.5,
    motorTrendRank: 4,
    motorTrendCategoryRank: 2,
    mileage: '27,540',
    location: 'Scottsdale, AZ'
  }, {
    id: 'used-2',
    title: '2022 BMW M3 Competition',
    imageUrl: 'https://d2kde5ohu8qb21.cloudfront.net/files/65c756c95279ce0008c1d934/2022-bmw-m3-competition-awd-14.jpg',
    price: '$69,900',
    category: 'Luxury Sports Sedan',
    bodyStyle: 'Sedan',
    year: '2022',
    horsepowerTorque: '503 hp',
    fuelType: 'Premium Gasoline',
    drivetrain: 'RWD',
    motorTrendScore: 9.0,
    motorTrendRank: 2,
    motorTrendCategoryRank: 1,
    mileage: '18,750',
    location: 'Miami, FL'
  }, {
    id: 'used-3',
    title: '2021 Porsche Taycan 4S',
    imageUrl: 'https://d2kde5ohu8qb21.cloudfront.net/files/65c7d839b8c39c0008f85a5d/2021-porsche-taycan-4s-4.jpg',
    price: '$84,995',
    category: 'Electric Performance',
    bodyStyle: 'Sedan',
    year: '2021',
    horsepowerTorque: '562 hp',
    fuelType: 'Electric',
    drivetrain: 'AWD',
    motorTrendScore: 9.2,
    motorTrendRank: 1,
    motorTrendCategoryRank: 1,
    mileage: '22,105',
    location: 'Los Angeles, CA'
  }, {
    id: 'used-4',
    title: '2022 Audi RS7',
    imageUrl: 'https://d2kde5ohu8qb21.cloudfront.net/files/65a0604a505b900008c79973/2022-audi-rs7-exclusive-edition.jpg',
    price: '$112,500',
    category: 'Luxury Performance',
    bodyStyle: 'Sedan', // Changed from 'Sportback' to match allowed types
    year: '2022',
    horsepowerTorque: '591 hp',
    fuelType: 'Premium Gasoline',
    drivetrain: 'AWD',
    motorTrendScore: 8.9,
    motorTrendRank: 3,
    motorTrendCategoryRank: 2,
    mileage: '15,620',
    location: 'Chicago, IL'
  }, {
    id: 'used-5',
    title: '2020 Chevrolet Corvette C8',
    imageUrl: 'https://d2kde5ohu8qb21.cloudfront.net/files/65caec805279ce00085232ac/2020-chevrolet-corvette-c8-front-three-quarter-1.jpg',
    price: '$72,990',
    category: 'Sports Car',
    bodyStyle: 'Coupe',
    year: '2020',
    horsepowerTorque: '495 hp',
    fuelType: 'Premium Gasoline',
    drivetrain: 'RWD',
    motorTrendScore: 9.1,
    motorTrendRank: 1,
    motorTrendCategoryRank: 1,
    mileage: '24,780',
    location: 'Houston, TX'
  }, {
    id: 'used-6',
    title: '2022 Ford Mustang Mach-E GT',
    imageUrl: 'https://d2kde5ohu8qb21.cloudfront.net/files/659f10463791830008482e3b/2021-ford-mustang-mach-e-gt-pvoty22-17.jpg',
    price: '$59,995',
    category: 'Electric SUV',
    bodyStyle: 'SUV',
    year: '2022',
    horsepowerTorque: '480 hp',
    fuelType: 'Electric',
    drivetrain: 'AWD',
    motorTrendScore: 8.7,
    motorTrendRank: 3,
    motorTrendCategoryRank: 2,
    mileage: '19,450',
    location: 'Seattle, WA'
  }, {
    id: 'used-7',
    title: '2021 Lexus LC 500',
    imageUrl: 'https://d2kde5ohu8qb21.cloudfront.net/files/65c3be99c42fd50008f653b8/2021-lexus-lc-500-convertible-2.jpg',
    price: '$78,900',
    category: 'Luxury Sports Car',
    bodyStyle: 'Coupe',
    year: '2021',
    horsepowerTorque: '471 hp',
    fuelType: 'Premium Gasoline',
    drivetrain: 'RWD',
    motorTrendScore: 8.8,
    motorTrendRank: 2,
    motorTrendCategoryRank: 1,
    mileage: '16,820',
    location: 'Denver, CO'
  }, {
    id: 'used-8',
    title: '2022 Mercedes-AMG E63 S',
    imageUrl: 'https://d2kde5ohu8qb21.cloudfront.net/files/65b2b969e2114d000968bcc5/2022-mercedes-amg-black-series-nurburgring-record-14.jpg',
    price: '$98,500',
    category: 'Luxury Performance',
    bodyStyle: 'Sedan',
    year: '2022',
    horsepowerTorque: '603 hp',
    fuelType: 'Premium Gasoline',
    drivetrain: 'AWD',
    motorTrendScore: 9.0,
    motorTrendRank: 2,
    motorTrendCategoryRank: 1,
    mileage: '14,320',
    location: 'Atlanta, GA'
  }, {
    id: 'used-9',
    title: '2021 Volkswagen Golf R',
    imageUrl: 'https://d2kde5ohu8qb21.cloudfront.net/files/680fea874a0f450008c6b797/27-2025-volkswagen-golf-r-black-first-drive.jpg',
    price: '$42,995',
    category: 'Hot Hatch',
    bodyStyle: 'Hatchback',
    year: '2021',
    horsepowerTorque: '315 hp',
    fuelType: 'Premium Gasoline',
    drivetrain: 'AWD',
    motorTrendScore: 8.6,
    motorTrendRank: 3,
    motorTrendCategoryRank: 1,
    mileage: '28,450',
    location: 'Portland, OR'
  }, {
    id: 'used-10',
    title: '2020 Toyota Supra',
    imageUrl: 'https://d2kde5ohu8qb21.cloudfront.net/files/65dc5e41915e0300087609b7/2020-toyota-gr-supra-09.jpg',
    price: '$49,995',
    category: 'Sports Car',
    bodyStyle: 'Coupe',
    year: '2020',
    horsepowerTorque: '335 hp',
    fuelType: 'Premium Gasoline',
    drivetrain: 'RWD',
    motorTrendScore: 8.4,
    motorTrendRank: 4,
    motorTrendCategoryRank: 2,
    mileage: '31,250',
    location: 'San Diego, CA'
  }, {
    id: 'used-11',
    title: '2022 Lucid Air Grand Touring',
    imageUrl: 'https://d2kde5ohu8qb21.cloudfront.net/files/65a4f63eed15000008b723b0/033-2022-lucid-air-touring-roadtrip-1.jpg',
    price: '$119,900',
    category: 'Electric Luxury',
    bodyStyle: 'Sedan',
    year: '2022',
    horsepowerTorque: '819 hp',
    fuelType: 'Electric',
    drivetrain: 'AWD',
    motorTrendScore: 9.3,
    motorTrendRank: 1,
    motorTrendCategoryRank: 1,
    mileage: '9,850',
    location: 'San Francisco, CA'
  }, {
    id: 'used-12',
    title: '2021 Dodge Challenger SRT Hellcat',
    imageUrl: 'https://d2kde5ohu8qb21.cloudfront.net/files/65a3274d05d2660008f06eda/jailbreak-2022-dodge-charger-challenger-srt-hellcat-redeye-widebody-3.jpg',
    price: '$64,995',
    category: 'Muscle Car',
    bodyStyle: 'Coupe',
    year: '2021',
    horsepowerTorque: '717 hp',
    fuelType: 'Premium Gasoline',
    drivetrain: 'RWD',
    motorTrendScore: 8.5,
    motorTrendRank: 3,
    motorTrendCategoryRank: 2,
    mileage: '22,780',
    location: 'Nashville, TN'
  }];

  // Use search results if available, otherwise show defaults
  const displayedNewCars = searchTerm ? displayedSearchResults : defaultNewCars;
  const displayedUsedCars = searchTerm ? displayedSearchResults : defaultUsedCars;
  return <div className="bg-gray-50 min-h-screen">
      <div className="max-w-[980px] mx-auto py-[32px] px-0">
        <h1 className="text-2xl font-bold mb-6">Buyer's Guide</h1>
        
        {/* Search and filters */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input placeholder="Search by make, model (e.g., VW, BMW, Ford)..." value={searchTerm} onChange={e => handleSearch(e.target.value)} className="pl-10 pr-4 py-2" />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowUpDown className="h-4 w-4" />
              Sort
            </Button>
          </div>
        </div>
        
        {/* Search results info */}
        {searchTerm && <div className="mb-4">
            <p className="text-sm text-gray-600">
              {apiLoading ? 'Searching...' : `Found ${displayedSearchResults.length} results for "${searchTerm}"`}
            </p>
            {!apiLoading && displayedSearchResults.length === 0 && <p className="text-sm text-orange-600 mt-1">
                No results found. Try searching for "volkswagen" instead of "vw" or other car makes like "bmw", "ford", "toyota".
              </p>}
          </div>}
        
        {/* Best time to buy */}
        
        
        <Tabs defaultValue="new" value={activeTab} onValueChange={value => setActiveTab(value as 'new' | 'used')}>
          <TabsList>
            <TabsTrigger value="new">New Cars</TabsTrigger>
            <TabsTrigger value="used">Used Cars</TabsTrigger>
          </TabsList>
          
          <TabsContent value="new" className="mt-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                {searchTerm ? `Search Results (${displayedNewCars.length})` : `New Vehicles (${displayedNewCars.length})`}
              </h2>
              <Badge variant="outline" className="text-xs">
                {searchTerm ? 'Live API Data' : 'Updated today'}
              </Badge>
            </div>
            
            {apiLoading ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="h-80 rounded-lg bg-gray-200 animate-pulse" />)}
              </div> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedNewCars.length > 0 ? displayedNewCars.map(car => <CarCard key={car.id} car={car} type="new" />) : <div className="col-span-full text-center py-12">
                    <p className="text-gray-500">
                      {searchTerm ? `No vehicles found for "${searchTerm}". Try searching for "volkswagen" instead of "vw", or other makes like "bmw", "ford", "toyota".` : 'No vehicles match your search criteria.'}
                    </p>
                  </div>}
              </div>}
          </TabsContent>
          
          <TabsContent value="used" className="mt-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                {searchTerm ? `Search Results (${displayedUsedCars.length})` : `Used Vehicles (${displayedUsedCars.length})`}
              </h2>
              <Badge variant="outline" className="text-xs">
                {searchTerm ? 'Live API Data' : 'Updated today'}
              </Badge>
            </div>
            
            {apiLoading ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map(i => <div key={i} className="h-80 rounded-lg bg-gray-200 animate-pulse" />)}
              </div> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedUsedCars.length > 0 ? displayedUsedCars.map(car => <CarCard key={car.id} car={car} type="used" />) : <div className="col-span-full text-center py-12">
                    <p className="text-gray-500">
                      {searchTerm ? `No vehicles found for "${searchTerm}". Try searching for "volkswagen" instead of "vw", or other makes like "bmw", "ford", "toyota".` : 'No vehicles match your search criteria.'}
                    </p>
                  </div>}
              </div>}
          </TabsContent>
        </Tabs>
      </div>
    </div>;
};
export default BuyersGuide;