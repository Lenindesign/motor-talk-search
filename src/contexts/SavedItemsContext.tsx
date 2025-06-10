import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

// User achievement structure
export interface UserAchievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: string;
}

// User activity types
export type ActivityType = 'save' | 'unsave' | 'view' | 'comment' | 'like';

// User activity structure
export interface UserActivity {
  id: string;
  type: ActivityType;
  itemType: string;
  itemId: string;
  itemTitle: string;
  timestamp: string;
}

// Saved item type
// Update the SavedItemType to use "testDriven" internally but display as "Test Drive"
export type SavedItemType = 'article' | 'newCar' | 'usedCar' | 'photo' | 'video' | 'comment' | 'review' | 'owned' | 'testDriven' | 'interested';

// Saved item structure
export interface SavedItem {
  id: string;
  title: string;
  type: SavedItemType;
  imageUrl: string;
  savedAt: string; // Add this field
  metadata?: {
    price?: string;
    category?: string;
    year?: string;
    mileage?: string;
    fuelType?: string;
    drivetrain?: string;
    location?: string;
    ownership?: 'owned' | 'interested' | 'testDriven';
    notes?: string;
    lastUpdated?: string;
    msrp?: string;
    bodyStyle?: string;
    mpg?: string;
    engine?: string;
    horsepower?: string;
    transmission?: string;
    motorTrendScore?: string;
    motorTrendRank?: string;
    motorTrendCategoryRank?: boolean;
    [key: string]: any;
  };
}

interface SavedItemsContextType {
  savedItems: SavedItem[];
  userPoints: number;
  userAchievements: UserAchievement[];
  userActivities: UserActivity[];
  addSavedItem: (item: SavedItem) => void;
  removeSavedItem: (id: string, type: SavedItemType) => void;
  isSaved: (id: string, type: SavedItemType) => boolean;
  updateSavedItem: (id: string, updates: Partial<SavedItem>) => void;
  getSavedItemById: (id: string) => SavedItem | undefined;
  getOwnershipDisplayText?: (ownership: string) => string;
}

const SavedItemsContext = createContext<SavedItemsContextType | undefined>(undefined);

// Local storage key
const SAVED_ITEMS_KEY = "motortrend-saved-items";
const USER_POINTS_KEY = "motortrend-user-points";

interface SavedItemsProviderProps {
  children: ReactNode;
}

