import React from 'react';
import { Eye, Clock, Play, Star, Car, MapPin } from 'lucide-react';

interface CardMetadataProps {
  metadata: Record<string, any>;
  className?: string;
}

const CardMetadata = ({
  metadata,
  className = ''
}: CardMetadataProps): React.ReactElement => {
  const renderMetadata = () => {
    if (!metadata) return null;

    const metadataMap: Record<string, { icon: React.ElementType; label: string }> = {
      views: { icon: Eye, label: 'Views' },
      duration: { icon: Clock, label: 'Duration' },
      publishDate: { icon: Clock, label: 'Published' },
      readingTime: { icon: Clock, label: 'Read Time' },
      rating: { icon: Star, label: 'Rating' },
      make: { icon: Car, label: 'Make' },
      model: { icon: Car, label: 'Model' },
      year: { icon: Clock, label: 'Year' },
      mileage: { icon: MapPin, label: 'Mileage' },
      condition: { icon: Star, label: 'Condition' },
      position: { icon: MapPin, label: 'Position' }
    };

    return Object.entries(metadata).map(([key, value]) => {
      const { icon: Icon, label } = metadataMap[key as keyof typeof metadataMap] || {
        icon: Eye,
        label: key.charAt(0).toUpperCase() + key.slice(1)
      };

      return (
        <div key={key} className="flex items-center space-x-2">
          <Icon className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-500">
            {label}: {value}
          </span>
        </div>
      );
    });
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {renderMetadata()}
    </div>
  );
};

export default CardMetadata;
