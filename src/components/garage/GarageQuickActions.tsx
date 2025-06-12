import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Calculator, Share2, Download, CheckSquare, Square, X, ArrowLeft, Star } from "lucide-react";
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

  // Get selected car data for comparison
  const getSelectedCarData = () => {
    return savedCars
      .filter(car => selectedCars.includes(car.id))
      .map(car => savedItemToCarData(car));
  };

  if (carCount === 0) return null;

  return (
    <>
      <Card className="bg-neutral-8 border-neutral-6">
        <CardContent className="p-4">
          <div className="space-y-3">
            {/* Title and subtitle in horizontal row */}
            <div className="flex items-center justify-between">
              <h3 className="typography-caption text-neutral-1">Quick Actions</h3>
              <p className="typography-caption-small text-neutral-4">
                Compare, calculate, and share your vehicles
              </p>
            </div>
            
            {/* Action buttons in their own row */}
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex items-center space-x-2"
                onClick={handleOpenCompareModal}
              >
                <BarChart3 className="w-4 h-4" />
                <span className="hidden sm:inline">Compare</span>
              </Button>
              
              <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                <Calculator className="w-4 h-4" />
                <span className="hidden sm:inline">Calculate</span>
              </Button>
              
              <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                <Share2 className="w-4 h-4" />
                <span className="hidden sm:inline">Share</span>
              </Button>
              
              <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comparison Modal */}
      <Dialog open={isCompareModalOpen} onOpenChange={handleCloseModal}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto m-4 md:m-4 xl:m-4">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {showComparison && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleBackToSelection}
                    className="p-1"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                )}
                <span>{showComparison ? 'Vehicle Comparison' : 'Compare Vehicles'}</span>
              </div>
              {!showComparison && (
                <Badge variant="secondary">
                  {selectedCars.length} selected
                </Badge>
              )}
            </DialogTitle>
          </DialogHeader>
          
          {!showComparison ? (
            /* Selection View */
            <div className="space-y-4">
              <p className="text-sm text-neutral-4">
                Select 2 or more vehicles from your garage to compare their specifications, pricing, and features.
              </p>
              
              {/* Vehicle Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {savedCars.map(car => {
                  const carData = savedItemToCarData(car);
                  const isSelected = selectedCars.includes(car.id);
                  
                  return (
                    <div
                      key={car.id}
                      className={`relative border rounded-lg p-4 cursor-pointer transition-all ${
                        isSelected 
                          ? 'border-motortrend-red bg-motortrend-red/5' 
                          : 'border-neutral-6 hover:border-neutral-5'
                      }`}
                      onClick={() => handleToggleCarSelection(car.id)}
                    >
                      {/* Selection indicator */}
                      <div className="absolute top-2 right-2">
                        {isSelected ? (
                          <CheckSquare className="w-5 h-5 text-motortrend-red" />
                        ) : (
                          <Square className="w-5 h-5 text-neutral-4" />
                        )}
                      </div>
                      
                      {/* Car info */}
                      <div className="flex gap-3">
                        <img
                          src={carData.imageUrl}
                          alt={carData.title}
                          className="w-20 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm mb-1">{carData.title}</h4>
                          <p className="text-sm text-neutral-4 mb-1">{carData.price}</p>
                          <div className="flex gap-2">
                            <Badge variant="outline" className="text-xs">
                              {carData.category}
                            </Badge>
                            {carData.motorTrendScore && (
                              <Badge variant="outline" className="text-xs">
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
              
              {/* Action buttons */}
              <div className="flex justify-between items-center pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={handleCloseModal}
                >
                  Cancel
                </Button>
                
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedCars([])}
                    disabled={selectedCars.length === 0}
                  >
                    Clear Selection
                  </Button>
                  <Button
                    onClick={handleCompare}
                    disabled={selectedCars.length < 2}
                    className="bg-motortrend-red hover:bg-motortrend-red/90"
                  >
                    Compare {selectedCars.length > 0 && `(${selectedCars.length})`}
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            /* Comparison View */
            <div className="space-y-6">
              {/* Scores at the top */}
              <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${selectedCars.length}, 1fr)` }}>
                {getSelectedCarData().map(car => (
                  <div key={car.id} className="text-center">
                    <img
                      src={car.imageUrl}
                      alt={car.title}
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                    <h3 className="font-semibold text-sm mb-3">{car.title}</h3>
                    
                    {/* MT Score */}
                    <div className="bg-motortrend-red/10 rounded-lg p-3 mb-2">
                      <div className="text-xs text-neutral-4 mb-1">MotorTrend Score</div>
                      <div className="text-2xl font-bold text-motortrend-red">
                        {car.motorTrendScore || 'N/A'}
                      </div>
                    </div>
                    
                    {/* Owner Score */}
                    <div className="bg-blue-50 rounded-lg p-3">
                      <div className="text-xs text-neutral-4 mb-1">Owner Score</div>
                      <div className="flex items-center justify-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-xl font-bold text-blue-600">
                          {car.userReviewsScore || '4.2'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Comparison Table */}
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-neutral-8 p-3 border-b">
                  <h4 className="font-semibold">Specifications</h4>
                </div>
                
                {/* Price */}
                <div className="grid border-b" style={{ gridTemplateColumns: `200px repeat(${selectedCars.length}, 1fr)` }}>
                  <div className="p-3 bg-neutral-8 font-medium">Price</div>
                  {getSelectedCarData().map(car => (
                    <div key={`${car.id}-price`} className="p-3 text-center font-semibold">
                      {car.price}
                    </div>
                  ))}
                </div>
                
                {/* Category */}
                <div className="grid border-b" style={{ gridTemplateColumns: `200px repeat(${selectedCars.length}, 1fr)` }}>
                  <div className="p-3 bg-neutral-8 font-medium">Category</div>
                  {getSelectedCarData().map(car => (
                    <div key={`${car.id}-category`} className="p-3 text-center">
                      {car.category}
                    </div>
                  ))}
                </div>
                
                {/* Fuel Type */}
                <div className="grid border-b" style={{ gridTemplateColumns: `200px repeat(${selectedCars.length}, 1fr)` }}>
                  <div className="p-3 bg-neutral-8 font-medium">Fuel Type</div>
                  {getSelectedCarData().map(car => (
                    <div key={`${car.id}-fuel`} className="p-3 text-center">
                      {car.fuelType || 'N/A'}
                    </div>
                  ))}
                </div>
                
                {/* MPG/MPGe */}
                <div className="grid border-b" style={{ gridTemplateColumns: `200px repeat(${selectedCars.length}, 1fr)` }}>
                  <div className="p-3 bg-neutral-8 font-medium">Efficiency</div>
                  {getSelectedCarData().map(car => (
                    <div key={`${car.id}-mpg`} className="p-3 text-center">
                      {car.mpge ? `${car.mpge} MPGe` : car.mpg ? `${car.mpg} MPG` : 'N/A'}
                    </div>
                  ))}
                </div>
                
                {/* Engine/Range */}
                <div className="grid" style={{ gridTemplateColumns: `200px repeat(${selectedCars.length}, 1fr)` }}>
                  <div className="p-3 bg-neutral-8 font-medium">Engine/Range</div>
                  {getSelectedCarData().map(car => (
                    <div key={`${car.id}-engine`} className="p-3 text-center">
                      {car.range ? `${car.range} miles` : car.engine || 'N/A'}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Action buttons */}
              <div className="flex justify-between items-center pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={handleBackToSelection}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Selection
                </Button>
                
                <Button
                  onClick={handleCloseModal}
                  className="bg-motortrend-red hover:bg-motortrend-red/90"
                >
                  Done
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GarageQuickActions;
