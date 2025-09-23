import { FeedCardProps } from '@/components/social-feed/FeedCard';

// Mock data for social feed
export const mockFeedData: FeedCardProps[] = [
  {
    id: '1',
    type: 'review',
    title: '2024 Toyota Prius Review: The Hybrid Revolution Continues',
    description: 'After driving the new Prius for a week, I can confidently say Toyota has outdone themselves. The fuel economy is incredible and the design is finally modern.',
    author: {
      name: 'Alex Chen',
      avatar: '/personas/gearhead-greg.jpg',
      verified: true,
    },
    timestamp: '2 hours ago',
    image: 'https://d2kde5ohu8qb21.cloudfront.net/files/66fb034d6befe30008a4239c/004-2024-toyota-prius-prime-xse.jpg',
    content: {
      snippet: 'Best hybrid I\'ve ever driven. The handling feels completely different from previous generations.',
    },
    engagement: {
      likes: 127,
      dislikes: 8,
      comments: 23,
      shares: 15,
    },
    metadata: {
      category: 'Reviews',
      readTime: '5 min read',
      tags: ['Toyota', 'Prius', 'Hybrid', 'FuelEconomy'],
    },
  },
  {
    id: '2',
    type: 'news',
    title: 'Breaking: Ford Announces New Electric F-150 Lightning Pro Max',
    description: 'Ford just revealed the most powerful version of their electric pickup truck with enhanced towing capacity and extended range.',
    author: {
      name: 'Motor Trend Staff',
      verified: true,
    },
    timestamp: '4 hours ago',
    image: 'https://d2kde5ohu8qb21.cloudfront.net/files/68b9ebde156e4300022c4b79/2026fordf-150lightningstxevelectricvehiclepickuptruck-16.jpg',
    engagement: {
      likes: 89,
      dislikes: 12,
      comments: 45,
      shares: 32,
    },
    metadata: {
      category: 'News',
      readTime: '3 min read',
      tags: ['Ford', 'Electric', 'F150', 'Lightning'],
    },
  },
  {
    id: '3',
    type: 'video',
    title: 'Track Day: Porsche 911 GT3 vs McLaren 720S',
    description: 'Which supercar reigns supreme on the track? We put these two beasts head-to-head at Laguna Seca.',
    author: {
      name: 'Sarah Martinez',
      avatar: '/personas/gearhead-greg.jpg',
    },
    timestamp: '6 hours ago',
    image: 'https://d2kde5ohu8qb21.cloudfront.net/files/68950da66caf09000223968d/porsche911cupand911gt3r.jpg',
    engagement: {
      likes: 234,
      dislikes: 5,
      comments: 67,
      shares: 28,
    },
    metadata: {
      category: 'Videos',
      readTime: '12 min watch',
      tags: ['Porsche', 'McLaren', 'TrackDay', 'Supercars'],
    },
  },
  {
    id: '4',
    type: 'article',
    title: 'The Complete Guide to Winter Tire Shopping',
    description: 'Everything you need to know about choosing the right winter tires for your vehicle, including top recommendations and buying tips.',
    author: {
      name: 'David Kim',
      verified: true,
    },
    timestamp: '8 hours ago',
    image: 'https://d2kde5ohu8qb21.cloudfront.net/files/689d08562709b1000285ffdb/016-2026-nissan-rogue-rock-creek-tire-wheel.jpg',
    engagement: {
      likes: 156,
      dislikes: 3,
      comments: 34,
      shares: 19,
    },
    metadata: {
      category: 'Guides',
      readTime: '8 min read',
      tags: ['WinterTires', 'Safety', 'BuyingGuide', 'Maintenance'],
    },
  },
  {
    id: '5',
    type: 'photo',
    title: 'Spotted: Rare McLaren P1 in Manhattan',
    description: 'Couldn\'t believe my eyes when I saw this beauty parked outside a coffee shop in SoHo. Only 375 were ever made!',
    author: {
      name: 'Jessica Liu',
    },
    timestamp: '12 hours ago',
    image: 'https://d2kde5ohu8qb21.cloudfront.net/files/6852ef5975746000089b6f4d/4-mclarenp1evofreddytavarishhernandezv3.jpg',
    engagement: {
      likes: 78,
      dislikes: 1,
      comments: 18,
      shares: 9,
    },
    metadata: {
      category: 'Spotted',
      tags: ['McLaren', 'P1', 'Hypercar', 'NYC'],
    },
  },
  {
    id: '6',
    type: 'review',
    title: 'Living with a Tesla Model Y for 6 Months: The Real Story',
    description: 'Here\'s my honest take on daily driving an electric SUV, including the good, the bad, and the charging reality.',
    author: {
      name: 'Mike Johnson',
      avatar: '/personas/gearhead-greg.jpg',
      verified: true,
    },
    timestamp: '1 day ago',
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&h=450&fit=crop&auto=format&q=80',
    content: {
      snippet: 'The convenience of home charging changes everything, but road trips require planning.',
    },
    engagement: {
      likes: 203,
      dislikes: 24,
      comments: 89,
      shares: 41,
    },
    metadata: {
      category: 'Long-term Reviews',
      readTime: '10 min read',
      tags: ['Tesla', 'ModelY', 'Electric', 'LongTerm'],
    },
  },
  {
    id: '7',
    type: 'news',
    title: 'Rivian Stock Surges on New Amazon Partnership Details',
    description: 'Electric truck maker Rivian sees significant stock movement following announcement of expanded delivery vehicle production.',
    author: {
      name: 'Financial Automotive',
    },
    timestamp: '1 day ago',
    image: '/lovable-uploads/930641e7-042c-4f43-a9f6-c81fa3a9a0c4.png',
    engagement: {
      likes: 67,
      dislikes: 8,
      comments: 22,
      shares: 14,
    },
    metadata: {
      category: 'Business',
      readTime: '4 min read',
      tags: ['Rivian', 'Amazon', 'Stock', 'Electric'],
    },
  },
  {
    id: '8',
    type: 'article',
    title: 'Why Manual Transmissions Are Making a Comeback',
    description: 'Despite the rise of automatics and EVs, several manufacturers are still committed to the three-pedal experience.',
    author: {
      name: 'Robert Thompson',
      verified: true,
    },
    timestamp: '2 days ago',
    engagement: {
      likes: 189,
      dislikes: 15,
      comments: 56,
      shares: 23,
    },
    metadata: {
      category: 'Technology',
      readTime: '7 min read',
      tags: ['Manual', 'Transmission', 'Enthusiast', 'Technology'],
    },
  },
];

