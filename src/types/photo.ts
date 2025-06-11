export interface PhotoData {
  id: string;
  title: string;
  imageUrl: string;
  position?: number;
  date?: string;
}

export interface PhotoCardProps {
  photo: PhotoData;
  className?: string;
  onClick?: () => void;
  layout?: 'grid' | 'list';
}
