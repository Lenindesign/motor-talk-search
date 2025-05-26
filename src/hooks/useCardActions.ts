import { useState } from 'react';
import { useSavedItems } from '../contexts/SavedItemsContext';
import { CardType, SavedItem } from '../types/card';

export interface CardActions {
  isSaved: boolean;
  isLoading: boolean;
  toggleSave: () => void;
}

export const useCardActions = (
  id: string,
  type: CardType,
  title: string,
  imageUrl: string,
  metadata: Record<string, any>
): CardActions => {
  const { addSavedItem, removeSavedItem, isSaved: isItemSaved } = useSavedItems();
  const [isLoading, setIsLoading] = useState(false);
  const isSaved = isItemSaved(id, type);

  const toggleSave = async () => {
    setIsLoading(true);
    try {
      if (isSaved) {
        await removeSavedItem(id, type);
      } else {
        const savedItem: SavedItem = {
          id,
          title,
          type,
          imageUrl,
          savedAt: new Date().toISOString(),
          metadata
        };
        await addSavedItem(savedItem);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isSaved,
    isLoading,
    toggleSave
  };
};
