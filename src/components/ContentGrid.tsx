import React from "react";
import { ContentType } from "./ContentTabs";
import ArticleCard from "./ArticleCard";
import { ArticleData } from "@/types/article";
import CarCard, { CarData } from "./CarCard";
import PhotoCard, { PhotoData } from "./PhotoCard";
import VideoCard, { VideoData } from "./VideoCard";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "../hooks/use-mobile";
import ChatMessage from "./ChatMessage";

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
  searchQuery?: string;
}

const ContentGrid: React.FC<ContentGridProps> = ({
  type,
  content,
  loadMore,
  isLoadingMore,
  hasMore,
  searchQuery
}) => {
  const isMobile = useIsMobile();
  
  // Helper function to check if content array is empty
  const hasContent = (contentType: keyof typeof content): boolean => {
    return content[contentType] && content[contentType].length > 0;
  };

  // Helper function to generate brief response based on search query
  const generateBriefResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    // Add responses for different car manufacturers and models
    if (lowerQuery.includes('honda')) {
      return "Honda is a Japanese multinational conglomerate automotive manufacturer. It is headquartered in Minato, Tokyo, Japan. Honda has been the world's largest motorcycle manufacturer since 1959. Explore our extensive collection of Honda articles, videos, and photos to learn more about their latest vehicles and innovations.";
    }
    if (lowerQuery.includes('toyota')) {
      return "Toyota is the world's largest automobile manufacturer by production volume and revenue. Founded in 1937 by Kiichiro Toyoda, it's known for its reliable vehicles and innovative hybrid technology.";
    }
    if (lowerQuery.includes('tesla')) {
      return "Tesla is an American multinational automotive and clean energy company founded in 2003. It's known for its electric vehicles and cutting-edge technology in autonomous driving.";
    }
    if (lowerQuery.includes('bmw')) {
      return "BMW (Bayerische Motoren Werke) is a German luxury automobile manufacturer founded in 1916. It's known for its high-performance luxury vehicles and motorcycles.";
    }
    if (lowerQuery.includes('mercedes')) {
      return "Mercedes-Benz is a German luxury and commercial vehicle automotive brand established in 1926. Known for pioneering automotive innovations and luxury vehicles.";
    }
    if (lowerQuery.includes('audi')) {
      return "Audi is a German automobile manufacturer that designs, engineers, produces, markets and distributes luxury vehicles. It's part of the Volkswagen Group and known for its quattro all-wheel drive system.";
    }
    
    // Default response for other queries
    return `Here are the most relevant results for "${query}". You can filter by content type using the tabs above.`;
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
          <div className={isMobile ? "space-y-4" : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"}>
            {hasContent("articles") ? 
              content.articles.slice(0, ITEMS_PER_CONTENT_TYPE).map((article) => (
                <ArticleCard key={article.id} article={article} layout={isMobile ? "horizontal" : "vertical"} />
              )) : 
              renderEmptyState()
            }
          </div>
        );
      case "newCars":
        return (
          <div className={isMobile ? "space-y-4" : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"}>
            {hasContent("newCars") ? 
              content.newCars.slice(0, ITEMS_PER_CONTENT_TYPE).map((car) => (
                <CarCard key={car.id} car={car} type="new" layout={isMobile ? "horizontal" : "vertical"} />
              )) : 
              renderEmptyState()
            }
          </div>
        );
      case "usedCars":
        return (
          <div className={isMobile ? "space-y-4" : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"}>
            {hasContent("usedCars") ? 
              content.usedCars.slice(0, ITEMS_PER_CONTENT_TYPE).map((car) => (
                <CarCard key={car.id} car={car} type="used" layout={isMobile ? "horizontal" : "vertical"} />
              )) : 
              renderEmptyState()
            }
          </div>
        );
      case "photos":
        return (
          <div className={isMobile ? "space-y-4" : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"}>
            {hasContent("photos") ? 
              content.photos.slice(0, ITEMS_PER_CONTENT_TYPE).map((photo) => (
                <PhotoCard key={photo.id} photo={photo} layout={isMobile ? "horizontal" : "vertical"} />
              )) : 
              renderEmptyState()
            }
          </div>
        );
      case "videos":
        return (
          <div className={isMobile ? "space-y-4" : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"}>
            {hasContent("videos") ? 
              content.videos.slice(0, ITEMS_PER_CONTENT_TYPE).map((video) => (
                <VideoCard key={video.id} video={video} layout={isMobile ? "horizontal" : "vertical"} />
              )) : 
              renderEmptyState()
            }
          </div>
        );
      case "all":
      default:
        return (
          <div className="space-y-8">
            {/* Brief chat response */}
            {searchQuery && (
              <div className="mb-6">
                <ChatMessage
                  message={generateBriefResponse(searchQuery)}
                  isUser={false}
                />
              </div>
            )}
            
            {content.articles.length > 0 && (
              <div>
                <h3 className="mb-3 typography-subtitle">Articles</h3>
                <div className={isMobile ? "space-y-4" : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"}>
                  {content.articles.slice(0, ITEMS_PER_CONTENT_TYPE).map((article) => (
                    <ArticleCard key={article.id} article={article} layout={isMobile ? "horizontal" : "vertical"} />
                  ))}
                </div>
              </div>
            )}
            
            {/* Rest of the content sections */}
            {content.newCars.length > 0 && (
              <div>
                <h3 className="mb-3 typography-subtitle">New Cars</h3>
                <div className={isMobile ? "space-y-4" : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"}>
                  {content.newCars.slice(0, ITEMS_PER_CONTENT_TYPE).map((car) => (
                    <CarCard key={car.id} car={car} type="new" layout={isMobile ? "horizontal" : "vertical"} />
                  ))}
                </div>
              </div>
            )}
            
            {content.usedCars.length > 0 && (
              <div>
                <h3 className="mb-3 typography-subtitle">Used Cars</h3>
                <div className={isMobile ? "space-y-4" : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"}>
                  {content.usedCars.slice(0, ITEMS_PER_CONTENT_TYPE).map((car) => (
                    <CarCard key={car.id} car={car} type="used" layout={isMobile ? "horizontal" : "vertical"} />
                  ))}
                </div>
              </div>
            )}
            
            {content.photos.length > 0 && (
              <div>
                <h3 className="mb-3 typography-subtitle">Photos</h3>
                <div className={isMobile ? "space-y-4" : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"}>
                  {content.photos.slice(0, ITEMS_PER_CONTENT_TYPE).map((photo) => (
                    <PhotoCard key={photo.id} photo={photo} layout={isMobile ? "horizontal" : "vertical"} />
                  ))}
                </div>
              </div>
            )}
            
            {content.videos.length > 0 && (
              <div>
                <h3 className="mb-3 typography-subtitle">Videos</h3>
                <div className={isMobile ? "space-y-4" : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"}>
                  {content.videos.slice(0, ITEMS_PER_CONTENT_TYPE).map((video) => (
                    <VideoCard key={video.id} video={video} layout={isMobile ? "horizontal" : "vertical"} />
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
                Loading more...
              </span>
            ) : (
              "Load more"
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ContentGrid;
