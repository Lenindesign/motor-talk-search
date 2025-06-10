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
  ChevronRight
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
    const currentMonth = new Date().getMonth();
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
               <div className="space-y-8">
                 {/* Price Chart Section */}
                 <div className="space-y-4">
                   <div className="flex justify-between items-center">
                     <h4 className="text-lg font-semibold text-gray-900">Average Transaction Price</h4>
                     <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-full">
                       <TrendingDown className="h-4 w-4 text-emerald-600" />
                       <span className="text-sm font-medium text-emerald-700">Down $2,000</span>
                       <span className="text-xs text-emerald-600">(6 months)</span>
                     </div>
                   </div>
                   
                   {/* Modern Chart */}
                                        <div className="bg-white border border-gray-100 rounded-xl p-6">
                       <div className="grid grid-cols-6 gap-4 items-end mb-6" style={{ height: '200px' }}>
                         {priceHistory.map((data, index) => {
                           const height = ((data.avgPrice - currentPrice + 2000) / 4000) * 160 + 40;
                           const isLowest = data.avgPrice === Math.min(...priceHistory.map(p => p.avgPrice));
                           const isHighest = data.avgPrice === Math.max(...priceHistory.map(p => p.avgPrice));
                           
                           // Format price properly (e.g., $89,400 -> $89.4K)
                           const formatPriceShort = (price: number) => {
                             if (price >= 1000) {
                               return `$${(price / 1000).toFixed(1)}K`;
                             }
                             return formatPrice(price);
                           };
                           
                           // Get bar color based on price position
                           const getBarColor = () => {
                             if (isLowest) return 'bg-emerald-500';
                             if (isHighest) return 'bg-red-400';
                             if (data.marketDemand === 'High') return 'bg-red-300';
                             if (data.marketDemand === 'Medium') return 'bg-amber-300';
                             return 'bg-blue-300';
                           };
                           
                           return (
                             <div key={index} className="flex flex-col items-center space-y-2">
                               <div className="text-xs font-medium text-gray-500 mb-1">{data.month}</div>
                               <div className="relative flex flex-col items-center justify-end" style={{ height: '160px' }}>
                                 <div 
                                   className={`w-8 rounded-t-lg transition-all duration-500 ${getBarColor()}`}
                                   style={{ height: `${height}px` }}
                                 />
                                 <div className="absolute -bottom-8 text-xs font-semibold text-gray-700">
                                   {formatPriceShort(data.avgPrice)}
                                 </div>
                               </div>
                             </div>
                           );
                         })}
                       </div>
                     
                     {/* Market Demand Indicators */}
                     <div className="flex justify-center gap-6 pt-4 border-t border-gray-100">
                       {priceHistory.map((data, index) => (
                         <div key={index} className="text-center">
                           <div className="text-xs text-gray-500 mb-1">{data.month}</div>
                           <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                             data.marketDemand === 'High' ? 'bg-red-50 text-red-700' :
                             data.marketDemand === 'Medium' ? 'bg-amber-50 text-amber-700' :
                             'bg-emerald-50 text-emerald-700'
                           }`}>
                             {data.marketDemand}
                           </div>
                         </div>
                       ))}
                     </div>
                   </div>
                 </div>

                 {/* Market Insights */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-6 border border-emerald-200">
                     <div className="flex items-center gap-3 mb-3">
                       <div className="p-2 bg-emerald-500 rounded-lg">
                         <DollarSign className="h-5 w-5 text-white" />
                       </div>
                       <div>
                         <h5 className="font-semibold text-gray-900">Current Incentives</h5>
                         <p className="text-sm text-emerald-700">Manufacturer rebates</p>
                       </div>
                     </div>
                     <p className="text-3xl font-bold text-emerald-600">$2,500</p>
                   </div>
                   
                   <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                     <div className="flex items-center gap-3 mb-3">
                       <div className="p-2 bg-blue-500 rounded-lg">
                         <Target className="h-5 w-5 text-white" />
                       </div>
                       <div>
                         <h5 className="font-semibold text-gray-900">Market Position</h5>
                         <p className="text-sm text-blue-700">Within 3% of average</p>
                       </div>
                     </div>
                     <p className="text-3xl font-bold text-blue-600">Fair Deal</p>
                   </div>
                 </div>

                 {/* Additional Insights */}
                 <div className="bg-gray-50 rounded-xl p-6">
                   <h5 className="font-semibold text-gray-900 mb-4">Market Insights</h5>
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                     <div className="flex items-center gap-2">
                       <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                       <span className="text-gray-600">Best pricing in June</span>
                     </div>
                     <div className="flex items-center gap-2">
                       <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                       <span className="text-gray-600">Moderate demand period</span>
                     </div>
                     <div className="flex items-center gap-2">
                       <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                       <span className="text-gray-600">Stable inventory levels</span>
                     </div>
                   </div>
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
               {/* Carousel Container */}
               <div className="relative">
                 {/* Navigation Buttons */}
                 <div className="flex justify-between items-center mb-4">
                   <Button
                     variant="outline"
                     size="sm"
                     onClick={prevSlide}
                     className="flex items-center gap-1"
                   >
                     <ChevronLeft className="h-4 w-4" />
                     Previous
                   </Button>
                   <div className="flex gap-2">
                     {similarVehicles.map((_, index) => (
                       <button
                         key={index}
                         onClick={() => goToSlide(index)}
                         className={`w-2 h-2 rounded-full transition-colors ${
                           index === currentSlide ? 'bg-motortrend-red' : 'bg-gray-300'
                         }`}
                       />
                     ))}
                   </div>
                   <Button
                     variant="outline"
                     size="sm"
                     onClick={nextSlide}
                     className="flex items-center gap-1"
                   >
                     Next
                     <ChevronRight className="h-4 w-4" />
                   </Button>
                 </div>

                 {/* Carousel Content */}
                 <div className="overflow-hidden rounded-lg">
                   <div 
                     className="flex transition-transform duration-300 ease-in-out"
                     style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                   >
                     {similarVehicles.map((vehicle) => (
                       <div key={vehicle.id} className="w-full flex-shrink-0">
                         <Card className="overflow-hidden mx-2">
                           <div className="aspect-video relative">
                             <img 
                               src={vehicle.imageUrl} 
                               alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                               className="w-full h-full object-cover"
                             />
                           </div>
                           <CardContent className="p-6">
                             <h4 className="font-semibold text-lg mb-4">
                               {vehicle.year} {vehicle.make} {vehicle.model}
                             </h4>
                             <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                               <div className="space-y-3">
                                 <div className="flex justify-between">
                                   <span className="text-gray-600">Price:</span>
                                   <span className="font-semibold">{formatPrice(vehicle.price)}</span>
                                 </div>
                                 <div className="flex justify-between">
                                   <span className="text-gray-600">MPG:</span>
                                   <span className="font-medium">{vehicle.mpg}</span>
                                 </div>
                               </div>
                               <div className="space-y-3">
                                 <div className="flex justify-between">
                                   <span className="text-gray-600">Rating:</span>
                                   <span className="flex items-center gap-1 font-medium">
                                     {vehicle.rating} ⭐
                                   </span>
                                 </div>
                                 <div className="flex justify-between items-center">
                                   <span className="text-gray-600">Key Feature:</span>
                                 </div>
                               </div>
                             </div>
                             <div className="mb-4">
                               <Badge variant="outline" className="text-xs">
                                 <Zap className="h-3 w-3 mr-1" />
                                 {vehicle.keyDifference}
                               </Badge>
                             </div>
                             <Button variant="outline" size="sm" className="w-full">
                               Compare Details
                             </Button>
                           </CardContent>
                         </Card>
                       </div>
                     ))}
                   </div>
                 </div>
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