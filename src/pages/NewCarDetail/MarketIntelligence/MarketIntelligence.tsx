import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  TrendingDown, 
  MapPin, 
  Calendar, 
  DollarSign, 
  AlertCircle,
  CheckCircle,
  Clock,
  Car,
  BarChart3,
  Target,
  Zap
} from 'lucide-react';

interface DealerInventory {
  dealerName: string;
  distance: number;
  stockLevel: number;
  maxStock: number;
  lastUpdated: string;
  hasPreferredTrim: boolean;
  estimatedPrice: number;
}

interface PriceTrend {
  month: string;
  avgPrice: number;
  incentives: number;
  marketDemand: 'High' | 'Medium' | 'Low';
}

interface SimilarVehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mpg: string;
  rating: number;
  keyDifference: string;
  imageUrl: string;
}

interface MarketIntelligenceProps {
  carMake: string;
  carModel: string;
  carYear: number;
  currentPrice: number;
}

const MarketIntelligence: React.FC<MarketIntelligenceProps> = ({
  carMake,
  carModel,
  carYear,
  currentPrice
}) => {
  const [selectedRadius, setSelectedRadius] = useState(25);

  // Mock data - in real app, this would come from APIs
  const dealerInventory: DealerInventory[] = [
    {
      dealerName: "Metro Honda",
      distance: 5.2,
      stockLevel: 8,
      maxStock: 12,
      lastUpdated: "2 hours ago",
      hasPreferredTrim: true,
      estimatedPrice: currentPrice - 1200
    },
    {
      dealerName: "City Auto Group",
      distance: 12.8,
      stockLevel: 3,
      maxStock: 15,
      lastUpdated: "4 hours ago",
      hasPreferredTrim: false,
      estimatedPrice: currentPrice + 800
    },
    {
      dealerName: "Premier Motors",
      distance: 18.5,
      stockLevel: 11,
      maxStock: 20,
      lastUpdated: "1 hour ago",
      hasPreferredTrim: true,
      estimatedPrice: currentPrice - 500
    },
    {
      dealerName: "AutoNation",
      distance: 22.1,
      stockLevel: 6,
      maxStock: 25,
      lastUpdated: "6 hours ago",
      hasPreferredTrim: true,
      estimatedPrice: currentPrice + 300
    }
  ];

  const priceHistory: PriceTrend[] = [
    { month: "Jan", avgPrice: currentPrice + 2000, incentives: 500, marketDemand: "High" },
    { month: "Feb", avgPrice: currentPrice + 1800, incentives: 750, marketDemand: "High" },
    { month: "Mar", avgPrice: currentPrice + 1200, incentives: 1000, marketDemand: "Medium" },
    { month: "Apr", avgPrice: currentPrice + 800, incentives: 1500, marketDemand: "Medium" },
    { month: "May", avgPrice: currentPrice + 400, incentives: 2000, marketDemand: "Low" },
    { month: "Jun", avgPrice: currentPrice, incentives: 2500, marketDemand: "Low" }
  ];

  const similarVehicles: SimilarVehicle[] = [
    {
      id: "1",
      make: "Toyota",
      model: "Camry",
      year: 2025,
      price: currentPrice - 3000,
      mpg: "32/41",
      rating: 4.5,
      keyDifference: "Better fuel economy",
      imageUrl: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=400&h=300"
    },
    {
      id: "2", 
      make: "Nissan",
      model: "Altima",
      year: 2025,
      price: currentPrice - 5000,
      mpg: "28/39",
      rating: 4.2,
      keyDifference: "Lower price point",
      imageUrl: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=400&h=300"
    },
    {
      id: "3",
      make: "Mazda",
      model: "Mazda6",
      year: 2025,
      price: currentPrice + 2000,
      mpg: "26/35",
      rating: 4.7,
      keyDifference: "Premium interior",
      imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=400&h=300"
    }
  ];

  const getStockStatus = (level: number, max: number) => {
    const percentage = (level / max) * 100;
    if (percentage > 60) return { status: "High", color: "text-green-600", bgColor: "bg-green-100" };
    if (percentage > 30) return { status: "Medium", color: "text-yellow-600", bgColor: "bg-yellow-100" };
    return { status: "Low", color: "text-red-600", bgColor: "bg-red-100" };
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getBestTimeInsight = () => {
    const currentMonth = new Date().getMonth();
    const insights = [
      { month: "End of Model Year (Aug-Oct)", savings: "$3,000-5,000", reason: "Dealers clearing inventory" },
      { month: "End of Quarter (Mar, Jun, Sep, Dec)", savings: "$1,500-2,500", reason: "Sales quota pressure" },
      { month: "Holiday Weekends", savings: "$1,000-2,000", reason: "Special promotions" },
      { month: "New Model Launch", savings: "$2,000-4,000", reason: "Previous year discounts" }
    ];
    return insights;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <BarChart3 className="h-6 w-6 text-motortrend-red" />
        <h2 className="text-2xl font-bold">Market Intelligence</h2>
      </div>

      <Tabs defaultValue="inventory" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="inventory" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Inventory
          </TabsTrigger>
          <TabsTrigger value="pricing" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Price Trends
          </TabsTrigger>
          <TabsTrigger value="similar" className="flex items-center gap-2">
            <Car className="h-4 w-4" />
            Similar Cars
          </TabsTrigger>
          <TabsTrigger value="timing" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Best Time
          </TabsTrigger>
        </TabsList>

        <TabsContent value="inventory" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Local Dealer Inventory
              </CardTitle>
              <CardDescription>
                Real-time stock levels within {selectedRadius} miles
              </CardDescription>
              <div className="flex gap-2">
                {[10, 25, 50].map((radius) => (
                  <Button
                    key={radius}
                    variant={selectedRadius === radius ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedRadius(radius)}
                  >
                    {radius} mi
                  </Button>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dealerInventory.map((dealer, index) => {
                  const stockStatus = getStockStatus(dealer.stockLevel, dealer.maxStock);
                  const stockPercentage = (dealer.stockLevel / dealer.maxStock) * 100;
                  
                  return (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold">{dealer.dealerName}</h4>
                          <p className="text-sm text-gray-600">{dealer.distance} miles away</p>
                        </div>
                        <div className="text-right">
                          <Badge className={`${stockStatus.bgColor} ${stockStatus.color}`}>
                            {stockStatus.status} Stock
                          </Badge>
                          <p className="text-sm text-gray-600 mt-1">Updated {dealer.lastUpdated}</p>
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Available: {dealer.stockLevel} units</span>
                          <span>{Math.round(stockPercentage)}% of capacity</span>
                        </div>
                        <Progress value={stockPercentage} className="h-2" />
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          {dealer.hasPreferredTrim ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : (
                            <AlertCircle className="h-4 w-4 text-yellow-600" />
                          )}
                          <span className="text-sm">
                            {dealer.hasPreferredTrim ? "Has your preferred trim" : "Limited trim options"}
                          </span>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{formatPrice(dealer.estimatedPrice)}</p>
                          <p className="text-xs text-gray-600">Est. price</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pricing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Price Trends & Predictions
              </CardTitle>
              <CardDescription>
                6-month pricing history and market analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Price Chart Simulation */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-semibold">Average Transaction Price</h4>
                    <Badge className="bg-green-100 text-green-700">
                      <TrendingDown className="h-3 w-3 mr-1" />
                      Down $2,000 (6 months)
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-6 gap-2 mb-4">
                    {priceHistory.map((data, index) => (
                      <div key={index} className="text-center">
                        <div className="text-xs text-gray-600 mb-1">{data.month}</div>
                        <div 
                          className="bg-motortrend-red rounded-t"
                          style={{ 
                            height: `${((data.avgPrice - currentPrice + 2000) / 4000) * 60 + 20}px`,
                            minHeight: '20px'
                          }}
                        />
                        <div className="text-xs font-semibold mt-1">
                          {formatPrice(data.avgPrice)}
                        </div>
                        <Badge 
                          variant="outline" 
                          className={`text-xs mt-1 ${
                            data.marketDemand === 'High' ? 'border-red-300 text-red-600' :
                            data.marketDemand === 'Medium' ? 'border-yellow-300 text-yellow-600' :
                            'border-green-300 text-green-600'
                          }`}
                        >
                          {data.marketDemand}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Market Insights */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="h-4 w-4 text-green-600" />
                        <h5 className="font-semibold">Current Incentives</h5>
                      </div>
                      <p className="text-2xl font-bold text-green-600">$2,500</p>
                      <p className="text-sm text-gray-600">Manufacturer rebates available</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="h-4 w-4 text-blue-600" />
                        <h5 className="font-semibold">Market Position</h5>
                      </div>
                      <p className="text-2xl font-bold text-blue-600">Fair Deal</p>
                      <p className="text-sm text-gray-600">Within 3% of market average</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="similar" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Car className="h-5 w-5" />
                Cross-Shopping Alternatives
              </CardTitle>
              <CardDescription>
                Similar vehicles buyers also consider
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {similarVehicles.map((vehicle) => (
                  <Card key={vehicle.id} className="overflow-hidden">
                    <div className="aspect-video relative">
                      <img 
                        src={vehicle.imageUrl} 
                        alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-1">
                        {vehicle.year} {vehicle.make} {vehicle.model}
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Price:</span>
                          <span className="font-semibold">{formatPrice(vehicle.price)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>MPG:</span>
                          <span>{vehicle.mpg}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Rating:</span>
                          <span className="flex items-center gap-1">
                            {vehicle.rating} ⭐
                          </span>
                        </div>
                        <div className="pt-2 border-t">
                          <Badge variant="outline" className="text-xs">
                            <Zap className="h-3 w-3 mr-1" />
                            {vehicle.keyDifference}
                          </Badge>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full mt-3">
                        Compare Details
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Best Time to Buy
              </CardTitle>
              <CardDescription>
                Seasonal insights and optimal purchase timing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-5 w-5 text-blue-600" />
                    <h4 className="font-semibold text-blue-900">Current Market Timing</h4>
                  </div>
                  <p className="text-blue-800 mb-2">
                    <strong>Good time to buy!</strong> Inventory levels are healthy and incentives are strong.
                  </p>
                  <p className="text-sm text-blue-700">
                    Expected savings: $1,500-2,500 compared to peak season
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">Seasonal Buying Opportunities</h4>
                  {getBestTimeInsight().map((insight, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-medium">{insight.month}</h5>
                        <Badge className="bg-green-100 text-green-700">
                          {insight.savings}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{insight.reason}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="h-5 w-5 text-yellow-600" />
                    <h4 className="font-semibold text-yellow-900">Pro Tip</h4>
                  </div>
                  <p className="text-yellow-800 text-sm">
                    Consider waiting 2-3 months if not urgent. Model year-end clearance typically offers the best deals.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MarketIntelligence; 