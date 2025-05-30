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
  imageUrl: 'https://d2kde5ohu8qb21.cloudfront.net/files/65a469ea7f8e48000893d711/032-2024-honda-accord-hybrid-front-three-quarters-in-action.jpg',
  category: 'Review',
  date: 'May 5, 2025'
}, {
  id: '2',
  title: 'Hyundai Santa Fe XRT Off-Road Review: Surprisingly...',
  imageUrl: 'https://d2kde5ohu8qb21.cloudfront.net/files/66bbf44b13acd10008772522/18-2025-hyundai-santa-fe-xrt-front-view.jpg',
  category: 'Guide',
  date: 'May 3, 2025'
}, {
  id: '3',
  title: '2025 BMW X5 Long-Term Test: 6 Months Later',
  imageUrl: 'https://d2kde5ohu8qb21.cloudfront.net/files/663a6303d2a27f000a207787/003-2024-bmw-x5-m-competiition.jpg',
  category: 'Long-Term Test',
  date: 'May 1, 2025'
}];
const LatestReviews: React.FC = () => {
  return <section className="space-content">
      <div className="component-header">
        <h2 className="component-title">
          
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
        {reviewItems.map(item => <ArticleCard key={item.id} article={item} />)}
      </div>
    </section>;
};
export default LatestReviews;