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
import GlobalHeader from '../components/GlobalHeader';

const BuyersGuide: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'new' | 'used'>('new');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [newCars, setNewCars] = useState<CarData[]>([]);
  const [usedCars, setUsedCars] = useState<CarData[]>([]);

  // Simulate loading data
  useEffect(() => {
    const loadVehicles = async () => {
      setIsLoading(true);
      try {
        // In a real app, you'd fetch from an API here
        // For now, we're setting placeholder data
        setTimeout(() => {
          // These IDs now match the ones in vehicleService.ts
          setNewCars([
            {
              id: 'new-1',
              title: '2025 Ford Mustang GT',
              imageUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
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
            },
            {
              id: 'new-2',
              title: '2025 BMW i5 eDrive40',
              imageUrl: 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
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
            },
            {
              id: 'new-3',
              title: '2025 Toyota Crown Signia',
              imageUrl: 'https://images.unsplash.com/photo-1559416523-140ddc3d238c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
              price: '$42,500',
              category: 'Crossover',
              bodyStyle: 'SUV',
              year: '2025',
              horsepowerTorque: '236 hp',
              fuelType: 'Hybrid',
              drivetrain: 'AWD',
              motorTrendScore: 8.0,
              motorTrendRank: 5,
              motorTrendCategoryRank: 3
            },
            {
              id: 'new-4',
              title: '2025 Hyundai Ioniq 6 Limited',
              imageUrl: 'https://images.unsplash.com/photo-1617704548623-340376564e68?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
              price: '$52,150',
              category: 'Electric',
              bodyStyle: 'Sedan',
              year: '2025',
              horsepowerTorque: '320 hp',
              fuelType: 'Electric',
              drivetrain: 'AWD',
              motorTrendScore: 8.8,
              motorTrendRank: 3,
              motorTrendCategoryRank: 2
            }
          ]);
          
          setUsedCars([
            {
              id: 'used-1',
              title: '2022 Tesla Model 3 Long Range',
              imageUrl: 'https://images.unsplash.com/photo-1617704548623-340376564e68?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
              price: '$38,995',
              category: 'Electric',
              bodyStyle: 'Sedan',
              year: '2022',
              horsepowerTorque: '346 hp',
              fuelType: 'Electric',
              drivetrain: 'AWD',
              motorTrendScore: 8.5,
              motorTrendRank: 4,
              motorTrendCategoryRank: 2,
              mileage: '27,540',
              location: 'Scottsdale, AZ'
            },
            {
              id: 'used-2',
              title: '2021 Audi Q7 Premium Plus',
              imageUrl: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
              price: '$42,750',
              category: 'Luxury SUV',
              bodyStyle: 'SUV',
              year: '2021',
              horsepowerTorque: '335 hp',
              fuelType: 'Premium Gasoline',
              drivetrain: 'AWD',
              motorTrendScore: 8.2,
              motorTrendRank: 7,
              motorTrendCategoryRank: 4,
              mileage: '35,872',
              location: 'Denver, CO'
            },
            {
              id: 'used-3',
              title: '2020 Lexus ES 350 F Sport',
              imageUrl: 'https://images.unsplash.com/photo-1559416523-140ddc3d238c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
              price: '$32,495',
              category: 'Luxury Sedan',
              bodyStyle: 'Sedan',
              year: '2020',
              horsepowerTorque: '302 hp',
              fuelType: 'Premium Gasoline',
              drivetrain: 'FWD',
              motorTrendScore: 7.8,
              motorTrendRank: 12,
              motorTrendCategoryRank: 5,
              mileage: '42,150',
              location: 'Atlanta, GA'
            }
          ]);
          setIsLoading(false);
          
          // Show success toast
          toast.success('Vehicle data loaded successfully', {
            description: 'Click on any vehicle to see detailed information'
          });
        }, 800);
      } catch (error) {
        console.error('Error loading vehicles:', error);
        setIsLoading(false);
        
        // Show error toast
        toast.error('Error loading vehicles', {
          description: 'Please try again later'
        });
      }
    };

    loadVehicles();
  }, []);

  // Filter cars based on search term
  const filteredNewCars = newCars.filter(car => 
    car.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredUsedCars = usedCars.filter(car => 
    car.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <GlobalHeader onSearch={(query) => setSearchTerm(query)} isLoading={isLoading} />
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Buyer's Guide</h1>
        
        {/* Search and filters */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by make, model, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
              <h2 className="text-lg font-semibold">New Vehicles ({filteredNewCars.length})</h2>
              <Badge variant="outline" className="text-xs">
                Updated today
              </Badge>
            </div>
            
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="h-80 rounded-lg bg-gray-200 animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredNewCars.length > 0 ? (
                  filteredNewCars.map(car => (
                    <CarCard key={car.id} car={car} type="new" />
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <p className="text-gray-500">No vehicles match your search criteria.</p>
                  </div>
                )}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="used" className="mt-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Used Vehicles ({filteredUsedCars.length})</h2>
              <Badge variant="outline" className="text-xs">
                Updated today
              </Badge>
            </div>
            
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-80 rounded-lg bg-gray-200 animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredUsedCars.length > 0 ? (
                  filteredUsedCars.map(car => (
                    <CarCard key={car.id} car={car} type="used" />
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <p className="text-gray-500">No vehicles match your search criteria.</p>
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
