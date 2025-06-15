import React from "react";
import { SavedItem } from "../../contexts/SavedItemsContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface GarageInsightsProps {
  cars: SavedItem[];
}

const GarageInsights: React.FC<GarageInsightsProps> = ({ cars }) => {
  // Calculate insights
  const categories = cars.reduce((acc, car) => {
    const category = car.metadata?.category || 'Unknown';
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topCategory = Object.entries(categories).sort((a, b) => b[1] - a[1])[0];

  const averagePrice = cars
    .map(car => {
      const price = car.metadata?.price || car.metadata?.msrp || '';
      const numericPrice = parseInt(price.replace(/[^0-9]/g, ''));
      return isNaN(numericPrice) ? 0 : numericPrice;
    })
    .filter(price => price > 0)
    .reduce((sum, price, _, arr) => sum + price / arr.length, 0);

  const ownedCount = cars.filter(car => car.metadata?.ownership === 'owned').length;
  const testDriveCount = cars.filter(car => car.metadata?.ownership === 'testDriven').length;
  const interestedCount = cars.filter(car => car.metadata?.ownership === 'interested').length;

  // Calculate percentage distributions
  const totalCars = cars.length;
  const ownedPercentage = totalCars > 0 ? Math.round((ownedCount / totalCars) * 100) : 0;
  const testDrivePercentage = totalCars > 0 ? Math.round((testDriveCount / totalCars) * 100) : 0;
  const interestedPercentage = totalCars > 0 ? Math.round((interestedCount / totalCars) * 100) : 0;

  const insights = [
    {
      label: "Total Vehicles",
      value: cars.length.toString(),
      subtitle: "In your garage",
      percentage: null
    },
    {
      label: "Favorite Type",
      value: topCategory ? topCategory[0] : "None",
      subtitle: topCategory ? `${topCategory[1]} vehicle${topCategory[1] !== 1 ? 's' : ''}` : "No data",
      percentage: null
    },
    {
      label: "Avg. Price",
      value: averagePrice > 0 ? `$${Math.round(averagePrice / 1000)}K` : "N/A",
      subtitle: "Across all vehicles",
      percentage: null
    },
    {
      label: "Owned Cars",
      value: ownedCount.toString(),
      subtitle: `${ownedPercentage}% of garage`,
      percentage: ownedPercentage
    }
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-neutral-6 rounded-xl flex items-center justify-center shadow-modern">
            <div className="w-5 h-5 bg-white rounded"></div>
          </div>
          <div>
            <h2 className="typography-title text-neutral-1">Garage Insights</h2>
            <p className="typography-caption text-neutral-4">Your automotive preferences at a glance</p>
          </div>
        </div>
        <Badge variant="outline" className="border-neutral-5 text-neutral-3 bg-white">
          Updated now
        </Badge>
      </div>

      {/* Main Insights Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {insights.map((insight, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-4 shadow-modern border border-neutral-6 hover:shadow-modern-lg transition-all duration-200 hover:-translate-y-1"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 bg-neutral-6 rounded-xl flex items-center justify-center shadow-modern">
                <div className="w-4 h-4 bg-neutral-4 rounded"></div>
              </div>
              {insight.percentage !== null && (
                <div className="text-right">
                  <div className="text-xs text-neutral-4">of total</div>
                  <div className="text-sm font-semibold text-neutral-2">{insight.percentage}%</div>
                </div>
              )}
            </div>
            
            <div className="space-y-1">
              <div className="typography-title text-neutral-1">{insight.value}</div>
              <div className="typography-caption font-medium text-neutral-2">{insight.label}</div>
              <div className="typography-small text-neutral-4">{insight.subtitle}</div>
            </div>

            {/* Progress bar for percentage-based insights */}
            {insight.percentage !== null && (
              <div className="mt-3">
                <div className="w-full bg-neutral-7 rounded-full h-2">
                  <div 
                    className="bg-neutral-3 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${insight.percentage}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Category Breakdown */}
      {Object.keys(categories).length > 1 && (
        <div className="bg-white rounded-2xl p-4 shadow-modern border border-neutral-6 mb-4">
          <h3 className="typography-subtitle text-neutral-1 mb-4">
            Vehicle Categories
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {Object.entries(categories)
              .sort((a, b) => b[1] - a[1])
              .map(([category, count]) => {
                const percentage = Math.round((count / totalCars) * 100);
                return (
                  <div key={category} className="bg-neutral-8 rounded-xl p-3 border border-neutral-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="typography-caption font-medium text-neutral-1 capitalize">
                        {category}
                      </span>
                      <Badge variant="outline" className="text-xs border-neutral-5 text-neutral-3">
                        {count}
                      </Badge>
                    </div>
                    <div className="w-full bg-neutral-6 rounded-full h-1.5">
                      <div 
                        className="bg-neutral-3 h-1.5 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <div className="typography-small text-neutral-4 mt-1">{percentage}%</div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* Quick Stats Row */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white rounded-xl p-3 border border-neutral-6">
          <div className="flex items-center space-x-2 mb-1">
            <span className="typography-caption text-neutral-3 font-medium">Test Drive Ready</span>
          </div>
          <div className="typography-subtitle text-neutral-1">{testDriveCount}</div>
          <div className="typography-small text-neutral-4">{testDrivePercentage}% of garage</div>
        </div>

        <div className="bg-white rounded-xl p-3 border border-neutral-6">
          <div className="flex items-center space-x-2 mb-1">
            <span className="typography-caption text-neutral-3 font-medium">Interested</span>
          </div>
          <div className="typography-subtitle text-neutral-1">{interestedCount}</div>
          <div className="typography-small text-neutral-4">{interestedPercentage}% of garage</div>
        </div>

        <div className="bg-white rounded-xl p-3 border border-neutral-6">
          <div className="flex items-center space-x-2 mb-1">
            <span className="typography-caption text-neutral-3 font-medium">Categories</span>
          </div>
          <div className="typography-subtitle text-neutral-1">{Object.keys(categories).length}</div>
          <div className="typography-small text-neutral-4">Different types</div>
        </div>
      </div>
    </div>
  );
};

export default GarageInsights;
