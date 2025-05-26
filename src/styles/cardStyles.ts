import { cn } from '@/lib/utils';

export type CardType = 'article' | 'photo' | 'video' | 'car' | 'newCar' | 'usedCar';
export type CardComponent = 'base' | 'image' | 'metadata' | 'actionButton' | 'header' | 'footer' | 'content';

export interface CardSize {
  small: string;
  medium: string;
  large: string;
}

export interface CardTheme {
  light: string;
  dark: string;
  hover: string;
}

export interface CardStyles {
  base: string;
  padding: string;
  title: string;
  subtitle: string;
  metadata: string;
  header: string;
  footer: string;
  badge: string;
  rating: string;
  actions: string;
  image: string;
  gradient: string;
  actionMenu: string;
  skeleton: string;
  loading: string;
  saveButton: string;
  price: string;
}

export interface CardTypeStyles {
  base: string;
  image: string;
  metadata: string;
  actionButton: string;
}

export const CARD_STYLES: CardStyles & Record<CardType, CardTypeStyles> = {
  // Base styles
  base: 'bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md',
  padding: 'p-4',
  title: 'font-bold text-lg line-clamp-2',
  subtitle: 'text-sm text-gray-600',
  metadata: 'text-sm text-gray-500',
  header: 'flex items-center justify-between mb-3',
  footer: 'mt-4 pt-4 border-t border-gray-100',
  badge: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
  rating: 'flex items-center space-x-1',
  actions: 'flex items-center space-x-2',
  image: 'aspect-[16/9] w-full object-cover',
  gradient: 'absolute inset-0 bg-gradient-to-t from-black/80 to-transparent',
  actionMenu: 'flex items-center space-x-2',
  skeleton: 'animate-pulse',
  loading: 'opacity-0',
  saveButton: 'absolute top-2.5 left-2.5 p-2.5 rounded-full bg-white/90 hover:bg-gray-50 shadow-md transition-all duration-300 transform hover:scale-110 z-50',
  price: 'text-sm font-medium text-gray-900',
  
  // Article styles
  article: {
    base: 'flex flex-col',
    image: 'aspect-[16/9] w-full object-cover',
    metadata: 'text-sm text-gray-500',
    actionButton: 'absolute top-2.5 left-2.5 p-2.5 rounded-full bg-white/90 hover:bg-gray-50 shadow-md transition-all duration-300 transform hover:scale-110 z-50'
  },

  // Photo styles
  photo: {
    base: 'flex flex-col',
    image: 'aspect-[16/9] w-full object-cover',
    metadata: 'text-sm text-gray-600',
    actionButton: 'absolute top-2.5 left-2.5 p-2.5 rounded-full bg-white/90 hover:bg-gray-50 shadow-md transition-all duration-300 transform hover:scale-110 z-50'
  },

  // Video styles
  video: {
    base: 'group relative',
    image: 'aspect-[16/9] w-full object-cover',
    metadata: 'text-sm text-gray-500',
    actionButton: 'absolute top-2.5 left-2.5 p-2.5 rounded-full bg-white/90 hover:bg-gray-50 shadow-md transition-all duration-300 transform hover:scale-110 z-50'
  },

  // Car styles
  car: {
    base: 'flex flex-col',
    image: 'aspect-[16/9] w-full object-cover',
    metadata: 'text-sm text-gray-500',
    actionButton: 'absolute top-2.5 left-2.5 p-2.5 rounded-full bg-white/90 hover:bg-gray-50 shadow-md transition-all duration-300 transform hover:scale-110 z-50'
  },

  // New Car styles
  newCar: {
    base: 'flex flex-col',
    image: 'aspect-[16/9] w-full object-cover',
    metadata: 'text-sm text-gray-500',
    actionButton: 'absolute top-2.5 left-2.5 p-2.5 rounded-full bg-white/90 hover:bg-gray-50 shadow-md transition-all duration-300 transform hover:scale-110 z-50'
  },

  // Used Car styles
  usedCar: {
    base: 'flex flex-col',
    image: 'aspect-[16/9] w-full object-cover',
    metadata: 'text-sm text-gray-500',
    actionButton: 'absolute top-2.5 left-2.5 p-2.5 rounded-full bg-white/90 hover:bg-gray-50 shadow-md transition-all duration-300 transform hover:scale-110 z-50'
  }
};

// Helper function to combine base styles with type-specific styles
export const getCardStyles = (type: keyof typeof CARD_STYLES, baseStyle?: string) => {
  const typeStyles = CARD_STYLES[type as keyof typeof CARD_STYLES];
  return cn(CARD_STYLES.base, baseStyle, typeStyles);
};

// Helper function for type-specific styles
export const getCardTypeStyles = (type: keyof typeof CARD_STYLES, component: keyof typeof CARD_STYLES[typeof type]) => {
  return CARD_STYLES[type][component];
};
