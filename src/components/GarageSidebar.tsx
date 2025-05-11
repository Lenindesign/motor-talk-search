
import React from "react";
import { User, Settings, Car } from "lucide-react";
import { Link } from "react-router-dom";
import { useSavedItems } from "../contexts/SavedItemsContext";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const GarageSidebar = () => {
  const { savedItems, userPoints } = useSavedItems();
  const carItems = savedItems.filter(item => item.type === 'newCar' || item.type === 'usedCar');
  
  // Calculate level based on points (simplified logic)
  const currentLevel = Math.floor(userPoints / 20) + 1;
  const nextLevel = currentLevel + 1;
  const progressToNextLevel = (userPoints % 20) / 20 * 100;
  
  // Determine rank based on points
  const getUserRank = (points: number) => {
    if (points < 50) return "Beginner";
    if (points < 100) return "Car Enthusiast";
    if (points < 200) return "Racing Expert";
    return "Automotive Master";
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-[280px]">
      {/* User Profile Card */}
      <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
        <div className="w-16 h-16 rounded-full overflow-hidden mb-2">
          <img 
            src="/lovable-uploads/5b8a120c-3d52-41cb-8e20-9a16e6b9bf6a.png" 
            alt="User Profile" 
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-xl font-bold">John Driver</h3>
        <p className="text-gray-500 text-sm mb-4">Member since January 2023</p>
        
        <div className="w-full flex justify-between items-center mb-2">
          <span className="text-gray-600">Saved items</span>
          <span className="font-bold">{carItems.length}</span>
        </div>
        
        <Button variant="outline" className="w-full flex items-center justify-center gap-2">
          <span>Personalize</span>
        </Button>
      </div>
      
      {/* Progress Card */}
      <div className="bg-gradient-to-br from-red-800 to-red-700 text-white rounded-lg shadow p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-bold">Your Progress</h3>
          <span className="font-bold text-xl">{userPoints} pts</span>
        </div>
        
        <div className="flex justify-between text-sm mb-1">
          <span>Level {currentLevel}</span>
          <span>Level {nextLevel}</span>
        </div>
        
        <Progress value={progressToNextLevel} className="h-2 mb-4 bg-white/20" />
        
        <div className="mt-3">
          <p className="text-sm mb-1">Your Rank</p>
          <h4 className="text-xl font-bold mb-3">{getUserRank(userPoints)}</h4>
          <p className="text-xs">
            Keep saving items and interacting with content to earn more points!
          </p>
        </div>
      </div>
      
      {/* Navigation Links */}
      <div className="bg-white rounded-lg shadow">
        <Link to="/profile" className="flex items-center gap-3 p-4 hover:bg-gray-100 transition-colors">
          <User size={20} />
          <span>Profile</span>
        </Link>
        <Link to="/garage" className="flex items-center gap-3 p-4 hover:bg-gray-100 transition-colors bg-gray-100">
          <Car size={20} />
          <span>My Garage</span>
        </Link>
        <Link to="/settings" className="flex items-center gap-3 p-4 hover:bg-gray-100 transition-colors">
          <Settings size={20} />
          <span>Settings</span>
        </Link>
      </div>
    </div>
  );
};

export default GarageSidebar;
