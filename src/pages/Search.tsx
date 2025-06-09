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
  // Honda Accord result count state removed as it's no longer needed
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

  // Track previous URL query to prevent duplicate searches
  const previousQueryRef = useRef<string | null>(null);
  
  // Check for URL query parameter and perform search automatically
  useEffect(() => {
    const queryFromUrl = searchParams.get('q');
    const aiResponseFromUrl = searchParams.get('aiResponse');

    if (queryFromUrl && queryFromUrl.trim()) {
      const trimmedQuery = queryFromUrl.trim();
      
      // If this is the same query we just processed, don't search again
      if (previousQueryRef.current === trimmedQuery) {
        return;
      }
      
      if (isSearching) {
        // If a search is already in progress, defer to it.
        return;
      }

      const isQuestion = trimmedQuery.endsWith("?") || aiResponseFromUrl;
      const typeFromUrl = isQuestion ? "chat" : "search";
      const queryExistsInHistory = searchHistory.some(
        item => item.query === trimmedQuery && item.type === typeFromUrl
      );

      if (!queryExistsInHistory) {
        // Store the current query to prevent duplicate processing
        previousQueryRef.current = trimmedQuery;
        
        // If there's an AI response in the URL, handle it specially
        if (aiResponseFromUrl) {
          handleAIResponse(trimmedQuery, aiResponseFromUrl);
        } else {
          handleSearch(trimmedQuery);
        }
      }
    }
  }, [searchParams, searchHistory, isSearching]);

  // Function to handle AI responses from URL
  const handleAIResponse = (query: string, aiResponse: string) => {
    const searchId = `search-${Date.now()}`;
    
    // Create a new chat result with the predefined response
    const newResult: SearchResult = {
      id: searchId,
      query,
      type: "chat",
      response: decodeURIComponent(aiResponse),
      timestamp: new Date().toLocaleTimeString()
    };
    
    // Add to search history
    setSearchHistory(prev => [...prev, newResult]);
    
    // Scroll to the result
    setTimeout(() => {
      if (latestResultRef.current) {
        latestResultRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'end'
        });
      }
    }, 100);
  };

  // Function to handle search submissions
  const handleSearch = (rawQuery: string) => {
    const query = rawQuery.trim();
    if (!query) return;
    
    // Update the previousQueryRef to prevent URL-triggered duplicates
    previousQueryRef.current = query;

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
        const lowerQuery = query.toLowerCase();
        // Check for Honda Accord searches - include just 'accord' to get more results
        const isHondaAccordSearch = lowerQuery.includes('honda accord') || 
                                   (lowerQuery.includes('honda') && lowerQuery.includes('accord')) || 
                                   lowerQuery === 'accord' || 
                                   lowerQuery === 'honda';
        
        // Special handling for Honda Accord searches
        const filteredContent = {
          // For articles, include any that mention Honda or Accord or have IDs starting with 'honda-'
          articles: isHondaAccordSearch 
            ? mockArticles.filter(article => 
                article.title.toLowerCase().includes('honda') || 
                article.title.toLowerCase().includes('accord') ||
                article.id.toLowerCase().startsWith('honda-') ||
                article.id.toLowerCase() === 'v1' ||
                article.id.toLowerCase() === 'v2' ||
                article.id.toLowerCase() === 'v3' ||
                article.id.toLowerCase() === 'v4')
            : lowerQuery.includes("article") ? mockArticles : content.articles,
            
          // For new cars, include any that mention Honda or Accord or have IDs starting with 'honda-'
          newCars: isHondaAccordSearch
            ? mockNewCars.filter(car => 
                car.title.toLowerCase().includes('honda') || 
                car.title.toLowerCase().includes('accord') ||
                car.id.toLowerCase().startsWith('honda-'))
            : lowerQuery.includes("new") || contentType === "newCars" ? mockNewCars : content.newCars,
            
          // For used cars, include any that mention Honda or Accord or have IDs starting with 'honda-'
          usedCars: isHondaAccordSearch
            ? mockUsedCars.filter(car => 
                car.title.toLowerCase().includes('honda') || 
                car.title.toLowerCase().includes('accord') ||
                car.id.toLowerCase().startsWith('honda-'))
            : lowerQuery.includes("used") || contentType === "usedCars" ? mockUsedCars : content.usedCars,
            
          // For photos, include any that have Honda as make or Accord as model or in title
          photos: isHondaAccordSearch
            ? mockPhotos.filter(photo => 
                (photo.make && photo.make.toLowerCase().includes('honda')) || 
                (photo.carModel && photo.carModel.toLowerCase().includes('accord')) ||
                (photo.title && photo.title.toLowerCase().includes('accord')) ||
                (photo.title && photo.title.toLowerCase().includes('honda')) ||
                photo.id.toLowerCase().startsWith('honda-'))
            : lowerQuery.includes("photo") || contentType === "photos" ? mockPhotos : content.photos,
            
          // For videos, include any that mention Honda or Accord or have IDs starting with 'honda-'
          videos: isHondaAccordSearch
            ? mockVideos.filter(video => 
                video.title.toLowerCase().includes('honda') || 
                video.title.toLowerCase().includes('accord') ||
                video.id.toLowerCase().startsWith('honda-'))
            : lowerQuery.includes("video") || contentType === "videos" ? mockVideos : content.videos
        };

        // Honda Accord search filtering is still applied, but we no longer count or display the results
        
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
      <main className="flex flex-1 flex-col">
        <div className="relative flex flex-col h-full">
          <div className="flex-1 overflow-y-auto" ref={chatContainerRef}>
            <div className="max-w-[980px] mx-auto w-full pb-32 px-0 py-[16px]">
              {searchHistory.length === 0 ? (
                <div className="flex flex-1 flex-col items-center justify-center space-y-6 px-[32px] py-[32px]">
                  <h1 className="typography-display text-motortrend-dark">
                    Welcome to MOTORTREND Search
                  </h1>
                  <p className="max-w-md text-center typography-body text-neutral-3 mb-4">
                    Ask me anything about cars or search for automotive content
                  </p>
                  
                  {/* New personalized dashboard link */}
                  <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-md mb-4 transition-all hover:shadow-lg px-[32px]">
                    <Link to="/dashboard" className="flex items-center justify-between text-motortrend-dark hover:text-motortrend-red">
                      <div className="flex items-center">
                        <LayoutDashboard className="h-5 w-5 mr-2" />
                        <div>
                          <h3 className="typography-body-large">My Garage</h3>
                          <p className="typography-caption text-neutral-3">Get personalized automotive content</p>
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
                        <div className="overflow-hidden rounded-lg bg-white p-4 shadow-md relative z-10">
                          {/* Search results content */}
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
          
          <div className="sticky bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-motortrend-gray to-transparent p-4 pb-6">
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
