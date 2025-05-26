import React from 'react';
import { Button } from './button';
import { CardType } from '@/types/card';
import { SaveIcon, ShareIcon } from 'lucide-react';

interface CardActionsProps {
  isSaved?: boolean;
  onToggleSave?: () => void;
  type?: CardType;
  className?: string;
}

const CardActions: React.FC<CardActionsProps> = ({
  isSaved,
  onToggleSave,
  type,
  className = ''
}) => {
  return (
    <div className={`flex gap-2 ${className}`}>
      {onToggleSave && (
        <Button
          variant="outline"
          size="sm"
          onClick={onToggleSave}
          className="flex items-center gap-1"
        >
          <SaveIcon className={`h-4 w-4 ${isSaved ? 'text-blue-500' : 'text-gray-500'}`} />
          {isSaved ? 'Saved' : 'Save'}
        </Button>
      )}
      {/* Share button will be implemented later */}
      <button
        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        aria-label="Share item"
      >
        <ShareIcon className="w-5 h-5 text-gray-400" />
      </button>
    </div>
  );
};

export default CardActions;
