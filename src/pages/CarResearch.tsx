
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Clock, Crown, Calendar } from 'lucide-react';

import MainNavigation from '@/components/MainNavigation';
import VehicleOverview from '@/components/car-research/VehicleOverview';
import QuickStats from '@/components/car-research/QuickStats';
import ActionButtons from '@/components/car-research/ActionButtons';
import ExpertRatings from '@/components/car-research/ExpertRatings';
import ClassComparison from '@/components/car-research/ClassComparison';
import OwnerReviews from '@/components/car-research/OwnerReviews';
import Specifications from '@/components/car-research/Specifications';
import CostOwnership from '@/components/car-research/CostOwnership';
import SimilarVehicles from '@/components/car-research/SimilarVehicles';
import BuyingResources from '@/components/car-research/BuyingResources';
import CommunityQA from '@/components/car-research/CommunityQA';
import { getVehicleById } from '@/services/vehicleService';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';

const CarResearch = () => {
  const { id } = useParams<{ id: string }>();
  const [vehicle, setVehicle] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicle = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const data = await getVehicleById(id);
        setVehicle(data);
      } catch (error) {
        console.error('Error fetching vehicle details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicle();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <MainNavigation />
        <div className="mt-8 flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <span className="ml-2">Loading vehicle information...</span>
        </div>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="container mx-auto py-8">
        <MainNavigation />
        <div className="mt-8 text-center">
          <h2 className="text-2xl font-bold">Vehicle not found</h2>
          <p className="mt-2">The requested vehicle could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <MainNavigation />
      
      {/* Premium Banner */}
      <div className="bg-amber-50 border-b border-amber-200">
        <div className="container mx-auto px-2 sm:px-4 py-2 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-amber-600" />
            <span className="text-sm">
              <span className="font-semibold">MotorTrend+</span>: Get unlimited access to expert reviews, price history, and more
            </span>
          </div>
          <Button variant="default" size="sm" className="bg-amber-600 hover:bg-amber-700">
            Start Free Trial
          </Button>
        </div>
      </div>
      
      {/* Best Time to Buy Alert */}
              <div className="container mx-auto px-2 sm:px-4 pt-4">
        <Alert className="border-green-200 bg-green-50">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-green-600" />
            <span className="font-medium text-green-800">Best Time to Buy:</span>
          </div>
          <AlertDescription className="text-green-800">
            {vehicle.make} typically offers the best deals during the month of December. Current average discounts are 8% below MSRP.
          </AlertDescription>
        </Alert>
      </div>
      
              <div className="container mx-auto px-2 sm:px-4 py-6">
        {/* Breadcrumbs */}
        <div className="text-sm text-gray-500 mb-4">
          Home &gt; {vehicle.year} {vehicle.make} &gt; {vehicle.model}
        </div>
        
        {/* Price History Badge */}
        <div className="mb-4 flex items-center flex-wrap gap-2">
          <Badge variant="outline" className="flex items-center gap-1 border-blue-300 text-blue-800">
            <Clock className="h-3.5 w-3.5" />
            <span>Price History:</span>
            <span className="font-medium">Price dropped $1,245 (3%) in the last 30 days</span>
          </Badge>
        </div>
        
        {/* Top sections */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <VehicleOverview vehicle={vehicle} />
          </div>
          <div className="space-y-6">
            <QuickStats vehicle={vehicle} />
            <ActionButtons vehicle={vehicle} />
          </div>
        </div>
        
        {/* Tabbed content */}
        <div className="mt-8">
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full justify-start overflow-x-auto">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="expert">Expert Ratings</TabsTrigger>
              <TabsTrigger value="compare">Class Comparison</TabsTrigger>
              <TabsTrigger value="reviews">Owner Reviews</TabsTrigger>
              <TabsTrigger value="qa">Q&A</TabsTrigger>
              <TabsTrigger value="specs">Specifications</TabsTrigger>
              <TabsTrigger value="ownership">Cost of Ownership</TabsTrigger>
              <TabsTrigger value="similar">Similar Vehicles</TabsTrigger>
              <TabsTrigger value="buying">Buying Resources</TabsTrigger>
            </TabsList>
            
            <ScrollArea className="h-full max-h-[calc(100vh-300px)] overflow-auto">
              <TabsContent value="overview" className="py-4">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  <ExpertRatings vehicle={vehicle} />
                  <ClassComparison vehicle={vehicle} />
                </div>
                <div className="mt-8">
                  <CommunityQA vehicle={vehicle} />
                </div>
                <OwnerReviews vehicle={vehicle} limit={3} />
                <SimilarVehicles vehicle={vehicle} limit={3} />
              </TabsContent>
              
              <TabsContent value="expert" className="py-4">
                <ExpertRatings vehicle={vehicle} detailed={true} />
              </TabsContent>
              
              <TabsContent value="compare" className="py-4">
                <ClassComparison vehicle={vehicle} detailed={true} />
              </TabsContent>
              
              <TabsContent value="reviews" className="py-4">
                <OwnerReviews vehicle={vehicle} />
              </TabsContent>
              
              <TabsContent value="qa" className="py-4">
                <CommunityQA vehicle={vehicle} />
              </TabsContent>
              
              <TabsContent value="specs" className="py-4">
                <Specifications vehicle={vehicle} />
              </TabsContent>
              
              <TabsContent value="ownership" className="py-4">
                <CostOwnership vehicle={vehicle} />
              </TabsContent>
              
              <TabsContent value="similar" className="py-4">
                <SimilarVehicles vehicle={vehicle} />
              </TabsContent>
              
              <TabsContent value="buying" className="py-4">
                <BuyingResources vehicle={vehicle} />
              </TabsContent>
            </ScrollArea>
          </Tabs>
        </div>
        
        {/* Additional Content */}
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h3 className="mb-3 text-lg font-semibold">Historical Data</h3>
            <p className="text-sm text-gray-700 mb-4">
              See how the {vehicle.year} {vehicle.make} {vehicle.model} has evolved over time with our historical data.
            </p>
            <Button variant="outline" className="w-full">View Historical Data</Button>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h3 className="mb-3 text-lg font-semibold">Ownership Stories</h3>
            <p className="text-sm text-gray-700 mb-4">
              Read real stories from owners of the {vehicle.make} {vehicle.model} and their experiences.
            </p>
            <Button variant="outline" className="w-full">Read Stories</Button>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h3 className="mb-3 text-lg font-semibold">Local Inventory</h3>
            <p className="text-sm text-gray-700 mb-4">
              Find {vehicle.make} {vehicle.model} vehicles available at dealerships near you.
            </p>
            <Button variant="outline" className="w-full">Check Local Inventory</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarResearch;
