import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Search, Info, Car, FileText, Image, Video, Filter } from 'lucide-react';
import CodeSnippet from './CodeSnippet';
import ResponsivePreview from './ResponsivePreview';

interface SearchResult {
  type: 'make' | 'model' | 'article' | 'photo' | 'video' | 'chat';
  title: string;
  subtitle?: string;
  priority: 'high' | 'medium' | 'low';
  date?: string;
  count?: string;
  duration?: string;
  response?: string;
}

// Mock search results for demonstration
const hondaResults: SearchResult[] = [
  { type: 'make', title: 'Honda', subtitle: 'Japanese Automaker', priority: 'high' },
  { type: 'model', title: 'Honda Accord', subtitle: '2025 Model', priority: 'medium' },
  { type: 'model', title: 'Honda Civic', subtitle: '2025 Model', priority: 'medium' },
  { type: 'model', title: 'Honda CR-V', subtitle: '2025 Model', priority: 'medium' },
  { type: 'model', title: 'Honda Pilot', subtitle: '2025 Model', priority: 'medium' },
  { type: 'article', title: 'Honda Announces New EV Strategy', date: '2025-05-15', priority: 'low' },
  { type: 'photo', title: 'Honda Collection at Tokyo Motor Show', count: '24 photos', priority: 'low' },
] as const;

const hondaAccordResults: SearchResult[] = [
  { type: 'model', title: 'Honda Accord', subtitle: '2025 Model', priority: 'high' },
  { type: 'article', title: '2025 Honda Accord Review: Still the Midsize Sedan Benchmark', date: '2025-04-10', priority: 'medium' },
  { type: 'photo', title: 'Honda Accord Photo Gallery', count: '18 photos', priority: 'medium' },
  { type: 'video', title: 'Honda Accord vs Toyota Camry: Midsize Sedan Showdown', duration: '12:45', priority: 'medium' },
  { type: 'article', title: 'Honda Accord Hybrid: The Efficient Choice', date: '2025-03-22', priority: 'low' },
] as const;

const bestEvResults: SearchResult[] = [
  { 
    type: 'chat',
    title: 'Best EVs for 2025',
    response: `Based on our testing, here are the top EVs for 2025:

• Luxury: Lucid Air (516 mile range)
• SUV: Rivian R1S (best capability)
• Value: Hyundai Ioniq 6 (best efficiency)

[View full EV rankings →]

Would you like to:
• Compare EV models
• See charging guides
• Read latest EV news`,
    priority: 'high'
  },
  { type: 'article', title: 'Best Electric Cars of 2025', date: '2025-06-01', priority: 'medium' },
  { type: 'video', title: 'Ultimate EV Comparison Test', duration: '18:32', priority: 'medium' },
  { type: 'article', title: 'EV Buying Guide: Everything You Need to Know', date: '2025-05-28', priority: 'medium' },
] as const;

const searchLogicCode = `// Simplified search logic pseudocode
function performSearch(query: string): SearchResult[] {
  // Step 1: Normalize and tokenize the search query
  const normalizedQuery = normalizeText(query);
  const tokens = tokenize(normalizedQuery);
  
  // Step 2: Determine search intent and context
  const searchIntent = determineIntent(tokens);
  
  // Step 3: Apply search priority rules
  let results = [];
  
  // Rule 1: Exact make matches get highest priority
  if (isExactMakeMatch(tokens)) {
    results.push(...findExactMakeMatches(tokens));
  }
  
  // Rule 2: For make + model queries, prioritize the specific model
  if (isMakeModelQuery(tokens)) {
    const make = extractMake(tokens);
    const model = extractModel(tokens);
    results.push(...findExactModelMatches(make, model));
  }
  
  // Rule 3: Add related content with descending priority
  results.push(...findRelatedContent(tokens, searchIntent));
  
  // Step 4: Apply content type weighting
  results = applyContentTypeWeighting(results, searchIntent);
  
  // Step 5: Sort by relevance score and return
  return sortByRelevance(results);
}`;

