import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Phone, Mail, MapPin, Calendar, Gauge, Fuel, Settings, Heart, Share, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockUsedCars } from '@/services/mockData';
const UsedCarDetail: React.FC = () => {
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const car = mockUsedCars.find(c => c.id === id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  if (!car) {
    return <div className="min-h-screen bg-gray-50">
        
        <main className="container mx-auto px-2 sm:px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Vehicle Not Found</h1>
            <Link to="/cars" className="text-motortrend-red hover:underline">
              Browse All Cars
            </Link>
          </div>
        </main>
      </div>;
  }
  const mockImages = [car.imageUrl, "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=500&auto=format&fit=crop&q=60", "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=500&auto=format&fit=crop&q=60", "https://images.unsplash.com/photo-1549399137-1db5b832fff8?w=500&auto=format&fit=crop&q=60"];
  const mockVehicleDetails = {
    vin: "1HGCV1F3XLA123456",
    exterior: "Midnight Black",
    interior: "Black Leather",
    transmission: "8-Speed Automatic",
    engine: "3.0L V6 Twin Turbo",
    doors: "4",
    accidents: "No accidents reported",
    owners: "2 previous owners",
    service: "Full service history"
  };
  const mockFeatures = ["Premium Sound System", "Navigation System", "Backup Camera", "Heated Seats", "Sunroof", "Leather Interior", "Bluetooth Connectivity", "Keyless Entry", "LED Headlights", "Alloy Wheels"];
  return <div className="min-h-screen bg-gray-50">
      
      <main className="max-w-[980px] mx-auto px-0 py-[32px]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Vehicle Header */}
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{car.title}</h1>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar size={16} className="mr-1" />
                        {car.year}
                      </div>
                      <div className="flex items-center">
                        <Gauge size={16} className="mr-1" />
                        {car.mileage}
                      </div>
                      <div className="flex items-center">
                        <Fuel size={16} className="mr-1" />
                        {car.fuelType}
                      </div>
                      <div className="flex items-center">
                        <Settings size={16} className="mr-1" />
                        {car.drivetrain}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Heart size={16} className="mr-2" />
                      Save
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share size={16} className="mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
                
                <div className="text-3xl font-bold text-motortrend-black mb-4">{car.price}</div>
                
                <div className="flex items-center text-sm text-gray-600 mb-4">
                  <MapPin size={16} className="mr-1" />
                  {car.location}
                </div>
              </CardContent>
            </Card>

            {/* Image Gallery */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="relative">
                    <img src={mockImages[currentImageIndex]} alt={`${car.title} - Image ${currentImageIndex + 1}`} className="w-full h-[400px] object-cover rounded-lg" />
                    <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded">
                      {currentImageIndex + 1} / {mockImages.length}
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {mockImages.map((image, index) => <button key={index} onClick={() => setCurrentImageIndex(index)} className={`relative ${currentImageIndex === index ? 'ring-2 ring-motortrend-red' : ''}`}>
                        <img src={image} alt={`Thumbnail ${index + 1}`} className="w-full h-20 object-cover rounded" />
                      </button>)}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Vehicle Details Tabs */}
            <Tabs defaultValue="details" className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
                <TabsTrigger value="financing">Financing</TabsTrigger>
              </TabsList>

              <TabsContent value="details">
                <Card>
                  <CardHeader>
                    <CardTitle>Vehicle Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(mockVehicleDetails).map(([key, value]) => <div key={key} className="border-b pb-2">
                          <dt className="font-semibold text-sm text-gray-600 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </dt>
                          <dd className="text-gray-900">{value}</dd>
                        </div>)}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="features">
                <Card>
                  <CardHeader>
                    <CardTitle>Features & Options</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {mockFeatures.map((feature, index) => <div key={index} className="flex items-center">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                          {feature}
                        </div>)}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="history">
                <Card>
                  <CardHeader>
                    <CardTitle>Vehicle History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center text-green-600">
                        <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                        No accidents reported
                      </div>
                      <div className="flex items-center text-green-600">
                        <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                        Clean title
                      </div>
                      <div className="flex items-center text-green-600">
                        <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                        Regular maintenance records
                      </div>
                      <Button variant="outline" className="mt-4">
                        View Full History Report
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="financing">
                <Card>
                  <CardHeader>
                    <CardTitle>Financing Options</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border rounded-lg p-4">
                          <h4 className="font-semibold mb-2">Monthly Payment</h4>
                          <p className="text-2xl font-bold text-motortrend-dark">$687/mo</p>
                          <p className="text-sm text-gray-600">60 months @ 4.9% APR</p>
                        </div>
                        <div className="border rounded-lg p-4">
                          <h4 className="font-semibold mb-2">Down Payment</h4>
                          <p className="text-2xl font-bold">$5,000</p>
                          <p className="text-sm text-gray-600">Recommended</p>
                        </div>
                      </div>
                      <Button className="w-full">Get Pre-Approved</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Dealer */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Dealer</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <h3 className="font-semibold">Premium Auto Sales</h3>
                  <p className="text-sm text-gray-600">Licensed Dealer</p>
                </div>
                
                <Button className="w-full bg-motortrend-red hover:bg-motortrend-red/90">
                  <Phone size={16} className="mr-2" />
                  Call (555) 123-4567
                </Button>
                
                <Button variant="outline" className="w-full">
                  <Mail size={16} className="mr-2" />
                  Send Message
                </Button>
                
                <Button variant="outline" className="w-full">
                  Schedule Test Drive
                </Button>
                
                <div className="text-xs text-gray-500 text-center">
                  Response time: Usually within 1 hour
                </div>
              </CardContent>
            </Card>

            {/* Price Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Price Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Market Average:</span>
                    <span>$68,900</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>This Vehicle:</span>
                    <span className="font-semibold">{car.price}</span>
                  </div>
                  <div className="flex justify-between text-sm text-green-600">
                    <span>You Save:</span>
                    <span className="font-semibold">$3,400</span>
                  </div>
                  <div className="bg-green-100 text-green-800 px-3 py-2 rounded text-sm text-center">
                    Great Deal!
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Seller Notes */}
            <Card>
              <CardHeader>
                <CardTitle>Important Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-start">
                    <AlertTriangle size={16} className="text-amber-500 mr-2 mt-1 flex-shrink-0" />
                    <span className="text-sm">Vehicle has been recently serviced</span>
                  </div>
                  <div className="flex items-start">
                    <AlertTriangle size={16} className="text-amber-500 mr-2 mt-1 flex-shrink-0" />
                    <span className="text-sm">Extended warranty available</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>;
};
export default UsedCarDetail;