
import React, { useState } from "react";
import { Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSavedItems, SavedItem } from "../../contexts/SavedItemsContext";
import GarageStats from "../GarageStats";
import GarageCarCard from "../CarCard";
import QuickAddCar from "../QuickAddCar";
import { CarData } from "../CarCard";

const GarageContent = () => {
  const { savedItems } = useSavedItems();
  
  // Filter only car items
  const savedCars = savedItems.filter(item => item.type === 'newCar' || item.type === 'usedCar');
  
  // Default tab is 'all'
  const [activeTab, setActiveTab] = useState<'all' | 'owned' | 'testDriven' | 'interested'>('all');

  // Helper function to convert SavedItem to CarData format expected by GarageCarCard
  const savedItemToCarData = (item: SavedItem): CarData => {
    return {
      id: item.id,
      title: item.title,
      imageUrl: item.imageUrl || '/placeholder.svg',
      price: item.metadata?.price || 'Contact dealer',
      category: item.metadata?.category || 'Car',
      year: item.metadata?.year,
      mileage: item.metadata?.mileage,
      fuelType: item.metadata?.fuelType,
      drivetrain: item.metadata?.drivetrain,
      location: item.metadata?.location,
      bodyStyle: item.metadata?.bodyStyle as any,
      isNew: item.type === 'newCar',
      
      // SUV specs
      cargoCapacity: item.metadata?.cargoCapacity,
      cargoCapacityFolded: item.metadata?.cargoCapacityFolded,
      passengerCapacity: item.metadata?.passengerCapacity,
      seatingConfiguration: item.metadata?.seatingConfiguration,
      
      // Sedan specs
      trunkCapacity: item.metadata?.trunkCapacity,
      safetyRating: item.metadata?.safetyRating,
      horsepowerTorque: item.metadata?.horsepowerTorque,
      
      // Truck specs
      towingCapacity: item.metadata?.towingCapacity,
      payloadCapacity: item.metadata?.payloadCapacity,
      bedDimensions: item.metadata?.bedDimensions,
      powertrainOptions: item.metadata?.powertrainOptions,
      
      // Sports Car specs
      zeroToSixty: item.metadata?.zeroToSixty,
      topSpeed: item.metadata?.topSpeed,
      weightPowerRatio: item.metadata?.weightPowerRatio,
      
      // Minivan specs
      slidingDoorFeatures: item.metadata?.slidingDoorFeatures,
      familyFeatures: item.metadata?.familyFeatures
    };
  };

  return (
    <Card className="shadow-sm flex-1">
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
                <GarageCarCard key={car.id} car={savedItemToCarData(car)} type={car.type === 'newCar' ? 'new' : 'used'} />
              ))}
              {savedCars.length === 0 && (
                <p className="text-center text-gray-500 py-8">No cars in your garage yet. Add some from the form below.</p>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="owned" className="mt-6">
            <div className="space-y-4">
              {savedCars
                .filter(car => car.metadata?.ownership === 'owned')
                .map(car => (
                  <GarageCarCard key={car.id} car={savedItemToCarData(car)} type={car.type === 'newCar' ? 'new' : 'used'} />
                ))}
              {savedCars.filter(car => car.metadata?.ownership === 'owned').length === 0 && (
                <p className="text-center text-gray-500 py-8">No owned cars yet. Add some from the form below.</p>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="testDriven" className="mt-6">
            <div className="space-y-4">
              {savedCars
                .filter(car => car.metadata?.ownership === 'testDriven')
                .map(car => (
                  <GarageCarCard key={car.id} car={savedItemToCarData(car)} type={car.type === 'newCar' ? 'new' : 'used'} />
                ))}
              {savedCars.filter(car => car.metadata?.ownership === 'testDriven').length === 0 && (
                <p className="text-center text-gray-500 py-8">No test driven cars yet. Add some from the form below.</p>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="interested" className="mt-6">
            <div className="space-y-4">
              {savedCars
                .filter(car => car.metadata?.ownership === 'interested')
                .map(car => (
                  <GarageCarCard key={car.id} car={savedItemToCarData(car)} type={car.type === 'newCar' ? 'new' : 'used'} />
                ))}
              {savedCars.filter(car => car.metadata?.ownership === 'interested').length === 0 && (
                <p className="text-center text-gray-500 py-8">No interested cars yet. Add some from the form below.</p>
              )}
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-8 pt-6 border-t">
          <h3 className="text-lg font-medium mb-4">Add another car</h3>
          <QuickAddCar activeTab={activeTab} />
        </div>
      </CardContent>
    </Card>
  );
};

export default GarageContent;
