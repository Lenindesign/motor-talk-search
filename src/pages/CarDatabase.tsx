
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import MainNavigation from "../components/MainNavigation";
import { useIsMobile } from "../hooks/use-mobile";
import SearchBar from "../components/SearchBar";
import CarSelector from "../components/CarSelector";
import { useToast } from "@/hooks/use-toast";
import { Database, Car, Search } from 'lucide-react';

const CarDatabase = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { toast } = useToast();
  
  const [selectedCar, setSelectedCar] = useState<{
    makeId: string | null;
    modelId: string | null;
    year: number | null;
  }>({
    makeId: null,
    modelId: null,
    year: null
  });

  const handleSelectionChange = (selection: { makeId: string | null, modelId: string | null, year: number | null }) => {
    setSelectedCar(selection);
  };

  const handleSearch = () => {
    if (selectedCar.makeId && selectedCar.modelId && selectedCar.year) {
      toast({
        title: "Car Selected",
        description: `You've selected a ${selectedCar.year} car. In a real app, this would search for this vehicle.`
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
        <div className="flex items-center justify-between max-w-[980px] mx-auto w-full">
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
      
      <main className="max-w-[980px] mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold flex items-center">
            <Database className="mr-2" /> Car Database
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
                <CardTitle>Find a Car</CardTitle>
                <CardDescription>
                  Select a make, model, and year from our database
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <CarSelector onSelectionChange={handleSelectionChange} />
                
                <Button 
                  onClick={handleSearch} 
                  className="w-full flex items-center justify-center gap-2"
                  disabled={!selectedCar.makeId || !selectedCar.modelId || !selectedCar.year}
                >
                  <Search size={16} />
                  Search Inventory
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Database Info</CardTitle>
                <CardDescription>
                  Our car database is powered by Supabase
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">
                  This database contains information about various car makes, models, and years.
                  The data is stored in Supabase and accessed via a React application.
                </p>
                <ul className="mt-4 space-y-2 text-sm">
                  <li className="flex items-center">
                    <span className="mr-2 h-2 w-2 rounded-full bg-green-500"></span>
                    Car Makes
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 h-2 w-2 rounded-full bg-blue-500"></span>
                    Car Models
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 h-2 w-2 rounded-full bg-amber-500"></span>
                    Model Years
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CarDatabase;
