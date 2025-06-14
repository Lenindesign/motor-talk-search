

import React, { useState } from 'react';
import { LayoutToggle, LayoutMode } from './ui/layout-toggle';
import { ArticleData } from '@/types/article';
import { VideoData } from '@/types/video';
import { PhotoData } from '@/types/photo';
import { CarData } from '@/types/car';
import ArticleCard from './ArticleCard';
import VideoCard from './VideoCard';
import PhotoCard from './PhotoCard';
import CarCard from './CarCard';

type CardData = ArticleData | VideoData | PhotoData | CarData;

interface CardGridProps {
  items: CardData[];
  type: 'article' | 'video' | 'photo' | 'car';
  className?: string;
}

export const CardGrid: React.FC<CardGridProps> = ({
  items,
  type,
  className = ''
}) => {
  const [layout, setLayout] = useState<LayoutMode>('grid');

  // Convert LayoutMode to the format expected by card components
  const cardLayout = layout === 'grid' ? 'vertical' : 'horizontal';

  const renderCard = (item: CardData) => {
    switch (type) {
      case 'article':
        return <ArticleCard article={item as ArticleData} layout={cardLayout} />;
      case 'video':
        // Convert VideoData to match VideoCard expectations
        const videoData = item as VideoData;
        const videoCardData = {
          ...videoData,
          imageUrl: videoData.thumbnailUrl || '/placeholder.svg',
          views: String(videoData.views) // Convert number to string
        };
        return <VideoCard video={videoCardData} layout={cardLayout} />;
      case 'photo':
        // Convert PhotoData to match PhotoCard expectations
        const photoData = item as PhotoData;
        const photoCardData = {
          ...photoData,
          make: 'Unknown',
          carModel: 'Unknown',
          year: 'Unknown',
          position: photoData.position ? String(photoData.position) : undefined // Convert number to string
        };
        return <PhotoCard photo={photoCardData} layout={cardLayout} />;
      case 'car':
        // Convert CarData to match CarCard expectations
        const carData = item as CarData;
        const carCardData = {
          ...carData,
          category: 'Vehicle',
          price: carData.price || 'Price not available' // Ensure price is always present
        };
        return <CarCard car={carCardData} layout={cardLayout} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <LayoutToggle mode={layout} onModeChange={setLayout} />
      </div>
      <div className={`${layout === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'} ${className}`}>
        {items.map((item, index) => (
          <div key={item.id || index}>
            {renderCard(item)}
          </div>
        ))}
      </div>
    </div>
  );
};

