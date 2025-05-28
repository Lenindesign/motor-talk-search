
import { useCallback } from 'react';
import { useSavedItems, SavedItem, SavedItemType } from '../contexts/SavedItemsContext';

interface UseCardSaveProps {
  id: string;
  type: SavedItemType;
  title: string;
  imageUrl: string;
  metadata?: Record<string, any>;
}

export const useCardSave = ({ id, type, title, imageUrl, metadata = {} }: UseCardSaveProps) => {
  const { addSavedItem, removeSavedItem, isSaved } = useSavedItems();
  
  const isItemSaved = isSaved(id, type);
  
  const toggleSave = useCallback(() => {
    if (isItemSaved) {
      removeSavedItem(id, type);
    } else {
      const savedItem: SavedItem = {
        id,
        title,
        type,
        imageUrl,
        savedAt: new Date().toISOString(),
        metadata
      };
      addSavedItem(savedItem);
    }
  }, [id, type, title, imageUrl, metadata, isItemSaved, addSavedItem, removeSavedItem]);

  return {
    isSaved: isItemSaved,
    toggleSave
  };
};
