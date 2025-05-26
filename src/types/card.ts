export type CardType = 'photo' | 'video' | 'newCar' | 'usedCar' | 'article';

export interface CardBaseProps {
  id: string;
  title: string;
  imageUrl: string;
  type: CardType;
  savedAt?: string;
  metadata?: Record<string, any>;
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
