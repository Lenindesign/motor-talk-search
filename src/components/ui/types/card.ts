export type CardType = 'article' | 'car' | 'photo' | 'video' | 'newCar' | 'usedCar';

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
