import React from "react";
import HeroCarousel from '../components/home/HeroCarousel';
import SecondaryHeroCarousel from '../components/home/SecondaryHeroCarousel';
import LatestNews from '../components/home/LatestNews';
import VehicleFinder from '../components/home/VehicleFinder';
import BuyersGuide from '../components/home/BuyersGuide';
import LatestReviews from '../components/home/LatestReviews';
import FeaturedVideos from '../components/home/FeaturedVideos';
import BrowseByCategory from '../components/home/BrowseByCategory';

const Index = () => {
  return (
    <div className="px-4 md:px-0">
      {/* Hero Carousels */}
      <div className="space-y-8 pt-0 sm:pt-8">
        {/* Main Hero Carousel */}
        <HeroCarousel />
        
        {/* Secondary Hero Carousel */}
        <SecondaryHeroCarousel />
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
  );
};

export default Index;