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
  Globe
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
                time: "< 3 seconds"
              },
              {
                step: 2,
                title: "Location Input",
                description: "User provides location for dealer proximity",
                time: "5-10 seconds"
              },
              {
                step: 3,
                title: "Price Discovery",
                description: "System shows dealer prices in ranked order",
                time: "Instant loading"
              },
              {
                step: 4,
                title: "Dealer Selection",
                description: "User compares options and selects preferred dealer",
                time: "10-30 seconds"
              },
              {
                step: 5,
                title: "Contact Initiation",
                description: "User contacts dealer or requests quote",
                time: "< 5 seconds"
              }
            ].map((flow) => (
              <div key={flow.step} className="flex gap-4">
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
                  <p className="text-gray-600">{flow.description}</p>
                </div>
              </div>
            ))}
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
