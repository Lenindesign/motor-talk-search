import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Car, TrendingUp, Users, Zap, Shield } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  progress: number;
  total: number;
  unlocked: boolean;
  unlockedDate?: Date;
}

interface GarageAchievementsProps {
  savedCarsCount: number;
  comparisonsCount?: number;
  ownedCount?: number;
  testDrivenCount?: number;
}

const GarageAchievements: React.FC<GarageAchievementsProps> = ({
  savedCarsCount,
  comparisonsCount = 0,
  ownedCount = 0,
  testDrivenCount = 0
}) => {
  const achievements: Achievement[] = [
    {
      id: 'first_car',
      name: 'First Steps',
      description: 'Add your first car to the garage',
      icon: <Car className="h-5 w-5" />,
      progress: savedCarsCount > 0 ? 1 : 0,
      total: 1,
      unlocked: savedCarsCount > 0
    },
    {
      id: 'comparison_master',
      name: 'Comparison Master',
      description: 'Compare 10 different cars',
      icon: <TrendingUp className="h-5 w-5" />,
      progress: Math.min(comparisonsCount, 10),
      total: 10,
      unlocked: comparisonsCount >= 10
    },
    {
      id: 'diverse_garage',
      name: 'Diverse Collection',
      description: 'Save cars from 5 different categories',
      icon: <Users className="h-5 w-5" />,
      progress: Math.min(savedCarsCount, 5),
      total: 5,
      unlocked: savedCarsCount >= 5
    },
    {
      id: 'test_driver',
      name: 'Test Drive Champion',
      description: 'Mark 3 cars as test driven',
      icon: <Zap className="h-5 w-5" />,
      progress: Math.min(testDrivenCount, 3),
      total: 3,
      unlocked: testDrivenCount >= 3
    },
    {
      id: 'owner',
      name: 'Proud Owner',
      description: 'Mark a car as owned',
      icon: <Shield className="h-5 w-5" />,
      progress: ownedCount > 0 ? 1 : 0,
      total: 1,
      unlocked: ownedCount > 0
    }
  ];

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalProgress = (unlockedCount / achievements.length) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Garage Achievements
          </div>
          <Badge variant="secondary" className="text-xs">
            {unlockedCount}/{achievements.length} Unlocked
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-neutral-3">Overall Progress</span>
            <span className="text-neutral-1 font-medium">{Math.round(totalProgress)}%</span>
          </div>
          <Progress value={totalProgress} className="h-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`relative p-3 rounded-lg border transition-all ${
                achievement.unlocked
                  ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-300'
                  : 'bg-neutral-8 border-neutral-6'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-full ${
                  achievement.unlocked ? 'bg-yellow-100 text-yellow-700' : 'bg-neutral-7 text-neutral-4'
                }`}>
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <h4 className={`font-semibold text-sm ${
                    achievement.unlocked ? 'text-neutral-1' : 'text-neutral-3'
                  }`}>
                    {achievement.name}
                  </h4>
                  <p className="text-xs text-neutral-4 mt-0.5">{achievement.description}</p>
                  <div className="mt-2">
                    <Progress 
                      value={(achievement.progress / achievement.total) * 100} 
                      className="h-1.5"
                    />
                    <span className="text-xs text-neutral-4 mt-1">
                      {achievement.progress}/{achievement.total}
                    </span>
                  </div>
                </div>
              </div>
              {achievement.unlocked && (
                <div className="absolute top-2 right-2">
                  <Trophy className="h-4 w-4 text-yellow-500" />
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default GarageAchievements; 