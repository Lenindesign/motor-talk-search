
import React, { useRef, useEffect } from "react";
import SearchWelcome from "../components/search/SearchWelcome";
import SearchResults from "../components/search/SearchResults";
import SearchLayout from "../components/search/SearchLayout";
import { useSearch } from "../hooks/use-search";
import { getAllContent } from "../services/mockData";

const Index = () => {
  const { 
    searchHistory, 
    isSearching, 
    activeContentTypes, 
    content, 
    loadingMore, 
    hasMore,
    handleSearch,
    handleLoadMore,
    handleTabChange
  } = useSearch();
  
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const latestResultRef = useRef<HTMLDivElement>(null);
  const searchBarRef = useRef<HTMLInputElement>(null);
  const allContent = getAllContent();
  
  // Auto-scroll to the latest result when it's added
  useEffect(() => {
    if (latestResultRef.current) {
      latestResultRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'end'
      });
    }
  }, [searchHistory.length]);

  // Function to handle clicking on search suggestions
  const handleSuggestionClick = (suggestion: string) => {
    handleSearch(suggestion);
  };

  // Return focus to search bar after response is processed
  useEffect(() => {
    if (!isSearching && searchBarRef.current) {
      searchBarRef.current.focus();
    }
    
    // Ensure we scroll to the latest result after it's processed and rendered
    if (!isSearching && latestResultRef.current) {
      setTimeout(() => {
        latestResultRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'end'
        });
      }, 100);
    }
  }, [isSearching]);

  return (
    <SearchLayout
      onSearch={handleSearch}
      isSearching={isSearching}
      searchBarRef={searchBarRef}
      chatContainerRef={chatContainerRef}
    >
      {searchHistory.length === 0 ? (
        <SearchWelcome onSuggestionClick={handleSuggestionClick} />
      ) : (
        <SearchResults 
          searchHistory={searchHistory}
          activeContentTypes={activeContentTypes}
          content={content}
          loadingMore={loadingMore}
          hasMore={hasMore}
          handleTabChange={handleTabChange}
          handleLoadMore={handleLoadMore}
          latestResultRef={latestResultRef}
        />
      )}
    </SearchLayout>
  );
};

export default Index;
