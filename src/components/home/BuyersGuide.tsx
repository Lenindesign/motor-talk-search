import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CarCard, { CarData } from '@/components/CarCard';

// Enhanced guideItems with MotorTrend scores and rankings
const guideItems: CarData[] = [{
  id: 'new-1',
  title: '2025 Lucid Air Grand Touring',
  price: '$87,400',
  msrp: '$87,400',
  imageUrl: 'https://d2kde5ohu8qb21.cloudfront.net/files/67eebefe5107540008d18c50/020-2025-lucid-air-pure.jpg',
  isNew: true,
  year: "2025",
  category: 'Luxury Sedan',
  fuelType: 'Electric',
  range: '516 miles',
  mpge: '131 MPGe',
  motorTrendScore: '9.2',
  motorTrendRank: '#1',
  motorTrendCategoryRank: true,
  userReviewsScore: '4.5',
}, {
  id: 'new-2',
  title: '2025 Rivian R1S',
  price: '$76,000',
  msrp: '$76,000',
  imageUrl: 'https://d2kde5ohu8qb21.cloudfront.net/files/67003206c86c06000844d0f6/001-2025-rivian-r1s-dual-max-lead.jpg',
  isNew: true,
  year: "2025",
  category: 'Electric SUV',
  fuelType: 'Electric',
  range: '410 miles',
  mpge: '115 MPGe',
  motorTrendScore: '8.9',
  motorTrendRank: '#1',
  motorTrendCategoryRank: true,
  userReviewsScore: '4.2',
}, {
  id: 'new-3',
  title: '2025 BMW i5 eDrive40',
  price: '$65,700',
  msrp: '$65,700',
  imageUrl: 'https://d2kde5ohu8qb21.cloudfront.net/files/66f1b4fea063c100087ac1dc/002-2025-bmw-i5-m60-front-view.jpg',
  isNew: true,
  year: "2025",
  category: 'Electric Sedan',
  fuelType: 'Electric',
  range: '295 miles',
  mpge: '104 MPGe',
  motorTrendScore: '8.7',
  motorTrendRank: '#2',
  motorTrendCategoryRank: true,
  userReviewsScore: '4.0',
}, {
  id: 'new-4',
  title: '2025 Ford Mustang GT',
  price: '$42,990',
  msrp: '$42,990',
  imageUrl: 'https://d2kde5ohu8qb21.cloudfront.net/files/668fe41a96736e0008669212/2025fordmustanggtdgoodwood4.png',
  isNew: true,
  year: "2025",
  category: 'Sports Car',
  fuelType: 'Gas',
  engine: '5.0L V8',
  mpg: '22 MPG',
  horsepower: '480 hp',
  motorTrendScore: '8.5',
  motorTrendRank: '#1',
  motorTrendCategoryRank: true,
  userReviewsScore: '4.3',
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
        {guideItems.slice(0, 3).map((item, index) => (
          <div key={item.id} className="relative">
            {/* Mobile horizontal cards */}
            <CarCard 
              car={item} 
              type="new" 
              priority={index < 2} 
              layout="horizontal"
              className="md:hidden"
            />
            {/* Desktop vertical cards */}
            <CarCard 
              car={item} 
              type="new" 
              priority={index < 2} 
              layout="vertical"
              className="hidden md:block"
            />
            <div className="absolute top-2 right-2 z-10 w-8 h-8 bg-motortrend-red text-white rounded-sm flex items-center justify-center font-bold text-sm">
              {index + 1}
            </div>
          </div>
        ))}
      </div>
    </section>;
};
export default BuyersGuide;