import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Trophy, Star, Award, Shirt, Gift } from "lucide-react";

// Mock leaderboard data
type User = {
  id: string;
  name: string;
  avatar: string;
  points: number;
  badges: string[];
  rank: number;
  weeklyWinner?: boolean;
  prize?: string;
};

const users: User[] = [
  {
    id: "1",
    name: "Jane Speedster",
    avatar: "/avatars/jane.png",
    points: 2450,
    badges: ["Champion", "EV Expert"],
    rank: 1,
    weeklyWinner: true,
    prize: "Special Badge"
  },
  {
    id: "2",
    name: "Alex Turbo",
    avatar: "/avatars/alex.png",
    points: 2180,
    badges: ["Reviewer", "Supporter"],
    rank: 2,
    weeklyWinner: false,
    prize: "T-Shirt"
  },
  {
    id: "3",
    name: "Chris Drift",
    avatar: "/avatars/chris.png",
    points: 2050,
    badges: ["Collector"],
    rank: 3,
    weeklyWinner: false,
    prize: "1-Month Subscription"
  },
  {
    id: "4",
    name: "Sam Roadster",
    avatar: "/avatars/sam.png",
    points: 1900,
    badges: ["Mechanic"],
    rank: 4
  },
  {
    id: "5",
    name: "Taylor Track",
    avatar: "/avatars/taylor.png",
    points: 1750,
    badges: ["Commenter"],
    rank: 5
  }
];

const badgeIcons: Record<string, JSX.Element> = {
  "Champion": <Trophy className="w-5 h-5 text-orange-500" />,
  "EV Expert": <Award className="w-5 h-5 text-yellow-500" />,
  "Reviewer": <Star className="w-5 h-5 text-blue-500" />,
  "Supporter": <Gift className="w-5 h-5 text-cyan-500" />,
  "Collector": <Award className="w-5 h-5 text-indigo-500" />,
  "Mechanic": <Award className="w-5 h-5 text-purple-500" />,
  "Commenter": <Award className="w-5 h-5 text-green-500" />
};

const prizeIcons: Record<string, JSX.Element> = {
  "Special Badge": <Trophy className="w-5 h-5 text-orange-500" />, // Bragging rights
  "T-Shirt": <Shirt className="w-5 h-5 text-gray-700" />,
  "1-Month Subscription": <Gift className="w-5 h-5 text-pink-500" />
};

const Leaderboard: React.FC = () => {
  return (
    <div className="space-y-8">
      <Card className="bg-motortrend-dark text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="text-yellow-400" /> Weekly Tournament Leaderboard
          </CardTitle>
          <p className="mt-2 text-sm text-gray-300">
            Compete every week for prizes! Top users earn special badges (bragging rights), subscriptions, and exclusive Motor Talk merchandise.
          </p>
        </CardHeader>
        <CardContent>
          <table className="w-full text-left mt-4">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="py-2">Rank</th>
                <th>User</th>
                <th>Points</th>
                <th>Badges</th>
                <th>Prize</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} className="border-b border-gray-800 hover:bg-gray-900 transition">
                  <td className="py-2 font-bold text-lg">{user.rank}</td>
                  <td className="flex items-center gap-3 py-2">
                    <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover border-2 border-white" />
                    <span>{user.name}</span>
                    {user.weeklyWinner && (
                      <span className="ml-2 px-2 py-1 rounded bg-yellow-500 text-black text-xs font-semibold">Winner</span>
                    )}
                  </td>
                  <td>{user.points}</td>
                  <td className="flex gap-1">
                    {user.badges.map(badge => (
                      <span key={badge} title={badge} className="inline-block">{badgeIcons[badge]}</span>
                    ))}
                  </td>
                  <td>
                    {user.prize && (
                      <span className="flex items-center gap-1">
                        {prizeIcons[user.prize] || null}
                        <span>{user.prize}</span>
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-8">
            <h3 className="text-lg font-bold mb-2">How the Weekly Tournament Works</h3>
            <ul className="list-disc pl-6 text-gray-300 space-y-1">
              <li>Earn points by engaging with the community: posting reviews, commenting, saving items, and more.</li>
              <li>Every week, the leaderboard resets for a fresh competition.</li>
              <li>Top users win prizes: <span className="font-semibold text-yellow-400">special badges</span> (bragging rights), subscriptions, and Motor Talk t-shirts.</li>
              <li>Special badges are displayed on your profile for recognition.</li>
              <li>Winners are announced every Monday!</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Leaderboard;
