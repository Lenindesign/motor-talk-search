import React from "react";
import { ContentType } from "./ContentTabs";
import ArticleCard from "./ArticleCard";
import { ArticleData } from "@/types/article";
import CarCard, { CarData } from "./CarCard";
import PhotoCard, { PhotoData } from "./PhotoCard";
import VideoCard, { VideoData } from "./VideoCard";
import { Button } from "@/components/ui/button";

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
      <h3 className="typography-title text-neutral-2 mb-2">No content available</h3>
      <p className="typography-body text-neutral-3 max-w-md">
        Try searching for something specific to find relevant {type === "all" ? "content" : type}
      </p>
    </div>
  );

  const renderContent = () => {
    switch (type) {
      case "articles":
        return (
          <div className="flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-4">
            {hasContent("articles") ? 
              content.articles.slice(0, ITEMS_PER_CONTENT_TYPE).map((article) => (
                <React.Fragment key={article.id}>
                  {/* Mobile horizontal cards */}
                  <ArticleCard 
                    article={article} 
                    layout="horizontal"
                    className="md:hidden"
                  />
                  {/* Desktop vertical cards */}
                  <ArticleCard 
                    article={article} 
                    layout="vertical"
                    className="hidden md:block"
                  />
                </React.Fragment>
              )) : 
              renderEmptyState()
            }
          </div>
        );
      case "newCars":
        return (
          <div className="flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-4">
            {hasContent("newCars") ? 
              content.newCars.slice(0, ITEMS_PER_CONTENT_TYPE).map((car) => (
                <React.Fragment key={car.id}>
                  {/* Mobile horizontal cards */}
                  <CarCard 
                    car={car} 
                    type="new" 
                    layout="horizontal"
                    className="md:hidden"
                  />
                  {/* Desktop vertical cards */}
                  <CarCard 
                    car={car} 
                    type="new" 
                    layout="vertical"
                    className="hidden md:block"
                  />
                </React.Fragment>
              )) : 
              renderEmptyState()
            }
          </div>
        );
      case "usedCars":
        return (
          <div className="flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-4">
            {hasContent("usedCars") ? 
              content.usedCars.slice(0, ITEMS_PER_CONTENT_TYPE).map((car) => (
                <React.Fragment key={car.id}>
                  {/* Mobile horizontal cards */}
                  <CarCard 
                    car={car} 
                    type="used" 
                    layout="horizontal"
                    className="md:hidden"
                  />
                  {/* Desktop vertical cards */}
                  <CarCard 
                    car={car} 
                    type="used" 
                    layout="vertical"
                    className="hidden md:block"
                  />
                </React.Fragment>
              )) : 
              renderEmptyState()
            }
          </div>
        );
      case "photos":
        return (
          <div className="flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-4">
            {hasContent("photos") ? 
              content.photos.slice(0, ITEMS_PER_CONTENT_TYPE).map((photo) => (
                <React.Fragment key={photo.id}>
                  {/* Mobile horizontal cards */}
                  <PhotoCard 
                    photo={photo} 
                    layout="horizontal"
                    className="md:hidden"
                  />
                  {/* Desktop vertical cards */}
                  <PhotoCard 
                    photo={photo} 
                    layout="vertical"
                    className="hidden md:block"
                  />
                </React.Fragment>
              )) : 
              renderEmptyState()
            }
          </div>
        );
      case "videos":
        return (
          <div className="flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-4">
            {hasContent("videos") ? 
              content.videos.slice(0, ITEMS_PER_CONTENT_TYPE).map((video) => (
                <React.Fragment key={video.id}>
                  {/* Mobile horizontal cards */}
                  <VideoCard 
                    video={video} 
                    layout="horizontal"
                    className="md:hidden"
                  />
                  {/* Desktop vertical cards */}
                  <VideoCard 
                    video={video} 
                    layout="vertical"
                    className="hidden md:block"
                  />
                </React.Fragment>
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
                <h3 className="mb-3 typography-subtitle">Articles</h3>
                <div className="flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-4">
                  {content.articles.slice(0, ITEMS_PER_CONTENT_TYPE).map((article) => (
                    <React.Fragment key={article.id}>
                      {/* Mobile horizontal cards */}
                      <ArticleCard 
                        article={article} 
                        layout="horizontal"
                        className="md:hidden"
                      />
                      {/* Desktop vertical cards */}
                      <ArticleCard 
                        article={article} 
                        layout="vertical"
                        className="hidden md:block"
                      />
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}
            
            {content.newCars.length > 0 && (
              <div>
                <h3 className="mb-3 typography-subtitle">New Cars</h3>
                <div className="flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-4">
                  {content.newCars.slice(0, ITEMS_PER_CONTENT_TYPE).map((car) => (
                    <React.Fragment key={car.id}>
                      {/* Mobile horizontal cards */}
                      <CarCard 
                        car={car} 
                        type="new" 
                        layout="horizontal"
                        className="md:hidden"
                      />
                      {/* Desktop vertical cards */}
                      <CarCard 
                        car={car} 
                        type="new" 
                        layout="vertical"
                        className="hidden md:block"
                      />
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}
            
            {content.usedCars.length > 0 && (
              <div>
                <h3 className="mb-3 typography-subtitle">Used Cars</h3>
                <div className="flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-4">
                  {content.usedCars.slice(0, ITEMS_PER_CONTENT_TYPE).map((car) => (
                    <React.Fragment key={car.id}>
                      {/* Mobile horizontal cards */}
                      <CarCard 
                        car={car} 
                        type="used" 
                        layout="horizontal"
                        className="md:hidden"
                      />
                      {/* Desktop vertical cards */}
                      <CarCard 
                        car={car} 
                        type="used" 
                        layout="vertical"
                        className="hidden md:block"
                      />
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}
            
            {content.photos.length > 0 && (
              <div>
                <h3 className="mb-3 typography-subtitle">Photos</h3>
                <div className="flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-4">
                  {content.photos.slice(0, ITEMS_PER_CONTENT_TYPE).map((photo) => (
                    <React.Fragment key={photo.id}>
                      {/* Mobile horizontal cards */}
                      <PhotoCard 
                        photo={photo} 
                        layout="horizontal"
                        className="md:hidden"
                      />
                      {/* Desktop vertical cards */}
                      <PhotoCard 
                        photo={photo} 
                        layout="vertical"
                        className="hidden md:block"
                      />
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}
            
            {content.videos.length > 0 && (
              <div>
                <h3 className="mb-3 typography-subtitle">Videos</h3>
                <div className="flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-4">
                  {content.videos.slice(0, ITEMS_PER_CONTENT_TYPE).map((video) => (
                    <React.Fragment key={video.id}>
                      {/* Mobile horizontal cards */}
                      <VideoCard 
                        video={video} 
                        layout="horizontal"
                        className="md:hidden"
                      />
                      {/* Desktop vertical cards */}
                      <VideoCard 
                        video={video} 
                        layout="vertical"
                        className="hidden md:block"
                      />
                    </React.Fragment>
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
          <Button
            variant="outline"
            onClick={() => loadMore(type)}
            disabled={isLoadingMore}
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
          </Button>
        </div>
      )}
      
      {!hasMore && content[type === "all" ? "articles" : type].length > 0 && (
        <p className="mt-6 text-center typography-caption text-neutral-4">
          No more content to load
        </p>
      )}
    </div>
  );
};

export default ContentGrid;
