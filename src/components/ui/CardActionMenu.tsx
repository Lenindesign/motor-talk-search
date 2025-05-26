
import React from 'react';
import { Bookmark, Share2, MoreVertical } from 'lucide-react';
import { CARD_STYLES } from '@/styles/cardStyles';
import { CardActions } from '../../hooks/useCardActions';

interface CardActionMenuProps {
  actions: CardActions;
  onShare?: () => void;
  className?: string;
}

const CardActionMenu: React.FC<CardActionMenuProps> = ({
  actions,
  onShare,
  className = ''
}) => {
  return (
    <div className={`absolute top-2.5 right-2.5 flex items-center gap-2 ${className}`}>
      <button
        onClick={actions.toggleSave}
        disabled={actions.isLoading}
        className={`${CARD_STYLES.saveButton} ${actions.isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <Bookmark
          className={`w-5 h-5 ${actions.isSaved ? 'fill-current text-blue-600' : ''}`}
        />
      </button>
      {onShare && (
        <button
          onClick={onShare}
          className={`${CARD_STYLES.saveButton} ${actions.isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={actions.isLoading}
        >
          <Share2 className="w-5 h-5" />
        </button>
      )}
      <button
        className={`${CARD_STYLES.saveButton} ${actions.isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={actions.isLoading}
      >
        <MoreVertical className="w-5 h-5" />
      </button>
    </div>
  );
};

export default CardActionMenu;
