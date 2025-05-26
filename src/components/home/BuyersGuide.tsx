import React from 'react';
import { Link } from 'react-router-dom';
import { Star, DollarSign } from 'lucide-react';
interface GuideItem {
  id: string;
  title: string;
  price: string;
  rating: number;
  imageUrl: string;
  badge?: string;
  badgeColor?: string;
}
const guideItems: GuideItem[] = [{
  id: '1',
  title: '2025 Lucid Air Grand Touring',
  price: '$87,400',
  rating: 4.8,
  imageUrl: 'https://images.unsplash.com/photo-1617654112368-307921291f42?auto=format&fit=crop&w=400&h=300',
  badge: 'Sponsored',
  badgeColor: 'bg-yellow-500'
}, {
  id: '2',
  title: '2025 Rivian R1S',
  price: '$76,000',
  rating: 4.6,
  imageUrl: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&w=400&h=300'
}, {
  id: '3',
  title: '2025 BMW i5 eDrive40',
  price: '$65,700',
  rating: 4.7,
  imageUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=400&h=300'
}, {
  id: '4',
  title: '2025 Ford Mustang GT',
  price: '$42,990',
  rating: 4.5,
  imageUrl: 'https://images.unsplash.com/photo-1494905998402-395d579af36f?auto=format&fit=crop&w=400&h=300'
}];
const BuyersGuide: React.FC = () => {
  return <section className="space-content">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-1 h-8 bg-motortrend-red rounded-full"></div>
          <h2 className="typography-display text-neutral-1 text-2xl">Buyer's Guide</h2>
        </div>
        <Link to="/buyers-guide" className="typography-body text-motortrend-red hover:text-motortrend-red/80 font-medium transition-colors">
          View All →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {guideItems.map(item => <div key={item.id} className="group">
            <Link to={`/new-car/${item.id}`} className="block">
              <div className="bg-white rounded-2xl overflow-hidden shadow-modern hover:shadow-modern-lg transition-all duration-300 group-hover:-translate-y-1">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  {item.badge && <div className="absolute top-4 right-4">
                      <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-white typography-small font-semibold tracking-wide ${item.badgeColor}`}>
                        {item.badge}
                      </span>
                    </div>}
                </div>
                
                <div className="p-6">
                  <h3 className="typography-title text-neutral-1 mb-3 group-hover:text-motortrend-red transition-colors">
                    {item.title}
                  </h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <DollarSign size={18} className="text-green-600" />
                      <span className="typography-body-large font-semibold text-neutral-1">
                        {item.price}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <Star size={16} className="fill-yellow-400 text-yellow-400" />
                      <span className="typography-body text-neutral-2 font-medium">
                        {item.rating}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>)}
      </div>
    </section>;
};
export default BuyersGuide;