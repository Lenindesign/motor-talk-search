
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
  const { data: apiSearchResults, isLoading: apiLoading } = useCarSearchApi(searchTerm);

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
    imageUrl: 'https://images.unsplash.com/photo-1494976688602-30db25b13217?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3',
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
  }];

  const defaultUsedCars: CarData[] = [{
    id: 'used-1',
    title: '2023 Tesla Model 3 Long Range',
    imageUrl: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3',
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
  }];

  // Use search results if available, otherwise show defaults
  const displayedNewCars = searchTerm ? displayedSearchResults : defaultNewCars;
  const displayedUsedCars = searchTerm ? displayedSearchResults : defaultUsedCars;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-[980px] mx-auto py-[32px] px-0">
        <h1 className="text-2xl font-bold mb-6">Buyer's Guide</h1>
        
        {/* Search and filters */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search by make, model (e.g., VW, BMW, Ford)..." 
                value={searchTerm} 
                onChange={(e) => handleSearch(e.target.value)} 
                className="pl-10 pr-4 py-2" 
              />
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
        {searchTerm && (
          <div className="mb-4">
            <p className="text-sm text-gray-600">
              {apiLoading ? 'Searching...' : `Found ${displayedSearchResults.length} results for "${searchTerm}"`}
            </p>
            {!apiLoading && displayedSearchResults.length === 0 && (
              <p className="text-sm text-orange-600 mt-1">
                No results found. Try searching for "volkswagen" instead of "vw" or other car makes like "bmw", "ford", "toyota".
              </p>
            )}
          </div>
        )}
        
        {/* Best time to buy */}
        <Card className="mb-6 border-green-200 bg-green-50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-green-800 text-lg">
              <Calendar className="h-5 w-5 mr-2 text-green-600" />
              Best Time to Buy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-green-800">
              Current market conditions show that May is a great time to buy. 
              Dealers are offering an average of 7% below MSRP on select models to clear inventory.
            </p>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="new" value={activeTab} onValueChange={(value) => setActiveTab(value as 'new' | 'used')}>
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
            
            {apiLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-80 rounded-lg bg-gray-200 animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedNewCars.length > 0 ? (
                  displayedNewCars.map((car) => (
                    <CarCard key={car.id} car={car} type="new" />
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <p className="text-gray-500">
                      {searchTerm ? `No vehicles found for "${searchTerm}". Try searching for "volkswagen" instead of "vw", or other makes like "bmw", "ford", "toyota".` : 'No vehicles match your search criteria.'}
                    </p>
                  </div>
                )}
              </div>
            )}
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
            
            {apiLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-80 rounded-lg bg-gray-200 animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedUsedCars.length > 0 ? (
                  displayedUsedCars.map((car) => (
                    <CarCard key={car.id} car={car} type="used" />
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <p className="text-gray-500">
                      {searchTerm ? `No vehicles found for "${searchTerm}". Try searching for "volkswagen" instead of "vw", or other makes like "bmw", "ford", "toyota".` : 'No vehicles match your search criteria.'}
                    </p>
                  </div>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BuyersGuide;
