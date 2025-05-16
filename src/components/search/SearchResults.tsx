
import React from "react";
import ChatMessage from "../ChatMessage";
import ContentTabs from "../ContentTabs";
import ContentGrid from "../ContentGrid";
import { SearchResult, ContentRecord } from "../../hooks/use-search";

interface SearchResultsProps {
  searchHistory: SearchResult[];
  activeContentTypes: Record<string, ContentType>;
  content: ContentRecord;
  loadingMore: boolean;
  hasMore: boolean;
  handleTabChange: (searchId: string, tab: ContentType) => void;
  handleLoadMore: (type: ContentType) => void;
  latestResultRef: React.RefObject<HTMLDivElement>;
}

// Import ContentType from ContentGrid to ensure consistency
import { ContentType } from "../ContentGrid";

const SearchResults: React.FC<SearchResultsProps> = ({
  searchHistory,
  activeContentTypes,
  content,
  loadingMore,
  hasMore,
  handleTabChange,
  handleLoadMore,
  latestResultRef
}) => {
  return (
    <div className="space-y-6">
      {searchHistory.map((result, index) => (
        <div 
          key={result.id} 
          className="space-y-4"
          ref={index === searchHistory.length - 1 ? latestResultRef : undefined}
        >
          <ChatMessage
            message={result.query}
            isUser={true}
            timestamp={result.timestamp}
          />
          
          {result.type === "chat" && result.response && (
            <ChatMessage message={result.response} isUser={false} />
          )}
          
          {result.type === "search" && result.contentType && (
            <div className="overflow-hidden rounded-lg bg-white p-4 shadow-md">
              <ContentTabs
                activeTab={activeContentTypes[result.id] || result.contentType}
                onTabChange={(tab) => handleTabChange(result.id, tab)}
              />
              <ContentGrid
                type={activeContentTypes[result.id] || result.contentType}
                content={content}
                loadMore={handleLoadMore}
                isLoadingMore={loadingMore}
                hasMore={hasMore}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
