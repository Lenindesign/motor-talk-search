
export interface CarData {
  id: string;
  title: string;
  imageUrl: string;
  price?: string;
  year: number;
  make: string;
  model: string;
  trim?: string;
  mileage?: number;
  location?: string;
}

export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  bodyStyle: string;
  trim?: string;
  price: number;
  image: string;
}

export interface CarCardProps {
  car: CarData;
  className?: string;
  onClick?: () => void;
  layout?: 'grid' | 'list';
}
