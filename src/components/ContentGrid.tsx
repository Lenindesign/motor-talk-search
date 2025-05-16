
import React from "react";
import ArticleCard from "./ArticleCard";
import CarCard from "./CarCard";
import PhotoCard from "./PhotoCard";
import VideoCard from "./VideoCard";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export type ContentType = "articles" | "newCars" | "usedCars" | "photos" | "videos" | "all";

interface ContentGridProps {
  type: ContentType;
  content: Record<string, any[]>;
  loadMore?: (type: ContentType) => void;
  isLoadingMore?: boolean;
  hasMore?: boolean;
}

const ContentGrid: React.FC<ContentGridProps> = ({
  type,
  content,
  loadMore,
  isLoadingMore,
  hasMore,
}) => {
  // Get the appropriate content based on the type
  const items = type === "all" 
    ? Object.values(content).flat()
    : content[type] || [];

  // Handle click on a car card
  const handleCarClick = (carId: string) => {
    window.location.href = `#/cars/${carId}`;
  };

  return (
    <div>
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <p className="text-gray-500">No {type} found</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
            {items.map((item, index) => {
              // For "all" type, determine the content type from the item
              const contentType = type === "all" ? determineItemType(item) : type;
              
              switch (contentType) {
                case "articles":
                  return <ArticleCard key={item.id || index} article={item} />;
                case "newCars":
                  return (
                    <div 
                      key={item.id || index} 
                      onClick={() => handleCarClick(item.id)}
                      className="cursor-pointer"
                    >
                      <CarCard car={item} type="new" />
                    </div>
                  );
                case "usedCars":
                  return (
                    <div 
                      key={item.id || index} 
                      onClick={() => handleCarClick(item.id)}
                      className="cursor-pointer"
                    >
                      <CarCard car={item} type="used" />
                    </div>
                  );
                case "photos":
                  return <PhotoCard key={item.id || index} photo={item} />;
                case "videos":
                  return <VideoCard key={item.id || index} video={item} />;
                default:
                  return null;
              }
            })}
          </div>
          
          {loadMore && hasMore && (
            <div className="flex justify-center pt-4">
              <Button 
                variant="outline"
                onClick={() => loadMore(type)}
                disabled={isLoadingMore}
                className="w-full md:w-auto"
              >
                {isLoadingMore ? 'Loading...' : 'Load More'}
                {!isLoadingMore && <ChevronDown className="ml-2 h-4 w-4" />}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

// Helper function to determine the type of content item
const determineItemType = (item: any): ContentType => {
  if (item.articleTitle) return "articles";
  if (item.make && item.model && item.condition === "new") return "newCars";
  if (item.make && item.model && item.condition === "used") return "usedCars";
  if (item.photoUrl) return "photos";
  if (item.videoUrl) return "videos";
  return "articles"; // Default fallback
};

export default ContentGrid;
