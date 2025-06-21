import React from "react";
import { ContentType } from "./ContentTabs";
import ArticleCard from "./ArticleCard";
import { ArticleData } from "@/types/article";
import CarCard, { CarData } from "./CarCard";
import PhotoCard, { PhotoData } from "./PhotoCard";
import VideoCard, { VideoData } from "./VideoCard";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "../hooks/use-mobile";

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
  const isMobile = useIsMobile();
  
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
        Try searching for something specific to find relevant content
      </p>
    </div>
  );

  // Render a section of content
  const renderSection = (
    id: string,
    title: string,
    items: any[],
    CardComponent: typeof ArticleCard | typeof CarCard | typeof PhotoCard | typeof VideoCard,
    props: any = {}
  ) => {
    if (!items.length) return null;
    
    return (
      <div id={id} className="py-8 first:pt-0">
        <h2 className="typography-h2 mb-6 flex items-center justify-between">
          {title}
          {items.length > ITEMS_PER_CONTENT_TYPE && (
            <Button variant="ghost" size="sm" className="text-motortrend-red">
              View All ({items.length})
            </Button>
          )}
        </h2>
        <div className={isMobile ? "space-y-4" : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"}>
          {items.slice(0, ITEMS_PER_CONTENT_TYPE).map((item) => (
            <CardComponent
              key={item.id}
              {...props}
              {...{ [props.itemProp || 'article']: item }}
              layout={isMobile ? "horizontal" : "vertical"}
            />
          ))}
        </div>
      </div>
    );
  };

  // Always render all sections, but respect the active type for scrolling
  return (
    <div className="space-y-8">
      {/* Articles Section */}
      {renderSection(
        "articles",
        "Articles",
        content.articles,
        ArticleCard,
        { itemProp: "article" }
      )}

      {/* New Cars Section */}
      {renderSection(
        "newCars",
        "New Cars",
        content.newCars,
        CarCard,
        { itemProp: "car", type: "new" }
      )}

      {/* Used Cars Section */}
      {renderSection(
        "usedCars",
        "Used Cars",
        content.usedCars,
        CarCard,
        { itemProp: "car", type: "used" }
      )}

      {/* Photos Section */}
      {renderSection(
        "photos",
        "Photos",
        content.photos,
        PhotoCard,
        { itemProp: "photo" }
      )}

      {/* Videos Section */}
      {renderSection(
        "videos",
        "Videos",
        content.videos,
        VideoCard,
        { itemProp: "video" }
      )}

      {/* Show empty state if no content at all */}
      {!hasContent("articles") && !hasContent("newCars") && !hasContent("usedCars") && 
       !hasContent("photos") && !hasContent("videos") && renderEmptyState()}

      {/* Load More button */}
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
    </div>
  );
};

export default ContentGrid;
