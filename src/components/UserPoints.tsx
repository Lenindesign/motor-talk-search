
import React from "react";
import { Trophy, ChevronUp, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface UserPointsProps {
  className?: string;
}

const UserPoints: React.FC<UserPointsProps> = ({ className }) => {
  // Mock data - in real app, this would come from user context/API
  const userPoints = 1250;
  const nextLevelPoints = 2000;
  const currentLevel = 3;
  const recentPoints = [
    { activity: "Car review", points: 50, date: "2 days ago" },
    { activity: "Daily login", points: 10, date: "Yesterday" },
    { activity: "Added car to garage", points: 25, date: "Today" },
  ];
  
  // Calculate progress percentage
  const progressPercentage = (userPoints / nextLevelPoints) * 100;
  
  return (
    <Card className={cn("border-0 shadow-sm overflow-hidden", className)}>
      <CardHeader className="pb-2 bg-gradient-to-r from-amber-500 to-amber-400 text-white">
        <CardTitle className="text-base flex items-center">
          <Trophy className="mr-2 h-5 w-5" />
          Driver Status
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <div className="bg-amber-500 text-white p-2 rounded-full mr-2">
              <Award className="h-4 w-4" />
            </div>
            <span className="font-medium">Level {currentLevel}</span>
          </div>
          <span className="text-sm font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
            {userPoints} pts
          </span>
        </div>
        
        <div className="space-y-1 mb-4">
          <div className="flex justify-between text-xs text-gray-600">
            <span>Progress to Level {currentLevel + 1}</span>
            <span>{userPoints}/{nextLevelPoints}</span>
          </div>
          <Progress value={progressPercentage} className="h-2 bg-gray-100" indicatorClassName="bg-amber-500" />
        </div>
        
        <div>
          <h4 className="text-xs font-medium text-gray-500 mb-2">RECENT ACTIVITY</h4>
          <ul className="space-y-2">
            {recentPoints.map((item, index) => (
              <li key={index} className="flex items-center justify-between text-sm">
                <span>{item.activity}</span>
                <span className="font-medium text-amber-600 flex items-center">
                  <ChevronUp className="h-3 w-3 text-green-500 mr-0.5" />
                  {item.points}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserPoints;
