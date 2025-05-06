
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
import { ArticleData } from "../components/ArticleCard";
import { CarData } from "../components/CarCard";
import { PhotoData } from "../components/PhotoCard";
import { VideoData } from "../components/VideoCard";

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
    articles: [] as ArticleData[],
    newCars: [] as CarData[],
    usedCars: [] as CarData[],
    photos: [] as PhotoData[],
    videos: [] as VideoData[],
  });
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const allContent = getAllContent();

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
    
    // Add the query to the search history immediately
    setSearchHistory((prev) => [...prev, newResult]);
    
    // Scroll to bottom after adding the query
    setTimeout(() => {
      scrollToBottom();
    }, 100);
    
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
        
        // Reset content for this search
        setContent({
          articles: query.toLowerCase().includes("article") ? mockArticles : [],
          newCars: query.toLowerCase().includes("new") || contentType === "newCars" ? mockNewCars : [],
          usedCars: query.toLowerCase().includes("used") || contentType === "usedCars" ? mockUsedCars : [],
          photos: query.toLowerCase().includes("photo") || contentType === "photos" ? mockPhotos : [],
          videos: query.toLowerCase().includes("video") || contentType === "videos" ? mockVideos : [],
        });
        
        // Set default content if nothing specific was requested
        if (contentType === "articles" && !query.toLowerCase().includes("article")) {
          setContent(prev => ({
            ...prev,
            articles: mockArticles
          }));
        }
        
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
      
      // Scroll to bottom after adding the response
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    }, 800);
  };

  // Function to handle loading more content
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
  
  // Function to scroll to the bottom of the chat
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };
  
  return (
    <div className="flex min-h-screen flex-col bg-motortrend-gray">
      <header className="sticky top-0 z-20 bg-motortrend-dark px-6 py-4 shadow-md">
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold text-white">MotorTrend</div>
          {/* Mobile menu icon would go here */}
        </div>
      </header>
      
      <main className="flex flex-1 flex-col overflow-hidden">
        <div 
          ref={chatContainerRef}
          className="flex flex-1 flex-col overflow-y-auto p-4"
        >
          {searchHistory.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center space-y-6">
              <h1 className="text-3xl font-bold text-motortrend-dark">
                Welcome to MotorTrend Search
              </h1>
              <p className="max-w-md text-center text-gray-500">
                Ask me anything about cars or search for automotive content
              </p>
              <SearchSuggestions onSuggestionClick={handleSuggestionClick} />
            </div>
          ) : (
            <div className="space-y-6 pb-20">
              {searchHistory.map((result) => (
                <div key={result.id} className="space-y-4">
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
        
        <div className="sticky bottom-0 z-10 bg-gradient-to-t from-motortrend-gray to-transparent p-4 pb-6 pt-10">
          <SearchBar onSearch={handleSearch} isLoading={isSearching} />
        </div>
      </main>
    </div>
  );
};

export default Index;
