
import React, { useState, useMemo } from "react";
import { useSavedItems } from "../contexts/SavedItemsContext";
import PersonalizationDialog from "../components/PersonalizationDialog";
import GarageHeader from "../components/garage/GarageHeader";
import ProfileSidebar from "../components/garage/ProfileSidebar";
import GarageContent from "../components/garage/GarageContent";
import CarRankingList from "../components/CarRankingList";
import { CarScore } from "../components/CarScoreCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartBar } from "lucide-react";

const Garage = () => {
  const { savedItems } = useSavedItems();
  const [personalizationOpen, setPersonalizationOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("garage");
  
  // Mock user data - in a real app, this would come from auth context or API
  const userData = {
    name: localStorage.getItem("userName") || "John Driver",
    email: localStorage.getItem("userEmail") || "john.driver@example.com",
    avatar: "/lovable-uploads/930641e7-042c-4f43-a9f6-c81fa3a9a0c4.png",
    joined: "January 2023"
  };

  // Generate mock MotorTrend scores for each saved car
  // In a real app, this would come from an API
  const rankedCars = useMemo(() => {
    return savedItems.map(car => {
      // Generate a base score between 7-9
      const baseScore = 7 + Math.random() * 2;
      
      // Create a score object for each car
      const score: CarScore = {
        overall: parseFloat((baseScore + (Math.random() * 1.5 - 0.75)).toFixed(1)),
        performance: parseFloat((baseScore + (Math.random() * 2 - 1)).toFixed(1)),
        fuelEfficiency: parseFloat((baseScore + (Math.random() * 2 - 1)).toFixed(1)),
        safety: parseFloat((baseScore + (Math.random() * 2 - 1)).toFixed(1)),
        value: parseFloat((baseScore + (Math.random() * 2 - 1)).toFixed(1)),
        reliability: parseFloat((baseScore + (Math.random() * 2 - 1)).toFixed(1)),
        comfort: parseFloat((baseScore + (Math.random() * 2 - 1)).toFixed(1)),
        rankInClass: Math.floor(Math.random() * 10) + 1,
        totalInClass: Math.floor(Math.random() * 20) + 10
      };
      
      return {
        id: car.id,
        title: car.title,
        imageUrl: car.imageUrl,
        year: car.metadata?.year,
        bodyStyle: car.metadata?.bodyStyle,
        score
      };
    });
  }, [savedItems]);
  
  return (
    <div className="min-h-screen bg-white">
      <GarageHeader />

      <main className="max-w-[980px] mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="bg-gray-100">
            <TabsTrigger value="garage">My Garage</TabsTrigger>
            <TabsTrigger value="rankings" className="flex items-center gap-1">
              <ChartBar size={16} />
              MotorTrend Rankings
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="garage">
            <div className="flex flex-col md:flex-row gap-8">
              <ProfileSidebar 
                userData={userData} 
                savedItemsCount={savedItems.length} 
                onPersonalizeClick={() => setPersonalizationOpen(true)}
              />

              <GarageContent />
            </div>
          </TabsContent>
          
          <TabsContent value="rankings">
            {rankedCars.length > 0 ? (
              <CarRankingList 
                cars={rankedCars} 
                title="Your Garage - Ranked by MotorTrend" 
              />
            ) : (
              <div className="text-center py-20">
                <h3 className="text-xl font-medium mb-2">No cars in your garage yet</h3>
                <p className="text-gray-600">Add cars to see their MotorTrend rankings</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
      
      {/* Personalization Dialog */}
      <PersonalizationDialog open={personalizationOpen} onOpenChange={setPersonalizationOpen} />
    </div>
  );
};

export default Garage;
