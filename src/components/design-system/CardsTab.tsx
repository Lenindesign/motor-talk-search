
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import GarageStats from '@/components/GarageStats';
import ArticleCard from '@/components/ArticleCard';
import { CarData } from '@/components/CarCard';
import GarageCarCard from '@/components/CarCard';

const CardsTab = () => {
  const sampleCarData: CarData = {
    id: '1',
    title: '2024 Toyota Camry',
    imageUrl: '/lovable-uploads/63b8496b-1701-478b-bdda-3cb3dc187a2a.png',
    price: '$28,500',
    category: 'Sedan',
    year: 2024,
    mileage: '15,000 miles',
    fuelType: 'Hybrid',
    drivetrain: 'FWD',
    location: 'Los Angeles, CA',
    bodyStyle: 'Sedan',
    isNew: true,
    motorTrendScore: 8.5,
    motorTrendRank: 3,
    motorTrendCategoryRank: 1
  };

  const sampleArticle = {
    id: 'art1',
    title: 'Best SUVs for Families in 2025',
    imageUrl: '/lovable-uploads/930641e7-042c-4f43-a9f6-c81fa3a9a0c4.png',
    date: '2025-03-15',
    category: 'SUV'
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Content Cards</CardTitle>
          <CardDescription>Card components used throughout the application</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="typography-title text-neutral-1 mb-4">Car Card</h4>
            <div className="max-w-md">
              <GarageCarCard car={sampleCarData} type="new" />
            </div>
          </div>
          <Separator />
          <div>
            <h4 className="typography-title text-neutral-1 mb-4">Article Card</h4>
            <div className="max-w-md">
              <ArticleCard article={sampleArticle} />
            </div>
          </div>
          <Separator />
          <div>
            <h4 className="typography-title text-neutral-1 mb-4">Garage Stats</h4>
            <GarageStats />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Card Anatomy</CardTitle>
          <CardDescription>Structure and components of content cards</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="typography-title text-neutral-1">Card Elements</h4>
              <ul className="typography-body text-neutral-4 space-y-2">
                <li>• <strong>Image:</strong> 16:9 aspect ratio, optimized loading</li>
                <li>• <strong>Title:</strong> Typography-title, line clamp for overflow</li>
                <li>• <strong>Metadata:</strong> Small text with icons</li>
                <li>• <strong>Actions:</strong> Save, share, and menu buttons</li>
                <li>• <strong>Badges:</strong> Status indicators and categories</li>
                <li>• <strong>Price:</strong> Prominent pricing display</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="typography-title text-neutral-1">Interactive States</h4>
              <ul className="typography-body text-neutral-4 space-y-2">
                <li>• <strong>Hover:</strong> Subtle shadow elevation</li>
                <li>• <strong>Focus:</strong> Keyboard accessibility outline</li>
                <li>• <strong>Loading:</strong> Skeleton states</li>
                <li>• <strong>Saved:</strong> Visual indication of saved state</li>
                <li>• <strong>Error:</strong> Fallback images and states</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CardsTab;
