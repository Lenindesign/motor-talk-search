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
    
    // Ensure scroll happens immediately after adding the query to keep it at top
    setTimeout(() => {
      scrollToLatestResultAtTop();
      // Return focus to search bar after brief delay
      setTimeout(() => {
        if (searchBarRef.current) {
          searchBarRef.current.focus();
        }
      }, 100);
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
  
  // Function to scroll to the latest result positioning it at the top of the viewport
  const scrollToLatestResultAtTop = () => {
    if (chatContainerRef.current && latestResultRef.current) {
      // Adjust header height based on device
      const headerHeight = isMobile ? 70 : 80;
      const scrollPosition = latestResultRef.current.offsetTop - headerHeight;
      
      // Force scroll with requestAnimationFrame to ensure it happens after rendering
      requestAnimationFrame(() => {
        chatContainerRef.current?.scrollTo({
          top: scrollPosition,
          behavior: "smooth"
        });
        
        // Double-check the scroll position after a small delay
        setTimeout(() => {
          const currentScrollTop = chatContainerRef.current?.scrollTop || 0;
          const targetScrollTop = latestResultRef.current?.offsetTop - headerHeight || 0;
          
          // If we're not close enough to the target position, try scrolling again
          if (Math.abs(currentScrollTop - targetScrollTop) > 50) {
            chatContainerRef.current?.scrollTo({
              top: targetScrollTop,
              behavior: "smooth"
            });
          }
        }, 300);
      });
    }
  };

  // Auto-scroll when search history changes - using a more aggressive approach
  useEffect(() => {
    if (searchHistory.length > 0) {
      // Series of scroll attempts with increasing delays to handle various edge cases
      const scrollAttempts = [10, 50, 150, 300];
      
      scrollAttempts.forEach(delay => {
        setTimeout(scrollToLatestResultAtTop, delay);
      });
      
      // Return focus to search bar
      setTimeout(() => {
        if (searchBarRef.current) {
          searchBarRef.current.focus();
        }
      }, 350);
    }
  }, [searchHistory, isMobile]);
  
  // Auto-scroll when a chat response is added
  useEffect(() => {
    const lastResult = searchHistory[searchHistory.length - 1];
    if (lastResult?.response && lastResult.type === "chat") {
      // Series of scroll attempts for chat responses
      const scrollAttempts = [10, 50, 200];
      
      scrollAttempts.forEach(delay => {
        setTimeout(scrollToLatestResultAtTop, delay);
      });
      
      // Return focus to search bar after response appears
      setTimeout(() => {
        if (searchBarRef.current) {
          searchBarRef.current.focus();
        }
      }, 250);
    }
  }, [searchHistory.map(item => item.response).join(',')]);

  // Auto-scroll when content loads - this catches cases where images might delay layout
  useEffect(() => {
    if (searchHistory.length > 0 && searchHistory[searchHistory.length - 1].type === "search") {
      // Content might take longer to load, so use longer delays
      const scrollAttempts = [10, 100, 300, 600];
      
      scrollAttempts.forEach(delay => {
        setTimeout(scrollToLatestResultAtTop, delay);
      });
      
      // Return focus to search bar after content appears
      setTimeout(() => {
        if (searchBarRef.current) {
          searchBarRef.current.focus();
        }
      }, 650);
    }
  }, [content]);

  return (
    <div className="flex min-h-screen flex-col bg-motortrend-gray">
      <header className="sticky top-0 z-20 bg-motortrend-dark px-6 py-4 shadow-md">
        <div className="flex items-center justify-between max-w-[980px] mx-auto w-full">
          <div className="text-xl font-bold text-white">MotorTrend</div>
          {/* Mobile menu icon would go here */}
        </div>
      </header>
      
      <main className="flex flex-1 flex-col overflow-hidden">
        <div 
          ref={chatContainerRef}
          className="flex flex-1 flex-col overflow-y-auto p-4 pb-24" // Added padding at the bottom for the search box
        >
          <div className="max-w-[980px] mx-auto w-full">
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
        
        {/* Fixed position at the bottom of the viewport */}
        <div className="fixed bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-motortrend-gray to-transparent p-4 pb-6">
          <div className="max-w-[980px] mx-auto w-full">
            <SearchBar 
              onSearch={handleSearch} 
              isLoading={isSearching}
              inputRef={searchBarRef} 
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
