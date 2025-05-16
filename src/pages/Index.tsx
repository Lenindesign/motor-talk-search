import React, { useState, useRef, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import SearchSuggestions from "../components/SearchSuggestions";
import ChatMessage from "../components/ChatMessage";
import ContentTabs, { ContentType } from "../components/ContentTabs";
import ContentGrid from "../components/ContentGrid";
import MainNavigation from "../components/MainNavigation";
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
    articles: mockArticles, // Prepopulate with all available articles
    newCars: mockNewCars,   // Prepopulate with all available new cars
    usedCars: mockUsedCars, // Prepopulate with all available used cars
    photos: mockPhotos,     // Prepopulate with all available photos
    videos: mockVideos,     // Prepopulate with all available videos
  });
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const latestResultRef = useRef<HTMLDivElement>(null);
  const searchBarRef = useRef<HTMLInputElement>(null);
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
    
    // Handle scrolling and focus
    setTimeout(() => {
      // Focus search bar after brief delay
      if (searchBarRef.current) {
        searchBarRef.current.focus();
      }
    }, 50);
    
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
      
      // Return focus to search bar after response is processed
      if (searchBarRef.current) {
        searchBarRef.current.focus();
      }

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
          <div className="flex items-center">
            {isMobile && <MainNavigation />}
            <div className="flex-shrink-0">
              <img 
                src="/lovable-uploads/6f8fd40c-6013-4f96-89f0-8406d6febb7c.png" 
                alt="MotorTrend Logo" 
                className="h-7 w-auto"
              />
            </div>
            <div className="hidden sm:flex ml-6">
              <MainNavigation />
            </div>
          </div>
          <div className="hidden sm:block ml-4">
            <SearchBar 
              onSearch={handleSearch} 
              isLoading={isSearching}
              variant="header" 
            />
          </div>
        </div>
      </header>
      
      <main className="flex flex-1 flex-col">
        <div className="relative flex flex-col h-full">
          <div className="flex-1 overflow-y-auto" ref={chatContainerRef}>
            <div className="max-w-[980px] mx-auto w-full px-4 py-4 pb-32">
              {searchHistory.length === 0 ? (
                <div className="flex flex-1 flex-col items-center justify-center space-y-6 py-20">
                  <h1 className="text-3xl font-bold text-motortrend-dark">
                    Welcome to MOTORTREND Search
                  </h1>
                  <p className="max-w-md text-center text-gray-500">
                    Ask me anything about cars or search for automotive content
                  </p>
                  <SearchSuggestions onSuggestionClick={handleSuggestionClick} />
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
                </div>
              )}
            </div>
          </div>
          
          <div className="sticky bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-motortrend-gray to-transparent p-4 pb-6">
            <div className="max-w-[980px] mx-auto w-full">
              <SearchBar 
                onSearch={handleSearch} 
                isLoading={isSearching}
                inputRef={searchBarRef} 
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
