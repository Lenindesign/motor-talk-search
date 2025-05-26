
import React from 'react';
import BaseCard from './BaseCard';
import { CardType } from '@/styles/cardStyles';
import { cn } from '@/lib/utils';
import { CarData, CarCardProps } from '../CarCard/types';
import { ArticleData, ArticleCardProps } from '../ArticleCard';
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
  switch (type) {
    case 'newCar':
      return {
        car: data as CarData,
        type: 'new',
        className: props.className,
        isLoading: props.isLoading,
        isSaved: props.isSaved,
        onToggleSave: props.onToggleSave,
        metadata: props.metadata,
        children: props.children,
        ...props
      } as CarCardProps;
    case 'usedCar':
      return {
        car: data as CarData,
        type: 'used',
        className: props.className,
        isLoading: props.isLoading,
        isSaved: props.isSaved,
        onToggleSave: props.onToggleSave,
        metadata: props.metadata,
        children: props.children,
        ...props
      } as CarCardProps;
    case 'article':
      return {
        article: data as ArticleData,
        className: props.className,
        isLoading: props.isLoading,
        isSaved: props.isSaved,
        onToggleSave: props.onToggleSave,
        metadata: props.metadata,
        children: props.children,
        ...props
      } as ArticleCardProps;
    case 'video':
      return {
        video: data as VideoData,
        className: props.className,
        isLoading: props.isLoading,
        isSaved: props.isSaved,
        onToggleSave: props.onToggleSave,
        metadata: props.metadata,
        children: props.children,
        ...props
      } as VideoCardProps;
    case 'photo':
      return {
        photo: data as PhotoData,
        className: props.className,
        isLoading: props.isLoading,
        isSaved: props.isSaved,
        onToggleSave: props.onToggleSave,
        metadata: props.metadata,
        children: props.children,
        ...props
      } as PhotoCardProps;
    default:
      throw new Error(`Unknown card type: ${type}`);
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
    <BaseCard
      type={type}
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
    </BaseCard>
  );
};

export default CardFactory;
