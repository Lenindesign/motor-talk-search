import { useCallback } from 'react';
import { useSavedItems, SavedItem, SavedItemType } from '../contexts/SavedItemsContext';

interface UseCardSaveWithCategoryProps {
  id: string;
  type: SavedItemType;
  title: string;
  imageUrl: string;
  metadata?: Record<string, any>;
}

export const useCardSaveWithCategory = ({ id, type, title, imageUrl, metadata = {} }: UseCardSaveWithCategoryProps) => {
  const { addSavedItem, removeSavedItem: contextRemoveSavedItem, isSaved, updateSavedItem, getSavedItemById } = useSavedItems();
  
  const isItemSaved = isSaved(id, type);
  const savedItem = getSavedItemById(id);
  
  const saveToCategory = useCallback((category: 'owned' | 'testDriven' | 'interested') => {
    const savedItemData: SavedItem = {
      id,
      title,
      type,
      imageUrl,
      savedAt: new Date().toISOString(),
      metadata: {
        ...metadata,
        ownership: category,
        lastUpdated: new Date().toISOString()
      }
    };
    
    if (isItemSaved) {
      // Update existing item with new category
      updateSavedItem(id, {
        metadata: {
          ...savedItem?.metadata,
          ownership: category,
          lastUpdated: new Date().toISOString()
        }
      });
    } else {
      // Add new item with category
      addSavedItem(savedItemData);
    }
  }, [id, type, title, imageUrl, metadata, isItemSaved, addSavedItem, updateSavedItem, savedItem]);

  const removeItem = useCallback(() => {
    contextRemoveSavedItem(id, type);
  }, [id, type, contextRemoveSavedItem]);

  const getCurrentCategory = useCallback(() => {
    return savedItem?.metadata?.ownership as 'owned' | 'testDriven' | 'interested' | undefined;
  }, [savedItem]);

  return {
    isSaved: isItemSaved,
    saveToCategory,
    removeItem,
    getCurrentCategory,
    currentCategory: getCurrentCategory()
  };
}; 