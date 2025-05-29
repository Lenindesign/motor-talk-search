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
  return (
    <>
      <aside className="w-full md:w-64 space-y-6">
        <Card className="overflow-hidden">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <Avatar className="w-20 h-20 mb-4">
                <AvatarImage src={userData.avatar} alt={userData.name} className="object-cover" />
                <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-bold">{userData.name}</h2>
              <p className="text-sm text-gray-500 mt-1">Member since {userData.joined}</p>
              <div className="w-full mt-6 flex justify-between items-center">
                <span className="text-sm font-medium">Saved Items</span>
                <span className="font-bold">{savedItemsCount}</span>
              </div>
              <div className="w-full mt-4 space-y-3">
                <Link to="/profile" className="w-full block">
                  <Button variant="outline" size="sm" className="w-full flex items-center justify-center gap-2">
                    <User size={16} />
                    Profile
                  </Button>
                </Link>
                <Button variant="outline" size="sm" className="w-full flex items-center justify-center gap-2" onClick={onPersonalizeClick}>
                  <Palette size={16} />
                  Personalize
                </Button>
                <Button variant="outline" size="sm" className="w-full flex items-center justify-center gap-2">
                  <Settings size={16} />
                  Settings
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </aside>
      <UserPoints />
    </>
  );
};

export default ProfileSidebar;