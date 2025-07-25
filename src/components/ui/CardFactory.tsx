import React from 'react';
import { Card } from './card';
import { CardType } from '@/styles/cardStyles';
import { cn } from '@/lib/utils';
import { CarData, CarCardProps } from '../CarCard/types';
import { ArticleData, ArticleCardProps } from '@/types/article';
import { VideoData, VideoCardProps } from '../VideoCard';
import { PhotoData, PhotoCardProps } from '../PhotoCard';

// Define a union type for all card data types
export type CardData = CarData | ArticleData | VideoData | PhotoData;

// Define a union type for all card props
export type CardProps = CarCardProps | ArticleCardProps | VideoCardProps | PhotoCardProps;

// Define a mapping of card types to their specific props
interface CardPropsMap {
  [key: string]: CardProps;
}

// Define a mapping of card types to their specific data
interface CardDataMap {
  [key: string]: CardData;
}

// Define a type for the card factory props
interface CardFactoryProps {
  type: CardType;
  data: CardData;
  className?: string;
  isLoading?: boolean;
  isSaved?: boolean;
  onToggleSave?: () => void;
  metadata?: Record<string, string>;
  children?: React.ReactNode;
  [key: string]: any;
}

// Factory function to create card-specific props
const createCardProps = (
  type: CardType,
  data: CardData,
  props: CardFactoryProps
): CardProps => {
  // Extract the original type from props to avoid conflicts
  const { type: originalType, data: originalData, ...restProps } = props;
  
  switch (type) {
    case 'newCar':
      return {
        car: data as CarData,
        type: 'new',
        ...restProps
      } as CarCardProps;
    case 'usedCar':
      return {
        car: data as CarData,
        type: 'used',
        ...restProps
      } as CarCardProps;
    case 'car':
      return {
        car: data as CarData,
        type: 'new', // Default to new for generic car type
        ...restProps
      } as CarCardProps;
    case 'article':
      return {
        article: data as ArticleData,
        ...restProps
      } as ArticleCardProps;
    case 'video':
      return {
        video: data as VideoData,
        ...restProps
      } as VideoCardProps;
    case 'photo':
      return {
        photo: data as PhotoData,
        ...restProps
      } as PhotoCardProps;
    default:
      throw new Error(`Unknown card type: ${type}`);
  }
};

// Helper function to map CardType to Card variant
const getCardVariant = (type: CardType): "article" | "photo" | "video" | "newCar" | "usedCar" | "default" => {
  switch (type) {
    case 'article':
      return 'article';
    case 'photo':
      return 'photo';
    case 'video':
      return 'video';
    case 'newCar':
      return 'newCar';
    case 'usedCar':
      return 'usedCar';
    case 'car':
      return 'newCar'; // Default to newCar for generic car type
    default:
      return 'default';
  }
};

const CardFactory: React.FC<CardFactoryProps> = ({
  type,
  data,
  className,
  isLoading,
  isSaved,
  onToggleSave,
  metadata,
  children,
  ...props
}) => {
  const cardProps = createCardProps(type, data, {
    type,
    data,
    className,
    isLoading,
    isSaved,
    onToggleSave,
    metadata,
    children,
    ...props
  });

  return (
    <Card
      variant={getCardVariant(type)}
      className={cn(
        'group relative',
        className
      )}
      isLoading={isLoading}
      isSaved={isSaved}
      onToggleSave={onToggleSave}
      metadata={metadata}
    >
      {children}
    </Card>
  );
};

export default CardFactory;
