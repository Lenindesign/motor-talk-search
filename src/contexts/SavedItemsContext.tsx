
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

interface SavedItemsContextType {
  savedItems: SavedItem[];
  addSavedItem: (item: Omit<SavedItem, 'savedAt'>) => void;
  removeSavedItem: (id: string) => void;
  isSaved: (id: string) => boolean;
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

  // Update localStorage when saved items change
  useEffect(() => {
    localStorage.setItem('savedItems', JSON.stringify(savedItems));
  }, [savedItems]);

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
  };

  const removeSavedItem = (id: string) => {
    setSavedItems((prev) => prev.filter((item) => item.id !== id));
  };

  const isSaved = (id: string) => {
    return savedItems.some((item) => item.id === id);
  };

  return (
    <SavedItemsContext.Provider
      value={{
        savedItems,
        addSavedItem,
        removeSavedItem,
        isSaved,
      }}
    >
      {children}
    </SavedItemsContext.Provider>
  );
};
