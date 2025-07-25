import React, { useState } from "react";
import PersonalizationDialog from "../components/PersonalizationDialog";
import ProfileSidebar from "../components/garage/ProfileSidebar";
import GarageContent from "../components/garage/GarageContent";
import MainLayout from "../components/MainLayout";
import { useToast } from "@/hooks/use-toast";
import { useGarageData } from "../hooks/useGarageData";
import { getUserData } from "../components/garage/UserData";
import Container from "@/components/Container";

const Garage = () => {
  const { savedItems } = useGarageData();
  const [personalizationOpen, setPersonalizationOpen] = useState(false);
  const { toast } = useToast();

  const userData = getUserData();

  const handleSettingsClick = () => {
    // Navigate to profile page with settings tab active
    window.location.href = '/profile#settings';
  };

  return (
    <MainLayout isGaragePage={true}>
      <div className="min-h-screen bg-neutral-7">
        <div className="bg-white rounded-xl shadow-sm border border-neutral-6 mx-auto max-w-[1024px] my-4">
          {/* Responsive layout */}
          <div className="md:hidden py-4">
            <GarageContent />
          </div>

          {/* Desktop layout */}
          <div className="hidden md:block py-8">
            <div className="flex flex-col md:flex-row gap-4 px-4">
              {/* Sidebar - 1/3 width */}
              <aside className="w-full md:w-1/3 px-4">
                <ProfileSidebar 
                  userData={userData} 
                  savedItemsCount={savedItems.length} 
                  onPersonalizeClick={() => setPersonalizationOpen(true)}
                  onSettingsClick={handleSettingsClick}
                />
              </aside>
              
              {/* Main Content - 2/3 width */}
              <div className="w-full md:w-2/3">
                <GarageContent />
              </div>
            </div>
          </div>
        </div>

        {/* Personalization Dialog */}
        <PersonalizationDialog 
          open={personalizationOpen} 
          onOpenChange={setPersonalizationOpen} 
        />
      </div>
    </MainLayout>
  );
};

export default Garage;
