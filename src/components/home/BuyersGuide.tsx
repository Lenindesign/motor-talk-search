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
  imageUrl: 'https://d2kde5ohu8qb21.cloudfront.net/files/67eebefe5107540008d18c50/020-2025-lucid-air-pure.jpg',
  isNew: true,
  year: "2025",
  category: 'Luxury Sedan'
}, {
  id: 'new-2',
  title: '2025 Rivian R1S',
  price: '$76,000',
  imageUrl: 'https://d2kde5ohu8qb21.cloudfront.net/files/67003206c86c06000844d0f6/001-2025-rivian-r1s-dual-max-lead.jpg',
  isNew: true,
  year: "2025",
  category: 'Electric SUV'
}, {
  id: 'new-3',
  title: '2025 BMW i5 eDrive40',
  price: '$65,700',
  imageUrl: 'https://d2kde5ohu8qb21.cloudfront.net/files/66f1b4fea063c100087ac1dc/002-2025-bmw-i5-m60-front-view.jpg',
  isNew: true,
  year: "2025",
  category: 'Electric Sedan'
}, {
  id: 'new-4',
  title: '2025 Ford Mustang GT',
  price: '$42,990',
  imageUrl: 'https://d2kde5ohu8qb21.cloudfront.net/files/668fe41a96736e0008669212/2025fordmustanggtdgoodwood4.png',
  isNew: true,
  year: "2025",
  category: 'Sports Car'
}];
const BuyersGuide: React.FC = () => {
  return <section className="space-content">
      <div className="component-header">
        <h2 className="component-title">
          
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
        {guideItems.slice(0, 3).map((item, index) => <div key={item.id} className="relative">
            <CarCard car={item} type="new" />
            <div className="absolute top-2 right-2 z-10 w-8 h-8 bg-motortrend-red text-white rounded-sm flex items-center justify-center font-bold text-sm">
              {index + 1}
            </div>
          </div>)}
      </div>
    </section>;
};
export default BuyersGuide;