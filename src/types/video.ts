export interface VideoData {
  id: string;
  title: string;
  thumbnailUrl: string;
  duration: string;
  views: number;
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
