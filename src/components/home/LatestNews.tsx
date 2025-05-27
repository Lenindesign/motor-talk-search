
import React from 'react';
import { Link } from 'react-router-dom';
import { Newspaper, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ArticleCard, { ArticleData } from '@/components/ArticleCard';

const newsItems: ArticleData[] = [{
  id: '1',
  title: '2025 Ferrari 12Cilindri First Look: The B12-HP...',
  imageUrl: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=400&h=300',
  category: 'Review',
  date: 'May 8, 2025'
}, {
  id: '2',
  title: 'Electric SUVs With the Longest Range in 2025',
  imageUrl: 'https://file.kelleybluebookimages.com/kbb/base/house/2025/2025-Rivian-R1S-FrontSide_RIVR1S2501_640x480.jpg',
  category: 'Guide',
  date: 'May 3, 2025'
}, {
  id: '3',
  title: 'Best Performance Cars Under $50,000',
  imageUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=400&h=300',
  category: 'Buyer\'s Guide',
  date: 'Apr 30, 2025'
}, {
  id: '4',
  title: '2025 Tesla Cybertruck Owner Review: Living With...',
  imageUrl: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=400&h=300',
  category: 'Long-Term Test',
  date: 'Apr 28, 2025'
}, {
  id: '5',
  title: 'Hybrid vs Electric: Which Is Right for You in 2025?',
  imageUrl: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=400&h=300',
  category: 'Comparison',
  date: 'Apr 25, 2025'
}];

const LatestNews: React.FC = () => {
  return (
    <section className="space-content">
      <div className="component-header">
        <h2 className="component-title">
          <Newspaper size={24} />
          Latest News
        </h2>
        <Button variant="ghost" asChild>
          <Link to="/news" className="component-view-all">
            View All
            <ArrowRight size={16} />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {newsItems.map(item => <ArticleCard key={item.id} article={item} />)}
      </div>
    </section>
  );
};

export default LatestNews;
