
import React, { useState } from "react";
import { Bookmark } from "lucide-react";
import { useSavedItems } from "../contexts/SavedItemsContext";

export interface PhotoData {
  id: string;
  imageUrl: string;
  title: string;
  position: string;
}

interface PhotoCardProps {
  photo: PhotoData;
  onClick?: () => void;
}

const PhotoCard: React.FC<PhotoCardProps> = ({ photo, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addSavedItem, removeSavedItem, isSaved } = useSavedItems();
  const saved = isSaved(photo.id);

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (saved) {
      removeSavedItem(photo.id);
    } else {
      addSavedItem({
        id: photo.id,
        title: photo.title,
        type: 'photo',
        imageUrl: photo.imageUrl,
        metadata: {
          position: photo.position
        }
      });
    }
  };
  
  return (
    <div 
      className={`relative overflow-hidden rounded-lg bg-white shadow transition-all ${isHovered ? 'shadow-lg transform scale-[1.02]' : 'hover:shadow-md'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className="relative">
        <img
          src={photo.imageUrl}
          alt={photo.title}
          className="h-48 w-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/placeholder.svg';
          }}
        />
        <div className="absolute bottom-2 left-2 rounded bg-black/70 px-2 py-1 text-xs text-white">
          {photo.position}
        </div>
        <button
          onClick={handleSave}
          className={`absolute top-2 right-2 p-1.5 rounded-full ${saved ? 'bg-motortrend-red text-white' : 'bg-black/70 text-white hover:bg-motortrend-red'} transition-colors`}
          aria-label={saved ? "Unsave photo" : "Save photo"}
        >
          <Bookmark size={16} className={saved ? 'fill-white' : ''} />
        </button>
      </div>
      <div className="p-2 text-sm font-medium">{photo.title}</div>
    </div>
  );
};

export default PhotoCard;
