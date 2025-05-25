
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GlobalHeader from '@/components/GlobalHeader';
import { mockNewCars } from '@/services/mockData';
import { CarData } from '@/components/CarCard';
import { getBodyStyle, mockTrims, expertRatings, ownerReviews } from './NewCarDetail/utils';
import CarHeader from './NewCarDetail/CarHeader';
import QuickStats from './NewCarDetail/QuickStats';
import OverviewTab from './NewCarDetail/OverviewTab';
import RatingsTab from './NewCarDetail/RatingsTab';
import ComparisonTab from './NewCarDetail/ComparisonTab';
import ReviewsTab from './NewCarDetail/ReviewsTab';
import TrimsTab from './NewCarDetail/TrimsTab';
import SpecsTab from './NewCarDetail/SpecsTab';

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

  const processedTrims = mockTrims.map(trim => ({
    name: trim.name,
    price: trim.name === 'Base' 
      ? car.price 
      : '$' + (parseInt(car.price.replace(/[^\d]/g, '')) + trim.basePrice).toLocaleString(),
    features: trim.features
  }));

  const selectedTrimData = processedTrims.find(t => t.name === selectedTrim) || processedTrims[0];
  const overallRating = expertRatings.reduce((acc, rating) => acc + rating.score, 0) / expertRatings.length;

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
        <CarHeader 
          car={car}
          carData={carData}
          selectedTrimPrice={selectedTrimData.price}
          overallRating={overallRating}
        />

        {/* Quick Stats Summary */}
        <QuickStats 
          overallRating={overallRating}
          ownerRating={ownerReviews.overallScore}
        />

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
            <OverviewTab carTitle={car.title} />
          </TabsContent>

          <TabsContent value="ratings">
            <RatingsTab />
          </TabsContent>

          <TabsContent value="comparison">
            <ComparisonTab />
          </TabsContent>

          <TabsContent value="reviews">
            <ReviewsTab />
          </TabsContent>

          <TabsContent value="trims">
            <TrimsTab 
              trims={processedTrims}
              selectedTrim={selectedTrim}
              onTrimSelect={setSelectedTrim}
              selectedTrimData={selectedTrimData}
            />
          </TabsContent>

          <TabsContent value="specs">
            <SpecsTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default NewCarDetail;
