import React from "react";
import { useSavedItems, UserAchievement } from "../contexts/SavedItemsContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Bolt, Star, MessageSquare, Heart, Wrench, Car, ThumbsUp, Trophy } from "lucide-react";
import Leaderboard from "../pages/Leaderboard"; // Import the new Leaderboard page

// Map achievement types to their respective icons
const achievementIcons: Record<string, React.ReactNode> = {
  "EV Expert": <Bolt className="h-6 w-6" />,
  "Reviewer": <Star className="h-6 w-6" />,
  "Commenter": <MessageSquare className="h-6 w-6" />,
  "Car Enthusiast": <Car className="h-6 w-6" />,
  "Mechanic": <Wrench className="h-6 w-6" />,
  "Collector": <Car className="h-6 w-6" />,
  "Supporter": <ThumbsUp className="h-6 w-6" />,
  "Champion": <Trophy className="h-6 w-6" />
};

// Color classes for achievement icons
const iconColorClasses: Record<string, string> = {
  "EV Expert": "bg-yellow-500",
  "Reviewer": "bg-blue-500",
  "Commenter": "bg-green-500",
  "Car Enthusiast": "bg-red-500",
  "Mechanic": "bg-slate-500",
  "Collector": "bg-indigo-500",
  "Supporter": "bg-cyan-500",
  "Champion": "bg-orange-500"
};

// Progress bar color classes
const progressColorClasses: Record<string, string> = {
  "Car Enthusiast": "bg-red-500",
  "Mechanic": "bg-purple-500",
  "Collector": "bg-blue-500",
  "Supporter": "bg-cyan-500",
  "Champion": "bg-orange-500"
};
const UserAchievements = () => {
  const {
    userAchievements
  } = useSavedItems();

  // Mock data for badges in progress (in a real app, this would come from the API)
  // Tab state for Achievements/Leaderboard
  const [activeTab, setActiveTab] = React.useState<'achievements' | 'leaderboard'>('achievements');

  const badgesInProgress = [{
    id: "car-enthusiast",
    name: "Car Enthusiast",
    description: "Save 20 cars to your favorites",
    progress: 65
  }, {
    id: "mechanic",
    name: "Mechanic",
    description: "Read 5 maintenance guides",
    progress: 40
  }, {
    id: "collector",
    name: "Collector",
    description: "View 50 different car models",
    progress: 78
  }, {
    id: "supporter",
    name: "Supporter",
    description: "Like 25 articles or reviews",
    progress: 52
  }, {
    id: "champion",
    name: "Champion",
    description: "Earn 5 other badges",
    progress: 60
  }];

  // For the reference image, we'll use some mock data but in a real implementation
  // this would be fetched from the backend or calculated based on user activity
  const earnedBadges = [{
    id: "ev-expert",
    name: "EV Expert",
    description: "Read 10 articles about electric vehicles",
    earnedAt: "2023-05-05T12:00:00Z"
  }, {
    id: "reviewer",
    name: "Reviewer",
    description: "Write 5 car reviews",
    earnedAt: "2023-04-20T12:00:00Z"
  }, {
    id: "commenter",
    name: "Commenter",
    description: "Leave 10 comments on articles",
    earnedAt: "2023-03-15T12:00:00Z"
  }];
  return <div className="space-y-6">
      <div className="bg-motortrend-dark text-white p-4 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="typography-title">Achievements</h2>
        </div>

        <div className="flex overflow-x-auto gap-2 p-1 mb-4">
          <button
            className={`min-w-fit px-4 py-2 rounded-md flex items-center gap-2 ${activeTab === 'achievements' ? 'bg-motortrend-red text-white' : 'bg-gray-700 text-white'}`}
            onClick={() => setActiveTab('achievements')}
          >
            <Trophy size={16} /> Achievements
          </button>
          <button
            className={`min-w-fit px-4 py-2 rounded-md flex items-center gap-2 ${activeTab === 'leaderboard' ? 'bg-motortrend-red text-white' : 'bg-gray-700 text-white'}`}
            onClick={() => setActiveTab('leaderboard')}
          >
            Leaderboard
          </button>
        </div>

        {activeTab === 'achievements' ? (
          <>
            <h3 className="typography-title mb-2">Earned Badges</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {earnedBadges.map(badge => <div key={badge.id} className="bg-motortrend-dark border border-gray-700 rounded-lg p-4 flex flex-col">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-3 rounded-full ${iconColorClasses[badge.name] || 'bg-gray-500'}`}>
                  {achievementIcons[badge.name] || <Star className="h-6 w-6" />}
                </div>
                <div>
                  <h4 className="font-medium text-base">{badge.name}</h4>
                  <p className="typography-caption-small text-neutral-3">
                    Earned on {new Date(badge.earnedAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-300 mt-2">{badge.description}</p>
            </div>)}
        </div>

        <h3 className="typography-title mb-2">Badges In Progress</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {badgesInProgress.map(badge => <div key={badge.id} className="bg-motortrend-dark border border-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 rounded-full bg-gray-700">
                  {achievementIcons[badge.name] || <Star className="h-6 w-6 text-gray-400" />}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-base">{badge.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Progress value={badge.progress} className="h-1.5 flex-1" style={{
                  background: 'rgba(255, 255, 255, 0.1)'
                }} />
                    <span className="typography-caption-small">{badge.progress}% complete</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-300 mt-2">{badge.description}</p>
            </div>)}
        </div>

        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="typography-title mb-4">Your Progress</h3>
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="typography-caption">1,250 points</span>
              <span className="typography-caption">1,500 points</span>
            </div>
            <Progress value={83} className="h-2" style={{
            background: 'rgba(255, 255, 255, 0.1)'
          }} />
            <p className="typography-caption-small text-neutral-4 mt-1">250 points until Level 13</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-700 p-4 rounded-lg text-center">
              <h4 className="typography-heading">3/8</h4>
              <p className="typography-caption-small text-neutral-4">Badges Earned</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg text-center">
              <h4 className="typography-heading">1,250</h4>
              <p className="typography-caption-small text-neutral-4">Total Points</p>
            </div>
          </div>
        </div>
          </>
        ) : (
          <Leaderboard />
        )}
      </div>
    </div>;
};
export default UserAchievements;