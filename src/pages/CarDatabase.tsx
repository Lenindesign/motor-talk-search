import React, { useState } from 'react';
import type { CarData } from '@/components/CarCard';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import MainNavigation from "../components/MainNavigation";
import { useIsMobile } from "../hooks/use-mobile";
import SearchBar from "../components/SearchBar";
import CarSelectorApi from "../components/CarSelectorApi";
import { useToast } from "@/hooks/use-toast";
import { Database, Car, Search } from 'lucide-react';

const CarDatabase = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { toast } = useToast();
  
  const [selectedCar, setSelectedCar] = useState<{
    make: string | null;
    model: string | null;
    year: number | null;
    details?: CarData[];
  }>({
    make: null,
    model: null,
    year: null,
    details: []
  });

  const handleSelectionChange = (selection: { 
    make: string | null, 
    model: string | null, 
    year: number | null,
    details?: CarData[]
  }) => {
    setSelectedCar(selection);
  };

  const handleSearch = () => {
    if (selectedCar.make && selectedCar.model && selectedCar.year) {
      toast({
        title: "Car Selected",
        description: `You've selected a ${selectedCar.year} ${selectedCar.make} ${selectedCar.model}. Found ${selectedCar.details?.length || 0} configurations.`
      });
      // In a real application, you would navigate to a search results page or perform some action
    } else {
      toast({
        title: "Incomplete Selection",
        description: "Please select a make, model, and year before searching.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-motortrend-gray">
      <header className="sticky top-0 z-20 bg-motortrend-dark px-6 py-4 shadow-md">
        <div className="flex items-center justify-between mx-auto w-full">
          <div className="flex items-center">
            {isMobile && <MainNavigation />}
            <Link to="/" className="flex-shrink-0">
              <img src="/lovable-uploads/6f8fd40c-6013-4f96-89f0-8406d6febb7c.png" alt="MotorTrend Logo" className="h-7 w-auto" />
            </Link>
            <div className="hidden sm:flex ml-6">
              <MainNavigation />
            </div>
          </div>
          <div className="hidden sm:block ml-4">
            <SearchBar onSearch={query => navigate(`/?q=${query}`)} isLoading={false} variant="header" />
          </div>
        </div>
      </header>
      
      <main className="mx-auto px-2 sm:px-4 py-8">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold flex items-center">
            <Database className="mr-2" /> Car Database (API Powered)
          </h1>
          <Button onClick={() => navigate("/garage")} className="flex items-center gap-2">
            <Car size={16} />
            View Garage
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Find a Car (Real API Data)</CardTitle>
                <CardDescription>
                  Select a make, model, and year from our live car database API
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <CarSelectorApi onSelectionChange={handleSelectionChange} />
                
                <Button 
                  onClick={handleSearch} 
                  className="w-full flex items-center justify-center gap-2"
                  disabled={!selectedCar.make || !selectedCar.model || !selectedCar.year}
                >
                  <Search size={16} />
                  Search Inventory ({selectedCar.details?.length || 0} configurations)
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Live API Data</CardTitle>
                <CardDescription>
                  Real-time car data from API Ninjas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">
                  This database now uses live data from the API Ninjas Cars API, 
                  providing real-time information about car makes, models, years, 
                  and specifications.
                </p>
                <ul className="mt-4 space-y-2 text-sm">
                  <li className="flex items-center">
                    <span className="mr-2 h-2 w-2 rounded-full bg-green-500"></span>
                    Live Car Makes
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 h-2 w-2 rounded-full bg-blue-500"></span>
                    Real Model Data
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 h-2 w-2 rounded-full bg-amber-500"></span>
                    Current Model Years
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 h-2 w-2 rounded-full bg-purple-500"></span>
                    Technical Specifications
                  </li>
                </ul>
                
                {selectedCar.details && selectedCar.details.length > 0 && (
                  <div className="mt-4 p-3 border rounded bg-green-50">
                    <h4 className="font-medium text-sm mb-2">Selected Car Info:</h4>
                    <p className="text-xs">
                      {selectedCar.year} {selectedCar.make} {selectedCar.model}
                    </p>
                    <p className="text-xs text-gray-600">
                      {selectedCar.details.length} configuration(s) available
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CarDatabase;
