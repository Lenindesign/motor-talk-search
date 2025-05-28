
import React, { useState, useEffect } from 'react';
import { 
  Select,
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useCarMakesApi, useCarModelsByMakeApi, useCarDetailsApi } from '@/hooks/use-cars-api';
import { Loader } from 'lucide-react';

interface CarSelectorApiProps {
  onSelectionChange?: (selection: { 
    make: string | null, 
    model: string | null, 
    year: number | null,
    details?: any[]
  }) => void;
}

const CarSelectorApi: React.FC<CarSelectorApiProps> = ({ onSelectionChange }) => {
  const [selectedMake, setSelectedMake] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const { 
    data: makes, 
    isLoading: makesLoading, 
    error: makesError 
  } = useCarMakesApi();

  const { 
    data: models, 
    isLoading: modelsLoading, 
    error: modelsError 
  } = useCarModelsByMakeApi(selectedMake);

  const {
    data: carDetails,
    isLoading: detailsLoading
  } = useCarDetailsApi(selectedMake, selectedModel, selectedYear);

  // Reset dependent fields when parent selection changes
  useEffect(() => {
    if (selectedMake === null) {
      setSelectedModel(null);
      setSelectedYear(null);
    }
  }, [selectedMake]);

  useEffect(() => {
    if (selectedModel === null) {
      setSelectedYear(null);
    }
  }, [selectedModel]);

  // Notify parent component about selection changes
  useEffect(() => {
    if (onSelectionChange) {
      onSelectionChange({
        make: selectedMake,
        model: selectedModel,
        year: selectedYear,
        details: carDetails
      });
    }
  }, [selectedMake, selectedModel, selectedYear, carDetails, onSelectionChange]);

  // Extract available years from car details
  const availableYears = carDetails ? 
    [...new Set(carDetails.map(car => car.year))].sort((a, b) => b - a) : 
    [];

  // Handle errors
  if (makesError) {
    console.error("Failed to load car makes from API:", makesError);
    return <div>Error loading car makes from API. Please try again later.</div>;
  }

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="make-select-api" className="block text-sm font-medium text-gray-700 mb-1">
          Make
        </label>
        <Select
          value={selectedMake || ""}
          onValueChange={(value) => setSelectedMake(value || null)}
        >
          <SelectTrigger id="make-select-api" className="w-full">
            <SelectValue placeholder="Select make">
              {makesLoading ? (
                <span className="flex items-center">
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </span>
              ) : (
                selectedMake || "Select make"
              )}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {makes?.map(make => (
              <SelectItem key={make} value={make}>
                {make}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label htmlFor="model-select-api" className="block text-sm font-medium text-gray-700 mb-1">
          Model
        </label>
        <Select
          value={selectedModel || ""}
          onValueChange={(value) => setSelectedModel(value || null)}
          disabled={!selectedMake || modelsLoading}
        >
          <SelectTrigger id="model-select-api" className="w-full">
            <SelectValue placeholder="Select model">
              {modelsLoading ? (
                <span className="flex items-center">
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </span>
              ) : (
                selectedModel || "Select model"
              )}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {models?.map(modelData => (
              <SelectItem key={modelData.model} value={modelData.model}>
                {modelData.model}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label htmlFor="year-select-api" className="block text-sm font-medium text-gray-700 mb-1">
          Year
        </label>
        <Select
          value={selectedYear?.toString() || ""}
          onValueChange={(value) => setSelectedYear(value ? parseInt(value) : null)}
          disabled={!selectedModel || detailsLoading}
        >
          <SelectTrigger id="year-select-api" className="w-full">
            <SelectValue placeholder="Select year">
              {detailsLoading ? (
                <span className="flex items-center">
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </span>
              ) : (
                selectedYear?.toString() || "Select year"
              )}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {availableYears.map(year => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {carDetails && carDetails.length > 0 && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-sm text-gray-700 mb-2">
            Available Configurations: {carDetails.length}
          </h4>
          <div className="text-xs text-gray-600 space-y-1">
            {carDetails.slice(0, 3).map((car, index) => (
              <div key={index}>
                {car.fuel_type && `Fuel: ${car.fuel_type}`}
                {car.transmission && ` • Transmission: ${car.transmission}`}
                {car.combination_mpg && ` • MPG: ${car.combination_mpg}`}
              </div>
            ))}
            {carDetails.length > 3 && (
              <div className="text-gray-500">
                +{carDetails.length - 3} more configurations
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CarSelectorApi;
