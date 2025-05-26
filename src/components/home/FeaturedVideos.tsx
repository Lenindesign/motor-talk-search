
import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Clock } from 'lucide-react';

interface VideoItem {
  id: string;
  title: string;
  duration: string;
  imageUrl: string;
  tag: string;
  tagColor: string;
  views: string;
  date: string;
}

const videoItems: VideoItem[] = [
  {
    id: '1',
    title: '2025 BMW i5 vs Mercedes EQS: Electric Luxury Showdown',
    duration: '12:45',
    imageUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=600&h=400',
    tag: 'Review',
    tagColor: 'bg-blue-600',
    views: '245K',
    date: '2 days ago'
  },
  {
    id: '2',
    title: 'Tesla Model S Plaid vs Porsche Taycan Turbo S',
    duration: '15:30',
    imageUrl: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=600&h=400',
    tag: 'Comparison',
    tagColor: 'bg-purple-600',
    views: '892K',
    date: '1 week ago'
  }
];

const FeaturedVideos: React.FC = () => {
  return (
    <section className="space-content">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Play size={24} className="text-motortrend-red" />
          <h2 className="typography-display text-neutral-1">Featured Videos</h2>
        </div>
        <Link 
          to="/videos"
          className="typography-body text-motortrend-red hover:text-motortrend-red/80 font-medium transition-colors"
        >
          View All →
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {videoItems.map((item) => (
          <article key={item.id} className="group">
            <Link to={`/video/${item.id}`} className="block">
              <div className="bg-white rounded-2xl overflow-hidden shadow-modern hover:shadow-modern-lg transition-all duration-300 group-hover:-translate-y-1">
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Play button overlay */}
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/30 transition-colors">
                    <div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play size={24} className="text-neutral-1 ml-1" />
                    </div>
                  </div>
                  
                  <div className="absolute top-4 left-4">
                    <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-white typography-small font-semibold tracking-wide ${item.tagColor}`}>
                      {item.tag}
                    </span>
                  </div>
                  
                  <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm rounded-lg px-3 py-1">
                    <div className="flex items-center gap-1">
                      <Clock size={14} className="text-white" />
                      <span className="text-white typography-caption font-medium">
                        {item.duration}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3 typography-caption text-neutral-4">
                    <span>{item.views} views</span>
                    <span>•</span>
                    <span>{item.date}</span>
                  </div>
                  
                  <h3 className="typography-title text-neutral-1 group-hover:text-motortrend-red transition-colors">
                    {item.title}
                  </h3>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
};

export default FeaturedVideos;
