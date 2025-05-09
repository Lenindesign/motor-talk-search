import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define types for saved items
export type SavedItemType = 'article' | 'newCar' | 'usedCar' | 'photo' | 'video';

export interface SavedItem {
  id: string;
  title: string;
  type: SavedItemType;
  imageUrl: string;
  savedAt: string;
  metadata?: Record<string, any>;
}

// Define user activity types and interface
export type ActivityType = 'save' | 'unsave' | 'comment' | 'view' | 'like';

export interface UserActivity {
  id: string;
  type: ActivityType;
  itemId: string;
  itemTitle: string;
  itemType: SavedItemType;
  timestamp: string;
}

// Define user points and badges
export interface UserAchievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: string;
}

interface SavedItemsContextType {
  savedItems: SavedItem[];
  userActivities: UserActivity[];
  userPoints: number;
  userAchievements: UserAchievement[];
  addSavedItem: (item: Omit<SavedItem, 'savedAt'>) => void;
  removeSavedItem: (id: string) => void;
  isSaved: (id: string) => boolean;
  addUserActivity: (activity: Omit<UserActivity, 'id' | 'timestamp'>) => void;
}

const SavedItemsContext = createContext<SavedItemsContextType | undefined>(undefined);

export const useSavedItems = () => {
  const context = useContext(SavedItemsContext);
  if (context === undefined) {
    throw new Error('useSavedItems must be used within a SavedItemsProvider');
  }
  return context;
};

export const SavedItemsProvider = ({ children }: { children: ReactNode }) => {
  const [savedItems, setSavedItems] = useState<SavedItem[]>(() => {
    // Load saved items from localStorage if available
    const storedItems = localStorage.getItem('savedItems');
    return storedItems ? JSON.parse(storedItems) : [];
  });

  const [userActivities, setUserActivities] = useState<UserActivity[]>(() => {
    const storedActivities = localStorage.getItem('userActivities');
    return storedActivities ? JSON.parse(storedActivities) : [];
  });

  const [userPoints, setUserPoints] = useState<number>(() => {
    const storedPoints = localStorage.getItem('userPoints');
    return storedPoints ? parseInt(storedPoints, 10) : 0;
  });

  const [userAchievements, setUserAchievements] = useState<UserAchievement[]>(() => {
    const storedAchievements = localStorage.getItem('userAchievements');
    return storedAchievements ? JSON.parse(storedAchievements) : [];
  });

  // Update localStorage when saved items change
  useEffect(() => {
    localStorage.setItem('savedItems', JSON.stringify(savedItems));
  }, [savedItems]);

  // Update localStorage when user activities change
  useEffect(() => {
    localStorage.setItem('userActivities', JSON.stringify(userActivities));
  }, [userActivities]);

  // Update localStorage when user points change
  useEffect(() => {
    localStorage.setItem('userPoints', userPoints.toString());
  }, [userPoints]);

  // Update localStorage when user achievements change
  useEffect(() => {
    localStorage.setItem('userAchievements', JSON.stringify(userAchievements));
  }, [userAchievements]);

  const addSavedItem = (item: Omit<SavedItem, 'savedAt'>) => {
    setSavedItems((prev) => {
      // Check if the item is already saved
      if (prev.some((savedItem) => savedItem.id === item.id)) {
        return prev;
      }
      
      // Add the new item with current timestamp
      return [
        ...prev,
        {
          ...item,
          savedAt: new Date().toISOString(),
        },
      ];
    });

    // Add save activity
    addUserActivity({
      type: 'save',
      itemId: item.id,
      itemTitle: item.title,
      itemType: item.type
    });

    // Add points for saving an item
    setUserPoints(prev => prev + 5);

    // Check for achievements
    checkForAchievements();
  };

  const removeSavedItem = (id: string) => {
    // Find the item before removing it
    const itemToRemove = savedItems.find(item => item.id === id);
    
    if (itemToRemove) {
      setSavedItems((prev) => prev.filter((item) => item.id !== id));
      
      // Add unsave activity
      addUserActivity({
        type: 'unsave',
        itemId: id,
        itemTitle: itemToRemove.title,
        itemType: itemToRemove.type
      });
    }
  };

  const isSaved = (id: string) => {
    return savedItems.some((item) => item.id === id);
  };

  const addUserActivity = (activity: Omit<UserActivity, 'id' | 'timestamp'>) => {
    const newActivity: UserActivity = {
      ...activity,
      id: `activity-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString()
    };
    
    setUserActivities(prev => {
      // Keep only the most recent 50 activities
      const updatedActivities = [newActivity, ...prev];
      return updatedActivities.slice(0, 50);
    });
  };

  const checkForAchievements = () => {
    // Check for first save achievement
    if (savedItems.length === 1 && !userAchievements.some(a => a.id === 'first-save')) {
      addAchievement({
        id: 'first-save',
        name: 'First Save',
        description: 'Saved your first item',
        icon: '🔖'
      });
    }
    
    // Check for 10 saves achievement
    if (savedItems.length === 10 && !userAchievements.some(a => a.id === 'ten-saves')) {
      addAchievement({
        id: 'ten-saves',
        name: 'Collection Started',
        description: 'Saved 10 items',
        icon: '📚'
      });
    }

    // Check for diverse collection (at least one of each type)
    const types = new Set(savedItems.map(item => item.type));
    if (types.size >= 5 && !userAchievements.some(a => a.id === 'diverse-collection')) {
      addAchievement({
        id: 'diverse-collection',
        name: 'Diverse Collector',
        description: 'Saved at least one of each content type',
        icon: '🌟'
      });
    }
  };

  const addAchievement = (achievement: Omit<UserAchievement, 'earnedAt'>) => {
    const newAchievement: UserAchievement = {
      ...achievement,
      earnedAt: new Date().toISOString()
    };
    
    setUserAchievements(prev => [...prev, newAchievement]);
    
    // Add bonus points for earning an achievement
    setUserPoints(prev => prev + 25);
  };

  return (
    <SavedItemsContext.Provider
      value={{
        savedItems,
        userActivities,
        userPoints,
        userAchievements,
        addSavedItem,
        removeSavedItem,
        isSaved,
        addUserActivity,
      }}
    >
      {children}
    </SavedItemsContext.Provider>
  );
};
