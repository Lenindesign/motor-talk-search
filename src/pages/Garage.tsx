
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Car, User, Settings, Bookmark, Save, Palette, Activity, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSavedItems, SavedItem } from "../contexts/SavedItemsContext";
import MainNavigation from "../components/MainNavigation";
import { useIsMobile } from "../hooks/use-mobile";
import SearchBar from "../components/SearchBar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { usePersonalization } from "../contexts/PersonalizationContext";
import PersonalizationDialog from "../components/PersonalizationDialog";

import EmptyGarage from "../components/EmptyGarage";
import QuickAddCar from "../components/QuickAddCar";
import GarageStats from "../components/GarageStats";
import GarageCarCard from "../components/CarCard"; // Reusing existing component
import UserPoints from "../components/UserPoints";

const Garage = () => {
  const { savedItems } = useSavedItems();
  const isMobile = useIsMobile();
  const [personalizationOpen, setPersonalizationOpen] = useState(false);
  
  // Filter only car items
  const savedCars = savedItems.filter(item => item.type === 'newCar' || item.type === 'usedCar');
  
  // Default tab is 'all'
  const [activeTab, setActiveTab] = useState<'all' | 'owned' | 'testDriven' | 'interested'>('all');

  // Mock user data - in a real app, this would come from auth context or API
  const userData = {
    name: localStorage.getItem("userName") || "John Driver",
    email: localStorage.getItem("userEmail") || "john.driver@example.com",
    avatar: "/lovable-uploads/5b8a120c-3d52-41cb-8e20-9a16e6b9bf6a.png",
    joined: "January 2023"
  };

  // Helper function to convert SavedItem to CarData format expected by GarageCarCard
  const savedItemToCarData = (item: SavedItem) => {
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
      isNew: item.type === 'newCar'
    };
  };
  
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

      <main className="max-w-[980px] mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Profile Sidebar - using the same structure as in Profile.tsx */}
          <aside className="w-full md:w-64 space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={userData.avatar} alt={userData.name} className="object-cover" />
                  <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{userData.name}</CardTitle>
                  
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">Member since {userData.joined}</p>
                <div className="mt-4 flex justify-between">
                  <span className="text-sm font-medium">Saved Items</span>
                  <span className="text-sm font-bold">{savedItems.length}</span>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4 flex items-center justify-center gap-2" onClick={() => setPersonalizationOpen(true)}>
                  <Palette size={16} />
                  Personalize
                </Button>
              </CardContent>
            </Card>
            
            <UserPoints />
            
            <Card>
              <CardContent className="p-4">
                <nav className="space-y-2">
                  <Link to="/profile" className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 w-full">
                    <User size={18} />
                    Profile
                  </Link>
                  <Link to="/garage" className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium bg-motortrend-dark text-white w-full">
                    <Car size={18} />
                    My Garage
                  </Link>
                  <button className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 w-full">
                    <Settings size={18} />
                    Settings
                  </button>
                </nav>
              </CardContent>
            </Card>
          </aside>

          {/* Main content */}
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
                          <GarageCarCard key={car.id} car={savedItemToCarData(car)} type={car.type === 'newCar' ? 'new' : 'used'} />
                        ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="owned" className="mt-6">
                      <div className="space-y-4">
                        {savedCars
                          .filter(car => car.metadata?.ownership === 'owned')
                          .map(car => (
                            <GarageCarCard key={car.id} car={savedItemToCarData(car)} type={car.type === 'newCar' ? 'new' : 'used'} />
                          ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="testDriven" className="mt-6">
                      <div className="space-y-4">
                        {savedCars
                          .filter(car => car.metadata?.ownership === 'testDriven')
                          .map(car => (
                            <GarageCarCard key={car.id} car={savedItemToCarData(car)} type={car.type === 'newCar' ? 'new' : 'used'} />
                          ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="interested" className="mt-6">
                      <div className="space-y-4">
                        {savedCars
                          .filter(car => car.metadata?.ownership === 'interested')
                          .map(car => (
                            <GarageCarCard key={car.id} car={savedItemToCarData(car)} type={car.type === 'newCar' ? 'new' : 'used'} />
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
        </div>
      </main>
      
      {/* Personalization Dialog */}
      <PersonalizationDialog open={personalizationOpen} onOpenChange={setPersonalizationOpen} />
    </div>
  );
};

export default Garage;
