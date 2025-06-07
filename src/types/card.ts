export type CardType = 'photo' | 'video' | 'newCar' | 'usedCar' | 'article';

export interface CardBaseProps {
  id: string;
  title: string;
  imageUrl: string;
  type: CardType;
  savedAt?: string;
  metadata?: {
    date?: string;
    category?: string;
    duration?: string;
    description?: string;
    photoCount?: number;
    price?: string;
    mileage?: string;
    location?: string;
    dealerName?: string;
    [key: string]: string | number | undefined;
  };
  inGarage?: boolean;
  garageStatus?: 'Owned' | 'Test Drive' | 'Interested';
}

export interface CardProps extends CardBaseProps {
  className?: string;
  onClick?: () => void;
  isSaved?: boolean;
  onToggleSave?: () => void;
  isLoading?: boolean;
  priority?: boolean;
  width?: number;
  height?: number;
  quality?: number;
  blurRadius?: number;
  borderRadius?: number;
  transitionDuration?: number;
}

export interface CardHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export interface CardMetadataProps {
  metadata: Record<string, any>;
  className?: string;
}
