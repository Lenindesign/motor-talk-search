import React from "react";
import UserAchievements from "../components/UserAchievements";
import LeaderboardTab from "../components/LeaderboardTab";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Award, Star } from "lucide-react";

const AchievementsPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto py-8 px-2 sm:px-4">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <Award className="text-yellow-400" size={32} /> Achievements
      </h1>
      <Tabs defaultValue="leaderboard" className="w-full">
        <TabsList className="mb-6 w-full justify-start border-b rounded-none">
          <TabsTrigger value="achievements" className="flex items-center gap-1">
            <Award size={16} />
            <span>Achievements</span>
          </TabsTrigger>
          <TabsTrigger value="leaderboard" className="flex items-center gap-1">
            <Star size={16} />
            <span>Leaderboard</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="achievements">
          <div style={{background: 'yellow', color: 'black', padding: 8, marginBottom: 8}}>TEST: Achievements tab is rendering</div>
          <UserAchievements />
        </TabsContent>
        <TabsContent value="leaderboard">
          <div style={{background: 'yellow', color: 'black', padding: 8, marginBottom: 8}}>TEST: Leaderboard tab is rendering</div>
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded text-blue-900">
            <strong>Compete for Prizes!</strong> Each week, users compete on the leaderboard for awesome rewards like MotorTrend t-shirts, subscriptions, and ultimate bragging rights. Earn points by engaging with the community—save cars, write reviews, comment, and more. Top users win prizes every week!
          </div>
          <LeaderboardTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AchievementsPage;
