import React from 'react';
import { Link } from 'react-router-dom';
import { Video, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import VideoCard, { VideoData } from '@/components/VideoCard';
const videoItems: VideoData[] = [{
  id: '1',
  title: '2025 BMW i5 vs Mercedes EQS: Electric Luxury Showdown',
  duration: '12:45',
  imageUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=600&h=400',
  views: '245K',
  publishDate: '2 days ago'
}, {
  id: '2',
  title: 'Tesla Model S Plaid vs Porsche Taycan Turbo S',
  duration: '15:30',
  imageUrl: 'https://di-uploads-pod17.dealerinspire.com/porscheofbend/uploads/2024/04/Taycan-Model-S-SBS-MBL.jpg', 
  views: '892K',
  publishDate: '1 week ago'
}, {
  id: '3',
  title: 'Best Off-Road SUVs of 2025: Ultimate Comparison',
  duration: '18:22',
  imageUrl: 'https://d2kde5ohu8qb21.cloudfront.net/files/6824ecc20fb9100008e4a010/2026toyotabzwoodlandevsuvelectricoffroad-4.jpg',
  views: '156K',
  publishDate: '3 days ago'
}];
const FeaturedVideos: React.FC = () => {
  return <section className="space-content">
      <div className="component-header">
        <h2 className="component-title">
          
          Featured Videos
        </h2>
        <Button variant="ghost" asChild>
          <Link to="/videos" className="component-view-all">
            View All
            <ArrowRight size={16} />
          </Link>
        </Button>
      </div>

      <div className="!mt-0 flex flex-col gap-4 md:grid md:grid-cols-3 md:gap-6">
        {videoItems.map(item => <VideoCard key={item.id} video={item} />)}
      </div>
    </section>;
};
export default FeaturedVideos;