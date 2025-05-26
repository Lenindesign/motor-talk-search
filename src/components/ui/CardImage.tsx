import React from 'react';
import { CARD_STYLES } from '@/styles/cardStyles';

interface CardImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  fallbackImageUrl?: string;
  isLoading?: boolean;
}

const CardImage: React.FC<CardImageProps> = ({
  src,
  alt,
  width = 320,
  height = 180,
  priority = false,
  className = '',
  fallbackImageUrl = 'https://images.unsplash.com/photo-1560958089-b8a1980ad549?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3',
  isLoading = false
}) => {
  return (
    <div className="relative">
      <img 
        src={src || fallbackImageUrl} 
        alt={alt} 
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        className={`${CARD_STYLES.image} ${className}`}
      />
      {isLoading && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className={CARD_STYLES.loading} />
        </div>
      )}
    </div>
  );
};

export default CardImage;
