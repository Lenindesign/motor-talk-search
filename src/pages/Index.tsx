import React from "react";
import SocialFeed from '../components/social-feed/SocialFeed';
import CarShoppingSidebar from '../components/sidebars/CarShoppingSidebar';
import TrendingSidebar from '../components/sidebars/TrendingSidebar';
import MobileSidebarDrawer from '../components/sidebars/MobileSidebarDrawer';
import { mockFeedData, loadMoreFeedData } from '../data/socialFeedData';
import Container from '../components/Container';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Container className="pt-4 sm:pt-8 pb-12">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar - Car Shopping (3 columns on xl+) */}
          <div className="hidden xl:block xl:col-span-3">
            <div className="sticky top-6">
              <CarShoppingSidebar />
            </div>
          </div>

          {/* Main Content - Social Feed (6 columns on xl+, 9 columns on lg, full width on smaller) */}
          <div className="col-span-12 lg:col-span-9 xl:col-span-6">
            <SocialFeed 
              initialData={mockFeedData}
              loadMoreData={loadMoreFeedData}
            />
          </div>

          {/* Right Sidebar - Trending & Ads (3 columns on lg+) */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="sticky top-6">
              <TrendingSidebar />
            </div>
          </div>
        </div>
      </Container>

      {/* Mobile Sidebar Drawer */}
      <MobileSidebarDrawer />
    </div>
  );
};
export default Index;