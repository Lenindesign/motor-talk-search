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
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const car = mockNewCars.find(c => c.id === id);
  const [selectedTrim, setSelectedTrim] = useState('Base');
  if (!car) {
    return <div className="min-h-screen bg-neutral-8">
        <GlobalHeader />
        <main className="content-container section-spacing">
          <div className="text-center space-element">
            <h1 className="typography-display text-neutral-1 mb-6">Vehicle Not Found</h1>
            <Link to="/cars" className="typography-body text-motortrend-red hover:text-motortrend-red/80 transition-colors duration-200">
              Browse All Cars
            </Link>
          </div>
        </main>
      </div>;
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
    price: trim.name === 'Base' ? car.price : '$' + (parseInt(car.price.replace(/[^\d]/g, '')) + trim.basePrice).toLocaleString(),
    features: trim.features
  }));
  const selectedTrimData = processedTrims.find(t => t.name === selectedTrim) || processedTrims[0];
  const overallRating = expertRatings.reduce((acc, rating) => acc + rating.score, 0) / expertRatings.length;
  return <div className="min-h-screen bg-neutral-8">
      <GlobalHeader />
      <main className="max-w-[980px] mx-auto w-full pb-32 px-0 py-[16px]">
        {/* Back Navigation */}
        <div className="mb-8 lg:mb-12">
          <Link to="/cars" className="inline-flex items-center typography-body text-motortrend-red hover:text-motortrend-red/80 transition-colors duration-200 group">
            <ArrowLeft size={20} className="mr-3 transition-transform group-hover:-translate-x-1" />
            Back to Car Database
          </Link>
        </div>

        {/* Car Header */}
        <div className="mb-12 lg:mb-16">
          <CarHeader car={car} carData={carData} selectedTrimPrice={selectedTrimData.price} overallRating={overallRating} />
        </div>

        {/* Quick Stats Summary */}
        <div className="mb-12 lg:mb-16">
          <QuickStats overallRating={overallRating} ownerRating={ownerReviews.overallScore} />
        </div>

        {/* Main Content Tabs */}
        <div className="space-content">
          <Tabs defaultValue="overview" className="w-full">
            <div className="mb-8 lg:mb-12">
              <TabsList className="grid w-full grid-cols-6 h-14 p-1 bg-white shadow-modern border-modern rounded-xl">
                <TabsTrigger value="overview" className="typography-caption font-medium data-[state=active]:bg-motortrend-red data-[state=active]:text-white data-[state=active]:shadow-sm rounded-lg transition-all duration-200">
                  Overview
                </TabsTrigger>
                <TabsTrigger value="ratings" className="typography-caption font-medium data-[state=active]:bg-motortrend-red data-[state=active]:text-white data-[state=active]:shadow-sm rounded-lg transition-all duration-200">
                  Expert Ratings
                </TabsTrigger>
                <TabsTrigger value="comparison" className="typography-caption font-medium data-[state=active]:bg-motortrend-red data-[state=active]:text-white data-[state=active]:shadow-sm rounded-lg transition-all duration-200">
                  Class Comparison
                </TabsTrigger>
                <TabsTrigger value="reviews" className="typography-caption font-medium data-[state=active]:bg-motortrend-red data-[state=active]:text-white data-[state=active]:shadow-sm rounded-lg transition-all duration-200">
                  Owner Reviews
                </TabsTrigger>
                <TabsTrigger value="specs" className="typography-caption font-medium data-[state=active]:bg-motortrend-red data-[state=active]:text-white data-[state=active]:shadow-sm rounded-lg transition-all duration-200">
                  Specifications
                </TabsTrigger>
                <TabsTrigger value="trims" className="typography-caption font-medium data-[state=active]:bg-motortrend-red data-[state=active]:text-white data-[state=active]:shadow-sm rounded-lg transition-all duration-200">
                  Trims & Pricing
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="space-content">
              <TabsContent value="overview" className="m-0">
                <OverviewTab carTitle={car.title} />
              </TabsContent>

              <TabsContent value="ratings" className="m-0">
                <RatingsTab />
              </TabsContent>

              <TabsContent value="comparison" className="m-0">
                <ComparisonTab />
              </TabsContent>

              <TabsContent value="reviews" className="m-0">
                <ReviewsTab />
              </TabsContent>

              <TabsContent value="specs" className="m-0">
                <SpecsTab />
              </TabsContent>

              <TabsContent value="trims" className="m-0">
                <TrimsTab trims={processedTrims} selectedTrim={selectedTrim} onTrimSelect={setSelectedTrim} selectedTrimData={selectedTrimData} />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </main>
    </div>;
};
export default NewCarDetail;