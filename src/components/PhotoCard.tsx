import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Calendar, Bookmark } from 'lucide-react';
import { useSavedItems } from '../contexts/SavedItemsContext';
import BaseCard from './ui/BaseCard';
import { CARD_STYLES } from '@/styles/cardStyles';
import { cn } from '@/lib/utils';
export interface PhotoData {
  id: string;
  imageUrl: string;
  title: string;
  position: string;
  make: string;
  carModel: string;
  year: string;
  metadata?: {
    position?: string;
    make?: string;
    carModel?: string;
    year?: string;
  };
}
export interface PhotoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  photo: PhotoData;
  className?: string;
  onClick?: () => void;
}
const PhotoCard: React.FC<PhotoCardProps> = ({
  photo,
  className,
  onClick
}) => {
  const {
    addSavedItem,
    removeSavedItem,
    isSaved
  } = useSavedItems();
  const isPhotoSaved = isSaved(photo.id, 'photo');
  const handleSave = () => {
    const savedItem = {
      id: photo.id,
      title: photo.title,
      type: 'photo' as const,
      imageUrl: photo.imageUrl,
      savedAt: new Date().toISOString(),
      metadata: {
        position: photo.position,
        make: photo.make,
        carModel: photo.carModel,
        year: photo.year
      }
    };
    if (isPhotoSaved) {
      removeSavedItem(photo.id, 'photo');
    } else {
      addSavedItem(savedItem);
    }
    ;
  };
  return <BaseCard type="photo" className={cn('block overflow-hidden hover:shadow-xl transition-shadow duration-300', className)} isSaved={isPhotoSaved} onToggleSave={handleSave} metadata={{
    position: photo.position,
    make: photo.make,
    carModel: photo.carModel,
    year: photo.year
  }} onClick={onClick || (() => window.location.href = `/photo/${photo.id}`)}>
      <div className="relative pt-[56.25%]">
        <img src={photo.imageUrl} alt={photo.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded flex items-center text-xs">
          <Camera className="mr-1" />
          {photo.position}
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
          <h3 className="font-bold leading-tight text-white mb-1 line-clamp-2 text-base">{photo.title}</h3>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span className="font-medium">{photo.make} {photo.carModel}</span>
          <div className="flex items-center">
            <Calendar className="mr-1" />
            <span>{photo.year}</span>
          </div>
        </div>
      </div>
    </BaseCard>;
};
export default PhotoCard;