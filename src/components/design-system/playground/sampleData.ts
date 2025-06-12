
import { ArticleData, PhotoData, VideoData, CarData } from './types';

export const sampleData = {
  article: {
    id: '1',
    title: '2024 BMW M5 First Look: The Ultimate 700+ HP Hybrid Machine',
    imageUrl: 'https://example.com/bmw-m5.jpg',
    date: 'July 1, 2023',
    category: 'First Look',
    author: 'John Smith',
    readTime: '5 min read'
  } satisfies ArticleData,
  photo: {
    id: '2',
    title: '2024 Porsche 911 GT3 RS: Track Test Gallery',
    imageUrl: 'https://example.com/porsche-gt3.jpg',
    date: 'June 30, 2023',
    category: 'Photo Gallery',
    photoCount: 25,
    photographer: 'Jane Doe',
    position: 'Lead Photographer',
    make: 'Porsche',
    carModel: '911 GT3 RS',
    year: '2024'
  } satisfies PhotoData,
  video: {
    id: '3',
    title: 'Tesla Model S Plaid vs Lucid Air Sapphire: EV Supersedan Showdown',
    imageUrl: 'https://example.com/tesla-vs-lucid.jpg',
    date: 'June 29, 2023',
    category: 'Comparison Tests',
    duration: '15:30',
    channelName: 'MotorTrend Channel',
    description: 'Watch as we pit these two electric powerhouses against each other',
    url: 'https://example.com/video'
  } satisfies VideoData,
  newCar: {
    id: '4',
    title: '2024 Mercedes-AMG C63 S E Performance',
    imageUrl: 'https://example.com/amg-c63.jpg',
    price: '$89,900',
    category: 'Luxury',
    year: '2024',
    fuelType: 'Hybrid',
    drivetrain: 'AWD',
    location: 'Los Angeles, CA',
    bodyStyle: 'Sedan',
    isNew: true,
    motorTrendScore: '9.1/10',
    motorTrendRank: '#1',
    motorTrendCategoryRank: true
  } satisfies CarData,
  usedCar: {
    id: '5',
    title: '2021 Porsche Taycan Turbo S',
    imageUrl: 'https://example.com/used-taycan.jpg',
    price: '$129,000',
    category: 'Electric',
    year: '2021',
    mileage: '12,500',
    fuelType: 'Electric',
    drivetrain: 'AWD',
    location: 'Miami, FL',
    bodyStyle: 'Sedan',
    isNew: false,
    motorTrendScore: '9.3/10',
    motorTrendRank: '#1',
    motorTrendCategoryRank: true
  } satisfies CarData
} as const;
