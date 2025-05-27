
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CarCard, { CarData } from '@/components/CarCard';

// Transformed guideItems to CarData structure
const guideItems: CarData[] = [{
  id: 'new-1',
  title: '2025 Lucid Air Grand Touring',
  price: '$87,400',
  imageUrl: 'https://images.unsplash.com/photo-1617654112368-307921291f42?auto=format&fit=crop&w=400&h=300',
  isNew: true,
  year: "2025",
  category: 'Luxury Sedan'
}, {
  id: 'new-2',
  title: '2025 Rivian R1S',
  price: '$76,000',
  imageUrl: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&w=400&h=300',
  isNew: true,
  year: "2025",
  category: 'Electric SUV'
}, {
  id: 'new-3',
  title: '2025 BMW i5 eDrive40',
  price: '$65,700',
  imageUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=400&h=300',
  isNew: true,
  year: "2025",
  category: 'Electric Sedan'
}, {
  id: 'new-4',
  title: '2025 Ford Mustang GT',
  price: '$42,990',
  imageUrl: 'https://images.unsplash.com/photo-1494905998402-395d579af36f?auto=format&fit=crop&w=400&h=300',
  isNew: true,
  year: "2025",
  category: 'Sports Car'
}];

const BuyersGuide: React.FC = () => {
  return (
    <section className="space-content">
      <div className="component-header">
        <h2 className="component-title">
          <ShoppingCart size={24} />
          Top Cars
        </h2>
        <Button variant="ghost" asChild>
          <Link to="/buyers-guide" className="component-view-all">
            View All
            <ArrowRight size={16} />
          </Link>
        </Button>
      </div>

      <div className="!mt-0 flex flex-col gap-4 md:grid md:grid-cols-3 md:gap-6">
        {guideItems.slice(0, 3).map((item, index) => (
          <div key={item.id} className="relative">
            <CarCard car={item} type="new" />
            <div className="absolute top-2 right-2 z-10 w-8 h-8 bg-motortrend-red text-white rounded-sm flex items-center justify-center font-bold text-sm">
              {index + 1}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BuyersGuide;
