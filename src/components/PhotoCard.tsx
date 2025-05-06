
import React, { useState } from "react";

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
  
  return (
    <div 
      className={`relative overflow-hidden rounded-lg bg-white shadow transition-all ${isHovered ? 'shadow-lg transform scale-[1.02]' : 'hover:shadow-md'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
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
      <div className="p-2 text-sm font-medium">{photo.title}</div>
    </div>
  );
};

export default PhotoCard;
