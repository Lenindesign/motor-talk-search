
import React from "react";
import { useSavedItems, UserAchievement } from "../contexts/SavedItemsContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const UserAchievements = () => {
  const { userAchievements } = useSavedItems();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Achievements</CardTitle>
        <CardDescription>Badges you've earned</CardDescription>
      </CardHeader>
      <CardContent>
        {userAchievements.length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            <p>No achievements yet.</p>
            <p className="text-sm mt-2">Save items and interact with content to earn badges!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            {userAchievements.map(achievement => (
              <AchievementBadge key={achievement.id} achievement={achievement} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const AchievementBadge = ({ achievement }: { achievement: UserAchievement }) => {
  const earnedDate = new Date(achievement.earnedAt).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric'
  });
  
  return (
    <div className="flex flex-col items-center bg-gray-50 rounded-md p-3 text-center">
      <div className="text-3xl mb-2">{achievement.icon}</div>
      <p className="font-medium text-sm">{achievement.name}</p>
      <p className="text-xs text-gray-500 mt-1">{achievement.description}</p>
      <p className="text-xs mt-2 bg-gray-200 px-2 py-1 rounded-full">Earned: {earnedDate}</p>
    </div>
  );
};

export default UserAchievements;
