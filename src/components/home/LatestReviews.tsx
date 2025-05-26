
import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Star } from 'lucide-react';

interface ReviewItem {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  tag: string;
  tagColor: string;
  rating?: number;
  date: string;
  author: string;
}

const reviewItems: ReviewItem[] = [
  {
    id: '1',
    title: '2024 Honda Accord Hybrid Review: The Smart Choice',
    subtitle: 'Honda\'s hybrid sedan delivers exceptional fuel economy without sacrificing performance or comfort.',
    imageUrl: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=600&h=400',
    tag: 'Review',
    tagColor: 'bg-blue-600',
    rating: 4.5,
    date: 'May 5, 2025',
    author: 'MotorTrend Staff'
  },
  {
    id: '2',
    title: 'Hyundai Santa Fe XRT Off-Road Review: Surprisingly...',
    subtitle: 'The Santa Fe XRT proves that family SUVs can be capable off-road performers.',
    imageUrl: 'https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=600&h=400',
    tag: 'Guide',
    tagColor: 'bg-green-600',
    rating: 4.2,
    date: 'May 3, 2025',
    author: 'MotorTrend Staff'
  }
];

const LatestReviews: React.FC = () => {
  return (
    <section className="space-content">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Star size={24} className="text-motortrend-red" />
          <h2 className="typography-display text-neutral-1">Latest Reviews</h2>
        </div>
        <Link 
          to="/news"
          className="typography-body text-motortrend-red hover:text-motortrend-red/80 font-medium transition-colors"
        >
          View All →
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {reviewItems.map((item) => (
          <article key={item.id} className="group">
            <Link to={`/article/${item.id}`} className="block">
              <div className="bg-white rounded-2xl overflow-hidden shadow-modern hover:shadow-modern-lg transition-all duration-300 group-hover:-translate-y-1">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-white typography-small font-semibold tracking-wide ${item.tagColor}`}>
                      {item.tag}
                    </span>
                  </div>
                  
                  {item.rating && (
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2">
                      <div className="flex items-center gap-1">
                        <Star size={16} className="fill-yellow-400 text-yellow-400" />
                        <span className="text-white typography-caption font-semibold">
                          {item.rating}/5
                        </span>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3 typography-caption text-neutral-4">
                    <span>{item.date}</span>
                    <span>•</span>
                    <span>{item.author}</span>
                  </div>
                  
                  <h3 className="typography-title text-neutral-1 mb-3 group-hover:text-motortrend-red transition-colors">
                    {item.title}
                  </h3>
                  
                  <p className="typography-body text-neutral-4">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
};

export default LatestReviews;
