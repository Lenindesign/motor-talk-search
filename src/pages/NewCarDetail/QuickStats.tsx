
import React from 'react';
import { Award, Users, Zap, Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface QuickStatsProps {
  overallRating: number;
  ownerRating: number;
}

const QuickStats: React.FC<QuickStatsProps> = ({ overallRating, ownerRating }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <Card>
        <CardContent className="p-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <Award className="h-5 w-5 text-yellow-500 mr-1" />
            <span className="text-2xl font-bold">{overallRating.toFixed(1)}</span>
            <span className="text-gray-500">/10</span>
          </div>
          <p className="text-sm text-gray-600">Expert Rating</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <Users className="h-5 w-5 text-blue-500 mr-1" />
            <span className="text-2xl font-bold">{ownerRating}</span>
            <span className="text-gray-500">/5</span>
          </div>
          <p className="text-sm text-gray-600">Owner Rating</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <Zap className="h-5 w-5 text-green-500 mr-1" />
            <span className="text-2xl font-bold">405</span>
            <span className="text-gray-500">mi</span>
          </div>
          <p className="text-sm text-gray-600">EPA Range</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <Shield className="h-5 w-5 text-red-500 mr-1" />
            <span className="text-2xl font-bold">5</span>
            <span className="text-gray-500">★</span>
          </div>
          <p className="text-sm text-gray-600">Safety Rating</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuickStats;
