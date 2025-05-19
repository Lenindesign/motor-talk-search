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
export type SavedItemType = 'article' | 'newCar' | 'usedCar' | 'photo' | 'video' | 'owned' | 'interested';

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
      getSavedItemById
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
