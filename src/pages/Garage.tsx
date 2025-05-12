
import React, { useState } from "react";
import { useSavedItems } from "../contexts/SavedItemsContext";
import PersonalizationDialog from "../components/PersonalizationDialog";
import GarageHeader from "../components/garage/GarageHeader";
import ProfileSidebar from "../components/garage/ProfileSidebar";
import GarageContent from "../components/garage/GarageContent";

const Garage = () => {
  const { savedItems } = useSavedItems();
  const [personalizationOpen, setPersonalizationOpen] = useState(false);
  
  // Mock user data - in a real app, this would come from auth context or API
  const userData = {
    name: localStorage.getItem("userName") || "John Driver",
    email: localStorage.getItem("userEmail") || "john.driver@example.com",
    avatar: "/lovable-uploads/930641e7-042c-4f43-a9f6-c81fa3a9a0c4.png",
    joined: "January 2023"
  };
  
  return (
    <div className="min-h-screen bg-white">
      <GarageHeader />

      <main className="max-w-[980px] mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <ProfileSidebar 
            userData={userData} 
            savedItemsCount={savedItems.length} 
            onPersonalizeClick={() => setPersonalizationOpen(true)}
          />

          <GarageContent />
        </div>
      </main>
      
      {/* Personalization Dialog */}
      <PersonalizationDialog open={personalizationOpen} onOpenChange={setPersonalizationOpen} />
    </div>
  );
};

export default Garage;
