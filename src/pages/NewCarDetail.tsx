
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, Share, Bookmark, Calculator, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import GlobalHeader from '@/components/GlobalHeader';
import { mockNewCars } from '@/services/mockData';

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
                  <span className="text-white text-sm">4.8/5 Expert Rating</span>
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
                <Button variant="outline" size="sm">
                  <Bookmark size={16} className="mr-2" />
                  Save
                </Button>
                <Button variant="outline" size="sm">
                  <Share size={16} className="mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="specs">Specifications</TabsTrigger>
            <TabsTrigger value="trims">Trims & Pricing</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="compare">Compare</TabsTrigger>
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
                    <CardTitle>Key Features</CardTitle>
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

          <TabsContent value="reviews">
            <Card>
              <CardHeader>
                <CardTitle>Expert & Owner Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-4 border-motortrend-red pl-4">
                    <p className="text-gray-700 italic">
                      "An exceptional vehicle that sets new standards for electric performance and luxury."
                    </p>
                    <p className="text-sm text-gray-500 mt-2">- MotorTrend Expert Review</p>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-4">
                    <p className="text-gray-700 italic">
                      "Outstanding build quality and innovative features make this a standout choice."
                    </p>
                    <p className="text-sm text-gray-500 mt-2">- Verified Owner</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="compare">
            <Card>
              <CardHeader>
                <CardTitle>Compare Similar Vehicles</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Compare this vehicle with similar models to make an informed decision.
                </p>
                <Button className="mt-4">Start Comparison</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default NewCarDetail;
