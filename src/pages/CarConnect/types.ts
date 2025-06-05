
export interface Dealer {
  id: string;
  name: string;
  rating: number;
  distance: string;
  address: string;
  hasUnreadMessages: boolean;
  image: string;
  imageUrl?: string;
  unreadMessages?: number;
  verified?: boolean;
  reviews?: DealerReview[];
}

export interface DealerReview {
  id: string;
  author: string;
  rating: number;
  content: string;
  date: string;
}

export interface Message {
  id: string;
  sender: 'user' | 'dealer';
  content: string;
  timestamp: string;
  imageUrl?: string;
}

export interface Review {
  id: string;
  userId: string;
  dealerId: string;
  rating: number;
  content: string;
  timestamp: Date;
}
