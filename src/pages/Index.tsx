import React from "react";
import SocialFeed from '../components/social-feed/SocialFeed';
import { mockFeedData, loadMoreFeedData } from '../data/socialFeedData';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Social Feed */}
      <div className="pt-4 sm:pt-8 pb-12">
        <SocialFeed 
          initialData={mockFeedData}
          loadMoreData={loadMoreFeedData}
          className="px-4 md:px-0"
        />
      </div>
    </div>
  );
};
export default Index;