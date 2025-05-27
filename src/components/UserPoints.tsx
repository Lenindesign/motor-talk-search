import React from "react";
import { useSavedItems } from "../contexts/SavedItemsContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
const UserPoints = () => {
  const {
    userPoints
  } = useSavedItems();

  // Calculate level based on points
  // This is a simple formula, can be adjusted as needed
  const level = Math.floor(Math.sqrt(userPoints) / 2) + 1;

  // Calculate progress to next level
  const pointsForCurrentLevel = Math.pow((level - 1) * 2, 2);
  const pointsForNextLevel = Math.pow(level * 2, 2);
  const pointsRange = pointsForNextLevel - pointsForCurrentLevel;
  const pointsProgress = userPoints - pointsForCurrentLevel;
  const progressPercentage = pointsProgress / pointsRange * 100;

  // Get rank title based on level
  const rankTitle = getRankTitle(level);
  return <Card className="bg-gradient-to-br from-motortrend-dark to-motortrend-red text-white">
      <CardHeader className="">
        <CardTitle className="flex items-center justify-between">
          <span className="text-slate-50">Your Progress</span>
          <span className="text-2xl font-bold text-slate-50">{userPoints} pts</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Level {level}</span>
              <span>Level {level + 1}</span>
            </div>
            <Progress value={progressPercentage} className="h-2 bg-white/20" />
          </div>
          
          <div className="bg-white/10 p-3 rounded-md text-center">
            <p className="text-sm opacity-80">Your Rank</p>
            <h3 className="text-xl font-bold">{rankTitle}</h3>
          </div>
          
          <div className="text-xs">
            <p>Keep saving items and interacting with content to earn more points!</p>
          </div>
        </div>
      </CardContent>
    </Card>;
};
const getRankTitle = (level: number) => {
  if (level === 1) return 'Novice Driver';
  if (level === 2) return 'Casual Cruiser';
  if (level === 3) return 'Road Tripper';
  if (level === 4) return 'Speed Enthusiast';
  if (level === 5) return 'Track Day Hero';
  if (level === 6) return 'Racing Expert';
  if (level === 7) return 'Automotive Aficionado';
  if (level === 8) return 'Motor Master';
  if (level === 9) return 'Ultimate Gearhead';
  if (level >= 10) return 'MotorTrend Legend';
  return 'Unknown Rank';
};
export default UserPoints;