
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

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
import { getVehicleById } from '@/services/vehicleService';

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
    <div className="bg-gray-50">
      <MainNavigation />
      
      <div className="container mx-auto px-4 py-6">
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
      </div>
    </div>
  );
};

export default CarResearch;
