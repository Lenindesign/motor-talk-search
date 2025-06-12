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

  const renderCard = (item: CardData) => {
    switch (type) {
      case 'article':
        return <ArticleCard article={item as ArticleData} layout={layout} />;
      case 'video':
        return <VideoCard video={item as VideoData} layout={layout} />;
      case 'photo':
        return <PhotoCard photo={item as PhotoData} layout={layout} />;
      case 'car':
        return <CarCard car={item as CarData} layout={layout} />;
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