// Function to simulate loading more data
export const loadMoreFeedData = async (page: number = 1): Promise<FeedCardProps[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Generate additional mock data
  const additionalData: FeedCardProps[] = [
    {
      id: `${page}-9`,
      type: 'video',
      title: `Best Cars Under $30K - ${new Date().getFullYear()} Edition`,
      description: 'Our comprehensive guide to the most reliable and fun cars you can buy without breaking the bank.',
      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=450&fit=crop&auto=format&q=80',
      author: {
        name: 'Budget Auto Reviews',
        verified: true,
      },
      timestamp: `${page + 2} days ago`,
      engagement: {
        likes: 145,
        dislikes: 7,
        comments: 38,
        shares: 22,
      },
      metadata: {
        category: 'Buying Guides',
        readTime: '15 min watch',
        tags: ['Budget', 'Affordable', 'BestOf', 'Reliability'],
      },
    },
    {
      id: `${page}-10`,
      type: 'review',
      title: 'First Drive: BMW i4 M50 - Electric Performance Done Right',
      description: 'BMW\'s first electric M car delivers on performance promises with instant torque and precise handling.',
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=450&fit=crop&auto=format&q=80',
      author: {
        name: 'Performance Review',
        avatar: '/personas/gearhead-greg.jpg',
      },
      timestamp: `${page + 3} days ago`,
      engagement: {
        likes: 98,
        dislikes: 4,
        comments: 29,
        shares: 16,
      },
      metadata: {
        category: 'First Drives',
        readTime: '6 min read',
        tags: ['BMW', 'i4', 'M50', 'Electric', 'Performance'],
      },
    },
  ];

  return additionalData;
};
