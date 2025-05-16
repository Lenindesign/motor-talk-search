
import React from "react";
import { SavedItem } from "../../contexts/SavedItemsContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2, ExternalLink } from "lucide-react";
import { CarData } from "../CarCard";

interface GarageTabContentProps {
  activeTab: 'all' | 'owned' | 'testDriven' | 'interested';
  onTabChange: (tab: 'all' | 'owned' | 'testDriven' | 'interested') => void;
  displayCars: SavedItem[];
  savedItemToCarData: (item: SavedItem) => CarData;
  minScore: number;
}

const GarageTabContent: React.FC<GarageTabContentProps> = ({
  activeTab,
  onTabChange,
  displayCars,
  savedItemToCarData,
  minScore,
}) => {
  if (displayCars.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 mb-2">No {activeTab === 'all' ? 'cars' : activeTab} found</p>
        <p className="text-sm text-gray-400">
          {minScore > 0 ? `No cars with score ${minScore} or above found.` : "Items you save will appear here"}
        </p>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {displayCars.map((item) => (
        <div
          key={item.id}
          className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
        >
          <div className="flex overflow-hidden">
            <div className="w-1/3">
              <a href={`#/cars/${item.id}`}>
                <img
                  src={item.imageUrl || '/placeholder.svg'}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </a>
            </div>
            <div className="p-3 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex justify-between">
                  <div>
                    <Badge
                      variant="outline"
                      className="bg-motortrend-red text-white text-xs mb-1"
                    >
                      {item.type === "newCar"
                        ? "New"
                        : item.type === "usedCar"
                        ? "Used"
                        : item.type}
                    </Badge>
                    {item.metadata?.motorTrendScore && (
                      <Badge
                        variant="outline"
                        className="ml-1 text-xs mb-1"
                      >
                        MT Score: {item.metadata.motorTrendScore}
                      </Badge>
                    )}
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <a href={`#/cars/${item.id}`} className="hover:text-motortrend-red">
                  <h3 className="font-medium text-sm line-clamp-2">{item.title}</h3>
                </a>
                <div className="mt-1 text-xs text-gray-500">
                  {item.metadata?.price && (
                    <div className="font-semibold text-black">
                      {item.metadata.price}
                    </div>
                  )}
                  {item.metadata?.year && (
                    <div>Year: {item.metadata.year}</div>
                  )}
                  {item.metadata?.mileage && (
                    <div>Mileage: {item.metadata.mileage}</div>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-gray-500">
                  Saved {formatDate(item.savedAt)}
                </span>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 px-2 text-xs"
                  >
                    Compare
                  </Button>
                  <a href={`#/cars/${item.id}`}>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 w-8 p-0"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GarageTabContent;
