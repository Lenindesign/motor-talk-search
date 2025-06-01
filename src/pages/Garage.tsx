import React, { useState, useEffect } from "react";
import { useSavedItems } from "../contexts/SavedItemsContext";
import PersonalizationDialog from "../components/PersonalizationDialog";
import ProfileSidebar from "../components/garage/ProfileSidebar";
import GarageContent from "../components/garage/GarageContent";
import MainLayout from "../components/MainLayout";
import GarageHeader from "../components/garage/GarageHeader";
import { useToast } from "@/hooks/use-toast";

// Mock MotorTrend data - in a real app would come from an API
const motorTrendData = {
  // Generate some mock data based on popular cars
  "Honda Civic": {
    score: 8.7,
    rank: 3,
    categoryRank: 1
  },
  "Toyota Camry": {
    score: 8.5,
    rank: 5,
    categoryRank: 2
  },
  "Honda Accord": {
    score: 8.8,
    rank: 2,
    categoryRank: 1,
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/679d37b47ff34400082301e7/19-2025-honda-accord-front-view.jpg"
  },
  "Toyota Corolla": {
    score: 8.3,
    rank: 7,
    categoryRank: 3
  },
  "Ford F-150": {
    score: 8.9,
    rank: 1,
    categoryRank: 1
  },
  "Chevrolet Silverado": {
    score: 8.6,
    rank: 4,
    categoryRank: 2
  },
  "Ram 1500": {
    score: 8.5,
    rank: 6,
    categoryRank: 3
  },
  "Tesla Model 3": {
    score: 8.7,
    rank: 3,
    categoryRank: 1
  },
  "Tesla Model Y": {
    score: 8.6,
    rank: 4,
    categoryRank: 2
  },
  "Jeep Wrangler": {
    score: 7.9,
    rank: 12,
    categoryRank: 4
  },
  "Subaru Outback": {
    score: 8.2,
    rank: 8,
    categoryRank: 2
  },
  "BMW 3 Series": {
    score: 8.5,
    rank: 6,
    categoryRank: 1
  },
  "Mercedes-Benz C-Class": {
    score: 8.4,
    rank: 7,
    categoryRank: 2
  },
  "Audi A4": {
    score: 8.3,
    rank: 8,
    categoryRank: 3
  },
  "Toyota RAV4": {
    score: 8.1,
    rank: 9,
    categoryRank: 3
  },
  "Honda CR-V": {
    score: 8.4,
    rank: 7,
    categoryRank: 1
  },
  "Mazda CX-5": {
    score: 8.3,
    rank: 8,
    categoryRank: 2
  },
  "Subaru Forester": {
    score: 8.0,
    rank: 10,
    categoryRank: 4
  },
  "Ford Mustang": {
    score: 8.2,
    rank: 9,
    categoryRank: 2
  },
  "Chevrolet Corvette": {
    score: 9.1,
    rank: 1,
    categoryRank: 1
  },
  "Porsche 911": {
    score: 9.0,
    rank: 2,
    categoryRank: 2
  },
  "Dodge Challenger": {
    score: 7.8,
    rank: 14,
    categoryRank: 3
  },
  "Toyota Sienna": {
    score: 8.3,
    rank: 8,
    categoryRank: 1
  },
  "Honda Odyssey": {
    score: 8.2,
    rank: 9,
    categoryRank: 2
  },
  "Chrysler Pacifica": {
    score: 8.0,
    rank: 11,
    categoryRank: 3
  },
  // For generics by make
  "Honda": {
    score: 8.2,
    rank: 8,
    categoryRank: 3
  },
  "Toyota": {
    score: 8.3,
    rank: 7,
    categoryRank: 2
  },
  "Ford": {
    score: 7.9,
    rank: 10,
    categoryRank: 5
  },
  "Chevrolet": {
    score: 7.8,
    rank: 11,
    categoryRank: 6
  },
  "BMW": {
    score: 8.4,
    rank: 6,
    categoryRank: 1
  },
  "Mercedes-Benz": {
    score: 8.3,
    rank: 7,
    categoryRank: 2
  },
  "Tesla": {
    score: 8.6,
    rank: 3,
    categoryRank: 1
  },
  "Audi": {
    score: 8.2,
    rank: 8,
    categoryRank: 3
  },
  "Lexus": {
    score: 8.5,
    rank: 5,
    categoryRank: 1
  },
  "Acura": {
    score: 8.0,
    rank: 9,
    categoryRank: 4
  }
};

// Helper function to get MT data for a car
const getMotorTrendDataForCar = (carTitle: string) => {
  // Look for exact match first
  if (motorTrendData[carTitle]) {
    return motorTrendData[carTitle];
  }

  // Look for make in the title
  for (const make in motorTrendData) {
    if (carTitle.toLowerCase().includes(make.toLowerCase())) {
      return motorTrendData[make];
    }
  }

  // Return default data if no match
  return {
    score: 7.5,
    rank: 20,
    categoryRank: 8
  };
};

const Garage = () => {
  const {
    savedItems,
    updateSavedItem
  } = useSavedItems();
  const [personalizationOpen, setPersonalizationOpen] = useState(false);
  const {
    toast
  } = useToast();

  // Mock user data - in a real app, this would come from auth context or API
  const userData = {
    name: localStorage.getItem("userName") || "John Driver",
    email: localStorage.getItem("userEmail") || "john.driver@example.com",
    avatar: "https://d2kde5ohu8qb21.cloudfront.net/files/6839e7e53277480008013d30/greg.jpg",
    joined: "January 2023"
  };

  // Effect to add MotorTrend data to all cars
  useEffect(() => {
    const savedCars = savedItems.filter(item => item.type === 'newCar' || item.type === 'usedCar');
    savedCars.forEach(car => {
      // Skip if already has MotorTrend data
      if (car.metadata?.motorTrendScore) return;
      const mtData = getMotorTrendDataForCar(car.title);

      // Update the car with MotorTrend data
      updateSavedItem(car.id, {
        metadata: {
          ...car.metadata,
          motorTrendScore: mtData.score,
          motorTrendRank: mtData.rank,
          motorTrendCategoryRank: mtData.categoryRank
        }
      });
    });
  }, [savedItems, updateSavedItem]);

  const handleSettingsClick = () => {
    // Navigate to profile page with settings tab active
    window.location.href = '/profile#settings';
  };

  return <MainLayout isGaragePage={true}>
      <div className="min-h-screen">
        {/* Responsive layout */}
        <div className="md:hidden px-0 py-0">
          <GarageContent />
        </div>

        {/* Desktop layout */}
        <div className="hidden md:block">
          <main className="max-w-[980px] mx-auto py-8 px-0">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Sidebar (ProfileSidebar + UserPoints) */}
              <aside className="w-full md:w-64 space-y-6">
                <ProfileSidebar 
                  userData={userData} 
                  savedItemsCount={savedItems.length} 
                  onPersonalizeClick={() => setPersonalizationOpen(true)}
                  onSettingsClick={handleSettingsClick}
                />
              </aside>
              
              {/* Main Content (GarageContent) */}
              <div className="flex-1">
                <GarageContent />
              </div>
            </div>
          </main>
        </div>

        {/* Personalization Dialog */}
        <PersonalizationDialog open={personalizationOpen} onOpenChange={setPersonalizationOpen} />
      </div>
    </MainLayout>;
};
export default Garage;
