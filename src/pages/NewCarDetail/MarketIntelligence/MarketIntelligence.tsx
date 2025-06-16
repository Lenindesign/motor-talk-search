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
  Zap,
  ChevronLeft,
  ChevronRight,
  Store,
  Activity
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
  const [currentSlide, setCurrentSlide] = useState(0);

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
    const insights = [
      { month: "End of Model Year (Aug-Oct)", savings: "$3,000-5,000", reason: "Dealers clearing inventory" },
      { month: "End of Quarter (Mar, Jun, Sep, Dec)", savings: "$1,500-2,500", reason: "Sales quota pressure" },
      { month: "Holiday Weekends", savings: "$1,000-2,000", reason: "Special promotions" },
      { month: "New Model Launch", savings: "$2,000-4,000", reason: "Previous year discounts" }
    ];
    return insights;
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % similarVehicles.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + similarVehicles.length) % similarVehicles.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 mb-3">
          <Activity className="w-5 h-5 text-motortrend-red" />
          <h3 className="typography-title text-neutral-1">Market Intelligence</h3>
        </div>
        <p className="typography-body text-neutral-3">
          Real-time market data and insights to help you make informed decisions
        </p>
      </div>

      <Tabs defaultValue="inventory" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-neutral-7 rounded-xl p-1 h-12">
          <TabsTrigger value="inventory" className="rounded-lg typography-body font-medium">
            <Store className="w-4 h-4 mr-2" />
            Inventory
          </TabsTrigger>
          <TabsTrigger value="pricing" className="rounded-lg typography-body font-medium">
            <DollarSign className="w-4 h-4 mr-2" />
            Pricing
          </TabsTrigger>
          <TabsTrigger value="timing" className="rounded-lg typography-body font-medium">
            <Calendar className="w-4 h-4 mr-2" />
            Best Time
          </TabsTrigger>
          <TabsTrigger value="alternatives" className="rounded-lg typography-body font-medium">
            <Target className="w-4 h-4 mr-2" />
            Alternatives
          </TabsTrigger>
        </TabsList>

        {/* Inventory Tab */}
        <TabsContent value="inventory" className="space-y-6 mt-8">
          <Card className="border-neutral-6 shadow-modern">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="typography-body-large font-semibold text-neutral-1">
                  Local Dealer Inventory
                </CardTitle>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-neutral-3" />
                  <span className="typography-caption text-neutral-3">Within {selectedRadius} miles</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {dealerInventory.map((dealer, index) => {
                const stockStatus = getStockStatus(dealer.stockLevel, dealer.maxStock);
                const priceDiff = dealer.estimatedPrice - currentPrice;
                
                return (
                  <div key={index} className="p-4 rounded-xl border border-neutral-6 hover:shadow-modern transition-all duration-200">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="typography-body-large font-semibold text-neutral-1">{dealer.dealerName}</h4>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="typography-caption text-neutral-3">{dealer.distance} miles away</span>
                          <span className="typography-caption text-neutral-3">Updated {dealer.lastUpdated}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="typography-body-large font-semibold text-neutral-1">
                          {formatPrice(dealer.estimatedPrice)}
                        </div>
                        <div className={`typography-caption ${priceDiff < 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {priceDiff < 0 ? '-' : '+'}{formatPrice(Math.abs(priceDiff)).replace('$', '$')}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`px-2 py-1 rounded-full typography-caption font-medium ${stockStatus.bgColor} ${stockStatus.color}`}>
                          {stockStatus.status} Stock
                        </div>
                        {dealer.hasPreferredTrim && (
                          <div className="flex items-center gap-1 text-green-600">
                            <CheckCircle className="w-4 h-4" />
                            <span className="typography-caption">Has preferred trim</span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress 
                          value={(dealer.stockLevel / dealer.maxStock) * 100} 
                          className="w-20 h-2"
                        />
                        <span className="typography-caption text-neutral-3">
                          {dealer.stockLevel}/{dealer.maxStock}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pricing Tab */}
        <TabsContent value="pricing" className="space-y-6 mt-8">
          <Card className="border-neutral-6 shadow-modern">
            <CardHeader>
              <CardTitle className="typography-body-large font-semibold text-neutral-1">
                Price Trends & Market Demand
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {priceHistory.map((trend, index) => {
                  const isCurrentMonth = index === priceHistory.length - 1;
                  const demandColor = trend.marketDemand === 'High' ? 'text-red-600 bg-red-100' : 
                                    trend.marketDemand === 'Medium' ? 'text-yellow-600 bg-yellow-100' : 
                                    'text-green-600 bg-green-100';
                  
                  return (
                    <div key={trend.month} className={`p-6 rounded-xl border ${isCurrentMonth ? 'border-motortrend-red bg-red-50' : 'border-neutral-6'} hover:shadow-modern transition-all duration-200`}>
                      <div className="text-center space-y-3">
                        <div className="typography-body font-semibold text-neutral-1">{trend.month}</div>
                        <div className="typography-title text-neutral-1">
                          {formatPrice(trend.avgPrice)}
                        </div>
                        <div className={`typography-caption font-medium px-3 py-1.5 rounded-full ${demandColor}`}>
                          {trend.marketDemand} Demand
                        </div>
                        <div className="border-t border-neutral-6 pt-3">
                          <div className="typography-caption text-neutral-3 mb-1">Incentives</div>
                          <div className="typography-body font-semibold text-green-600">
                            {formatPrice(trend.incentives)}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="bg-gradient-to-r from-neutral-8 to-neutral-7 rounded-xl p-6">
                <h4 className="typography-body-large font-semibold text-neutral-1 mb-3">Market Analysis</h4>
                <p className="typography-body text-neutral-2 leading-relaxed">
                  Prices have been trending downward over the past 6 months due to increased inventory and 
                  manufacturer incentives. Current market conditions favor buyers with low demand and high 
                  incentive availability.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Best Time Tab */}
        <TabsContent value="timing" className="space-y-6 mt-8">
          <Card className="border-neutral-6 shadow-modern">
            <CardHeader>
              <CardTitle className="typography-body-large font-semibold text-neutral-1">
                Best Time to Buy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {getBestTimeInsight().map((insight, index) => (
                <div key={index} className="p-4 rounded-xl border border-neutral-6 hover:shadow-modern transition-all duration-200">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="typography-body-large font-semibold text-neutral-1 mb-2">
                        {insight.month}
                      </h4>
                      <p className="typography-body text-neutral-3">{insight.reason}</p>
                    </div>
                    <div className="text-right">
                      <div className="typography-body-large font-semibold text-green-600">
                        {insight.savings}
                      </div>
                      <div className="typography-caption text-neutral-3">potential savings</div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Alternatives Tab */}
        <TabsContent value="alternatives" className="space-y-6 mt-8">
          <Card className="border-neutral-6 shadow-modern">
            <CardHeader>
              <CardTitle className="typography-body-large font-semibold text-neutral-1">
                Similar Vehicles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <div className="overflow-hidden rounded-xl">
                  <div 
                    className="flex transition-transform duration-300 ease-in-out"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                  >
                    {similarVehicles.map((vehicle) => (
                      <div key={vehicle.id} className="w-full flex-shrink-0">
                        <div className="p-6 border border-neutral-6 rounded-xl">
                          <div className="flex gap-6">
                            <img 
                              src={vehicle.imageUrl} 
                              alt={`${vehicle.make} ${vehicle.model}`}
                              className="w-32 h-24 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <h4 className="typography-body-large font-semibold text-neutral-1 mb-2">
                                {vehicle.year} {vehicle.make} {vehicle.model}
                              </h4>
                              <div className="grid grid-cols-2 gap-4 mb-3">
                                <div>
                                  <span className="typography-caption text-neutral-3">Price</span>
                                  <div className="typography-body font-semibold text-neutral-1">
                                    {formatPrice(vehicle.price)}
                                  </div>
                                </div>
                                <div>
                                  <span className="typography-caption text-neutral-3">MPG</span>
                                  <div className="typography-body font-semibold text-neutral-1">
                                    {vehicle.mpg}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1">
                                  <span className="typography-body font-semibold text-neutral-1">
                                    {vehicle.rating}
                                  </span>
                                  <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                      <span key={i} className={`text-sm ${i < Math.floor(vehicle.rating) ? 'text-yellow-400' : 'text-neutral-6'}`}>
                                        ★
                                      </span>
                                    ))}
                                  </div>
                                </div>
                                <Badge variant="secondary" className="typography-caption">
                                  {vehicle.keyDifference}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Navigation */}
                <div className="flex justify-between items-center mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={prevSlide}
                    className="rounded-full"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  
                  <div className="flex gap-2">
                    {similarVehicles.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                          index === currentSlide ? 'bg-motortrend-red' : 'bg-neutral-6'
                        }`}
                      />
                    ))}
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={nextSlide}
                    className="rounded-full"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
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