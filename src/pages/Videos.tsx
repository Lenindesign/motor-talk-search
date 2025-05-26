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
          <HeroCarousel slides={[
            {
              id: 'v1',
              title: '2025 Lamborghini Revuelto: Track Review',
              subtitle: 'Lambo’s 1000+ hp hybrid V12 gets unleashed on the circuit. Watch the full test.',
              imageUrl: 'https://www.motortrend.com/uploads/2023/03/012-2024-lamborghini-revuelto.jpg?w=768&width=768&q=75&format=webp',
              videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
              tag: 'Track Test',
              tagColor: 'bg-yellow-600',
              author: 'Chris Harris',
              readTime: '2 hours ago'
            },
            {
              id: 'v2',
              title: 'EV Drag Race: Tesla Plaid vs Lucid Air',
              subtitle: 'The most powerful EVs go head-to-head in a quarter-mile showdown.',
              imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80',
              videoUrl: 'https://www.w3schools.com/html/movie.mp4',
              tag: 'Drag Race',
              tagColor: 'bg-red-700',
              author: 'Megan Lee',
              readTime: '4 hours ago'
            },
            {
              id: 'v3',
              title: 'Off-Road Adventure: Bronco vs Wrangler',
              subtitle: 'Which 4x4 conquers the wild? See the ultimate off-road face-off.',
              imageUrl: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1200&q=80',
              videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
              tag: 'Adventure',
              tagColor: 'bg-green-800',
              author: 'Carlos Ramirez',
              readTime: '6 hours ago'
            }
          ]} />
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
