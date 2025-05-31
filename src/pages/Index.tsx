import React from "react";
import HeroCarousel from '../components/home/HeroCarousel';
import LatestNews from '../components/home/LatestNews';
import VehicleFinder from '../components/home/VehicleFinder';
import BuyersGuide from '../components/home/BuyersGuide';
import LatestReviews from '../components/home/LatestReviews';
import FeaturedVideos from '../components/home/FeaturedVideos';
import BrowseByCategory from '../components/home/BrowseByCategory';
const Index = () => {
  return <div className="flex min-h-screen flex-col bg-motortrend-gray w-full">
      
      <main className="flex flex-1 flex-col">
         <div className="max-w-[980px] mx-auto sm:px-6 lg:px-0 px-[8px] py-[78px]">
            {/* Hero Carousel */}
             <div className="mb-8 pt-0 sm:pt-8">
               <HeroCarousel />
             </div>
            
            {/* Latest News */}
            <div className="mb-8">
              <LatestNews />
            </div>
            
            {/* Latest Reviews */}
            <div className="mb-8">
              <LatestReviews />
            </div>
            
            {/* Buyer's Guide */}
            <div className="mb-8">
              <BuyersGuide />
            </div>
            
            {/* Vehicle Finder */}
            <div className="mb-8">
              <VehicleFinder />
            </div>
            
            {/* Featured Videos */}
            <div className="mb-8">
              <FeaturedVideos />
            </div>
            
            {/* Browse by Category */}
            <div className="mb-8">
              <BrowseByCategory />
            </div>
        </div>
      </main>
    </div>;
};
export default Index;