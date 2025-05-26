import React from "react";
import GlobalHeader from '../components/GlobalHeader';
import HeroCarousel from '../components/home/HeroCarousel';
import LatestNews from '../components/home/LatestNews';
import VehicleFinder from '../components/home/VehicleFinder';
import BuyersGuide from '../components/home/BuyersGuide';
import LatestReviews from '../components/home/LatestReviews';
import FeaturedVideos from '../components/home/FeaturedVideos';
import BrowseByCategory from '../components/home/BrowseByCategory';

const Index = () => {
  return <div className="flex min-h-screen flex-col bg-motortrend-gray w-full">
      <GlobalHeader />
      <main className="flex flex-1 flex-col">
        <div className="max-w-[980px] mx-auto px-4 sm:px-6 lg:px-0 space-y-8">
           {/* Hero Carousel */}
            <div className="pt-3 pb-3">
              <HeroCarousel />
            </div>
            
            {/* Vehicle Finder */}
            <div className="pt-3 pb-3">
              <VehicleFinder />
            </div>
           
          {/* Latest News */}
          <div className="pt-3 pb-3">
            <LatestNews />
          </div>
          
          {/* Latest Reviews */}
          <div className="pt-3 pb-3">
            <LatestReviews />
          </div>
          
          {/* Buyer's Guide */}
          <div className="pt-3 pb-3">
            <BuyersGuide />
          </div>
          
          {/* Featured Videos */}
          <div className="pt-3 pb-3">
            <FeaturedVideos />
          </div>
          
          {/* Browse by Category */}
          <div className="pt-3 pb-3">
            <BrowseByCategory />
          </div>
        </div>
      </main>
    </div>;
};
export default Index;