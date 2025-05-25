import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, Share, Bookmark, Calculator, MapPin, Users, Shield, Zap, Award, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import GlobalHeader from '@/components/GlobalHeader';
import GarageActionMenu from '@/components/GarageActionMenu';
import { mockNewCars } from '@/services/mockData';
import { CarData } from '@/components/CarCard';

const NewCarDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const car = mockNewCars.find(c => c.id === id);
  const [selectedTrim, setSelectedTrim] = useState('Base');

  if (!car) {
    return (
      <div className="min-h-screen bg-gray-50">
        <GlobalHeader />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Vehicle Not Found</h1>
            <Link to="/cars" className="text-motortrend-red hover:underline">
              Browse All Cars
            </Link>
          </div>
        </main>
      </div>
    );
  }

  // Helper function to map category to valid bodyStyle
  const getBodyStyle = (category: string): "SUV" | "Sedan" | "Truck" | "Sports Car" | "Minivan" | "Crossover" | "Coupe" | "Convertible" | "Hatchback" | "Wagon" => {
    const categoryLower = category.toLowerCase();
    if (categoryLower.includes('suv')) return 'SUV';
    if (categoryLower.includes('sedan')) return 'Sedan';
    if (categoryLower.includes('truck')) return 'Truck';
    if (categoryLower.includes('sports')) return 'Sports Car';
    if (categoryLower.includes('minivan')) return 'Minivan';
    if (categoryLower.includes('crossover')) return 'Crossover';
    if (categoryLower.includes('coupe')) return 'Coupe';
    if (categoryLower.includes('convertible')) return 'Convertible';
    if (categoryLower.includes('hatchback')) return 'Hatchback';
    if (categoryLower.includes('wagon')) return 'Wagon';
    return 'SUV'; // Default fallback
  };

  // Convert car to CarData format for GarageActionMenu
  const carData: CarData = {
    id: car.id,
    title: car.title,
    price: car.price,
    category: car.category,
    imageUrl: car.imageUrl,
    year: '2025',
    bodyStyle: getBodyStyle(car.category),
    mileage: 'New',
    fuelType: 'Electric',
    drivetrain: 'AWD',
    location: 'Available Nationwide'
  };

  const mockSpecs = {
    engine: '400 HP Electric Motor',
    acceleration: '4.2 seconds 0-60 mph',
    range: '405 miles EPA estimated',
    charging: '350kW DC Fast Charging',
    drivetrain: 'All-Wheel Drive',
    seating: '5 passengers',
    cargo: '28.1 cu ft',
    warranty: '4 years/50,000 miles'
  };

  const mockTrims = [
    { name: 'Base', price: car.price, features: ['Standard Features', '19" Wheels', 'LED Headlights'] },
    { name: 'Premium', price: '$' + (parseInt(car.price.replace(/[^\d]/g, '')) + 5000).toLocaleString(), features: ['Premium Audio', '20" Wheels', 'Heated Seats'] },
    { name: 'Performance', price: '$' + (parseInt(car.price.replace(/[^\d]/g, '')) + 12000).toLocaleString(), features: ['Sport Suspension', '21" Wheels', 'Performance Brakes'] }
  ];

  const selectedTrimData = mockTrims.find(t => t.name === selectedTrim) || mockTrims[0];

  // Expert ratings data
  const expertRatings = [
    { category: 'Performance', score: 8.5, description: 'Excellent acceleration and handling' },
    { category: 'Comfort', score: 9.2, description: 'Premium interior and smooth ride' },
    { category: 'Technology', score: 9.0, description: 'Advanced infotainment and driver aids' },
    { category: 'Safety', score: 9.5, description: 'Top safety ratings across all tests' },
    { category: 'Reliability', score: 8.0, description: 'Good predicted reliability' },
    { category: 'Value', score: 7.5, description: 'Competitive in premium segment' }
  ];

  const overallRating = expertRatings.reduce((acc, rating) => acc + rating.score, 0) / expertRatings.length;

  // Class comparison data
  const classComparison = [
    { metric: 'Price', thisVehicle: 85, classAverage: 70, unit: 'k' },
    { metric: 'Fuel Economy', thisVehicle: 92, classAverage: 75, unit: 'MPGe' },
    { metric: 'Cargo Space', thisVehicle: 78, classAverage: 80, unit: 'cu ft' },
    { metric: 'Safety Rating', thisVehicle: 95, classAverage: 85, unit: '/5' },
    { metric: 'Technology', thisVehicle: 90, classAverage: 75, unit: '/10' }
  ];

  // Owner reviews data
  const ownerReviews = {
    overallScore: 4.2,
    totalReviews: 1247,
    ratingDistribution: [
      { stars: 5, count: 587 },
      { stars: 4, count: 394 },
      { stars: 3, count: 156 },
      { stars: 2, count: 78 },
      { stars: 1, count: 32 }
    ],
    topPros: ['Amazing acceleration', 'Quiet cabin', 'Premium materials'],
    topCons: ['Expensive options', 'Learning curve for tech', 'Firm ride']
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <GlobalHeader />
      <main className="container mx-auto px-4 py-8">
        {/* Back Navigation */}
        <div className="mb-6">
          <Link 
            to="/cars" 
            className="inline-flex items-center text-motortrend-red hover:text-motortrend-dark transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Car Database
          </Link>
        </div>

        {/* Car Header */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="relative">
            <img
              src={car.imageUrl}
              alt={car.title}
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <div className="flex items-center mb-2">
                <span className="bg-green-600 text-white px-2 py-1 rounded text-xs font-semibold mr-3">
                  NEW 2025
                </span>
                <div className="flex items-center text-yellow-400">
                  <Star size={16} className="fill-current mr-1" />
                  <span className="text-white text-sm">{overallRating.toFixed(1)}/10 Expert Rating</span>
                </div>
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">{car.title}</h1>
              <div className="flex items-center text-gray-200 text-sm">
                <span className="text-2xl font-bold text-white mr-4">{selectedTrimData.price}</span>
                <span>{car.category}</span>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <div className="flex space-x-3">
                <Button className="bg-motortrend-red hover:bg-motortrend-red/90">
                  <Calculator size={16} className="mr-2" />
                  Build & Price
                </Button>
                <Button variant="outline">
                  <MapPin size={16} className="mr-2" />
                  Find Dealer
                </Button>
                <GarageActionMenu car={carData} type="new" className="ml-2" />
                <Button variant="outline" size="sm">
                  <Share size={16} className="mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats Summary */}
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
                <span className="text-2xl font-bold">{ownerReviews.overallScore}</span>
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

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="ratings">Expert Ratings</TabsTrigger>
            <TabsTrigger value="comparison">Class Comparison</TabsTrigger>
            <TabsTrigger value="reviews">Owner Reviews</TabsTrigger>
            <TabsTrigger value="specs">Specifications</TabsTrigger>
            <TabsTrigger value="trims">Trims & Pricing</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Vehicle Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">
                      The {car.title} represents the pinnacle of modern automotive engineering, 
                      combining cutting-edge electric technology with luxurious comfort and 
                      impressive performance capabilities.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(mockSpecs).map(([key, value]) => (
                        <div key={key} className="border-b pb-2">
                          <dt className="font-semibold text-sm text-gray-600 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </dt>
                          <dd className="text-gray-900">{value}</dd>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Key Selling Points</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                        Advanced Autopilot
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                        Premium Interior
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                        Long Range Battery
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                        Fast Charging
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="ratings">
            <Card>
              <CardHeader>
                <CardTitle>Expert Rating Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {expertRatings.map((rating) => (
                    <div key={rating.category} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{rating.category}</span>
                        <span className="text-lg font-bold">{rating.score}/10</span>
                      </div>
                      <Progress value={rating.score * 10} className="h-2" />
                      <p className="text-sm text-gray-600">{rating.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="comparison">
            <Card>
              <CardHeader>
                <CardTitle>How It Compares to Class Average</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {classComparison.map((item) => (
                    <div key={item.metric} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{item.metric}</span>
                        <div className="flex items-center space-x-4">
                          <span className="text-sm">
                            This Car: <span className="font-bold">{item.thisVehicle}{item.unit}</span>
                          </span>
                          <span className="text-sm text-gray-500">
                            Average: {item.classAverage}{item.unit}
                          </span>
                        </div>
                      </div>
                      <div className="relative">
                        <Progress value={item.classAverage} className="h-2 bg-gray-200" />
                        <Progress 
                          value={item.thisVehicle} 
                          className={`h-2 absolute top-0 ${item.thisVehicle > item.classAverage ? 'bg-green-500' : 'bg-red-500'}`} 
                        />
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>{item.thisVehicle > item.classAverage ? 'Above Average' : 'Below Average'}</span>
                        <TrendingUp size={12} className={item.thisVehicle > item.classAverage ? 'text-green-500' : 'text-red-500'} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Owner Reviews Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="text-center mb-4">
                        <div className="text-4xl font-bold">{ownerReviews.overallScore}</div>
                        <div className="text-gray-500">out of 5 stars</div>
                        <div className="text-sm text-gray-500">{ownerReviews.totalReviews} reviews</div>
                      </div>
                      <div className="space-y-2">
                        {ownerReviews.ratingDistribution.map((rating) => (
                          <div key={rating.stars} className="flex items-center space-x-2">
                            <span className="text-sm w-8">{rating.stars}★</span>
                            <Progress value={(rating.count / ownerReviews.totalReviews) * 100} className="flex-1 h-2" />
                            <span className="text-sm text-gray-500 w-12">{rating.count}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="mb-4">
                        <h4 className="font-semibold text-green-600 mb-2">Top Pros</h4>
                        <ul className="space-y-1">
                          {ownerReviews.topPros.map((pro, index) => (
                            <li key={index} className="text-sm flex items-center">
                              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-red-600 mb-2">Top Cons</h4>
                        <ul className="space-y-1">
                          {ownerReviews.topCons.map((con, index) => (
                            <li key={index} className="text-sm flex items-center">
                              <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                              {con}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="trims">
            <div className="space-y-4">
              <div className="flex space-x-4">
                {mockTrims.map((trim) => (
                  <button
                    key={trim.name}
                    onClick={() => setSelectedTrim(trim.name)}
                    className={`px-4 py-2 rounded ${
                      selectedTrim === trim.name
                        ? 'bg-motortrend-red text-white'
                        : 'bg-white border hover:bg-gray-50'
                    }`}
                  >
                    {trim.name}
                  </button>
                ))}
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>{selectedTrimData.name} - {selectedTrimData.price}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {selectedTrimData.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="specs">
            <Card>
              <CardHeader>
                <CardTitle>Detailed Specifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(mockSpecs).map(([key, value]) => (
                    <div key={key} className="border-b pb-3">
                      <dt className="font-semibold text-gray-600 capitalize mb-1">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </dt>
                      <dd className="text-gray-900 text-lg">{value}</dd>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default NewCarDetail;
