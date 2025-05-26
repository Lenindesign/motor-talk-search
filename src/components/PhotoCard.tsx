
import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Calendar, Bookmark } from 'lucide-react';
import { useSavedItems } from '../contexts/SavedItemsContext';

export interface PhotoData {
  id: string;
  imageUrl: string;
  title: string;
  position: string;
  make: string;
  carModel: string;
  year: string;
}

interface PhotoCardProps {
  photo: PhotoData;
}

const PhotoCard: React.FC<PhotoCardProps> = ({ photo }) => {
  const { addSavedItem, removeSavedItem, isSaved } = useSavedItems();
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
    };
  };
  return (
    <Link 
      to={`/photo/${photo.id}`}
      className="block bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleSave();
          }}
          className="absolute top-2.5 left-2.5 p-2.5 rounded-full bg-white/90 hover:bg-gray-50 shadow-md transition-all duration-300 transform hover:scale-110 z-50"
        >
          <Bookmark 
            size={22} 
            className={`text-gray-600 ${isPhotoSaved ? 'fill-current' : 'stroke-current'} transition-colors duration-300 ${isPhotoSaved ? 'text-blue-600' : ''}`}
          />
        </button>
        <img
          src={photo.imageUrl}
          alt={photo.title}
          className="h-48 w-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded flex items-center text-xs">
          <Camera size={12} className="mr-1" />
          {photo.position}
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
          <h3 className="font-bold text-white text-sm mb-1 line-clamp-2">{photo.title}</h3>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span className="font-medium">{photo.make} {photo.carModel}</span>
          <div className="flex items-center">
            <Calendar size={12} className="mr-1" />
            <span>{photo.year}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PhotoCard;
