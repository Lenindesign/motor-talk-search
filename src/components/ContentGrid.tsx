import React from "react";
import { ContentType } from "./ContentTabs";
import ArticleCard, { ArticleData } from "./ArticleCard";
import CarCard, { CarData } from "./CarCard";
import PhotoCard, { PhotoData } from "./PhotoCard";
import VideoCard, { VideoData } from "./VideoCard";

interface ContentGridProps {
  type: ContentType;
  content: {
    articles: ArticleData[];
    newCars: CarData[];
    usedCars: CarData[];
    photos: PhotoData[];
    videos: VideoData[];
  };
  loadMore: (type: ContentType) => void;
  isLoadingMore: boolean;
  hasMore: boolean;
}

const ContentGrid: React.FC<ContentGridProps> = ({
  type,
  content,
  loadMore,
  isLoadingMore,
  hasMore,
}) => {
  // Helper function to check if content array is empty
  const hasContent = (contentType: keyof typeof content): boolean => {
    return content[contentType] && content[contentType].length > 0;
  };

  // The number of items to display per content type
  const ITEMS_PER_CONTENT_TYPE = 6;

  // Empty state message when there's no content
  const renderEmptyState = () => (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <div className="text-4xl mb-4">📷</div>
      <h3 className="text-lg font-bold text-gray-700 mb-2">No content available</h3>
      <p className="text-gray-500 max-w-md">
        Try searching for something specific to find relevant {type === "all" ? "content" : type}
      </p>
    </div>
  );

  const renderContent = () => {
    switch (type) {
      case "articles":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {hasContent("articles") ? 
              content.articles.slice(0, ITEMS_PER_CONTENT_TYPE).map((article) => (
                <ArticleCard key={article.id} article={article} />
              )) : 
              renderEmptyState()
            }
          </div>
        );
      case "newCars":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {hasContent("newCars") ? 
              content.newCars.slice(0, ITEMS_PER_CONTENT_TYPE).map((car) => (
                <CarCard key={car.id} car={car} type="new" />
              )) : 
              renderEmptyState()
            }
          </div>
        );
      case "usedCars":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {hasContent("usedCars") ? 
              content.usedCars.slice(0, ITEMS_PER_CONTENT_TYPE).map((car) => (
                <CarCard key={car.id} car={car} type="used" />
              )) : 
              renderEmptyState()
            }
          </div>
        );
      case "photos":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {hasContent("photos") ? 
              content.photos.slice(0, ITEMS_PER_CONTENT_TYPE).map((photo) => (
                <PhotoCard key={photo.id} photo={photo} />
              )) : 
              renderEmptyState()
            }
          </div>
        );
      case "videos":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {hasContent("videos") ? 
              content.videos.slice(0, ITEMS_PER_CONTENT_TYPE).map((video) => (
                <VideoCard key={video.id} video={video} />
              )) : 
              renderEmptyState()
            }
          </div>
        );
      case "all":
      default:
        return (
          <div className="space-y-8">
            {content.articles.length > 0 && (
              <div>
                <h3 className="mb-3 text-lg font-bold">Articles</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {content.articles.slice(0, ITEMS_PER_CONTENT_TYPE).map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              </div>
            )}
            
            {content.newCars.length > 0 && (
              <div>
                <h3 className="mb-3 text-lg font-bold">New Cars</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {content.newCars.slice(0, ITEMS_PER_CONTENT_TYPE).map((car) => (
                    <CarCard key={car.id} car={car} type="new" />
                  ))}
                </div>
              </div>
            )}
            
            {content.usedCars.length > 0 && (
              <div>
                <h3 className="mb-3 text-lg font-bold">Used Cars</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {content.usedCars.slice(0, ITEMS_PER_CONTENT_TYPE).map((car) => (
                    <CarCard key={car.id} car={car} type="used" />
                  ))}
                </div>
              </div>
            )}
            
            {content.photos.length > 0 && (
              <div>
                <h3 className="mb-3 text-lg font-bold">Photos</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {content.photos.slice(0, ITEMS_PER_CONTENT_TYPE).map((photo) => (
                    <PhotoCard key={photo.id} photo={photo} />
                  ))}
                </div>
              </div>
            )}
            
            {content.videos.length > 0 && (
              <div>
                <h3 className="mb-3 text-lg font-bold">Videos</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {content.videos.slice(0, ITEMS_PER_CONTENT_TYPE).map((video) => (
                    <VideoCard key={video.id} video={video} />
                  ))}
                </div>
              </div>
            )}
            
            {!content.articles.length && !content.newCars.length && !content.usedCars.length && 
             !content.photos.length && !content.videos.length && renderEmptyState()}
          </div>
        );
    }
  };

  return (
    <div>
      {renderContent()}
      
      {hasMore && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => loadMore(type)}
            disabled={isLoadingMore}
            className="rounded-full bg-white px-6 py-2 text-sm font-medium shadow hover:bg-gray-50 disabled:opacity-70"
          >
            {isLoadingMore ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spinner h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeOpacity="0.25" />
                  <path
                    d="M12 2C6.47715 2 2 6.47715 2 12C2 12.6345 2.07857 13.2531 2.22524 13.8506"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
                Loading...
              </span>
            ) : (
              "Load More"
            )}
          </button>
        </div>
      )}
      
      {!hasMore && content[type === "all" ? "articles" : type].length > 0 && (
        <p className="mt-6 text-center text-sm text-gray-500">
          No more content to load
        </p>
      )}
    </div>
  );
};

export default ContentGrid;
