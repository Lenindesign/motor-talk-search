import { CardType } from '../../types/card';

interface CardConfig {
  title: string;
  requiredFields: string[];
  defaultValues?: Record<string, any>;
  metadataFields?: string[];
}

export const CARD_REGISTRY: Record<CardType, CardConfig> = {
  'article': {
    title: 'Article',
    requiredFields: ['id', 'title', 'imageUrl', 'author', 'publishDate', 'readingTime'],
    defaultValues: {
      readingTime: '5 min',
      views: '0'
    }
  },
  'photo': {
    title: 'Photo',
    requiredFields: ['id', 'title', 'imageUrl', 'position'],
    defaultValues: {
      views: '0'
    }
  },
  'video': {
    title: 'Video',
    requiredFields: ['id', 'title', 'imageUrl', 'duration', 'rating'],
    defaultValues: {
      duration: '0:00',
      rating: 0,
      views: '0'
    }
  },
  'newCar': {
    title: 'New Car',
    requiredFields: ['id', 'title', 'imageUrl', 'make', 'model', 'year'],
    defaultValues: {
      rating: 0
    }
  },
  'usedCar': {
    title: 'Used Car',
    requiredFields: ['id', 'title', 'imageUrl', 'make', 'model', 'year', 'mileage'],
    defaultValues: {
      mileage: '0 miles',
      condition: 'Excellent'
    }
  }
}
};

export const validateCardData = (
  type: CardType,
  data: Record<string, any>
): boolean => {
  const config = CARD_REGISTRY[type];
  if (!config) return false;

  return config.requiredFields.every(field => data[field] !== undefined);
};

export const getCardConfig = (type: CardType): CardConfig | undefined => {
  return CARD_REGISTRY[type];
};

export default CARD_REGISTRY;