export function SavedItemsProvider({ children }: SavedItemsProviderProps) {
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);
  const [userPoints, setUserPoints] = useState<number>(0);
  const [userAchievements, setUserAchievements] = useState<UserAchievement[]>([]);
  const [userActivities, setUserActivities] = useState<UserActivity[]>([]);
  
  // Load saved items from localStorage on mount
  useEffect(() => {
    // Load saved items
    const storedItems = localStorage.getItem(SAVED_ITEMS_KEY);
    if (storedItems) {
      const parsedItems = JSON.parse(storedItems);
      // Ensure all items have a savedAt date
      const itemsWithDates = parsedItems.map((item: SavedItem) => {
        if (!item.savedAt) {
          return { ...item, savedAt: new Date().toISOString() };
        }
        return item;
      });
      setSavedItems(itemsWithDates);
    }
    
    // Load user points
    const storedPoints = localStorage.getItem(USER_POINTS_KEY);
    setUserPoints(storedPoints ? parseInt(storedPoints, 10) : 50); // Default 50 points
    
    // Initialize mock achievements and activities for demo purposes
    initializeMockUserData();
  }, []);

  // Initialize mock user data for demonstration
  const initializeMockUserData = () => {
    // Mock garage cars
    const mockCars: SavedItem[] = [
      {
        id: "car1",
        title: "2024 Toyota Camry Hybrid XSE",
        type: "newCar",
        imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/65a1d8a69afa860008125caf/2024-toyota-camry-xse-hybrid-front-view-18.jpg",
        savedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        metadata: {
          price: "$34,950",
          msrp: "$34,950",
          category: "Midsize Sedan",
          bodyStyle: "Sedan",
          year: "2024",
          mileage: "0",
          fuelType: "Hybrid",
          drivetrain: "FWD",
          location: "San Francisco, CA",
          mpg: "51 city / 53 hwy",
          engine: "2.5L 4-cylinder Hybrid",
          horsepower: "208 hp",
          transmission: "CVT Automatic",
          motorTrendScore: "8.7",
          motorTrendRank: "#2",
          motorTrendCategoryRank: true
        }
      },
      {
        id: "car2",
        title: "2024 Honda CR-V Hybrid Sport",
        type: "newCar",
        imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/65a1bc4ca305c1000897c335/2024-honda-cr-v-hybrid-front-view-62.jpeg",
        savedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        metadata: {
          price: "$37,200",
          msrp: "$37,200",
          category: "Compact SUV",
          bodyStyle: "SUV",
          year: "2024",
          mileage: "0",
          fuelType: "Hybrid",
          drivetrain: "AWD",
          location: "San Francisco, CA",
          mpg: "43 city / 36 hwy",
          engine: "2.0L 4-cylinder Hybrid",
          horsepower: "204 hp",
          transmission: "CVT Automatic",
          motorTrendScore: "8.9",
          motorTrendRank: "#1",
          motorTrendCategoryRank: true
        }
      },
      {
        id: "car3",
        title: "2021 BMW M3 Competition",
        type: "usedCar",
        imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/65c756c95279ce0008c1d934/2022-bmw-m3-competition-awd-14.jpg",
        savedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        metadata: {
          price: "$69,995",
          category: "Performance Sedan",
          bodyStyle: "Sedan",
          year: "2021",
          mileage: "18,750",
          fuelType: "Premium Gasoline",
          drivetrain: "RWD",
          location: "Los Angeles, CA",
          mpg: "16 city / 23 hwy",
          engine: "3.0L Twin-Turbo I6",
          horsepower: "503 hp",
          transmission: "8-speed Automatic",
          motorTrendScore: "9.2",
          motorTrendRank: "#1",
          motorTrendCategoryRank: true
        }
      }
    ];

    // Mock comments
    const mockComments: SavedItem[] = [
      {
        id: "comment1",
        title: "Great article! I've been considering the Camry for months and this review really helped me understand the hybrid system better.",
        type: "comment",
        imageUrl: "",
        savedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        metadata: {
          author: "CarEnthusiast92",
          date: "2 days ago",
          articleTitle: "2024 Toyota Camry Hybrid Review",
          articleId: "article-camry-2024",
          likes: "12",
          replies: "3"
        }
      },
      {
        id: "comment2",
        title: "I disagree with the fuel economy claims. In real-world driving, I'm getting much better MPG than the EPA estimates.",
        type: "comment",
        imageUrl: "",
        savedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        metadata: {
          author: "EcoDriver",
          date: "5 days ago",
          articleTitle: "Best Hybrid SUVs of 2024",
          articleId: "article-hybrid-suvs",
          likes: "8",
          replies: "7"
        }
      }
    ];

    // Mock reviews
    const mockReviews: SavedItem[] = [
      {
        id: "review1",
        title: "Excellent reliability and comfort",
        type: "review",
        imageUrl: "",
        savedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        metadata: {
          content: "I've owned this car for 6 months now and it's been fantastic. The hybrid system is smooth, the interior is comfortable, and the reliability has been perfect. Highly recommend for anyone looking for a practical daily driver.",
          author: "ToyotaOwner2024",
          date: "1 week ago",
          rating: "5",
          carTitle: "2024 Toyota Camry Hybrid",
          carId: "car-camry-2024",
          helpful: "24",
          verified: "true"
        }
      },
      {
        id: "review2",
        title: "Good value but some concerns",
        type: "review",
        imageUrl: "",
        savedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
        metadata: {
          content: "Overall a solid car with good fuel economy. However, the road noise is more noticeable than I expected, and the infotainment system can be slow to respond. Still a good choice for the price point.",
          author: "HondaFan",
          date: "2 weeks ago",
          rating: "4",
          carTitle: "2023 Honda CR-V Hybrid",
          carId: "car-crv-2023",
          helpful: "18",
          verified: "true"
        }
      }
    ];

    setSavedItems([...mockCars, ...mockComments, ...mockReviews]);

    // Mock achievements
    const achievements: UserAchievement[] = [
      {
        id: "1",
        name: "Garage Starter",
        description: "Created your garage and saved your first car",
        icon: "🚗",
        earnedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days ago
      },
      {
        id: "2",
        name: "Research Pro",
        description: "Saved 5+ articles to your reading list",
        icon: "📚",
        earnedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString() // 15 days ago
      }
    ];
    setUserAchievements(achievements);
    
    // Mock activities
    const activities: UserActivity[] = [
      {
        id: "1",
        type: "save",
        itemType: "newCar",
        itemId: "car1",
        itemTitle: "2024 Toyota Camry",
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() // 2 days ago
      },
      {
        id: "2",
        type: "view",
        itemType: "article",
        itemId: "art1",
        itemTitle: "Best Midsize SUVs for 2025",
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() // 1 day ago
      },
      {
        id: "3",
        type: "like",
        itemType: "video",
        itemId: "vid1",
        itemTitle: "Tesla Cybertruck Review",
        timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString() // 12 hours ago
      }
    ];
    setUserActivities(activities);
  };

  // Save to localStorage whenever savedItems changes
  useEffect(() => {
    localStorage.setItem(SAVED_ITEMS_KEY, JSON.stringify(savedItems));
    localStorage.setItem(USER_POINTS_KEY, userPoints.toString());
  }, [savedItems, userPoints]);

  // Check if an item is already saved
  const isSaved = (id: string, type: SavedItemType) => savedItems.some(item => item.id === id && item.type === type);

  // Get a saved item by ID
  const getSavedItemById = (id: string) => savedItems.find(item => item.id === id);

  // Add a new item to saved items
  const addSavedItem = (item: SavedItem) => {
    // Ensure item has a savedAt date
    const itemWithDate = {
      ...item,
      savedAt: item.savedAt || new Date().toISOString(),
    };
    
    if (!isSaved(itemWithDate.id, itemWithDate.type)) {
      setSavedItems(prev => [...prev, itemWithDate]);
      // Add points for saving an item
      setUserPoints(prev => prev + 5);
      
      // Add activity for saving
      const newActivity: UserActivity = {
        id: Date.now().toString(),
        type: "save",
        itemType: item.type,
        itemId: item.id,
        itemTitle: item.title,
        timestamp: new Date().toISOString()
      };
      setUserActivities(prev => [newActivity, ...prev]);
    }
  };

  // Remove an item from saved items
  const removeSavedItem = (id: string, type: SavedItemType) => {
    const itemToRemove = savedItems.find(item => item.id === id && item.type === type);
    if (itemToRemove) {
      setSavedItems(prev => prev.filter(item => !(item.id === id && item.type === type)));
      
      // Add activity for unsaving
      const newActivity: UserActivity = {
        id: Date.now().toString(),
        type: "unsave",
        itemType: itemToRemove.type,
        itemId: itemToRemove.id,
        itemTitle: itemToRemove.title,
        timestamp: new Date().toISOString()
      };
      setUserActivities(prev => [newActivity, ...prev]);
    }
  };
  
  // Update an existing saved item
  const updateSavedItem = (id: string, updates: Partial<SavedItem>) => {
    setSavedItems(prev => 
      prev.map(item => 
        item.id === id 
          ? { 
              ...item, 
              ...updates, 
              // Special handling for metadata to merge rather than replace
              metadata: {
                ...item.metadata,
                ...(updates.metadata || {})
              }
            } 
          : item
      )
    );
  };

  // Add a helper function to get display text for ownership
  const getOwnershipDisplayText = (ownership: string) => {
    switch (ownership) {
      case 'testDriven':
        return 'Test Drive';
      case 'owned':
        return 'Owned';
      case 'interested':
        return 'Interested';
      default:
        return ownership;
    }
  };

  // Add the new helper function to the context value
  return (
    <SavedItemsContext.Provider value={{ 
      savedItems, 
      userPoints,
      userAchievements,
      userActivities,
      addSavedItem, 
      removeSavedItem, 
      isSaved,
      updateSavedItem,
      getSavedItemById,
      getOwnershipDisplayText
    }}>
      {children}
    </SavedItemsContext.Provider>
  );
}

// Hook for easy context usage
export function useSavedItems() {
  const context = useContext(SavedItemsContext);
  
  if (context === undefined) {
    throw new Error("useSavedItems must be used within a SavedItemsProvider");
  }
  
  return context;
}
