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
    // Clear all existing data for fresh start
    localStorage.removeItem(SAVED_ITEMS_KEY);
    localStorage.removeItem(USER_POINTS_KEY);
    
    // Start fresh with empty data
    setSavedItems([]);
    setUserPoints(0);
    
    // Initialize empty user data
    initializeMockUserData();
  }, []);

  // Initialize empty user data for fresh start
  const initializeMockUserData = () => {
    // Add a test saved car with dealer quote to demonstrate the Buy Now feature
    const testDealerQuoteCar = {
      id: 'test-dealer-quote-honda-accord',
      title: '2025 Honda Accord Sport',
      type: 'newCar' as SavedItemType,
      imageUrl: '/images/cars/honda-accord-2024.jpg',
      savedAt: new Date().toISOString(),
      metadata: {
        price: '30500',
        msrp: '32995',
        year: '2025',
        make: 'Honda',
        model: 'Accord',
        trim: 'Sport',
        dealerName: 'Sarah Johnson',
        dealerLocation: 'Los Angeles, CA',
        dealerPhone: '(555) 123-4567',
        savedFrom: 'chat',
        ownership: 'interested' as const,
        category: 'Sedan',
        mpg: '32/42',
        engine: '1.5L Turbo',
        horsepower: '192',
        transmission: 'CVT',
        motorTrendScore: '8.8',
        motorTrendRank: '2'
      }
    };

    // Start with the test car so user can see the Buy Now feature immediately
    setSavedItems([testDealerQuoteCar]);
    setUserAchievements([]);
    setUserActivities([]);
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
