
import React from "react";
import { useSavedItems } from "../contexts/SavedItemsContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const UserPoints = () => {
  const { userPoints } = useSavedItems();

  // Calculate level based on points
  // This is a simple formula, can be adjusted as needed
  const level = Math.floor(Math.sqrt(userPoints) / 2) + 1;

  // Calculate progress to next level
  const pointsForCurrentLevel = Math.pow((level - 1) * 2, 2);
  const pointsForNextLevel = Math.pow(level * 2, 2);
  const pointsRange = pointsForNextLevel - pointsForCurrentLevel;
  const pointsProgress = userPoints - pointsForCurrentLevel;
  const progressPercentage = (pointsProgress / pointsRange) * 100;

  // Get rank title based on level
  const rankTitle = getRankTitle(level);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <span className="text-yellow-500">⭐</span>
          Level {level}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">{rankTitle}</span>
            <span className="text-xs text-gray-500">{userPoints} pts</span>
          </div>
          <Progress value={Math.min(progressPercentage, 100)} className="h-2" />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>{pointsProgress} / {pointsRange}</span>
            <span>Next: Level {level + 1}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
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
