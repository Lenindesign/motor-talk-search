import { useState } from "react";
import { ContentType } from "../components/ContentGrid";
import { 
  determineContentType, 
  generateChatResponse,
  mockArticles,
  mockNewCars,
  mockUsedCars,
  mockPhotos,
  mockVideos
} from "../services/mockData";

export interface SearchResult {
  id: string;
  query: string;
  type: "search" | "chat";
  contentType?: ContentType;
  response?: string;
  timestamp: string;
}

export type ContentRecord = {
  articles: any[];
  newCars: any[];
  usedCars: any[];
  photos: any[];
  videos: any[];
};

export const useSearch = () => {
  const [searchHistory, setSearchHistory] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [activeContentTypes, setActiveContentTypes] = useState<Record<string, ContentType>>({});
  const [content, setContent] = useState<ContentRecord>({
    articles: mockArticles,
    newCars: mockNewCars,
    usedCars: mockUsedCars,
    photos: mockPhotos,
    videos: mockVideos,
  });
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

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

  return {
    searchHistory,
    isSearching,
    activeContentTypes,
    content,
    loadingMore,
    hasMore,
    handleSearch,
    handleLoadMore,
    handleTabChange
  };
};
