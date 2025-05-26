import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  tag: string;
  tagColor: string;
  date: string;
  readTime: string;
}
const newsItems: NewsItem[] = [{
  id: '1',
  title: '2025 Ferrari 12Cilindri First Look: The B12-HP...',
  excerpt: 'Ferrari\'s latest V12 masterpiece delivers unprecedented performance with classic Italian styling.',
  imageUrl: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=400&h=300',
  tag: 'Review',
  tagColor: 'bg-motortrend-red',
  date: 'May 8, 2025',
  readTime: '5 min read'
}, {
  id: '2',
  title: 'Electric SUVs With the Longest Range in 2025',
  excerpt: 'These electric SUVs offer the best combination of range, performance, and practicality for families.',
  imageUrl: 'https://file.kelleybluebookimages.com/kbb/base/house/2025/2025-Rivian-R1S-FrontSide_RIVR1S2501_640x480.jpg',
  tag: 'Guide',
  tagColor: 'bg-blue-600',
  date: 'May 3, 2025',
  readTime: '8 min read'
}, {
  id: '3',
  title: 'Best Performance Cars Under $50,000',
  excerpt: 'These affordable sports cars prove you don\'t need to break the bank for thrilling performance.',
  imageUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=400&h=300',
  tag: 'Buyer\'s Guide',
  tagColor: 'bg-green-600',
  date: 'Apr 30, 2025',
  readTime: '6 min read'
}, {
  id: '4',
  title: '2025 Tesla Cybertruck Owner Review: Living With...',
  excerpt: 'After six months of ownership, here\'s what it\'s really like to live with Tesla\'s radical pickup.',
  imageUrl: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=400&h=300',
  tag: 'Long-Term Test',
  tagColor: 'bg-purple-600',
  date: 'Apr 28, 2025',
  readTime: '12 min read'
}, {
  id: '5',
  title: 'Hybrid vs Electric: Which Is Right for You in 2025?',
  excerpt: 'We compare the latest hybrid and electric vehicles to help you make the best choice.',
  imageUrl: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=400&h=300',
  tag: 'Comparison',
  tagColor: 'bg-orange-600',
  date: 'Apr 25, 2025',
  readTime: '10 min read'
}];
const LatestNews: React.FC = () => {
  return <section className="space-content">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-1 h-8 bg-motortrend-red rounded-full"></div>
          <h2 className="typography-display text-neutral-1 text-2xl">Latest News</h2>
        </div>
        <Link to="/news" className="typography-body text-motortrend-red hover:text-motortrend-red/80 font-medium transition-colors">
          View All →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {newsItems.map((item) => (
          <Link to={`/article/${item.id}`} key={item.id} className="block bg-white rounded-2xl shadow-modern overflow-hidden">
            <div className="relative aspect-[16/9] overflow-hidden">
              <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-white typography-small font-semibold tracking-wide ${item.tagColor}`}>
                  {item.tag}
                </span>
                <span className="text-neutral-4 typography-caption">
                  {item.date}
                </span>
              </div>
              <h3 className="typography-title text-neutral-1 mb-4">
                {item.title}
              </h3>
              <p className="typography-body text-neutral-3 mb-6">
                {item.excerpt}
              </p>
              <div className="flex items-center gap-4">
                <span className="text-neutral-4 typography-caption">
                  {item.readTime}
                </span>
                <Button variant="outline" size="sm" className="text-motortrend-red hover:bg-motortrend-red/10">
                  Read More
                </Button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>;
};
export default LatestNews;