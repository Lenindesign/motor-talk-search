
import React, { useState, useEffect } from 'react';
import { 
  Select,
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useCarMakes, useCarModelsByMakeId, useYearsByModelId } from '@/hooks/use-car-database';
import { Loader } from 'lucide-react';

interface CarSelectorProps {
  onSelectionChange?: (selection: { makeId: string | null, modelId: string | null, year: number | null }) => void;
}

const CarSelector: React.FC<CarSelectorProps> = ({ onSelectionChange }) => {
  const [selectedMakeId, setSelectedMakeId] = useState<string | null>(null);
  const [selectedModelId, setSelectedModelId] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const { 
    data: makes, 
    isLoading: makesLoading, 
    error: makesError 
  } = useCarMakes();

  const { 
    data: models, 
    isLoading: modelsLoading, 
    error: modelsError 
  } = useCarModelsByMakeId(selectedMakeId);

  const { 
    data: years, 
    isLoading: yearsLoading, 
    error: yearsError 
  } = useYearsByModelId(selectedModelId);

  // Reset dependent fields when parent selection changes
  useEffect(() => {
    if (selectedMakeId === null) {
      setSelectedModelId(null);
      setSelectedYear(null);
    }
  }, [selectedMakeId]);

  useEffect(() => {
    if (selectedModelId === null) {
      setSelectedYear(null);
    }
  }, [selectedModelId]);

  // Notify parent component about selection changes
  useEffect(() => {
    if (onSelectionChange) {
      onSelectionChange({
        makeId: selectedMakeId,
        modelId: selectedModelId,
        year: selectedYear
      });
    }
  }, [selectedMakeId, selectedModelId, selectedYear, onSelectionChange]);

  // Handle errors
  if (makesError) {
    console.error("Failed to load car makes:", makesError);
    return <div>Error loading car makes. Please try again later.</div>;
  }

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="make-select" className="block text-sm font-medium text-gray-700 mb-1">
          Make
        </label>
        <Select
          value={selectedMakeId || ""}
          onValueChange={(value) => setSelectedMakeId(value || null)}
        >
          <SelectTrigger id="make-select" className="w-full">
            <SelectValue placeholder="Select make">
              {makesLoading ? (
                <span className="flex items-center">
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </span>
              ) : (
                selectedMakeId ? makes?.find(make => make.id === selectedMakeId)?.name : "Select make"
              )}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {makes?.map(make => (
              <SelectItem key={make.id} value={make.id}>
                {make.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label htmlFor="model-select" className="block text-sm font-medium text-gray-700 mb-1">
          Model
        </label>
        <Select
          value={selectedModelId || ""}
          onValueChange={(value) => setSelectedModelId(value || null)}
          disabled={!selectedMakeId || modelsLoading}
        >
          <SelectTrigger id="model-select" className="w-full">
            <SelectValue placeholder="Select model">
              {modelsLoading ? (
                <span className="flex items-center">
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </span>
              ) : (
                selectedModelId ? models?.find(model => model.id === selectedModelId)?.name : "Select model"
              )}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {models?.map(model => (
              <SelectItem key={model.id} value={model.id}>
                {model.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label htmlFor="year-select" className="block text-sm font-medium text-gray-700 mb-1">
          Year
        </label>
        <Select
          value={selectedYear?.toString() || ""}
          onValueChange={(value) => setSelectedYear(value ? parseInt(value) : null)}
          disabled={!selectedModelId || yearsLoading}
        >
          <SelectTrigger id="year-select" className="w-full">
            <SelectValue placeholder="Select year">
              {yearsLoading ? (
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
            {years?.map(yearObj => (
              <SelectItem key={yearObj.id} value={yearObj.year.toString()}>
                {yearObj.year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default CarSelector;
