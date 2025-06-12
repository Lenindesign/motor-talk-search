
// Types
export type BodyStyle = 'SUV' | 'Sports Car' | 'Sedan' | 'Truck' | 'Minivan' | 'Crossover' | 'Coupe' | 'Convertible' | 'Hatchback' | 'Wagon';
export type CardType = 'article' | 'photo' | 'video' | 'newCar' | 'usedCar';
export type ButtonVariant = 'solid' | 'solid-light' | 'outline-black' | 'ghost-black' | 'solid-red' | 'solid-red-light' | 'outline-red' | 'ghost-red' | 'solid-primary' | 'solid-primary-light' | 'outline-primary' | 'ghost-primary' | 'outline' | 'ghost' | 'link' | 'minimal' | 'default' | 'secondary' | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl' | 'icon-sm' | 'icon' | 'icon-lg';
export type ComponentType = 'button' | 'badge' | 'card';

// Interfaces
export interface BaseData {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
}

export interface CarData extends BaseData {
  price: string;
  year: string;
  mileage?: string;
  fuelType: string;
  drivetrain: string;
  location: string;
  bodyStyle: BodyStyle;
  isNew: boolean;
  motorTrendScore: string;
  motorTrendRank: string;
  motorTrendCategoryRank: boolean;
}

export interface ArticleData extends BaseData {
  date: string;
  author: string;
  readTime: string;
}

export interface PhotoData extends BaseData {
  date: string;
  photoCount: number;
  photographer: string;
  position?: string;
  make?: string;
  carModel?: string;
  year?: string;
}

export interface VideoData extends BaseData {
  date?: string;
  duration: string;
  views?: string;
  channelName?: string;
  description?: string;
  url?: string;
}

export interface PropertyControl {
  type: 'select' | 'boolean' | 'text' | 'range';
  label: string;
  name: string;
  options?: string[];
  min?: number;
  max?: number;
  step?: number;
}

export interface ComponentConfig {
  name: string;
  description: string;
  properties: Record<string, PropertyControl>;
}

export interface BadgeProperties {
  variant: ButtonVariant;
  text: string;
}

export interface ButtonProperties {
  variant: ButtonVariant;
  size: ButtonSize;
  disabled: boolean;
  withIcon: boolean;
  text: string;
}

export interface CardProperties {
  withHeader: boolean;
  withFooter: boolean;
  title: string;
  description: string;
  cardType: CardType;
}

export type ComponentProperties = ButtonProperties | BadgeProperties | CardProperties;
