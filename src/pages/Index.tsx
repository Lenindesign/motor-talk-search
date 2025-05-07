import React, { useState, useRef, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import SearchSuggestions from "../components/SearchSuggestions";
import ChatMessage from "../components/ChatMessage";
import ContentTabs, { ContentType } from "../components/ContentTabs";
import ContentGrid from "../components/ContentGrid";
import { 
  determineContentType, 
  generateChatResponse,
  getAllContent,
  mockArticles,
  mockNewCars,
  mockUsedCars,
  mockPhotos,
  mockVideos
} from "../services/mockData";
import { useIsMobile } from "../hooks/use-mobile";

interface SearchResult {
  id: string;
  query: string;
  type: "search" | "chat";
  contentType?: ContentType;
  response?: string;
  timestamp: string;
}

const Index = () => {
  const [searchHistory, setSearchHistory] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [activeContentTypes, setActiveContentTypes] = useState<Record<string, ContentType>>({});
  const [content, setContent] = useState({
    articles: mockArticles,
    newCars: mockNewCars,
    usedCars: mockUsedCars,
    photos: mockPhotos,
    videos: mockVideos,
  });
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const latestResultRef = useRef<HTMLDivElement>(null);
  const searchBarRef = useRef<HTMLInputElement>(null);
  const mainSearchBarRef = useRef<HTMLInputElement>(null);
  const allContent = getAllContent();
  const isMobile = useIsMobile();
  
  // Auto-scroll to the latest result when it's added
  useEffect(() => {
    if (latestResultRef.current) {
      latestResultRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'end'
      });
    }
  }, [searchHistory.length]);

  // Function to handle search submissions
  const handleSearch = (query: string) => {
    if (isSearching) return;
    
    setIsSearching(true);
    
    // Create a unique ID for this search result
    const searchId = `search-${Date.now()}`;
    
    // Determine if this is a question or a search
    const isQuestion = query.trim().endsWith("?");
    
    // Create a new search result
    const newResult: SearchResult = {
      id: searchId,
      query,
      type: isQuestion ? "chat" : "search",
      timestamp: new Date().toLocaleTimeString(),
    };
    
    // Add the query to the search history at the end (oldest first)
    setSearchHistory((prev) => [...prev, newResult]);
    
    // Simulate server response time
    setTimeout(() => {
      if (isQuestion) {
        // Process as a chat question
        const response = generateChatResponse(query);
        
        setSearchHistory((prev) => prev.map((item) => 
          item.id === searchId ? { ...item, response } : item
        ));
      } else {
        // Process as a content search
        const contentType = determineContentType(query);
        
        // Filter content based on the query, but keep all content types populated
        const filteredContent = {
          articles: query.toLowerCase().includes("article") ? mockArticles : content.articles,
          newCars: query.toLowerCase().includes("new") || contentType === "newCars" ? mockNewCars : content.newCars,
          usedCars: query.toLowerCase().includes("used") || contentType === "usedCars" ? mockUsedCars : content.usedCars,
          photos: query.toLowerCase().includes("photo") || contentType === "photos" ? mockPhotos : content.photos,
          videos: query.toLowerCase().includes("video") || contentType === "videos" ? mockVideos : content.videos,
        };
        
        // Update content with the filtered content
        setContent(filteredContent);
        
        // Set active content type for this search
        setActiveContentTypes((prev) => ({
          ...prev,
          [searchId]: contentType,
        }));
        
        setSearchHistory((prev) => prev.map((item) => 
          item.id === searchId ? { ...item, contentType } : item
        ));
        
        setHasMore(true);
      }
      
      setIsSearching(false);
      
      // Ensure we scroll to the latest result after it's processed and rendered
      setTimeout(() => {
        if (latestResultRef.current) {
          latestResultRef.current.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'end'
          });
        }
      }, 100);
    }, 800);
  };

  const handleLoadMore = (type: ContentType) => {
    setLoadingMore(true);
    
    // Simulate loading more content
    setTimeout(() => {
      setLoadingMore(false);
      setHasMore(false); // In this demo, we only show one set of content
    }, 800);
  };
  
  // Function to handle tab changes
  const handleTabChange = (searchId: string, tab: ContentType) => {
    setActiveContentTypes((prev) => ({
      ...prev,
      [searchId]: tab,
    }));
  };
  
  // Function to handle clicking on search suggestions
  const handleSuggestionClick = (suggestion: string) => {
    handleSearch(suggestion);
  };

  return (
    <div className="flex min-h-screen flex-col bg-motortrend-gray">
      <header className="sticky top-0 z-20 bg-motortrend-dark px-6 py-4 shadow-md">
        <div className="flex items-center justify-between max-w-[980px] mx-auto w-full">
          <div className="text-xl font-bold text-white">MotorTrend</div>
          {/* Search bar in header */}
          <div className="w-full max-w-[320px]">
            <SearchBar 
              onSearch={handleSearch} 
              isLoading={isSearching}
              inputRef={searchBarRef} 
              isInHeader={true}
            />
          </div>
        </div>
      </header>
      
      <main className="flex flex-1 flex-col">
        <div className="relative flex flex-col h-full">
          {/* Main content area that grows/shrinks with proper scroll behavior */}
          <div className="flex-1 overflow-y-auto" ref={chatContainerRef}>
            <div className="max-w-[980px] mx-auto w-full px-4 py-4 pb-32">
              {searchHistory.length === 0 ? (
                <div className="flex flex-1 flex-col items-center justify-center space-y-6 py-20">
                  <h1 className="text-3xl font-bold text-motortrend-dark">
                    Welcome to MotorTrend Search
                  </h1>
                  <p className="max-w-md text-center text-gray-500">
                    Ask me anything about cars or search for automotive content
                  </p>
                  <SearchSuggestions onSuggestionClick={handleSuggestionClick} />
                  
                  {/* Main search bar when no results */}
                  <div className="w-full max-w-[600px] mt-6">
                    <SearchBar 
                      onSearch={handleSearch} 
                      isLoading={isSearching} 
                      inputRef={mainSearchBarRef}
                    />
                  </div>
                </div>
              ) : (
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
                  
                  {/* Main search bar at the bottom of results */}
                  <div className="w-full max-w-[600px] mx-auto mt-10">
                    <SearchBar 
                      onSearch={handleSearch} 
                      isLoading={isSearching} 
                      inputRef={mainSearchBarRef}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
