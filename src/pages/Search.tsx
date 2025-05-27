import React, { useState, useRef, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import SearchSuggestions from "../components/SearchSuggestions";
import ChatMessage from "../components/ChatMessage";
import ContentTabs, { ContentType } from "../components/ContentTabs";
import ContentGrid from "../components/ContentGrid";
import MainNavigation from "../components/MainNavigation";
import { Button } from "@/components/ui/button";
import { LayoutDashboard } from "lucide-react";
import { determineContentType, generateChatResponse, getAllContent, mockArticles, mockNewCars, mockUsedCars, mockPhotos, mockVideos } from "../services/mockData";
import { useIsMobile } from "../hooks/use-mobile";
import GlobalHeader from '../components/GlobalHeader';

interface SearchResult {
  id: string;
  query: string;
  type: "search" | "chat";
  contentType?: ContentType;
  response?: string;
  timestamp: string;
}

const Search = () => {
  const [searchParams] = useSearchParams();
  const [searchHistory, setSearchHistory] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [activeContentTypes, setActiveContentTypes] = useState<Record<string, ContentType>>({});
  const [content, setContent] = useState({
    articles: mockArticles,
    newCars: mockNewCars,
    usedCars: mockUsedCars,
    photos: mockPhotos,
    videos: mockVideos
  });
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const latestResultRef = useRef<HTMLDivElement>(null);
  const searchBarRef = useRef<HTMLInputElement>(null);
  const currentProcessingQueryRef = useRef<string | null>(null);
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

  // Check for URL query parameter and perform search automatically
  useEffect(() => {
    const queryFromUrl = searchParams.get('q');

    if (queryFromUrl && queryFromUrl.trim()) {
      const trimmedQuery = queryFromUrl.trim();

      if (isSearching) {
        // If a search is already in progress, defer to it.
        // The useEffect will re-run when isSearching becomes false.
        return;
      }

      const isQuestion = trimmedQuery.endsWith("?");
      const typeFromUrl = isQuestion ? "chat" : "search";
      const queryExistsInHistory = searchHistory.some(
        item => item.query === trimmedQuery && item.type === typeFromUrl
      );

      if (!queryExistsInHistory) {
        handleSearch(trimmedQuery);
      }
    }
  }, [searchParams, searchHistory, isSearching]);

  // Function to handle search submissions
  const handleSearch = (rawQuery: string) => {
    const query = rawQuery.trim();
    if (!query) return;

    if (isSearching) {
      // If already processing this exact query, return.
      if (currentProcessingQueryRef.current === query) {
        return;
      }
      // If processing a *different* query, also return (prevents concurrent different searches).
      // This could be changed to a queueing mechanism later if needed.
      return;
    }
    setIsSearching(true);
    currentProcessingQueryRef.current = query; // Mark this query as being processed

    // Create a unique ID for this search result
    const searchId = `search-${Date.now()}`;

    // Determine if this is a question or a search
    const isQuestion = query.endsWith("?");

    // Create a new search result
    const newResult: SearchResult = {
      id: searchId,
      query,
      type: isQuestion ? "chat" : "search",
      timestamp: new Date().toLocaleTimeString()
    };

    // Add the query to the search history at the end (oldest first)
    setSearchHistory(prev => [...prev, newResult]);

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
        setSearchHistory(prev => prev.map(item => item.id === searchId ? {
          ...item,
          response
        } : item));
      } else {
        // Process as a content search
        const contentType = determineContentType(query);

        // Filter content based on the query, but keep all content types populated
        const filteredContent = {
          articles: query.toLowerCase().includes("article") ? mockArticles : content.articles,
          newCars: query.toLowerCase().includes("new") || contentType === "newCars" ? mockNewCars : content.newCars,
          usedCars: query.toLowerCase().includes("used") || contentType === "usedCars" ? mockUsedCars : content.usedCars,
          photos: query.toLowerCase().includes("photo") || contentType === "photos" ? mockPhotos : content.photos,
          videos: query.toLowerCase().includes("video") || contentType === "videos" ? mockVideos : content.videos
        };

        // Update content with the filtered content
        setContent(filteredContent);

        // Set active content type for this search
        setActiveContentTypes(prev => ({
          ...prev,
          [searchId]: contentType
        }));
        setSearchHistory(prev => prev.map(item => item.id === searchId ? {
          ...item,
          contentType
        } : item));
        setHasMore(true);
      }
      setIsSearching(false);
      currentProcessingQueryRef.current = null; // Clear the processed query

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
    setActiveContentTypes(prev => ({
      ...prev,
      [searchId]: tab
    }));
  };

  // Function to handle clicking on search suggestions
  const handleSuggestionClick = (suggestion: string) => {
    handleSearch(suggestion);
  };

  return (
    <div className="flex min-h-screen flex-col bg-motortrend-gray w-full">
      <GlobalHeader onSearch={handleSearch} isLoading={isSearching} />
      <main className="flex flex-1 flex-col">
        <div className="relative flex flex-col h-full">
          <div className="flex-1 overflow-y-auto" ref={chatContainerRef}>
            <div className="max-w-[980px] mx-auto w-full pb-32 px-0 py-[16px]">
              {searchHistory.length === 0 ? (
                <div className="flex flex-1 flex-col items-center justify-center space-y-6 px-[32px] py-[32px]">
                  <h1 className="text-3xl font-bold text-motortrend-dark">
                    Welcome to MOTORTREND Search
                  </h1>
                  <p className="max-w-md text-center text-gray-500 mb-4">
                    Ask me anything about cars or search for automotive content
                  </p>
                  
                  {/* New personalized dashboard link */}
                  <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-md mb-4 transition-all hover:shadow-lg px-[32px]">
                    <Link to="/dashboard" className="flex items-center justify-between text-motortrend-dark hover:text-motortrend-red">
                      <div className="flex items-center">
                        <LayoutDashboard className="h-5 w-5 mr-2" />
                        <div>
                          <h3 className="font-medium">My Garage</h3>
                          <p className="text-sm text-gray-500">Get personalized automotive content</p>
                        </div>
                      </div>
                      <Button size="sm">Go</Button>
                    </Link>
                  </div>
                  
                  <SearchSuggestions onSuggestionClick={handleSuggestionClick} />
                </div>
              ) : (
                <div className="space-y-6">
                  {searchHistory.map((result, index) => (
                    <div key={result.id} className="space-y-4" ref={index === searchHistory.length - 1 ? latestResultRef : undefined}>
                      <ChatMessage message={result.query} isUser={true} timestamp={result.timestamp} />
                      
                      {result.type === "chat" && result.response && (
                        <ChatMessage message={result.response} isUser={false} />
                      )}
                      
                      {result.type === "search" && result.contentType && (
                        <div className="overflow-hidden rounded-lg bg-white p-4 shadow-md">
                          <ContentTabs activeTab={activeContentTypes[result.id] || result.contentType} onTabChange={tab => handleTabChange(result.id, tab)} />
                          <ContentGrid type={activeContentTypes[result.id] || result.contentType} content={content} loadMore={handleLoadMore} isLoadingMore={loadingMore} hasMore={hasMore} />
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
                dropdownDirection="up" 
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Search;
