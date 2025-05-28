import React from "react";
import { Link } from "react-router-dom";
import { User, Car, Settings, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import UserPoints from "../UserPoints";
interface ProfileSidebarProps {
  userData: {
    name: string;
    email: string;
    avatar: string;
    joined: string;
  };
  savedItemsCount: number;
  onPersonalizeClick: () => void;
}
const ProfileSidebar: React.FC<ProfileSidebarProps> = ({
  userData,
  savedItemsCount,
  onPersonalizeClick
}) => {
  return <aside className="w-full md:w-64 space-y-6">
      <Card>
        <CardHeader className="p-4 flex flex-row items-center gap-4 pb-2">
          <Avatar className="w-16 h-16">
            <AvatarImage src={userData.avatar} alt={userData.name} className="object-cover" />
            <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>{userData.name}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <p className="text-sm text-gray-500">Member since {userData.joined}</p>
          <div className="mt-4 flex justify-between">
            <span className="text-sm font-medium">Saved Items</span>
            <span className="text-sm font-bold">{savedItemsCount}</span>
          </div>
          <Button variant="outline" size="sm" className="w-full mt-4 flex items-center justify-center gap-2" onClick={onPersonalizeClick}>
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
    </aside>;
};
export default ProfileSidebar;