import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp } from 'lucide-react';

interface CategoryItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  hoverIcon: React.ReactNode;
  link: string;
  description: string;
}

const categories: CategoryItem[] = [
  {
    id: 'suvs',
    name: 'SUVs',
    icon: <img src="https://d2kde5ohu8qb21.cloudfront.net/files/6847a6f366f64f0008f0841b/suv.svg" alt="SUV" className="w-32 h-32" />,
    hoverIcon: <img src="https://d2kde5ohu8qb21.cloudfront.net/files/6847aab5869a9800088513ac/suvhover.svg" alt="SUV Hover" className="w-32 h-32" />,
    link: '/cars?category=suv',
    description: 'Family-friendly utility vehicles'
  },
  {
    id: 'sedans',
    name: 'Sedans',
    icon: <img src="https://d2kde5ohu8qb21.cloudfront.net/files/6847a6f25531180008e9087a/sedan.svg" alt="Sedan" className="w-32 h-32" />,
    hoverIcon: <img src="https://d2kde5ohu8qb21.cloudfront.net/files/6847aab57ffbf0000858829c/sedanhover.svg" alt="Sedan Hover" className="w-32 h-32" />,
    link: '/cars?category=sedan',
    description: 'Comfortable and efficient'
  },
  {
    id: 'trucks',
    name: 'Trucks',
    icon: <img src="https://d2kde5ohu8qb21.cloudfront.net/files/6847a6f466f64f0008f0841d/trucks.svg" alt="Truck" className="w-32 h-32" />,
    hoverIcon: <img src="https://d2kde5ohu8qb21.cloudfront.net/files/6847aab166f64f0008f0841f/truckhover.svg" alt="Truck Hover" className="w-32 h-32" />,
    link: '/cars?category=truck',
    description: 'Power and capability'
  },
  {
    id: 'electric',
    name: 'Electric',
    icon: <img src="https://d2kde5ohu8qb21.cloudfront.net/files/6847a6ef869a9800088513a7/electric.svg" alt="Electric" className="w-32 h-32" />,
    hoverIcon: <img src="https://d2kde5ohu8qb21.cloudfront.net/files/6847aab45531180008e9087f/electrichover.svg" alt="Electric Hover" className="w-32 h-32" />,
    link: '/cars?category=electric',
    description: 'Zero-emission vehicles'
  },
  {
    id: 'luxury',
    name: 'Luxury',
    icon: <img src="https://d2kde5ohu8qb21.cloudfront.net/files/6847a6f05531180008e90878/luxury.svg" alt="Luxury" className="w-32 h-32" />,
    hoverIcon: <img src="https://d2kde5ohu8qb21.cloudfront.net/files/6847aab3869a9800088513aa/luxuryhover.svg" alt="Luxury Hover" className="w-32 h-32" />,
    link: '/cars?category=luxury',
    description: 'Premium and sophisticated'
  },
  {
    id: 'sports',
    name: 'Sports Cars',
    icon: <img src="https://d2kde5ohu8qb21.cloudfront.net/files/6847a6f25531180008e9087b/sports.svg" alt="Sports Car" className="w-32 h-32" />,
    hoverIcon: <img src="https://d2kde5ohu8qb21.cloudfront.net/files/6847aab266f64f0008f08420/sportshover.svg" alt="Sports Car Hover" className="w-32 h-32" />,
    link: '/cars?category=sports',
    description: 'Performance and excitement'
  }
];

const trendingComparisons = [
  {
    id: '1',
    title: 'Toyota RAV4 Prime vs Honda CR-V Hybrid',
    views: '244K views'
  },
  {
    id: '2',
    title: 'Ford F-150 Lightning vs Ram 1500 TRX',
    views: '189K views'
  }
];

const BrowseByCategory: React.FC = () => {
  return (
    <section className="space-content">
      <div className="component-header">
        <h2 className="component-title">
          Browse By Category
        </h2>
      </div>

      <div className="!mt-0 grid grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={category.link}
            className="group flex flex-col items-center p-6 rounded-lg border border-neutral-200 hover:border-neutral-300 transition-all duration-200 hover:shadow-md"
          >
            <div className="mb-4 relative flex items-center justify-center w-32 h-32">
              <div className="absolute inset-0 flex items-center justify-center group-hover:opacity-0 transition-opacity duration-200">
                {category.icon}
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {category.hoverIcon}
              </div>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-2 text-center">
              {category.name}
            </h3>
            <p className="text-sm text-neutral-600 text-center">
              {category.description}
            </p>
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