import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  DollarSign, 
  MapPin, 
  Clock, 
  Shield, 
  Star, 
  CheckCircle, 
  ArrowRight,
  Smartphone,
  MousePointer,
  Eye,
  Filter,
  Zap,
  Users,
  Target,
  Heart,
  Award,
  Globe,
  AlertTriangle as Alert,
  Layout
} from 'lucide-react';

const FindBestPriceTab = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
            <DollarSign className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="typography-display text-color-neutral-1">Find Best Price Experience</h1>
            <p className="typography-body-large text-color-neutral-4 mt-1">
              Streamlined user journeys and intelligent flow design for optimal price discovery
            </p>
          </div>
        </div>
      </div>

      {/* Experience Overview */}
      <Card className="border-color-neutral-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-red-500" />
            Experience Goals
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-4 w-4 text-green-600" />
                <span className="font-semibold text-green-800">Speed</span>
              </div>
              <p className="text-sm text-green-700">Find the best price in under 30 seconds</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-4 w-4 text-blue-600" />
                <span className="font-semibold text-blue-800">Trust</span>
              </div>
              <p className="text-sm text-blue-700">Verified dealers and transparent pricing</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div className="flex items-center gap-2 mb-2">
                <Heart className="h-4 w-4 text-purple-600" />
                <span className="font-semibold text-purple-800">Convenience</span>
              </div>
              <p className="text-sm text-purple-700">One-click access to best deals</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* User Journey Map */}
      <Card className="border-color-neutral-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-500" />
            User Journey Map
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="border border-yellow-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-yellow-100 text-yellow-800 flex items-center justify-center">
                    <Eye className="h-4 w-4" />
                  </div>
                  <span className="font-semibold">Discovery</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">User browses cars and discovers Find Best Price feature</p>
                <div className="space-y-1">
                  <span className="text-xs font-medium text-gray-500">Touchpoints:</span>
                  <div className="text-xs text-gray-500">• Car card CTA</div>
                  <div className="text-xs text-gray-500">• Search results</div>
                  <div className="text-xs text-gray-500">• Detail page</div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center">
                    <MousePointer className="h-4 w-4" />
                  </div>
                  <span className="font-semibold">Intent</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">User clicks 'Find Best Price' with purchase intent</p>
                <div className="space-y-1">
                  <span className="text-xs font-medium text-gray-500">Touchpoints:</span>
                  <div className="text-xs text-gray-500">• Primary CTA button</div>
                  <div className="text-xs text-gray-500">• Price comparison</div>
                  <div className="text-xs text-gray-500">• Location input</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-purple-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center">
                    <Filter className="h-4 w-4" />
                  </div>
                  <span className="font-semibold">Evaluation</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">User reviews and compares dealer offers</p>
                <div className="space-y-1">
                  <span className="text-xs font-medium text-gray-500">Touchpoints:</span>
                  <div className="text-xs text-gray-500">• Price grid</div>
                  <div className="text-xs text-gray-500">• Dealer ratings</div>
                  <div className="text-xs text-gray-500">• Distance filters</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 text-green-800 flex items-center justify-center">
                    <CheckCircle className="h-4 w-4" />
                  </div>
                  <span className="font-semibold">Action</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">User selects dealer and initiates contact</p>
                <div className="space-y-1">
                  <span className="text-xs font-medium text-gray-500">Touchpoints:</span>
                  <div className="text-xs text-gray-500">• Contact dealer</div>
                  <div className="text-xs text-gray-500">• Get quote</div>
                  <div className="text-xs text-gray-500">• Schedule visit</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Primary User Flow */}
      <Card className="border-color-neutral-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ArrowRight className="h-5 w-5 text-purple-500" />
            Primary User Flow
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                step: 1,
                title: "Entry Point",
                description: "User discovers car and clicks 'Find Best Price'",
                details: ["Prominent red CTA button", "Available on all car cards", "Clear value proposition"],
                time: "< 3 seconds",
                painPoints: ["Button visibility", "Value unclear"],
                solutions: ["High contrast button", "Clear benefit text"]
              },
              {
                step: 2,
                title: "Location Input",
                description: "User provides location for dealer proximity",
                details: ["Auto-detect current location", "ZIP code input", "City/state search"],
                time: "5-10 seconds",
                painPoints: ["Manual typing", "Privacy concerns"],
                solutions: ["One-click geolocation", "Clear privacy policy"]
              },
              {
                step: 3,
                title: "Price Discovery",
                description: "System shows dealer prices in ranked order",
                details: ["Lowest price highlighted", "Distance from user", "Dealer ratings visible"],
                time: "Instant loading",
                painPoints: ["Slow loading", "Too many options"],
                solutions: ["Progressive loading", "Smart filtering"]
              },
              {
                step: 4,
                title: "Dealer Selection",
                description: "User compares options and selects preferred dealer",
                details: ["Price comparison grid", "Filter by distance/rating", "Dealer profile preview"],
                time: "10-30 seconds",
                painPoints: ["Analysis paralysis", "Missing information"],
                solutions: ["Recommended choice", "Complete dealer profiles"]
              },
              {
                step: 5,
                title: "Contact Initiation",
                description: "User contacts dealer or requests quote",
                details: ["One-click contact", "Pre-filled inquiry form", "Schedule appointment"],
                time: "< 5 seconds",
                painPoints: ["Form complexity", "No immediate response"],
                solutions: ["Minimal required fields", "Instant confirmation"]
              }
            ].map((flow) => (
              <div key={flow.step} className="border border-gray-200 rounded-lg p-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold">
                      {flow.step}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{flow.title}</h4>
                      <Badge variant="outline" className="text-xs">
                        <Clock className="h-3 w-3 mr-1" />
                        {flow.time}
                      </Badge>
                    </div>
                    <p className="text-gray-600 mb-3">{flow.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                      <div>
                        <h5 className="text-sm font-medium text-gray-700 mb-1">Features</h5>
                        {flow.details.map((detail, idx) => (
                          <div key={idx} className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                            <CheckCircle className="h-3 w-3 text-green-500" />
                            {detail}
                          </div>
                        ))}
                      </div>
                      <div>
                        <h5 className="text-sm font-medium text-red-700 mb-1">Pain Points</h5>
                        {flow.painPoints.map((pain, idx) => (
                          <div key={idx} className="flex items-center gap-1 text-xs text-red-600 mb-1">
                            <span className="w-3 h-3 rounded-full bg-red-100 flex items-center justify-center">!</span>
                            {pain}
                          </div>
                        ))}
                      </div>
                      <div>
                        <h5 className="text-sm font-medium text-blue-700 mb-1">Solutions</h5>
                        {flow.solutions.map((solution, idx) => (
                          <div key={idx} className="flex items-center gap-1 text-xs text-blue-600 mb-1">
                            <span className="w-3 h-3 rounded-full bg-blue-100 flex items-center justify-center">✓</span>
                            {solution}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* User Personas */}
      <Card className="border-color-neutral-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-purple-500" />
            User Personas & Scenarios
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Sarah - First Time Buyer",
                age: "28",
                goal: "Find reliable car at best price",
                frustrations: ["Overwhelming options", "Fear of overpaying", "Dealer trustworthiness"],
                scenario: "Needs a commuter car under $25K, values fuel efficiency and reliability",
                needs: ["Clear price comparisons", "Dealer reviews", "Simple contact process"],
                color: "bg-blue-50 border-blue-200"
              },
              {
                name: "Greg - Car Enthusiast",
                age: "35",
                goal: "Find specific performance model",
                frustrations: ["Limited inventory", "Inflated prices", "Long search time"],
                scenario: "Looking for specific trim of sports car, willing to travel for right deal",
                needs: ["Inventory alerts", "Detailed specs", "Direct dealer communication"],
                color: "bg-green-50 border-green-200"
              },
              {
                name: "Paula - Busy Parent",
                age: "42",
                goal: "Quick family vehicle purchase",
                frustrations: ["No time for dealer visits", "Complex process", "Hidden fees"],
                scenario: "Needs family SUV quickly, values convenience and transparency",
                needs: ["Mobile-first experience", "Upfront pricing", "Online scheduling"],
                color: "bg-purple-50 border-purple-200"
              }
            ].map((persona, index) => (
              <Card key={index} className={`${persona.color} border`}>
                <CardContent className="p-4">
                  <div className="mb-3">
                    <h4 className="font-semibold text-gray-900">{persona.name}</h4>
                    <p className="text-sm text-gray-600">Age: {persona.age}</p>
                  </div>
                  
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Goal:</span>
                      <p className="text-gray-600">{persona.goal}</p>
                    </div>
                    
                    <div>
                      <span className="font-medium text-gray-700">Scenario:</span>
                      <p className="text-gray-600">{persona.scenario}</p>
                    </div>
                    
                    <div>
                      <span className="font-medium text-gray-700">Key Needs:</span>
                      <ul className="text-gray-600 mt-1">
                        {persona.needs.map((need, idx) => (
                          <li key={idx} className="flex items-center gap-1">
                            <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                            {need}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Edge Cases & Error States */}
      <Card className="border-color-neutral-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Alert className="h-5 w-5 text-orange-500" />
            Edge Cases & Error Handling
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Common Edge Cases</h4>
              <div className="space-y-3">
                {[
                  {
                    case: "No dealers within range",
                    solution: "Expand search radius with user consent",
                    fallback: "Show online/delivery options"
                  },
                  {
                    case: "Price data unavailable",
                    solution: "Show estimated price ranges",
                    fallback: "Direct dealer contact option"
                  },
                  {
                    case: "Location permission denied",
                    solution: "Manual ZIP code entry",
                    fallback: "Major city selection"
                  },
                  {
                    case: "Slow network connection",
                    solution: "Progressive loading with skeleton UI",
                    fallback: "Offline cached results"
                  }
                ].map((item, idx) => (
                  <div key={idx} className="border border-orange-200 rounded-lg p-3 bg-orange-50">
                    <h5 className="font-medium text-orange-900 mb-1">{item.case}</h5>
                    <div className="text-sm space-y-1">
                      <div className="flex items-center gap-1">
                        <span className="text-green-600">Primary:</span>
                        <span className="text-gray-600">{item.solution}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-blue-600">Fallback:</span>
                        <span className="text-gray-600">{item.fallback}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Error States</h4>
              <div className="space-y-3">
                {[
                  {
                    error: "Server timeout",
                    message: "We're having trouble loading prices. Please try again.",
                    action: "Retry button + offline mode"
                  },
                  {
                    error: "Invalid location",
                    message: "We couldn't find that location. Please try a different ZIP code.",
                    action: "Location suggestions + manual entry"
                  },
                  {
                    error: "No inventory",
                    message: "This vehicle isn't available nearby. Would you like to see similar options?",
                    action: "Alternative suggestions + waitlist"
                  },
                  {
                    error: "Form submission failed",
                    message: "We couldn't send your request. Your information has been saved.",
                    action: "Retry with saved data + phone contact"
                  }
                ].map((item, idx) => (
                  <div key={idx} className="border border-red-200 rounded-lg p-3 bg-red-50">
                    <h5 className="font-medium text-red-900 mb-1">{item.error}</h5>
                    <p className="text-sm text-red-700 mb-2">{item.message}</p>
                    <div className="text-xs text-red-600">
                      <span className="font-medium">Recovery:</span> {item.action}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dual Rating System Integration */}
      <Card className="border-color-neutral-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            Dual Rating System Integration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">Rating Display Requirements</h4>
              <p className="text-blue-700 text-sm mb-3">
                All cars in the Find Best Price experience must display both MT Score and Owner Score to provide comprehensive evaluation criteria.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-3 border border-blue-200">
                  <h5 className="font-medium text-gray-900 mb-2">Car Card Rating Display</h5>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="bg-neutral-100 text-motortrend-red px-2 py-1 rounded text-xs font-medium">
                      MT Score: 8.5
                    </div>
                    <div className="bg-neutral-100 text-motortrend-red px-2 py-1 rounded text-xs font-medium">
                      Owner: 8.6
                    </div>
                  </div>
                  <p className="text-xs text-gray-600">Side-by-side horizontal layout with consistent styling</p>
                </div>
                
                <div className="bg-white rounded-lg p-3 border border-blue-200">
                  <h5 className="font-medium text-gray-900 mb-2">Price Comparison Grid</h5>
                  <div className="space-y-1 mb-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">Expert Rating:</span>
                      <span className="font-medium">8.5/10</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">Owner Rating:</span>
                      <span className="font-medium">8.6/10</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600">Detailed view with labeled ratings</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h5 className="font-semibold text-gray-900 mb-2">Rating Consistency</h5>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    Same 0-10 scale for both ratings
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    Identical visual styling
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    Clear labeling (MT Score vs Owner)
                  </li>
                </ul>
              </div>

              <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                <h5 className="font-semibold text-yellow-900 mb-2">Trust Building</h5>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li className="flex items-center gap-2">
                    <Star className="h-3 w-3 text-yellow-600" />
                    Expert evaluation transparency
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="h-3 w-3 text-yellow-600" />
                    Real owner experiences
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="h-3 w-3 text-yellow-600" />
                    Balanced perspective
                  </li>
                </ul>
              </div>

              <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                <h5 className="font-semibold text-purple-900 mb-2">Decision Support</h5>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li className="flex items-center gap-2">
                    <Target className="h-3 w-3 text-purple-600" />
                    Compare expert vs user opinions
                  </li>
                  <li className="flex items-center gap-2">
                    <Target className="h-3 w-3 text-purple-600" />
                    Identify rating discrepancies
                  </li>
                  <li className="flex items-center gap-2">
                    <Target className="h-3 w-3 text-purple-600" />
                    Inform price negotiations
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-semibold text-red-900 mb-2">Implementation Guidelines</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h5 className="font-medium text-red-800 mb-2">Visual Design</h5>
                  <ul className="text-red-700 space-y-1">
                    <li>• Use motortrend-red (#DC2626) for text color</li>
                    <li>• Apply neutral-100 background (#F5F5F5)</li>
                    <li>• Maintain 2px gap between badges</li>
                    <li>• Ensure 44px minimum touch target</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-red-800 mb-2">Data Requirements</h5>
                  <ul className="text-red-700 space-y-1">
                    <li>• MT Score: Editorial rating (0-10 scale)</li>
                    <li>• Owner Score: userReviewsScore * 2</li>
                    <li>• Fallback: Show single rating if one missing</li>
                    <li>• Loading state: Show skeleton badges</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-900 mb-2">User Experience Benefits</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-green-800 mb-2">For Price Comparison</h5>
                  <p className="text-sm text-green-700">
                    Dual ratings help users understand if a higher price correlates with better expert reviews or owner satisfaction, 
                    enabling more informed price vs quality decisions.
                  </p>
                </div>
                <div>
                  <h5 className="font-medium text-green-800 mb-2">For Dealer Selection</h5>
                  <p className="text-sm text-green-700">
                    When multiple dealers offer similar prices, ratings become the differentiator, 
                    helping users choose vehicles with better long-term satisfaction scores.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Convenience Features */}
      <Card className="border-color-neutral-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5 text-green-500" />
            Convenience Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-gray-200 hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                    <MousePointer className="h-5 w-5 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900">One-Click Access</h4>
                </div>
                <p className="text-sm text-gray-600 mb-3">Find Best Price button prominently displayed on every car card</p>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                    Immediate price discovery
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                    No form filling required
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                    Consistent placement
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200 hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900">Smart Location Detection</h4>
                </div>
                <p className="text-sm text-gray-600 mb-3">Automatically detects user location for relevant dealer results</p>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                    Skip manual entry
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                    Accurate distance calculations
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                    Local inventory focus
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200 hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                    <Shield className="h-5 w-5 text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900">Verified Dealers</h4>
                </div>
                <p className="text-sm text-gray-600 mb-3">Curated network of trusted automotive dealers</p>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                    Quality assurance
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                    Transparent pricing
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                    Customer service standards
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Design Principles */}
      <Card className="border-color-neutral-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-orange-500" />
            Design Principles
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                Minimize Friction
              </h4>
              <p className="text-gray-600">Reduce steps between intent and action</p>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <ArrowRight className="h-3 w-3" />
                  Single-click price discovery
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <ArrowRight className="h-3 w-3" />
                  Auto-filled forms where possible
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <ArrowRight className="h-3 w-3" />
                  Progressive disclosure of information
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                Build Trust
              </h4>
              <p className="text-gray-600">Transparent pricing and verified dealers</p>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <ArrowRight className="h-3 w-3" />
                  Clear pricing breakdown
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <ArrowRight className="h-3 w-3" />
                  Dealer ratings and reviews
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <ArrowRight className="h-3 w-3" />
                  No hidden fees disclosure
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Wireframes & Mockups */}
      <Card className="border-color-neutral-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Layout className="h-5 w-5 text-indigo-500" />
            Key Interface Wireframes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
                             {
                 title: "Car Card with Find Best Price CTA",
                 description: "Primary entry point for price discovery",
                 elements: [
                   "Car image and basic specs",
                   "Dual rating badges (MT Score + Owner)",
                   "Prominent 'Find Best Price' button",
                   "Starting price indication",
                   "Dealer count indicator"
                 ]
               },
              {
                title: "Location Input Modal",
                description: "Quick location capture for dealer proximity",
                elements: [
                  "Auto-detect location option",
                  "ZIP code input field",
                  "Privacy notice",
                  "Continue button"
                ]
              },
                             {
                 title: "Price Comparison Grid",
                 description: "Core price discovery interface",
                 elements: [
                   "Sorted dealer list (price ascending)",
                   "MT Score and Owner Score display",
                   "Distance and rating indicators",
                   "Quick contact actions",
                   "Filter and sort options"
                 ]
               },
              {
                title: "Dealer Contact Form",
                description: "Streamlined lead generation",
                elements: [
                  "Pre-filled vehicle info",
                  "Minimal required fields",
                  "Contact preference options",
                  "Instant confirmation"
                ]
              }
            ].map((wireframe, index) => (
              <Card key={index} className="border-gray-300">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">{wireframe.title}</h4>
                  <p className="text-sm text-gray-600 mb-3">{wireframe.description}</p>
                  
                  {/* Simple wireframe mockup */}
                  <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-4 mb-3">
                    <div className="space-y-2">
                      {wireframe.elements.map((element, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                          <span className="text-xs text-gray-600">{element}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Badge variant="outline" className="text-xs">Responsive</Badge>
                    <Badge variant="outline" className="text-xs">Accessible</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* A/B Testing Opportunities */}
      <Card className="border-color-neutral-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-green-500" />
            A/B Testing Opportunities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                test: "CTA Button Text",
                variants: ["Find Best Price", "Get Dealer Quotes", "Compare Prices", "Shop Local Dealers"],
                hypothesis: "More specific language increases click-through rates",
                metric: "Button click rate"
              },
              {
                test: "Price Display Format",
                variants: ["Starting at $X", "$X - $Y Range", "From $X nearby", "Best price: $X"],
                hypothesis: "Clear pricing context reduces bounce rate",
                metric: "Conversion to contact"
              },
              {
                test: "Location Permission Request",
                variants: ["Auto-prompt", "Explain first", "Manual entry default", "Progressive disclosure"],
                hypothesis: "Permission explanation increases approval rate",
                metric: "Location permission granted"
              },
              {
                test: "Dealer List Layout",
                variants: ["List view", "Card grid", "Map overlay", "Table format"],
                hypothesis: "Visual comparison improves decision speed",
                metric: "Time to dealer selection"
              }
            ].map((test, index) => (
              <Card key={index} className="border-green-200 bg-green-50">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-green-900 mb-2">{test.test}</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium text-green-800">Variants:</span>
                      <ul className="text-green-700 mt-1 ml-4">
                        {test.variants.map((variant, idx) => (
                          <li key={idx} className="list-disc">{variant}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <span className="font-medium text-green-800">Hypothesis:</span>
                      <p className="text-green-700">{test.hypothesis}</p>
                    </div>
                    <div>
                      <span className="font-medium text-green-800">Key Metric:</span>
                      <span className="text-green-700"> {test.metric}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Implementation Guidelines */}
      <Card className="border-color-neutral-6 bg-gradient-to-r from-red-50 to-orange-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-red-600" />
            Implementation Guidelines
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Visual Design</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Use MotorTrend red (#DC2626) for primary CTA buttons
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Maintain 44px minimum touch target size on mobile
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Use consistent card layouts with proper spacing
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Technical Requirements</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  API response times under 200ms for price data
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Progressive loading with skeleton states
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Analytics tracking for all interaction points
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FindBestPriceTab;
