import React from 'react';
import BaseCard from './BaseCard';
import CardHeader from './CardHeader';
import CardFooter from './CardFooter';
import CardBadge from './CardBadge';
import CardRating from './CardRating';
import CardActions from './CardActions';
import { CARD_STYLES } from '@/styles/cardStyles';
import { CardType } from '../../types/card';
import CardMetadata from './CardMetadata';

interface CardFactoryProps {
  type: CardType;
  data: Record<string, any>;
  className?: string;
  onClick?: () => void;
  isSaved?: boolean;
  onToggleSave?: () => void;
  isLoading?: boolean;
}

export const CardFactory = ({
  type,
  data,
  className = '',
  onClick,
  isSaved,
  onToggleSave,
  isLoading
}: CardFactoryProps): React.ReactElement => {
  const renderCardContent = (): React.ReactNode => {
    switch (type) {
      case 'article':
        return (
          <>
            <CardHeader title={data.title} subtitle={data.author} />
            <CardMetadata
              metadata={{
                publishDate: data.publishDate,
                readingTime: data.readingTime
              }}
            />
          </>
        );

      case 'photo':
        return (
          <>
            <CardHeader title={data.title} />
            <CardMetadata
              metadata={{
                views: data.views,
                position: data.position
              }}
            />
          </>
        );

      case 'video':
        return (
          <>
            <CardHeader title={data.title} />
            <CardRating rating={data.rating} />
            <CardMetadata
              metadata={{
                duration: data.duration,
                views: data.views
              }}
            />
          </>
        );

      case 'newCar':
        return (
          <>
            <CardHeader title={data.title} />
            <CardBadge text="New" variant="success" />
            <CardRating rating={data.rating} />
            <CardMetadata
              metadata={{
                make: data.make,
                model: data.model,
                year: data.year
              }}
            />
          </>
        );

      case 'usedCar':
        return (
          <>
            <CardHeader title={data.title} />
            <CardBadge text="Used" variant="secondary" />
            <CardMetadata
              metadata={{
                make: data.make,
                model: data.model,
                year: data.year,
                mileage: data.mileage,
                condition: data.condition
              }}
            />
          </>
        );

      default:
        return null;
    }
  };

  return (
    <BaseCard
      id={data.id}
      title={data.title}
      imageUrl={data.imageUrl}
      type={type}
      onClick={onClick}
      isSaved={isSaved}
      onToggleSave={onToggleSave}
      className={className}
      isLoading={isLoading}
    >
      {renderCardContent()}
    </BaseCard>
  );
};

export default CardFactory;
