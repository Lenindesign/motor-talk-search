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
        <div className="max-w-[1200px] mx-auto w-full py-8 space-content px-0">
          {/* Hero Carousel */}
          <HeroCarousel />
          
          {/* Vehicle Finder */}
          <VehicleFinder />
          
          {/* Latest News */}
          <LatestNews />
          
          {/* Latest Reviews */}
          <LatestReviews />
          
          {/* Buyer's Guide */}
          <BuyersGuide />
          
          {/* Featured Videos */}
          <FeaturedVideos />
          
          {/* Browse by Category */}
          <BrowseByCategory />
        </div>
      </main>
    </div>;
};
export default Index;