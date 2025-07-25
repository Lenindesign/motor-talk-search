

export interface ArticleData {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
  date: string;
  author?: string;
  excerpt?: string;
  readTime?: string;
  tags?: string[];
  featured?: boolean;
  photoCount?: number;
  detailUrl?: string;
  content?: any; // For article content structure
}

export interface ArticleCardProps {
  article: ArticleData;
  className?: string;
  showAuthor?: boolean;
  showDate?: boolean;
  showExcerpt?: boolean;
  showCategory?: boolean;
  variant?: 'default' | 'compact' | 'featured';
}

