
import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Calendar } from 'lucide-react';

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
  return (
    <Link 
      to={`/photo/${photo.id}`}
      className="block bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative">
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
