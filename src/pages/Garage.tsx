
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSavedItems, SavedItem } from "../contexts/SavedItemsContext";
import MainNavigation from "../components/MainNavigation";
import { useIsMobile } from "../hooks/use-mobile";
import SearchBar from "../components/SearchBar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import EmptyGarage from "../components/EmptyGarage";
import QuickAddCar from "../components/QuickAddCar";
import GarageStats from "../components/GarageStats";
import GarageCarCard from "../components/CarCard"; // Reusing existing component

const Garage = () => {
  const { savedItems } = useSavedItems();
  const isMobile = useIsMobile();
  
  // Filter only car items
  const savedCars = savedItems.filter(item => item.type === 'newCar' || item.type === 'usedCar');
  
  // Default tab is 'all'
  const [activeTab, setActiveTab] = useState<'all' | 'owned' | 'testDriven' | 'interested'>('all');
  
  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-20 bg-motortrend-dark px-6 py-4 shadow-md">
        <div className="flex items-center justify-between max-w-[980px] mx-auto w-full">
          <div className="flex items-center">
            {isMobile && <MainNavigation />}
            <Link to="/" className="flex-shrink-0">
              <img src="/lovable-uploads/6f8fd40c-6013-4f96-89f0-8406d6febb7c.png" alt="MotorTrend Logo" className="h-7 w-auto hover:opacity-80 transition-opacity" />
            </Link>
            <div className="hidden sm:flex ml-6">
              <MainNavigation />
            </div>
          </div>
          <div className="hidden sm:block ml-4">
            <SearchBar onSearch={query => console.log(query)} isLoading={false} variant="header" />
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row justify-between items-center pb-2">
            <div>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Car size={22} />
                My Garage
              </CardTitle>
              <CardDescription>
                View and manage your saved vehicles
              </CardDescription>
            </div>
            <Button onClick={() => window.location.href = "/"}>
              Browse Cars
            </Button>
          </CardHeader>

          <CardContent>
            {savedCars.length > 0 ? (
              <>
                <GarageStats />
                
                <Tabs 
                  defaultValue="all" 
                  value={activeTab} 
                  onValueChange={(value) => setActiveTab(value as 'all' | 'owned' | 'testDriven' | 'interested')}
                  className="mt-6"
                >
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="owned">Owned</TabsTrigger>
                    <TabsTrigger value="testDriven">Test Driven</TabsTrigger>
                    <TabsTrigger value="interested">Interested</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="all" className="mt-6">
                    <div className="space-y-4">
                      {savedCars.map(car => (
                        <GarageCarCard key={car.id} car={car} type={car.type === 'newCar' ? 'new' : 'used'} />
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="owned" className="mt-6">
                    <div className="space-y-4">
                      {savedCars
                        .filter(car => car.metadata?.ownership === 'owned')
                        .map(car => (
                          <GarageCarCard key={car.id} car={car} type={car.type === 'newCar' ? 'new' : 'used'} />
                        ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="testDriven" className="mt-6">
                    <div className="space-y-4">
                      {savedCars
                        .filter(car => car.metadata?.ownership === 'testDriven')
                        .map(car => (
                          <GarageCarCard key={car.id} car={car} type={car.type === 'newCar' ? 'new' : 'used'} />
                        ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="interested" className="mt-6">
                    <div className="space-y-4">
                      {savedCars
                        .filter(car => car.metadata?.ownership === 'interested')
                        .map(car => (
                          <GarageCarCard key={car.id} car={car} type={car.type === 'newCar' ? 'new' : 'used'} />
                        ))}
                    </div>
                  </TabsContent>
                </Tabs>
                
                <div className="mt-8 pt-6 border-t">
                  <h3 className="text-lg font-medium mb-4">Add another car</h3>
                  <QuickAddCar />
                </div>
              </>
            ) : (
              <div className="py-6">
                <EmptyGarage />
                <div className="mt-8">
                  <QuickAddCar />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Garage;
