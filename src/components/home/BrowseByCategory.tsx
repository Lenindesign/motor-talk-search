
import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Truck, Zap, Crown, Trophy, TrendingUp, LayoutGrid } from 'lucide-react';

interface CategoryItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  link: string;
  description: string;
}

const categories: CategoryItem[] = [{
  id: 'suvs',
  name: 'SUVs',
  icon: <Car size={24} />,
  link: '/cars?category=suv',
  description: 'Family-friendly utility vehicles'
}, {
  id: 'sedans',
  name: 'Sedans',
  icon: <Car size={24} />,
  link: '/cars?category=sedan',
  description: 'Comfortable and efficient'
}, {
  id: 'trucks',
  name: 'Trucks',
  icon: <Truck size={24} />,
  link: '/cars?category=truck',
  description: 'Power and capability'
}, {
  id: 'electric',
  name: 'Electric',
  icon: <Zap size={24} />,
  link: '/cars?category=electric',
  description: 'Zero-emission vehicles'
}, {
  id: 'luxury',
  name: 'Luxury',
  icon: <Crown size={24} />,
  link: '/cars?category=luxury',
  description: 'Premium and sophisticated'
}, {
  id: 'sports',
  name: 'Sports Cars',
  icon: <Trophy size={24} />,
  link: '/cars?category=sports',
  description: 'Performance and excitement'
}];

const trendingComparisons = [{
  id: '1',
  title: 'Toyota RAV4 Prime vs Honda CR-V Hybrid',
  views: '244K views'
}, {
  id: '2',
  title: 'Ford F-150 Lightning vs Ram 1500 TRX',
  views: '189K views'
}];

const BrowseByCategory: React.FC = () => {
  return (
    <section className="space-content">
      <div className="component-header">
        <h2 className="component-title">
          <LayoutGrid size={24} />
          Browse By Category
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
        {categories.map(category => (
          <Link key={category.id} to={category.link} className="group">
            <div className="bg-white rounded-2xl p-6 text-center shadow-modern hover:shadow-modern-lg transition-all duration-300 group-hover:-translate-y-1">
              <div className="w-12 h-12 rounded-full bg-motortrend-red/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-motortrend-red group-hover:text-white transition-colors">
                <div className="text-motortrend-red group-hover:text-white transition-colors">
                  {category.icon}
                </div>
              </div>
              <h3 className="typography-title text-neutral-1 mb-2 group-hover:text-motortrend-red transition-colors">
                {category.name}
              </h3>
              <p className="typography-caption text-neutral-4">
                {category.description}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-modern">
        <div className="component-header">
          <h2 className="component-title">
            <TrendingUp size={24} />
            Trending Comparisons
          </h2>
        </div>

        <div className="space-y-4">
          {trendingComparisons.map(comparison => (
            <div key={comparison.id} className="flex items-center justify-between p-4 rounded-xl bg-neutral-7 hover:bg-neutral-6 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-motortrend-red/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-motortrend-red typography-caption font-bold">vs</span>
                </div>
                <span className="typography-body text-neutral-1 font-medium">
                  {comparison.title}
                </span>
              </div>
              <span className="typography-caption text-neutral-4">
                {comparison.views}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrowseByCategory;
