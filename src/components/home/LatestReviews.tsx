
import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ArticleCard, { ArticleData } from '@/components/ArticleCard';

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

const reviewItems: ArticleData[] = [{
  id: '1',
  title: '2024 Honda Accord Hybrid Review: The Smart Choice',
  imageUrl: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=600&h=400',
  category: 'Review',
  date: 'May 5, 2025'
}, {
  id: '2',
  title: 'Hyundai Santa Fe XRT Off-Road Review: Surprisingly...',
  imageUrl: 'https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=600&h=400',
  category: 'Guide',
  date: 'May 3, 2025'
}, {
  id: '3',
  title: '2025 BMW X5 Long-Term Test: 6 Months Later',
  imageUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=600&h=400',
  category: 'Long-Term Test',
  date: 'May 1, 2025'
}];

const LatestReviews: React.FC = () => {
  return (
    <section className="space-content">
      <div className="component-header">
        <h2 className="component-title">
          <Star size={24} />
          Latest Reviews
        </h2>
        <Button variant="ghost" asChild>
          <Link to="/news" className="component-view-all">
            View All
            <ArrowRight size={16} />
          </Link>
        </Button>
      </div>

      <div className="!mt-0 flex flex-col gap-4 md:grid md:grid-cols-3 md:gap-6">
        {reviewItems.map(item => (
          <ArticleCard key={item.id} article={item} />
        ))}
      </div>
    </section>
  );
};

export default LatestReviews;
