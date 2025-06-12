
import React from "react";
import { SavedItem } from "../../contexts/SavedItemsContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, DollarSign, Fuel, Award } from "lucide-react";

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

  return (
    <Card className="bg-gradient-to-r from-neutral-8 to-neutral-7 border-neutral-6">
      <CardHeader>
        <CardTitle className="typography-subtitle text-neutral-1 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2" />
          Garage Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center w-10 h-10 bg-neutral-1 rounded-full mx-auto mb-2">
              <Car className="w-5 h-5 text-white" />
            </div>
            <div className="typography-body-large text-neutral-1 font-semibold">{cars.length}</div>
            <div className="typography-caption-small text-neutral-4">Total Vehicles</div>
          </div>

          {topCategory && (
            <div className="text-center">
              <div className="flex items-center justify-center w-10 h-10 bg-motortrend-red rounded-full mx-auto mb-2">
                <Award className="w-5 h-5 text-white" />
              </div>
              <div className="typography-caption text-neutral-1 font-semibold">{topCategory[0]}</div>
              <div className="typography-caption-small text-neutral-4">Favorite Type</div>
            </div>
          )}

          {averagePrice > 0 && (
            <div className="text-center">
              <div className="flex items-center justify-center w-10 h-10 bg-green-500 rounded-full mx-auto mb-2">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <div className="typography-caption text-neutral-1 font-semibold">
                ${Math.round(averagePrice / 1000)}K
              </div>
              <div className="typography-caption-small text-neutral-4">Avg. Price</div>
            </div>
          )}

          <div className="text-center">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-500 rounded-full mx-auto mb-2">
              <Fuel className="w-5 h-5 text-white" />
            </div>
            <div className="typography-caption text-neutral-1 font-semibold">{ownedCount}</div>
            <div className="typography-caption-small text-neutral-4">Owned</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GarageInsights;
