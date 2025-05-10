
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

// Saved item structure
export interface SavedItem {
  id: string;
  title: string;
  type: 'article' | 'newCar' | 'usedCar' | 'photo' | 'video';
  imageUrl: string;
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
  addSavedItem: (item: SavedItem) => void;
  removeSavedItem: (id: string) => void;
  isSaved: (id: string) => boolean;
  updateSavedItem: (id: string, updates: Partial<SavedItem>) => void;
}

const SavedItemsContext = createContext<SavedItemsContextType | undefined>(undefined);

// Local storage key
const SAVED_ITEMS_KEY = "motortrend-saved-items";

interface SavedItemsProviderProps {
  children: ReactNode;
}

export function SavedItemsProvider({ children }: SavedItemsProviderProps) {
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);
  
  // Load saved items from localStorage on mount
  useEffect(() => {
    const storedItems = localStorage.getItem(SAVED_ITEMS_KEY);
    if (storedItems) {
      setSavedItems(JSON.parse(storedItems));
    }
  }, []);

  // Save to localStorage whenever savedItems changes
  useEffect(() => {
    localStorage.setItem(SAVED_ITEMS_KEY, JSON.stringify(savedItems));
  }, [savedItems]);

  // Check if an item is already saved
  const isSaved = (id: string) => savedItems.some(item => item.id === id);

  // Add a new item to saved items
  const addSavedItem = (item: SavedItem) => {
    if (!isSaved(item.id)) {
      setSavedItems(prev => [...prev, item]);
    }
  };

  // Remove an item from saved items
  const removeSavedItem = (id: string) => {
    setSavedItems(prev => prev.filter(item => item.id !== id));
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
      addSavedItem, 
      removeSavedItem, 
      isSaved,
      updateSavedItem
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
