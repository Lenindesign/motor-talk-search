
import React from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { User, Car, Settings } from "lucide-react";
import GarageCompare from "../GarageCompare";
import { SavedItem } from "../../contexts/SavedItemsContext";

interface UserData {
  name: string;
  email: string;
  avatar: string;
  joined: string;
}

interface ProfileSidebarProps {
  userData: UserData;
  savedCars: SavedItem[];
  countByOwnership: (type: string) => number;
  selectedCars: string[];
  onToggleCar: (id: string) => void;
  onCompare: () => void;
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({
  userData,
  savedCars,
  countByOwnership,
  selectedCars,
  onToggleCar,
  onCompare
}) => {
  return (
    <aside className="w-full md:w-64 space-y-6">
      <Card className="transition-shadow hover:shadow-md">
        <CardHeader className="flex flex-row items-center gap-4 pb-2">
          <Avatar className="w-16 h-16 transition-transform hover:scale-105">
            <AvatarImage src={userData.avatar} alt={userData.name} className="object-cover" />
            <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>{userData.name}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500">Member since {userData.joined}</p>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Cars in Garage</span>
              <span className="text-sm font-bold">{savedCars.length}</span>
            </div>
            <div className="text-xs grid grid-cols-3 gap-1">
              <div className="flex flex-col items-center p-1 rounded-md bg-green-50">
                <span className="font-semibold text-green-800">{countByOwnership('owned')}</span>
                <span className="text-green-600">Owned</span>
              </div>
              <div className="flex flex-col items-center p-1 rounded-md bg-blue-50">
                <span className="font-semibold text-blue-800">{countByOwnership('testDriven')}</span>
                <span className="text-blue-600">Test Driven</span>
              </div>
              <div className="flex flex-col items-center p-1 rounded-md bg-amber-50">
                <span className="font-semibold text-amber-800">{countByOwnership('interested')}</span>
                <span className="text-amber-600">Interested</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="transition-shadow hover:shadow-md">
        <CardContent className="p-4">
          <nav className="space-y-2">
            <Link to="/profile" className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 w-full transition-colors">
              <User size={18} />
              Profile
            </Link>
            <Link to="/garage" className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium bg-motortrend-dark text-white w-full">
              <Car size={18} />
              My Garage
            </Link>
            <button className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 w-full transition-colors">
              <Settings size={18} />
              Settings
            </button>
          </nav>
        </CardContent>
      </Card>
      
      {savedCars.length > 0 && (
        <GarageCompare 
          savedCars={savedCars}
          selectedCars={selectedCars}
          onToggleCar={onToggleCar}
          onCompare={onCompare}
        />
      )}
    </aside>
  );
};

export default ProfileSidebar;