const SearchTab: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  
const handleSearch = (query: string) => {
    // Simple mock implementation to demonstrate the UI
    const lowerQuery = query.toLowerCase();
    if (lowerQuery === 'honda') {
      setSearchResults(hondaResults);
    } else if (lowerQuery === 'honda accord') {
      setSearchResults(hondaAccordResults);
    } else if (lowerQuery.includes('best ev') || lowerQuery.includes('best electric')) {
      setSearchResults(bestEvResults);
    } else {
      setSearchResults([]);
    }
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Search Functionality</CardTitle>
          <CardDescription>
            Intelligent automotive search with context-aware results prioritization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-neutral-4 mb-6">
            Our search system is designed to understand automotive context and user intent, delivering the most relevant 
            results based on sophisticated prioritization rules. The search algorithm analyzes queries to determine if 
            users are looking for specific makes, models, or content types, and adjusts result ranking accordingly.
          </p>
          
          <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="examples">Examples</TabsTrigger>
              <TabsTrigger value="implementation">Implementation</TabsTrigger>
              <TabsTrigger value="guidelines">Guidelines</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <div className="space-y-6">
                <div>
                  <h3 className="typography-title text-neutral-1 mb-2">Search Prioritization Logic</h3>
                  <p className="typography-body text-neutral-4 mb-3">
                    The search system uses a multi-level prioritization approach to deliver the most relevant results:
                  </p>
                  
                  <div className="bg-neutral-9 p-4 rounded-md space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Priority Levels:</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded mr-2 mt-0.5">High</span>
                          <div>
                            <p className="font-medium">Exact Make/Model Matches</p>
                            <p className="text-sm text-neutral-4">Direct matches to car makes (e.g., "Honda") or specific models (e.g., "Honda Accord")</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded mr-2 mt-0.5">Medium</span>
                          <div>
                            <p className="font-medium">Related Models & Primary Content</p>
                            <p className="text-sm text-neutral-4">Other models from the same make and high-quality content directly related to the search</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-0.5 rounded mr-2 mt-0.5">Low</span>
                          <div>
                            <p className="font-medium">Secondary Content</p>
                            <p className="text-sm text-neutral-4">News articles, photos, and other content with partial relevance to the search query</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Content Type Weighting:</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• Cars and models are prioritized for make/model searches</li>
                        <li>• Articles are prioritized for news and information searches</li>
                        <li>• Photos and videos are prioritized for visual content searches</li>
                        <li>• Reviews are prioritized for comparison and evaluation searches</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="typography-title text-neutral-1 mb-2">Search Components</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Global Search</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="relative">
                          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-neutral-4" />
                          <Input 
                            type="search" 
                            placeholder="Search makes, models, articles..." 
                            className="pl-9"
                          />
                        </div>
                        <p className="text-xs text-neutral-4 mt-2">
                          Accessible from the header on all pages
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Advanced Search</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex gap-2">
                          <div className="relative flex-grow">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-neutral-4" />
                            <Input 
                              type="search" 
                              placeholder="Search with filters..." 
                              className="pl-9"
                            />
                          </div>
                          <Button variant="outline" size="icon">
                            <Filter className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-xs text-neutral-4 mt-2">
                          Used on search results pages with filtering options
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="examples">
              <div className="space-y-6">
                <div>
                  <h3 className="typography-title text-neutral-1 mb-2">Interactive Examples</h3>
                  <p className="typography-body text-neutral-4 mb-3">
                    Try these example searches to see how our prioritization logic works. Enter "Honda" or "Honda Accord" to see different result patterns.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-neutral-4" />
                      <Input 
                        type="search" 
                        placeholder="Try 'Honda', 'Honda Accord', or 'What's the best EV?'" 
                        className="pl-9"
                        value={searchQuery}
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                          handleSearch(e.target.value);
                        }}
                      />
                    </div>
                    <Button onClick={() => handleSearch(searchQuery)}>
                      Search
                    </Button>
                    {searchResults.length > 0 ? (
                      <div className="space-y-3">
                        {searchResults.map((result, index) => (
                          <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-md border">
                            <div className="flex-grow">
                              <div className="flex items-center gap-2 mb-1">
                                <span className={`text-xs font-medium px-2 py-0.5 rounded ${result.priority === 'high' ? 'bg-green-100 text-green-800' : result.priority === 'medium' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                                  {result.priority.charAt(0).toUpperCase() + result.priority.slice(1)}
                                </span>
                                <span className="text-xs text-neutral-4">{result.type.charAt(0).toUpperCase() + result.type.slice(1)}</span>
                              </div>
                              <h4 className="font-medium mb-1">{result.title}</h4>
                              {result.type === 'chat' ? (
                                <div className="mt-3 p-3 bg-neutral-9 rounded-md">
                                  <pre className="whitespace-pre-wrap font-mono text-sm text-neutral-1">
                                    {result.response}
                                  </pre>
                                </div>
                              ) : (
                                <p className="text-sm text-neutral-4">
                                  {result.subtitle || result.date || result.count || result.duration}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : searchQuery ? (
                      <div className="text-center py-4 text-neutral-4">
                        No results found. Try "Honda" or "Honda Accord".
                      </div>
                    ) : null}
                  </div>
                </div>
                
                <div>
                  <h3 className="typography-title text-neutral-1 mb-2">Example: Make Search</h3>
                  <p className="typography-body text-neutral-4 mb-3">
                    When users search for a make like "Honda", the system prioritizes:
                  </p>
                  
                  <div className="bg-neutral-9 p-4 rounded-md space-y-2">
                    <div className="flex items-center">
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded mr-2">1</span>
                      <p><strong>The make itself</strong> - Honda brand page</p>
                    </div>
                    <div className="flex items-center">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded mr-2">2</span>
                      <p><strong>Popular models</strong> - Accord, Civic, CR-V, etc.</p>
                    </div>
                    <div className="flex items-center">
                      <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-0.5 rounded mr-2">3</span>
                      <p><strong>Related content</strong> - News articles, photo galleries, etc.</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="typography-title text-neutral-1 mb-2">Example: Model Search</h3>
                  <p className="typography-body text-neutral-4 mb-3">
                    When users search for a specific model like "Honda Accord", the system prioritizes:
                  </p>
                  
                  <div className="bg-neutral-9 p-4 rounded-md space-y-2">
                    <div className="flex items-center">
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded mr-2">1</span>
                      <p><strong>The exact model</strong> - Honda Accord model page</p>
                    </div>
                    <div className="flex items-center">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded mr-2">2</span>
                      <p><strong>Model-specific content</strong> - Reviews, photos, videos of the Accord</p>
                    </div>
                    <div className="flex items-center">
                      <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-0.5 rounded mr-2">3</span>
                      <p><strong>Secondary content</strong> - News mentioning the Accord, comparison articles, etc.</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="implementation">
              <div className="space-y-6">
                <div>
                  <h3 className="typography-title text-neutral-1 mb-2">Search Algorithm</h3>
                  <p className="typography-body text-neutral-4 mb-3">
                    Our search implementation uses a context-aware algorithm that understands automotive terminology and user intent.
                  </p>
                  
                  <CodeSnippet tsx={searchLogicCode} />
                </div>
                
                <div>
                  <h3 className="typography-title text-neutral-1 mb-2">Key Implementation Features</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Automotive Knowledge Graph</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-neutral-4">
                          Our search is powered by a comprehensive automotive knowledge graph that understands relationships between makes, models, body styles, and features.
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Intent Recognition</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-neutral-4">
                          The system identifies if users are looking for specific vehicles, information, visual content, or comparisons, and adjusts results accordingly.
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Typo Tolerance</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-neutral-4">
                          Fuzzy matching algorithms handle common misspellings and variants of automotive terms (e.g., "Accord" vs "Acord").
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Contextual Ranking</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-neutral-4">
                          Results are ranked based on a combination of query relevance, content freshness, popularity, and user behavior patterns.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="guidelines">
              <div className="space-y-6">
                <div>
                  <h3 className="typography-title text-neutral-1 mb-2">Search Design Guidelines</h3>
                  <p className="typography-body text-neutral-4 mb-3">
                    Follow these guidelines when implementing search functionality across the application:
                  </p>
                  
                  <div className="space-y-4">
                    <div className="bg-neutral-9 p-4 rounded-md">
                      <h4 className="font-medium mb-2">Visual Design</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <Info className="h-4 w-4 mr-2 mt-0.5 text-neutral-4" />
                          <p>Always use the search icon (magnifying glass) to indicate search functionality</p>
                        </li>
                        <li className="flex items-start">
                          <Info className="h-4 w-4 mr-2 mt-0.5 text-neutral-4" />
                          <p>Maintain consistent search field styling across all pages</p>
                        </li>
                        <li className="flex items-start">
                          <Info className="h-4 w-4 mr-2 mt-0.5 text-neutral-4" />
                          <p>Use appropriate field width based on context (header search can be narrower than dedicated search pages)</p>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-neutral-9 p-4 rounded-md">
                      <h4 className="font-medium mb-2">Interaction Design</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <Info className="h-4 w-4 mr-2 mt-0.5 text-neutral-4" />
                          <p>Trigger search on Enter key press and search button click</p>
                        </li>
                        <li className="flex items-start">
                          <Info className="h-4 w-4 mr-2 mt-0.5 text-neutral-4" />
                          <p>Provide clear visual feedback when search is in progress (loading indicator)</p>
                        </li>
                        <li className="flex items-start">
                          <Info className="h-4 w-4 mr-2 mt-0.5 text-neutral-4" />
                          <p>Show autocomplete suggestions after 2+ characters are typed</p>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-neutral-9 p-4 rounded-md">
                      <h4 className="font-medium mb-2">Content Guidelines</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <Info className="h-4 w-4 mr-2 mt-0.5 text-neutral-4" />
                          <p>Use clear placeholder text that indicates what can be searched</p>
                        </li>
                        <li className="flex items-start">
                          <Info className="h-4 w-4 mr-2 mt-0.5 text-neutral-4" />
                          <p>Provide helpful empty state messaging when no results are found</p>
                        </li>
                        <li className="flex items-start">
                          <Info className="h-4 w-4 mr-2 mt-0.5 text-neutral-4" />
                          <p>Include search tips for complex queries when appropriate</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="typography-title text-neutral-1 mb-2">Mobile Considerations</h3>
                  <p className="typography-body text-neutral-4 mb-3">
                    Search functionality requires special attention on mobile devices:
                  </p>
                  
                  <ResponsivePreview defaultDevice="mobile">
                    <div className="p-4">
                      <div className="mb-4">
                        <div className="relative">
                          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-neutral-4" />
                          <Input 
                            type="search" 
                            placeholder="Search makes, models..." 
                            className="pl-9"
                          />
                        </div>
                      </div>
                      
                      <div className="bg-white rounded-md border p-3 mb-3">
                        <div className="flex items-center">
                          <Car className="h-5 w-5 text-motortrend-dark mr-3" />
                          <div>
                            <h4 className="font-medium">Honda</h4>
                            <p className="text-xs text-neutral-4">Japanese Automaker</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white rounded-md border p-3">
                        <div className="flex items-center">
                          <Car className="h-5 w-5 text-motortrend-dark mr-3" />
                          <div>
                            <h4 className="font-medium">Honda Accord</h4>
                            <p className="text-xs text-neutral-4">2025 Model</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </ResponsivePreview>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default SearchTab;
