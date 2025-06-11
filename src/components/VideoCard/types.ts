export interface VideoData {
  id: string;
  title: string;
  imageUrl: string;
  duration: string;
  views: string;
  publishDate?: string;
}

export interface VideoCardProps {
  video: VideoData;
  className?: string;
  onClick?: () => void;
  isLoading?: boolean;
  priority?: boolean;
  layout?: 'grid' | 'list';
}
