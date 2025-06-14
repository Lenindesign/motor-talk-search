import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Calculator, Share2, Download, CheckSquare, Square, X, ArrowLeft, Star, Check } from "lucide-react";
import { useSavedItems } from "@/contexts/SavedItemsContext";
import { savedItemToCarData } from "./carDataEnrichment";
import { useToast } from "@/hooks/use-toast";

interface GarageQuickActionsProps {
  carCount: number;
}

const GarageQuickActions: React.FC<GarageQuickActionsProps> = ({ carCount }) => {
  const navigate = useNavigate();
  const { savedItems } = useSavedItems();
  const { toast } = useToast();
  const [selectedCars, setSelectedCars] = useState<string[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Filter only car items
  const savedCars = savedItems.filter(item => item.type === 'newCar' || item.type === 'usedCar');

  const handleToggleCarSelection = (carId: string) => {
    setSelectedCars(prev => 
      prev.includes(carId) 
        ? prev.filter(id => id !== carId)
        : [...prev, carId]
    );
  };

  const handleCompare = () => {
    if (selectedCars.length < 2) {
      toast({
        title: "Select at least 2 cars",
        description: "You need to select at least 2 cars to compare",
        variant: "destructive"
      });
      return;
    }
    
    setShowComparison(true);
  };

  const handleBackToSelection = () => {
    setShowComparison(false);
  };

  const handleCloseModal = () => {
    setIsCompareModalOpen(false);
    setShowComparison(false);
    setSelectedCars([]);
  };

  const handleOpenCompareModal = () => {
    if (carCount < 2) {
      toast({
        title: "Not enough vehicles",
        description: "You need at least 2 vehicles in your garage to compare",
        variant: "destructive"
      });
      return;
    }
    setIsCompareModalOpen(true);
  };

  const handleShareGarage = () => {
    // Copy link to clipboard
    navigator.clipboard.writeText(window.location.href);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
    toast({
      title: "Link copied!",
      description: "Your garage link has been copied to clipboard",
    });
  };

  // Get selected car data for comparison
  const getSelectedCarData = () => {
    return savedCars
      .filter(car => selectedCars.includes(car.id))
      .map(car => savedItemToCarData(car));
  };

  if (carCount === 0) return null;

  return (
    <>
      {/* Success notification */}
      {showSuccess && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-3 rounded-xl shadow-modern-lg animate-in slide-in-from-top-2 z-50">
          <div className="flex items-center">
            <Check className="w-4 h-4 mr-2" />
            <span className="typography-caption font-medium">Link copied successfully!</span>
          </div>
        </div>
      )}

      <Card className="bg-gradient-to-r from-neutral-8 to-neutral-7 border border-neutral-6 shadow-modern">
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Enhanced header */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="typography-subtitle text-neutral-1 mb-1">Quick Actions</h3>
                <p className="typography-caption text-neutral-4">
                  Compare, calculate, and share your vehicles
                </p>
              </div>
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-modern">
                <BarChart3 className="w-5 h-5 text-motortrend-red" />
              </div>
            </div>
            
            {/* Enhanced action buttons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button 
                variant="outline" 
                className="flex flex-col items-center space-y-2 h-auto py-4 px-3 border-neutral-6 hover:border-motortrend-red hover:bg-motortrend-red/5 transition-all duration-200"
                onClick={handleOpenCompareModal}
              >
                <BarChart3 className="w-5 h-5 text-motortrend-red" />
                <span className="typography-caption font-medium">Compare</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="flex flex-col items-center space-y-2 h-auto py-4 px-3 border-neutral-6 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200"
              >
                <Calculator className="w-5 h-5 text-blue-500" />
                <span className="typography-caption font-medium">Calculate</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="flex flex-col items-center space-y-2 h-auto py-4 px-3 border-neutral-6 hover:border-green-500 hover:bg-green-50 transition-all duration-200"
                onClick={handleShareGarage}
              >
                <Share2 className="w-5 h-5 text-green-500" />
                <span className="typography-caption font-medium">Share</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="flex flex-col items-center space-y-2 h-auto py-4 px-3 border-neutral-6 hover:border-purple-500 hover:bg-purple-50 transition-all duration-200"
              >
                <Download className="w-5 h-5 text-purple-500" />
                <span className="typography-caption font-medium">Export</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Comparison Modal */}
      <Dialog open={isCompareModalOpen} onOpenChange={handleCloseModal}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto m-4 rounded-2xl border-0 shadow-modern-xl">
          <DialogHeader className="pb-6 border-b border-neutral-6">
            <DialogTitle className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {showComparison && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleBackToSelection}
                    className="p-2 hover:bg-neutral-8 rounded-xl transition-all duration-150"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                )}
                <div>
                  <h2 className="typography-title text-neutral-1">
                    {showComparison ? 'Vehicle Comparison' : 'Compare Vehicles'}
                  </h2>
                  <p className="typography-caption text-neutral-4 mt-1">
                    {showComparison ? 'Side-by-side comparison' : 'Select vehicles to compare'}
                  </p>
                </div>
              </div>
              {!showComparison && (
                <Badge variant="secondary" className="bg-motortrend-red/10 text-motortrend-red border-motortrend-red/20">
                  {selectedCars.length} selected
                </Badge>
              )}
            </DialogTitle>
          </DialogHeader>
          
          {!showComparison ? (
            /* Enhanced Selection View */
            <div className="space-y-6 pt-6">
              <div className="bg-neutral-8 rounded-xl p-4 border border-neutral-6">
                <p className="typography-body text-neutral-3">
                  Select 2 or more vehicles from your garage to compare their specifications, pricing, and features.
                </p>
              </div>
              
              {/* Enhanced Vehicle Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {savedCars.map(car => {
                  const carData = savedItemToCarData(car);
                  const isSelected = selectedCars.includes(car.id);
                  
                  return (
                    <div
                      key={car.id}
                      className={`relative border-2 rounded-xl p-4 cursor-pointer transition-all duration-200 ${
                        isSelected 
                          ? 'border-motortrend-red bg-motortrend-red/5 shadow-modern' 
                          : 'border-neutral-6 hover:border-neutral-5 hover:shadow-modern'
                      }`}
                      onClick={() => handleToggleCarSelection(car.id)}
                    >
                      {/* Enhanced selection indicator */}
                      <div className="absolute top-3 right-3">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                          isSelected 
                            ? 'border-motortrend-red bg-motortrend-red' 
                            : 'border-neutral-4 bg-white'
                        }`}>
                          {isSelected && <Check className="w-3 h-3 text-white" />}
                        </div>
                      </div>
                      
                      {/* Enhanced car info */}
                      <div className="flex gap-4 pr-8">
                        <img
                          src={carData.imageUrl}
                          alt={carData.title}
                          className="w-24 h-20 object-cover rounded-lg shadow-modern"
                        />
                        <div className="flex-1">
                          <h4 className="typography-subtitle text-neutral-1 mb-2">{carData.title}</h4>
                          <p className="typography-body text-motortrend-red font-medium mb-2">{carData.price}</p>
                          <div className="flex gap-2">
                            <Badge variant="outline" className="typography-small border-neutral-5 text-neutral-3">
                              {carData.category}
                            </Badge>
                            {carData.motorTrendScore && (
                              <Badge variant="outline" className="typography-small border-motortrend-red/20 text-motortrend-red bg-motortrend-red/5">
                                <Star className="w-3 h-3 mr-1" />
                                MT {carData.motorTrendScore}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Enhanced action buttons */}
              <div className="flex justify-between items-center pt-6 border-t border-neutral-6">
                <Button
                  variant="ghost"
                  onClick={handleCloseModal}
                  className="text-neutral-4 hover:text-neutral-2"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleCompare}
                  disabled={selectedCars.length < 2}
                  className="bg-motortrend-red text-white hover:bg-red-600 shadow-modern px-6 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Compare {selectedCars.length > 0 && `(${selectedCars.length})`}
                </Button>
              </div>
            </div>
          ) : (
            /* Enhanced Comparison View */
            <div className="space-y-6 pt-6">
              {(() => {
                const selectedCarData = getSelectedCarData();
                
                return (
                  <>
                    {/* Vehicle Headers */}
                    <div className="grid gap-4" style={{ gridTemplateColumns: `200px repeat(${selectedCarData.length}, 1fr)` }}>
                      <div></div>
                      {selectedCarData.map(car => (
                        <div key={car.id} className="bg-white rounded-xl p-4 border border-neutral-6 shadow-modern">
                          <img
                            src={car.imageUrl}
                            alt={car.title}
                            className="w-full h-32 object-cover rounded-lg mb-3"
                          />
                          <h4 className="typography-subtitle text-neutral-1 mb-2">{car.title}</h4>
                          <p className="typography-body text-motortrend-red font-medium">{car.price}</p>
                          {car.motorTrendScore && (
                            <div className="flex items-center mt-2">
                              <Star className="w-4 h-4 text-motortrend-red mr-1" />
                              <span className="typography-caption text-motortrend-red">MT {car.motorTrendScore}</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Comparison Table */}
                    <div className="bg-white rounded-xl border border-neutral-6 shadow-modern overflow-hidden">
                      <div className="space-y-0">
                        {/* Basic Information */}
                        <div className="bg-neutral-8 px-4 py-3 border-b border-neutral-6">
                          <h5 className="typography-subtitle text-neutral-1">Basic Information</h5>
                        </div>
                        
                        {[
                          { label: 'Year', key: 'year' },
                          { label: 'Category', key: 'category' },
                          { label: 'Body Style', key: 'bodyStyle' },
                          { label: 'Fuel Type', key: 'fuelType' },
                          { label: 'Drivetrain', key: 'drivetrain' }
                        ].map((row, index) => (
                          <div key={row.key} className={`grid gap-4 px-4 py-3 ${index % 2 === 0 ? 'bg-neutral-8/50' : 'bg-white'}`} style={{ gridTemplateColumns: `200px repeat(${selectedCarData.length}, 1fr)` }}>
                            <div className="typography-caption font-medium text-neutral-2">{row.label}</div>
                            {selectedCarData.map(car => (
                              <div key={car.id} className="typography-caption text-neutral-1">
                                {String(car[row.key as keyof typeof car] || 'N/A')}
                              </div>
                            ))}
                          </div>
                        ))}

                        {/* Performance */}
                        <div className="bg-neutral-8 px-4 py-3 border-b border-neutral-6">
                          <h5 className="typography-subtitle text-neutral-1">Performance</h5>
                        </div>
                        
                        {[
                          { label: 'Engine', key: 'engine' },
                          { label: 'Horsepower', key: 'horsepower' },
                          { label: 'Transmission', key: 'transmission' },
                          { label: 'MPG', key: 'mpg' },
                          { label: 'Range', key: 'range' }
                        ].map((row, index) => (
                          <div key={row.key} className={`grid gap-4 px-4 py-3 ${index % 2 === 0 ? 'bg-neutral-8/50' : 'bg-white'}`} style={{ gridTemplateColumns: `200px repeat(${selectedCarData.length}, 1fr)` }}>
                            <div className="typography-caption font-medium text-neutral-2">{row.label}</div>
                            {selectedCarData.map(car => (
                              <div key={car.id} className="typography-caption text-neutral-1">
                                {String(car[row.key as keyof typeof car] || 'N/A')}
                              </div>
                            ))}
                          </div>
                        ))}

                        {/* Pricing */}
                        <div className="bg-neutral-8 px-4 py-3 border-b border-neutral-6">
                          <h5 className="typography-subtitle text-neutral-1">Pricing</h5>
                        </div>
                        
                        {[
                          { label: 'Current Price', key: 'price' },
                          { label: 'MSRP', key: 'msrp' },
                          { label: 'Mileage', key: 'mileage' }
                        ].map((row, index) => (
                          <div key={row.key} className={`grid gap-4 px-4 py-3 ${index % 2 === 0 ? 'bg-neutral-8/50' : 'bg-white'}`} style={{ gridTemplateColumns: `200px repeat(${selectedCarData.length}, 1fr)` }}>
                            <div className="typography-caption font-medium text-neutral-2">{row.label}</div>
                            {selectedCarData.map(car => (
                              <div key={car.id} className="typography-caption text-neutral-1">
                                {String(car[row.key as keyof typeof car] || 'N/A')}
                              </div>
                            ))}
                          </div>
                        ))}

                        {/* Ratings */}
                        <div className="bg-neutral-8 px-4 py-3 border-b border-neutral-6">
                          <h5 className="typography-subtitle text-neutral-1">Ratings</h5>
                        </div>
                        
                        {[
                          { label: 'MotorTrend Score', key: 'motorTrendScore' },
                          { label: 'User Reviews', key: 'userReviewsScore' },
                          { label: 'Category Rank', key: 'motorTrendCategoryRank' }
                        ].map((row, index) => (
                          <div key={row.key} className={`grid gap-4 px-4 py-3 ${index % 2 === 0 ? 'bg-neutral-8/50' : 'bg-white'}`} style={{ gridTemplateColumns: `200px repeat(${selectedCarData.length}, 1fr)` }}>
                            <div className="typography-caption font-medium text-neutral-2">{row.label}</div>
                            {selectedCarData.map(car => (
                              <div key={car.id} className="typography-caption text-neutral-1">
                                {row.key === 'motorTrendScore' && car[row.key] ? (
                                  <div className="flex items-center">
                                    <Star className="w-3 h-3 text-motortrend-red mr-1" />
                                    {car[row.key]}
                                  </div>
                                ) : row.key === 'userReviewsScore' && car[row.key] ? (
                                  <div className="flex items-center">
                                    <Star className="w-3 h-3 text-blue-500 mr-1" />
                                    {car[row.key]}/10
                                  </div>
                                ) : row.key === 'motorTrendCategoryRank' ? (
                                  car[row.key] ? 'Top Ranked' : 'Not Ranked'
                                ) : (
                                  String(car[row.key as keyof typeof car] || 'N/A')
                                )}
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-between items-center pt-4 border-t border-neutral-6">
                      <Button
                        variant="ghost"
                        onClick={handleBackToSelection}
                        className="text-neutral-4 hover:text-neutral-2"
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Selection
                      </Button>
                      <div className="flex gap-3">
                        <Button
                          variant="outline"
                          onClick={() => {
                            // Export comparison as PDF or share
                            toast({
                              title: "Export feature",
                              description: "Export functionality will be implemented soon",
                            });
                          }}
                          className="border-neutral-5 text-neutral-2 hover:bg-neutral-8"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Export
                        </Button>
                        <Button
                          onClick={() => {
                            // Share comparison
                            handleShareGarage();
                          }}
                          className="bg-motortrend-red text-white hover:bg-red-600"
                        >
                          <Share2 className="w-4 h-4 mr-2" />
                          Share Comparison
                        </Button>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GarageQuickActions;
