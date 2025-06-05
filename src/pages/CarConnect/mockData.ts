import { Dealer } from './types';

export const mockDealers: Dealer[] = [
  {
    id: '1',
    name: 'MotorTrend Elite Motors',
    address: '123 Auto Drive, San Francisco, CA 94105',
    image: 'https://d2kde5ohu8qb21.cloudfront.net/files/65bd7f7a7939140008694307/lincoln-in-china-dealership-exterior.jpg',
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
    image: 'https://d2kde5ohu8qb21.cloudfront.net/files/65bda3e7c3d04400087e9001/fiat-alfa-romeo-dealership.jpg',
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
    image: 'https://d2kde5ohu8qb21.cloudfront.net/files/65ca317e5279ce0008b71334/112-0810-03pl-auto-dealers-in-trouble-golling-dealership.jpg',
    rating: 4.2,
    distance: '5.1 mi',
    verified: false,
    hasUnreadMessages: false,
    reviews: []
  },
  {
    id: '4',
    name: 'Chevrolet Downtown',
    address: '321 Main Street, San Jose, CA 95113',
    image: 'https://d2kde5ohu8qb21.cloudfront.net/files/65b2db6829d1c10008ca46c4/i-know-this-much-is-true-chevrolet-dealership-hbo-before-fire-2.jpeg',
    rating: 4.7,
    distance: '8.3 mi',
    verified: true,
    hasUnreadMessages: false,
    reviews: [
      {
        id: '4',
        author: 'Alex T.',
        rating: 5,
        content: 'Fantastic selection of vehicles and knowledgeable staff.',
        date: '2025-06-01T14:20:00Z'
      }
    ]
  }
];
