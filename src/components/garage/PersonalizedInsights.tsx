import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, TrendingUp, AlertCircle, Info, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Insight {
  id: string;
  type: 'trend' | 'recommendation' | 'alert' | 'tip';
  title: string;
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  icon?: React.ReactNode;
}

interface PersonalizedInsightsProps {
  savedCarsCount: number;
  favoriteCategory?: string;
  recentActivity?: string;
}

const PersonalizedInsights: React.FC<PersonalizedInsightsProps> = ({
  savedCarsCount,
  favoriteCategory,
  recentActivity
}) => {
  const insights: Insight[] = [
    {
      id: '1',
      type: 'trend',
      title: 'Market Trend',
      message: `SUVs in your garage have increased 15% in value over the last year`,
      icon: <TrendingUp className="h-4 w-4" />,
      action: {
        label: 'View Details',
        onClick: () => console.log('View market trends')
      }
    },
    {
      id: '2',
      type: 'recommendation',
      title: 'New Arrival',
      message: `Based on your interest in ${favoriteCategory || 'performance cars'}, check out the new 2025 Mazda CX-90`,
      icon: <Sparkles className="h-4 w-4" />,
      action: {
        label: 'Explore',
        onClick: () => console.log('View recommendation')
      }
    },
    {
      id: '3',
      type: 'alert',
      title: 'Model Update',
      message: '2025 model of your saved Honda Accord is now available with significant updates',
      icon: <AlertCircle className="h-4 w-4" />,
      action: {
        label: 'Compare',
        onClick: () => console.log('Compare models')
      }
    },
    {
      id: '4',
      type: 'tip',
      title: 'Garage Tip',
      message: 'You can now track modifications and performance upgrades for your owned vehicles',
      icon: <Info className="h-4 w-4" />,
      action: {
        label: 'Learn More',
        onClick: () => console.log('Show tip details')
      }
    }
  ];

  const getInsightColor = (type: Insight['type']) => {
    switch (type) {
      case 'trend':
        return 'bg-green-50 border-green-200 text-green-700';
      case 'recommendation':
        return 'bg-purple-50 border-purple-200 text-purple-700';
      case 'alert':
        return 'bg-orange-50 border-orange-200 text-orange-700';
      case 'tip':
        return 'bg-blue-50 border-blue-200 text-blue-700';
    }
  };

  const getIconColor = (type: Insight['type']) => {
    switch (type) {
      case 'trend':
        return 'text-green-600';
      case 'recommendation':
        return 'text-purple-600';
      case 'alert':
        return 'text-orange-600';
      case 'tip':
        return 'text-blue-600';
    }
  };

  // Filter insights based on user activity
  const relevantInsights = insights.filter((insight, index) => {
    if (savedCarsCount === 0 && insight.type !== 'tip') return false;
    if (savedCarsCount < 3 && insight.type === 'trend') return false;
    return index < 3; // Show max 3 insights
  });

  if (relevantInsights.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-yellow-500" />
          Your Garage Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {relevantInsights.map((insight) => (
          <div
            key={insight.id}
            className={`p-4 rounded-lg border transition-all hover:shadow-sm ${getInsightColor(insight.type)}`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className={`mt-0.5 ${getIconColor(insight.type)}`}>
                  {insight.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-sm mb-1">{insight.title}</h4>
                  <p className="text-sm opacity-90">{insight.message}</p>
                </div>
              </div>
              {insight.action && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={insight.action.onClick}
                  className="shrink-0 gap-1 px-2"
                >
                  {insight.action.label}
                  <ChevronRight className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default PersonalizedInsights; 