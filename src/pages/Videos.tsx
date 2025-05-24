import React from 'react';
import GlobalHeader from '@/components/GlobalHeader';
import VideoCard from '@/components/VideoCard';
import { Button } from '@/components/ui/button';
import { ArrowRight, Flame, Star, Car, Mountain, Wrench, Zap, Flag, TrendingUp, Clock } from 'lucide-react';
import { mockVideos } from '@/services/mockData';
const Videos: React.FC = () => {
  // Featured video (first video)
  const featuredVideo = mockVideos[0];

  // Example category filters (replace with real tags/categories if available)
  const latestVideos = mockVideos.slice(1, 4);
  const carReviews = mockVideos.filter(v => v.title.toLowerCase().includes('review')).slice(0, 3);
  const trackPerformance = mockVideos.filter(v => v.title.toLowerCase().includes('track') || v.title.toLowerCase().includes('performance')).slice(0, 3);
  const offRoad = mockVideos.filter(v => v.title.toLowerCase().includes('off-road') || v.title.toLowerCase().includes('adventure')).slice(0, 3);
  const classicCars = mockVideos.filter(v => v.title.toLowerCase().includes('classic') || v.title.toLowerCase().includes('restoration')).slice(0, 3);
  const evs = mockVideos.filter(v => v.title.toLowerCase().includes('ev') || v.title.toLowerCase().includes('electric')).slice(0, 3);
  const motorsports = mockVideos.filter(v => v.title.toLowerCase().includes('motorsport') || v.title.toLowerCase().includes('race')).slice(0, 3);
  const trending = mockVideos.slice(4, 7);
  return <div className="min-h-screen bg-gray-50">
      <GlobalHeader />
      <main className="max-w-[980px] mx-auto px-0 py-[32px]">
        {/* Featured Video */}
        <div className="mb-10">
          <h2 className="mb-4 text-2xl font-bold">Featured Video</h2>
          <div className="overflow-hidden rounded-lg bg-white shadow-lg mb-6">
            <div className="relative">
              <img src={featuredVideo.imageUrl} alt={featuredVideo.title} className="h-[400px] w-full object-cover" />
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent p-6">
                <h1 className="mb-2 text-2xl font-bold text-white">{featuredVideo.title}</h1>
                <p className="text-sm text-gray-200">{featuredVideo.duration}</p>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="bg-white/80 hover:bg-white rounded-full p-4 shadow-lg">
                  <svg width="48" height="48" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#E90C17" /><polygon points="10,8 16,12 10,16" fill="#fff" /></svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Section Helper */}
        {[{
        title: 'Latest Videos',
        icon: <Clock size={24} />,
        videos: latestVideos
      }, {
        title: 'Car Reviews',
        icon: <Star size={24} />,
        videos: carReviews
      }, {
        title: 'Track & Performance',
        icon: <Flame size={24} />,
        videos: trackPerformance
      }, {
        title: 'Off-Road & Adventure',
        icon: <Mountain size={24} />,
        videos: offRoad
      }, {
        title: 'Classic Cars & Restorations',
        icon: <Wrench size={24} />,
        videos: classicCars
      }, {
        title: 'EVs & Future Tech',
        icon: <Zap size={24} />,
        videos: evs
      }, {
        title: 'Motorsports',
        icon: <Flag size={24} />,
        videos: motorsports
      }, {
        title: 'Trending Now',
        icon: <TrendingUp size={24} />,
        videos: trending
      }].map(({
        title,
        icon,
        videos
      }) => <section className="mb-10" key={title}>
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
              {videos.length > 0 ? videos.map(video => <VideoCard key={video.id} video={video} />) : <div className="col-span-3 text-gray-400 text-center py-8">No videos in this category yet.</div>}
            </div>
          </section>)}
      </main>
    </div>;
};
export default Videos;