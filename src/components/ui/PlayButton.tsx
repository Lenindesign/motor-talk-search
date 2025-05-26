import React from 'react';
import { Play } from 'lucide-react';
import { CARD_STYLES } from '@/styles/cardStyles';

interface PlayButtonProps {
  className?: string;
}

const PlayButton: React.FC<PlayButtonProps> = ({ className = '' }) => {
  return (
    <div className={`${className} absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors flex items-center justify-center`}>
      <div className="bg-motortrend-red/90 group-hover:bg-motortrend-red rounded-full p-3 transition-colors">
        <Play size={20} className="text-white ml-0.5" fill="currentColor" />
      </div>
    </div>
  );
};

export default PlayButton;
