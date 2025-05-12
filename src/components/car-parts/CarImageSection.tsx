
import React from "react";
import { Bookmark } from "lucide-react";

interface CarImageSectionProps {
  imageUrl: string;
  price: string;
  isNew?: boolean;
  id: string;
  saved: boolean;
  handleSave: (e: React.MouseEvent) => void;
}

const CarImageSection: React.FC<CarImageSectionProps> = ({
  imageUrl,
  price,
  isNew,
  saved,
  handleSave
}) => {
  return (
    <div className="relative">
      <img
        src={imageUrl}
        alt="Car"
        className="h-40 w-full object-cover"
        onError={(e) => {
          (e.target as HTMLImageElement).src = '/placeholder.svg';
        }}
      />
      <div className="absolute bottom-2 right-2 rounded bg-black/70 px-2 py-1 text-sm font-bold text-white">
        {price}
      </div>
      {isNew && (
        <span className="absolute left-2 top-2 rounded bg-motortrend-red px-2 py-1 text-xs font-bold text-white">
          New
        </span>
      )}
      <button
        onClick={handleSave}
        className={`absolute top-2 right-2 p-1.5 rounded-full ${saved ? 'bg-motortrend-red text-white' : 'bg-black/70 text-white hover:bg-motortrend-red'} transition-colors`}
        aria-label={saved ? "Unsave car" : "Save car"}
      >
        <Bookmark size={16} className={saved ? 'fill-white' : ''} />
      </button>
    </div>
  );
};

export default CarImageSection;
