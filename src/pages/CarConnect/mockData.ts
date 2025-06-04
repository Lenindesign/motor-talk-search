import { Dealer } from './types';

export const mockDealers: Dealer[] = [
  {
    id: '1',
    name: 'MotorTrend Elite Motors',
    address: '123 Auto Drive, San Francisco, CA 94105',
    image: 'https://placehold.co/400x400?text=Elite+Motors',
    rating: 4.8,
    distance: '2.3 mi',
    verified: true,
    hasUnreadMessages: true,
    reviews: [
      {
        id: '1',
        author: 'John D.',
        rating: 5,
        content: 'Excellent service and very professional staff.',
        date: '2025-05-28T15:30:00Z'
      },
      {
        id: '2',
        author: 'Sarah M.',
        rating: 4,
        content: 'Great experience overall, would recommend.',
        date: '2025-05-25T10:15:00Z'
      }
    ]
  },
  {
    id: '2',
    name: 'Premium Auto Gallery',
    address: '456 Car Plaza, San Francisco, CA 94107',
    image: 'https://placehold.co/400x400?text=Premium+Auto',
    rating: 4.5,
    distance: '3.7 mi',
    verified: true,
    hasUnreadMessages: false,
    reviews: [
      {
        id: '3',
        author: 'Mike R.',
        rating: 5,
        content: 'Very transparent pricing and no pressure sales.',
        date: '2025-05-27T09:45:00Z'
      }
    ]
  },
  {
    id: '3',
    name: 'Bay Area Motors',
    address: '789 Vehicle Lane, Oakland, CA 94612',
    image: 'https://placehold.co/400x400?text=Bay+Area',
    rating: 4.2,
    distance: '5.1 mi',
    verified: false,
    hasUnreadMessages: false,
    reviews: []
  }
];
