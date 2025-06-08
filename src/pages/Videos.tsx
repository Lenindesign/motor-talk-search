import React from 'react';

import HeroCarousel from '@/components/home/HeroCarousel';
import VideoCard from '@/components/VideoCard';
import { Button } from '@/components/ui/button';
import { ArrowRight, Flame, Star, Car, Mountain, Wrench, Zap, Flag, TrendingUp, Clock, Video, Play } from 'lucide-react';
import { mockVideos, mockShortVideos } from '@/services/mockData';
import VideosPageWrapper from '@/components/VideosPageWrapper';
import '@/styles/videos-dark-mode.css';
import { Link } from 'react-router-dom';

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
  // Short videos with 9:16 aspect ratio
  const shorts = mockShortVideos;

  return (
    <VideosPageWrapper>
      <main className="w-full mx-auto px-0 py-[32px]">
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
              imageUrl: 'https://www.motortrend.com/uploads/2024/02/023-2022-Tesla-Model-S-Plaid-2024-Lucid-Air-Sapphire.jpg',
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
              imageUrl: 'https://www.detroitnews.com/gcdn/presto/2023/07/08/PDTN/5412545d-2e10-4054-90b9-f66aef409437-2023-07-08_DetNews_Holly_Oaks_4x4_Bronco_Wrangler_-_Stills_-_Sevald-33.jpg?crop=6719,3780,x0,y341&width=3200&height=1801&format=pjpg&auto=webp',
              videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
              tag: 'Adventure',
              tagColor: 'bg-green-800',
              author: 'Carlos Ramirez',
              readTime: '6 hours ago'
            }
          ]} />
        </div>

        {/* Shorts Section - 9:16 Aspect Ratio */}
        <section className="mb-10">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-2xl font-bold text-white">
              <span className="text-motortrend-red"><Video size={24} /></span>
              Shorts
            </h2>
            <Button variant="ghost" className="flex items-center gap-2 text-gray-300 hover:text-white hover:bg-gray-800" asChild>
              <Link to="/shorts/short-1">
                View All
                <ArrowRight size={16} />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-6">
            {shorts.map(video => (
              <Link 
                key={video.id} 
                to={`/shorts/${video.id}`}
                className="block aspect-[9/16] relative overflow-hidden rounded-lg hover:opacity-90 transition-opacity"
              >
                <img 
                  src={video.imageUrl} 
                  alt={video.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-2">
                  <div className="flex items-center gap-1 mb-1">
                    <Play size={14} className="text-white" />
                    <span className="text-xs text-white">{video.duration}</span>
                  </div>
                  <h3 className="text-sm font-medium text-white line-clamp-2">{video.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>

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
              <h2 className="flex items-center gap-2 text-2xl font-bold text-white">
                <span className="text-motortrend-red">{icon}</span>
                {title}
              </h2>
              <Button variant="ghost" className="flex items-center gap-2 text-gray-300 hover:text-white hover:bg-gray-800">
                View All
                <ArrowRight size={16} />
              </Button>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {videos.length > 0 ? (
                videos.map(video => <VideoCard key={video.id} video={video} />)
              ) : (
                <div className="col-span-3 text-gray-500 text-center py-8 border border-gray-800 rounded-lg">
                  No videos in this category yet.
                </div>
              )}
            </div>
          </section>
        ))}
      </main>
    </VideosPageWrapper>
  );
};

export default Videos;
