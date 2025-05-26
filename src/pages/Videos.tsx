
import React from 'react';
import GlobalHeader from '@/components/GlobalHeader';
import HeroCarousel from '@/components/home/HeroCarousel';
import VideoCard from '@/components/VideoCard';
import { Button } from '@/components/ui/button';
import { ArrowRight, Flame, Star, Car, Mountain, Wrench, Zap, Flag, TrendingUp, Clock } from 'lucide-react';
import { mockVideos } from '@/services/mockData';

const Videos: React.FC = () => {
  // Example category filters (replace with real tags/categories if available)
  const latestVideos = mockVideos.slice(0, 3);
  const carReviews = mockVideos.filter(v => v.title.toLowerCase().includes('review')).slice(0, 3);
  const trackPerformance = mockVideos.filter(v => v.title.toLowerCase().includes('track') || v.title.toLowerCase().includes('performance')).slice(0, 3);
  const offRoad = mockVideos.filter(v => v.title.toLowerCase().includes('off-road') || v.title.toLowerCase().includes('adventure')).slice(0, 3);
  const classicCars = mockVideos.filter(v => v.title.toLowerCase().includes('classic') || v.title.toLowerCase().includes('restoration')).slice(0, 3);
  const evs = mockVideos.filter(v => v.title.toLowerCase().includes('ev') || v.title.toLowerCase().includes('electric')).slice(0, 3);
  const motorsports = mockVideos.filter(v => v.title.toLowerCase().includes('motorsport') || v.title.toLowerCase().includes('race')).slice(0, 3);
  const trending = mockVideos.slice(3, 6);

  return (
    <div className="min-h-screen bg-gray-50">
      <GlobalHeader />
      <main className="max-w-[980px] mx-auto px-0 py-[32px]">
        {/* Hero Carousel */}
        <div className="mb-10">
          <HeroCarousel />
        </div>

        {/* Section Helper */}
        {[
          {
            title: 'Latest Videos',
            icon: <Clock size={24} />,
            videos: latestVideos
          },
          {
            title: 'Car Reviews',
            icon: <Star size={24} />,
            videos: carReviews
          },
          {
            title: 'Track & Performance',
            icon: <Flame size={24} />,
            videos: trackPerformance
          },
          {
            title: 'Off-Road & Adventure',
            icon: <Mountain size={24} />,
            videos: offRoad
          },
          {
            title: 'Classic Cars & Restorations',
            icon: <Wrench size={24} />,
            videos: classicCars
          },
          {
            title: 'EVs & Future Tech',
            icon: <Zap size={24} />,
            videos: evs
          },
          {
            title: 'Motorsports',
            icon: <Flag size={24} />,
            videos: motorsports
          },
          {
            title: 'Trending Now',
            icon: <TrendingUp size={24} />,
            videos: trending
          }
        ].map(({ title, icon, videos }) => (
          <section className="mb-10" key={title}>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-2xl font-bold">
                {icon}
                {title}
              </h2>
              <Button variant="ghost" className="flex items-center gap-2">
                View All
                <ArrowRight size={16} />
              </Button>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {videos.length > 0 ? (
                videos.map(video => <VideoCard key={video.id} video={video} />)
              ) : (
                <div className="col-span-3 text-gray-400 text-center py-8">
                  No videos in this category yet.
                </div>
              )}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
};

export default Videos;
