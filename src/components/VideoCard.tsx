
import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Clock, Eye } from 'lucide-react';

export interface VideoData {
  id: string;
  title: string;
  imageUrl: string;
  duration: string;
  views?: string;
  publishDate?: string;
}

interface VideoCardProps {
  video: VideoData;
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  return (
    <Link 
      to={`/video/${video.id}`}
      className="block bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
    >
      <div className="relative">
        <img
          src={video.imageUrl}
          alt={video.title}
          className="h-48 w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors flex items-center justify-center">
          <div className="bg-motortrend-red/90 group-hover:bg-motortrend-red rounded-full p-3 transition-colors">
            <Play size={20} className="text-white ml-0.5" fill="currentColor" />
          </div>
        </div>
        <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded flex items-center text-xs">
          <Clock size={12} className="mr-1" />
          {video.duration}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 line-clamp-2">{video.title}</h3>
        <div className="flex items-center text-sm text-gray-500">
          <span className="mr-3">MotorTrend</span>
          {video.views && (
            <>
              <Eye size={12} className="mr-1" />
              <span className="mr-3">{video.views} views</span>
            </>
          )}
          {video.publishDate && <span>{video.publishDate}</span>}
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
